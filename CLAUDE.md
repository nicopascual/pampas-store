# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **multi-tenant e-commerce platform** built with the Better-T-Stack monorepo combining TanStack Start (React 19), Elysia, ORPC, Better-Auth, and Prisma for end-to-end type-safe full-stack development. The stack uses Bun as the runtime and Turborepo for monorepo orchestration.

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
# Platform database (multi-tenant management)
cd packages/db && bunx prisma db push --schema=prisma-platform/schema.prisma

# Store/tenant database schema
DATABASE_URL="file:../../data/stores/pampas.db" bunx prisma db push
DATABASE_URL="file:../../data/stores/pampas.db" bunx prisma generate

# Seed the platform with default store
cd packages/db && bun run src/seed-platform.ts
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

## Multi-Tenant Architecture

This platform uses a **database-per-tenant** architecture with subdomain-based routing.

### Two-Database Design

```
data/
├── platform.db              # Global platform database (stores, platform admins)
└── stores/
    ├── pampas.db            # Tenant: pampas.localhost:3001
    ├── acme.db              # Tenant: acme.localhost:3001
    └── {slug}.db            # Each store gets its own SQLite database
```

**Platform Database** (`packages/db/prisma-platform/`):
- `Store` - Tenant configuration (slug, subdomain, custom domain, database connection)
- `PlatformAdmin` - Super admins who manage multiple stores
- `StorePlatformAdmin` - Links platform admins to stores with roles (owner/admin/viewer)

**Store Database** (`packages/db/prisma/schema/`):
- Each tenant has isolated data (customers, admins, orders, products, etc.)
- Schema is identical across all tenants
- Supports both local SQLite files and cloud Turso databases

### Tenant Resolution Flow

```
Request to pampas.localhost:3001
    ↓
Extract subdomain from Host header ("pampas")
    ↓
Lookup Store in platform DB by subdomain
    ↓
Get store-specific Prisma client from connection pool
    ↓
Context includes: { store, prisma, platformPrisma }
```

**Resolution Priority:**
1. `x-store-id` header (for admin tools/testing)
2. Custom domain lookup (`store.customDomain`)
3. Subdomain extraction from Host header

### Key Files

| File | Purpose |
|------|---------|
| `packages/db/prisma-platform/schema.prisma` | Platform database schema |
| `packages/db/src/platform-client.ts` | Platform DB singleton client |
| `packages/db/src/tenant-client.ts` | Tenant connection pooling (LRU, max 100) |
| `packages/api/src/context.ts` | Request context with tenant detection |
| `packages/api/src/middleware/store-auth.ts` | Store-aware procedure definitions |
| `packages/api/src/domains/platform/stores.ts` | Store CRUD API (super admin only) |
| `packages/api/src/services/store-provisioning.ts` | Database provisioning logic |

### Store-Aware Procedures

```typescript
// Requires store context (will error if no tenant resolved)
storeProcedure

// Store context + customer authentication
storeCustomerProcedure

// Store context + admin authentication
storeAdminProcedure
```

### Accessing Stores in Development

```
http://pampas.localhost:3001    # Default store (seeded)
http://acme.localhost:3001      # Another store (if created)
```

**Important:** The Vite proxy preserves the Host header (`changeOrigin: false`) so the backend can resolve the correct tenant.

## Architecture Overview

