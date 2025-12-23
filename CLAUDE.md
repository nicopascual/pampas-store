# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Better-T-Stack** monorepo combining TanStack Start (React 19), Elysia, ORPC, Better-Auth, and Prisma for end-to-end type-safe full-stack development. The stack uses Bun as the runtime and Turborepo for monorepo orchestration.

## Common Commands

### Development
```bash
bun install                  # Install dependencies
bun run dev                  # Start all apps in development mode
bun run dev:web              # Start only the web application (port 3001)
bun run dev:server           # Start only the server (port 3000)
```

### Database Operations
```bash
cd packages/db && bun run db:local  # Start local SQLite database (Turso dev)
bun run db:push              # Push schema changes to database
bun run db:generate          # Generate Prisma client
bun run db:migrate           # Create and apply migrations
bun run db:studio            # Open Prisma Studio UI
```

### Code Quality
```bash
bun run check                # Run Biome linting and formatting
bun run check-types          # Type-check all packages and apps
```

### Building
```bash
bun run build                # Build all apps and packages
cd apps/server && bun run compile  # Compile server to standalone binary
```

## Architecture Overview

### Monorepo Structure
- **apps/web** - Frontend (TanStack Start + React 19 + TanStack Router)
- **apps/server** - Backend API (Elysia + ORPC)
- **packages/api** - Shared ORPC router definitions (procedures, types)
- **packages/auth** - Better-Auth configuration (dual Customer/Admin instances)
- **packages/db** - Prisma ORM schema and client
- **packages/config** - Shared TypeScript configuration

### E-Commerce Domain Architecture

This is an e-commerce backend with **strict separation** between Customer and Admin domains (DDD bounded contexts).

**Two User Domains:**
1. **Customers** - Storefront users (shoppers)
2. **Admins** - Back-office users (staff)

These are intentionally NOT unified into a single users table for security, clean domain boundaries, and simpler authorization.

**Database Schema Files:**
```
packages/db/prisma/schema/
├── schema.prisma      # Prisma config (SQLite, Bun runtime)
├── customer.prisma    # Customer domain models
├── admin.prisma       # Admin domain models
├── auth.prisma        # Legacy Better-Auth models (deprecated)
└── todo.prisma        # Example app models
```

**Customer Domain Models:**
- `CustomerGroup` - Customer segmentation
- `Customer` - Core customer (Better-Auth User equivalent)
- `CustomerSession` - Customer sessions
- `CustomerAccount` - OAuth/credential accounts
- `CustomerVerification` - Email verification tokens
- `Wishlist` - Product wishlists
- `CompareItem` - Product comparison
- `CustomerNote` - Admin notes on customers

**Admin Domain Models:**
- `AdminRole` - Roles with JSON permissions
- `Admin` - Core admin user
- `AdminSession` - Admin sessions
- `AdminAccount` - Credential accounts
- `AdminVerification` - Email verification tokens

### ORPC Communication Layer

**Type-Safe RPC Pattern:**
- `packages/api` exports `appRouter` (single source of truth for API contract)
- Backend serves router at `/rpc` endpoint via `RPCHandler`
- Frontend uses `RouterClient<typeof appRouter>` for type-safe calls

**Client Initialization (apps/web/src/utils/orpc.ts):**
- Uses `RPCLink` with fetch pointing to `VITE_SERVER_URL/rpc`
- Integrated with TanStack Query via `createTanstackQueryUtils()`
- Client-only (no server-side imports to avoid bundling issues)

**Procedure Types (packages/api):**
- `publicProcedure` - No authentication required
- `customerProcedure` - Requires customer session (rejects admin sessions)
- `adminProcedure` - Requires admin session (rejects customer sessions)
- `customerManagementProcedure` - Admin with `customers:read`, `customers:write` permissions
- `roleManagementProcedure` - Admin with `roles:manage` permission
- `superAdminProcedure` - Admin with `*` (all) permissions
- `protectedProcedure` - (Deprecated) Accepts either customer or admin session

**Usage Pattern:**
```typescript
// In React components (customer storefront)
const { data } = orpc.customer.getProfile.useQuery();
const { data } = orpc.customer.wishlist.getAll.useQuery();

// Admin procedures
const { data } = orpc.admin.customers.list.useQuery({ page: 1, limit: 20 });
```

### Authentication Flow (Dual-Auth)

**Setup (packages/auth):**
- **Two separate Better-Auth instances** for strict domain separation
- `customerAuth` at `/api/customer-auth/*` - Email/password + Google OAuth
- `adminAuth` at `/api/admin-auth/*` - Email/password only
- Cookie isolation via prefixes: `customer.*` vs `admin.*`

