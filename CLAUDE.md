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
- **packages/auth** - Better-Auth configuration
- **packages/db** - Prisma ORM schema and client
- **packages/config** - Shared TypeScript configuration

### ORPC Communication Layer

**Type-Safe RPC Pattern:**
- `packages/api` exports `appRouter` (single source of truth for API contract)
- Backend serves router at `/rpc` endpoint via `RPCHandler`
- Frontend uses `RouterClient<typeof appRouter>` for type-safe calls

**Client Initialization (apps/web/src/lib/orpc.ts):**
- **Server-side**: Uses `createRouterClient()` with direct context injection
- **Client-side**: Uses `RPCLink` with fetch pointing to `VITE_SERVER_URL/rpc`
- Integrated with TanStack Query via `createTanstackQueryUtils()`

**Procedure Types (packages/api):**
- `publicProcedure` - No authentication required
- `protectedProcedure` - Enforces authentication via middleware

**Usage Pattern:**
```typescript
// In React components
const { data } = orpc.todo.getAll.useQuery();
const mutation = orpc.todo.create.useMutation();
```

### Authentication Flow

**Setup (packages/auth):**
- Better-Auth configured with Prisma adapter (SQLite)
- Email/password authentication enabled
- Cookie-based sessions (httpOnly, secure, sameSite=none)

**Authentication Process:**
1. Frontend: `authClient.signIn.email()` from `apps/web/src/lib/auth-client.ts`
2. Session stored in database (Better-Auth handles)
3. Subsequent requests include session cookie
4. Backend: `auth.api.getSession()` extracts session from headers
5. Protected procedures validate session via `authMiddleware`

**Route Protection (apps/web):**
- Use `beforeLoad` hook in TanStack Router to check authentication
- Redirect to `/sign-in` if not authenticated

### Database Access Patterns

**Prisma Setup (packages/db):**
- Split schema: `auth.prisma` (Better-Auth models) + `todo.prisma` (app models)
- LibSQL adapter for SQLite/Turso compatibility
- Default export: single Prisma client instance

**Access Pattern:**
- ORPC procedures call Prisma methods directly: `prisma.todo.create()`
- Input validation via Zod schemas at procedure level
- No direct Prisma access from frontend (always through ORPC)

**Schema Changes Workflow:**
1. Edit schema files in `packages/db/prisma/schema/`
2. Run `bun run db:push` to sync with database
3. Prisma client auto-regenerates (used in `packages/db/src/index.ts`)

### State Management

- **Remote State**: TanStack Query with ORPC integration (`orpc.procedure.useQuery()`)
- **Router Context**: Provides `orpc` and `queryClient` to all routes
- **Local State**: React hooks and form state via TanStack React Form

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
1. Define Zod input schema in `packages/api/src/procedures/`
2. Create procedure using `publicProcedure` or `protectedProcedure`
3. Add procedure to router in `packages/api/src/router.ts`
4. Frontend automatically gets type-safe access via `orpc.newProcedure.useQuery()`

### Adding New Database Models
1. Create new schema file in `packages/db/prisma/schema/` (e.g., `mymodel.prisma`)
2. Run `bun run db:push` to sync schema
3. Use `prisma.myModel.*` methods in ORPC procedures

### Isomorphic Functions
- Use `createIsomorphicFn()` from TanStack Start for code that runs on both server and client
- ORPC client automatically switches between direct calls (server) and fetch (client)

### Error Handling
- ORPC interceptors log errors server-side
- Client-side errors surface via Sonner toast notifications (see `apps/web/src/routes/__root.tsx`)
- Validation errors caught by Zod during procedure execution

## Environment Variables

**apps/server/.env:**
```
DATABASE_URL=file:./local.db
CORS_ORIGIN=http://localhost:3001
```

**apps/web/.env:**
```
VITE_SERVER_URL=http://localhost:3000
```

## Important Notes

- **Bun Runtime**: Use `bun run` for all scripts (not npm/yarn)
- **Hot Reload**: Server uses `--hot` flag for fast development iteration
- **Turbo Caching**: Build outputs cached in `.turbo/` (gitignored)
- **Route Generation**: TanStack Router auto-generates `routeTree.gen.ts` (excluded from Biome)
- **OpenAPI Docs**: Available at `http://localhost:3000/api` when server is running