### Monorepo Structure
- **apps/web** - Frontend (TanStack Start + React 19 + TanStack Router)
- **apps/server** - Backend API (Elysia + ORPC)
- **packages/api** - Shared ORPC router definitions (procedures, types)
- **packages/auth** - Better-Auth configuration (dual Customer/Admin instances)
- **packages/db** - Prisma ORM schemas and clients (platform + tenant)
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
└── config.prisma      # Channel, Locale, Currency, Config models
```

**Customer Domain Models:**
- `CustomerGroup` - Customer segmentation
- `Customer` - Core customer (Better-Auth User equivalent)
- `CustomerSession` - Customer sessions
- `CustomerAccount` - OAuth/credential accounts
- `CustomerVerification` - Email verification tokens
- `Wishlist` - Product wishlists
- `CompareItem` - Product comparison
- `CustomerNote` - Admin notes on customers (includes `adminId`)

**Admin Domain Models:**
- `AdminRole` - Roles with JSON permissions
- `Admin` - Core admin user
- `AdminSession` - Admin sessions
- `AdminAccount` - Credential accounts
- `AdminVerification` - Email verification tokens

**Configuration Models:**
- `Channel` - Sales channels (web, mobile, etc.) with locale/currency defaults
- `Locale` - Language/region settings (en, es, pt)
- `Currency` - Currency definitions with exchange rates
- `CurrencyExchangeRate` - Exchange rates between currencies (proper FK relations)
- `CoreConfig` - Key-value configuration per channel/locale
- `ThemeCustomization` - Theme settings per channel

### ORPC Communication Layer

**Type-Safe RPC Pattern:**
- `packages/api` exports `appRouter` (single source of truth for API contract)
- Backend serves router at `/rpc` endpoint via `RPCHandler`
- Frontend uses `RouterClient<typeof appRouter>` for type-safe calls

**Client Initialization (apps/web/src/utils/orpc.ts):**
- Uses `RPCLink` with fetch pointing to `/rpc` (proxied through Vite)
- Integrated with TanStack Query via `createTanstackQueryUtils()`
- Client-only (no server-side imports to avoid bundling issues)

**Procedure Types (packages/api):**
- `publicProcedure` - No authentication required
- `storeProcedure` - Requires store context
- `storeCustomerProcedure` - Store + customer session
- `storeAdminProcedure` - Store + admin session
- `customerProcedure` - Requires customer session (rejects admin sessions)
- `adminProcedure` - Requires admin session (rejects customer sessions)
- `customerManagementProcedure` - Admin with `customers:read`, `customers:write` permissions
- `roleManagementProcedure` - Admin with `roles:manage` permission
- `settingsManagementProcedure` - Admin with `settings:manage` permission
- `superAdminProcedure` - Admin with `*` (all) permissions

**Usage Pattern:**
```typescript
// In React components (customer storefront)
const { data } = orpc.customer.getProfile.useQuery();
const { data } = orpc.customer.wishlist.getAll.useQuery();

// Admin procedures
const { data } = orpc.admin.customers.list.useQuery({ page: 1, limit: 20 });

// Platform procedures (super admin only)
const { data } = orpc.platform.stores.list.useQuery();
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
2. Session stored in `customer_session` table (per-tenant)
3. Cookie: `customer.session_token`
4. Backend: `customerAuth.api.getSession()` validates
5. `storeCustomerProcedure` middleware enforces customer-only access

**Admin Authentication:**
1. Admin app: `adminAuthClient.signIn.email()` (basePath: `/api/admin-auth`)
2. Session stored in `admin_session` table (per-tenant)
3. Cookie: `admin.session_token`
4. Backend: `adminAuth.api.getSession()` validates
5. `storeAdminProcedure` middleware enforces admin-only access

**Security Guarantees:**
- Admin sessions CANNOT authenticate as customers
- Customer sessions CANNOT access admin routes
- Cross-domain attempts throw `FORBIDDEN` error
- Each tenant has isolated session tables

**Route Protection (apps/web):**
- Use `beforeLoad` hook in TanStack Router to check authentication
- Redirect to `/sign-in` if not authenticated

### Database Access Patterns

**Prisma Setup (packages/db):**
- Two separate Prisma schemas: platform and tenant
- LibSQL adapter for SQLite/Turso compatibility
- Connection pooling for tenant databases (LRU eviction, 5-min idle timeout)

**Access Pattern:**
```typescript
// Platform database (always available)
context.platformPrisma.store.findMany()

// Tenant database (null if no store resolved)
context.prisma?.customer.findMany()
```

**Schema Changes Workflow:**
1. Edit schema files in `packages/db/prisma/schema/`
2. Run `DATABASE_URL="file:../../data/stores/pampas.db" bunx prisma db push`
3. Run `DATABASE_URL="file:../../data/stores/pampas.db" bunx prisma generate`

### API Domain Structure

```
packages/api/src/
├── index.ts                    # Procedure exports
├── context.ts                  # Multi-tenant context (store + auth detection)
├── middleware/
│   ├── customer-auth.ts        # customerProcedure
│   ├── admin-auth.ts           # adminProcedure
│   ├── store-auth.ts           # storeProcedure, storeCustomerProcedure, storeAdminProcedure
│   └── permissions.ts          # Role-based permission procedures
├── domains/
│   ├── customers/router.ts     # Customer-facing procedures
│   ├── admin/router.ts         # Admin-only procedures
│   └── platform/               # Platform management (stores, provisioning)
├── services/
│   └── store-provisioning.ts   # Database provisioning service
└── routers/
    └── index.ts                # Combined appRouter
```