**Auth Package Structure:**
```
packages/auth/src/
├── index.ts           # Exports both auth instances
├── customer/index.ts  # Customer Better-Auth config
└── admin/index.ts     # Admin Better-Auth config
```

**Customer Authentication:**
1. Frontend: `authClient.signIn.email()` (basePath: `/api/customer-auth`)
2. Session stored in `customer_session` table
3. Cookie: `customer.session_token`
4. Backend: `customerAuth.api.getSession()` validates
5. `customerProcedure` middleware enforces customer-only access

**Admin Authentication:**
1. Admin app: `adminAuthClient.signIn.email()` (basePath: `/api/admin-auth`)
2. Session stored in `admin_session` table
3. Cookie: `admin.session_token`
4. Backend: `adminAuth.api.getSession()` validates
5. `adminProcedure` middleware enforces admin-only access

**Security Guarantees:**
- Admin sessions CANNOT authenticate as customers
- Customer sessions CANNOT access admin routes
- Cross-domain attempts throw `FORBIDDEN` error

**Route Protection (apps/web):**
- Use `beforeLoad` hook in TanStack Router to check authentication
- Redirect to `/sign-in` if not authenticated

### Database Access Patterns

**Prisma Setup (packages/db):**
- Split schema files: `customer.prisma`, `admin.prisma`, `todo.prisma`
- LibSQL adapter for SQLite/Turso compatibility
- Default export: single Prisma client instance

**Access Pattern:**
- ORPC procedures call Prisma methods directly: `prisma.customer.findMany()`
- Input validation via Zod schemas at procedure level
- No direct Prisma access from frontend (always through ORPC)

**Schema Changes Workflow:**
1. Edit schema files in `packages/db/prisma/schema/`
2. Run `bun run db:push` to sync with database
3. Prisma client auto-regenerates (used in `packages/db/src/index.ts`)

### API Domain Structure

```
packages/api/src/
├── index.ts                    # Procedure exports
├── context.ts                  # Dual-auth context (detects customer vs admin)
├── middleware/
│   ├── customer-auth.ts        # customerProcedure
│   ├── admin-auth.ts           # adminProcedure
│   └── permissions.ts          # Role-based permission procedures
├── domains/
│   ├── customers/router.ts     # Customer-facing procedures
│   └── admin/router.ts         # Admin-only procedures
└── routers/
    └── index.ts                # Combined appRouter
```

**Available API Routes:**
- `orpc.customer.*` - Customer domain (profile, wishlist, compare)
- `orpc.admin.*` - Admin domain (customer management, roles)
- `orpc.todo.*` - Legacy example routes
- `orpc.healthCheck` - Public health check

### State Management

- **Remote State**: TanStack Query with ORPC integration (`orpc.procedure.useQuery()`)
- **Router Context**: Provides `orpc` and `queryClient` to all routes
- **Local State**: React hooks and form state via TanStack React Form

### Internationalization (i18n)

**Supported Languages:** English (`en`), Spanish (`es`), Portuguese (`pt`)

**Libraries:**
- Frontend: `react-i18next` with bundled translations
- Backend: `i18next` in `packages/api` for localized error messages

**Translation Files:**
```
packages/api/src/i18n/locales/
├── en/                    # English translations
│   ├── errors.json        # API error messages
│   ├── validation.json    # Validation error messages
│   └── auth.json          # Auth-related messages
├── es/                    # Spanish translations
└── pt/                    # Portuguese translations

apps/web/src/locales/
├── en/                    # English translations
│   ├── common.json        # Common UI strings
│   ├── auth.json          # Auth pages
│   ├── todos.json         # Todo feature
│   ├── errors.json        # Error messages
│   └── validation.json    # Form validation
├── es/                    # Spanish translations
└── pt/                    # Portuguese translations
```

**Locale Detection:**
1. Cookie (`i18next` cookie) - highest priority
2. `Accept-Language` header - fallback
3. Default: `en`

**Frontend Usage:**
```typescript
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation("common");
  return <h1>{t("welcome")}</h1>;
}
```

**Backend Usage (ORPC procedures):**
```typescript
// context.t is available in all procedures
throw new ORPCError("BAD_REQUEST", {
  message: context.t("errors:validationFailed"),
});
```

**Language Switcher:** `apps/web/src/components/language-switcher.tsx`

**Adding New Translations:**
1. Add keys to JSON files in all language folders
2. Use namespaced keys: `t("namespace:key")` or `useTranslation("namespace")`

### Middleware & Context

**ORPC Middleware (packages/api):**
- `authMiddleware` - Validates session, attaches user to context
- `protectedProcedure` - Automatically applies authentication middleware

**Elysia Middleware (apps/server):**
- CORS configuration via `@elysiajs/cors`
- Environment-based allowed origins

**Context Flow:**
```
HTTP Request → Elysia → RPCHandler → Procedure Middleware → Handler → Prisma
```

### Code Style Conventions

**Formatting (Biome):**
- Tab indentation
- Double quotes for strings
- `cn()` for conditional Tailwind classes (from shadcn/ui)
- Auto-organize imports on save

**TypeScript:**
- Strict mode enabled
- No inferrable types (`noInferrableTypes: error`)
- Use `as const` assertions instead of explicit types

## Key Development Patterns

### Adding New API Endpoints
1. Define Zod input schema in the domain router file
2. Create procedure using appropriate middleware:
   - `publicProcedure` - No auth required
   - `customerProcedure` - Customer-only access
   - `adminProcedure` - Admin-only access
   - `customerManagementProcedure` - Admin with customer permissions
3. Add procedure to domain router (`domains/customers/router.ts` or `domains/admin/router.ts`)
4. Frontend automatically gets type-safe access via `orpc.domain.procedure.useQuery()`

### Adding New Database Models
1. Create new schema file in `packages/db/prisma/schema/` (e.g., `mymodel.prisma`)
2. Run `bun run db:push` to sync schema
3. Use `prisma.myModel.*` methods in ORPC procedures

### SSR Data Fetching Pattern

Server functions for SSR are located in `apps/web/src/functions/`. This pattern ensures proper cookie forwarding for authenticated requests during SSR.

**File Structure:**
```
src/functions/
├── server-orpc.ts        # Shared utilities (middleware, client, prefetch helper)
├── get-user.ts           # Auth - get current user session
├── get-todos.ts          # Example: fetch todos
└── get-private-data.ts   # Example: fetch protected data
```

**Creating a New Server Function:**
```typescript
// src/functions/get-my-data.ts
import { createServerFn } from "@tanstack/react-start";
import { createServerORPCClient, requestMiddleware } from "./server-orpc";

export const getMyData = createServerFn()
  .middleware([requestMiddleware])
  .handler(async ({ context }) => {
    const client = createServerORPCClient(context.request);
    return client.myProcedure();
  });
```

**Using in Route Loaders:**
```typescript
import { getMyData } from "@/functions/get-my-data";
import { prefetch } from "@/functions/server-orpc";
import { orpc } from "@/utils/orpc";

export const Route = createFileRoute("/my-route")({
  component: MyComponent,
  loader: async ({ context }) => {
    await prefetch(getMyData(), orpc.myProcedure, context.queryClient);
  },
});

function MyComponent() {
  // Data is already in cache from SSR, no loading state
  const { data } = useSuspenseQuery(orpc.myProcedure.queryOptions());
  return <div>{data}</div>;
}
```

**Key Points:**
- `requestMiddleware` captures cookies from the original request
- `createServerORPCClient` forwards cookies to the backend API
- `prefetch` helper fetches data and populates the query cache
- Use `useSuspenseQuery` in components (data is guaranteed from SSR)

### Error Handling
- ORPC interceptors log errors server-side
- Client-side errors surface via Sonner toast notifications (see `apps/web/src/routes/__root.tsx`)
- Validation errors caught by Zod during procedure execution

## Environment Variables

**apps/server/.env:**
```
DATABASE_URL=file:./local.db
CORS_ORIGIN=http://localhost:3001
ADMIN_CORS_ORIGIN=http://localhost:3002
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**apps/web/.env:**
```
VITE_SERVER_URL=http://localhost:3000
```

## Test Credentials

**Admin User:**
- Email: `nico@test.com`
- Password: `password158`
- Role: Super Admin (`["*"]` permissions)

**Seed Script:**
```bash
cd packages/db && bun run src/seed-admin.ts
```

## Important Notes

- **Bun Runtime**: Use `bun run` for all scripts (not npm/yarn)
- **Hot Reload**: Server uses `--hot` flag for fast development iteration
- **Turbo Caching**: Build outputs cached in `.turbo/` (gitignored)
- **Route Generation**: TanStack Router auto-generates `routeTree.gen.ts` (excluded from Biome)
- **OpenAPI Docs**: Available at `http://localhost:3000/api` when server is running