**Available API Routes:**
- `orpc.customer.*` - Customer domain (profile, wishlist, compare)
- `orpc.admin.*` - Admin domain (customer management, roles, settings)
- `orpc.platform.*` - Platform domain (store CRUD, provisioning)
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
│   ├── admin.json         # Admin dashboard
│   ├── errors.json        # Error messages
│   └── validation.json    # Form validation
├── es/                    # Spanish translations
└── pt/                    # Portuguese translations
```

**Locale Detection:**
1. Cookie (`locale` cookie) - highest priority
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
- Store-aware procedures check `context.store` and `context.prisma`

**Elysia Middleware (apps/server):**
- CORS configuration via `@elysiajs/cors`
- Environment-based allowed origins

**Context Flow:**
```
HTTP Request → Elysia → createContext() → resolveStore() → getStorePrismaClient() → Procedure Handler
```

**Context Object:**
```typescript
{
  // Multi-tenant
  store: { id, slug } | null,
  prisma: PrismaClient | null,      // Store-specific (null if no tenant)
  platformPrisma: PrismaClient,     // Always available

  // Authentication
  authDomain: "customer" | "admin" | null,
  customerSession: Session | null,
  adminSession: Session | null,
  isCustomerAuthenticated: boolean,
  isAdminAuthenticated: boolean,

  // Localization
  locale: SupportedLocale,
  t: TranslationFunction,
}
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
   - `storeProcedure` - Requires tenant context
   - `storeCustomerProcedure` - Tenant + customer auth
   - `storeAdminProcedure` - Tenant + admin auth
   - `superAdminProcedure` - Platform super admin
3. Add procedure to domain router
4. Frontend automatically gets type-safe access via `orpc.domain.procedure.useQuery()`

### Adding New Database Models
1. Add model to appropriate schema file in `packages/db/prisma/schema/`
2. Run `DATABASE_URL="file:../../data/stores/pampas.db" bunx prisma db push`
3. Run `DATABASE_URL="file:../../data/stores/pampas.db" bunx prisma generate`
4. Use `context.prisma.myModel.*` in store-aware procedures

### Creating a New Store/Tenant

**Via API (programmatic):**
```typescript
// Requires super admin authentication
orpc.platform.stores.create.mutate({
  name: "Acme Store",
  slug: "acme",
  subdomain: "acme",
  plan: "starter",
});
```

**Via Seed Script (development):**
Edit `packages/db/src/seed-platform.ts` and run:
```bash
cd packages/db && bun run src/seed-platform.ts
```

### SSR Data Fetching Pattern

Server functions for SSR are located in `apps/web/src/functions/`. This pattern ensures proper cookie forwarding for authenticated requests during SSR.

**File Structure:**
```
src/functions/
├── server-orpc.ts        # Shared utilities (middleware, client, prefetch helper)
├── get-user.ts           # Auth - get current user session
├── get-admin-user.ts     # Admin auth - get admin session
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
- Server-side uses explicit URL (`http://localhost:3000`), not Vite proxy
- `prefetch` helper fetches data and populates the query cache
- Use `useSuspenseQuery` in components (data is guaranteed from SSR)

### Error Handling
- ORPC interceptors log errors server-side
- Client-side errors surface via Sonner toast notifications (see `apps/web/src/routes/__root.tsx`)
- Validation errors caught by Zod during procedure execution

## Environment Variables

**apps/server/.env:**
```
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3001
BASE_DOMAIN=localhost:3001
# DATABASE_URL intentionally NOT set for multi-tenant mode
```

**apps/web/.env:**
```
# Empty or relative - requests proxied through Vite in development
VITE_SERVER_URL=
```

## Test Credentials

**Store Admin User (per-tenant):**
- Email: `nico@test.com`
- Password: `password158`
- Role: Super Admin (`["*"]` permissions)

**Default Store:**
- Name: Pampas Store
- Slug: `pampas`
- URL: `http://pampas.localhost:3001`

**Seed Script:**
```bash
cd packages/db && bun run src/seed-platform.ts
```

## Important Notes

- **Bun Runtime**: Use `bun run` for all scripts (not npm/yarn)
- **Hot Reload**: Server uses `--hot` flag for fast development iteration
- **Turbo Caching**: Build outputs cached in `.turbo/` (gitignored)
- **Route Generation**: TanStack Router auto-generates `routeTree.gen.ts` (excluded from Biome)
- **OpenAPI Docs**: Available at `http://localhost:3000/api` when server is running
- **Multi-tenant Access**: Use subdomains like `{slug}.localhost:3001` in development
- **Vite Proxy**: Configured with `changeOrigin: false` to preserve Host header for tenant resolution
