# Tenant-Aware Logging Implementation Plan

## Overview
Add structured logging using **Pino** with JSON output to stdout, tenant-aware context, and request ID tracing across the multi-tenant e-commerce platform.

## Package Structure

### New Package: `packages/logger/`
```
packages/logger/
├── package.json
└── src/
    ├── index.ts          # Logger factory, exports
    ├── config.ts         # Pino config, redaction paths
    ├── types.ts          # LogContext, TenantContext, AuthContext
    └── request-id.ts     # Request ID generation (nanoid)
```

**Dependencies:** `pino`, `nanoid`

---

## Implementation Steps

### Phase 1: Core Logger Package

1. **Create `packages/logger/package.json`**
   - Add pino ^9.5.0, nanoid ^5.0.7

2. **Create `packages/logger/src/config.ts`**
   - Pino configuration with JSON output
   - Redaction paths: password, token, authToken, databaseToken, sessionToken, cookie, authorization, email
   - Log level from `LOG_LEVEL` env (default: debug in dev, info in prod)
   - Base fields: service, env, timestamp

3. **Create `packages/logger/src/types.ts`**
   - `TenantContext`: storeId, storeSlug
   - `AuthContext`: authDomain, userId
   - `LogCategory`: "security" | "tenant" | "request" | "database" | "business"

4. **Create `packages/logger/src/request-id.ts`**
   - `generateRequestId()` using nanoid(21)
   - `extractOrGenerateRequestId(request)` - check x-request-id header

5. **Create `packages/logger/src/index.ts`**
   - Root logger singleton
   - `createTenantLogger(tenant, requestId)` - child with tenant context
   - `createRequestLogger(requestId, tenant, auth)` - full request-scoped logger
   - `redactEmail(email)` - partial redaction (ni***@example.com)

### Phase 2: Server Integration

**File: `apps/server/src/index.ts`**

1. Add request ID extraction early in request lifecycle
2. Replace all `console.log/error` with structured Pino logs
3. Pass `requestId` to `createContext()`
4. Add X-Request-Id response header
5. Log request start/completion with latency

Key changes:
- Lines 13-19: Add structured error logging in RPC interceptor
- Lines 36-70: Replace CORS console logs with logger
- Lines 88-118: Replace auth route logs with structured logs
- Lines 120-135: Add request timing and requestId propagation

### Phase 3: Context Integration

**File: `packages/api/src/context.ts`**

1. Update `CreateContextOptions` to accept `requestId`
2. Create request-scoped logger in `createContext()`
3. Add `log` and `requestId` to returned context
4. Replace all `console.log` in `resolveStore()` with structured logs:
   - Line 177: Log store resolution start
   - Lines 181-183: Log header override usage
   - Lines 187-191: Log cache hit/miss
   - Lines 206-228: Log resolution method (customDomain/subdomain)
   - Line 241: Log resolution success
   - Line 245: Log resolution failure

### Phase 4: Auth Middleware Logging

**File: `packages/api/src/middleware/store-auth.ts`**
- Log store context requirement checks
- Log domain violation attempts (admin→customer, customer→admin)
- Log successful store/auth resolution

**File: `packages/api/src/middleware/customer-auth.ts`**
- Log domain violations (category: security)
- Log suspended account access attempts
- Log successful authentication

**File: `packages/api/src/middleware/admin-auth.ts`**
- Log domain violations
- Log inactive admin access attempts
- Log successful admin authentication with roleId

**File: `packages/api/src/middleware/permissions.ts`**
- Log permission check attempts
- Log permission denials with required vs actual permissions
- Log role lookup failures

### Phase 5: Database Layer Logging

**File: `packages/db/src/tenant-client.ts`**
- Log connection pool cache hits
- Log new connection creation
- Log pool evictions (LRU)
- Log periodic cleanup activity
- Log pool size metrics

**File: `packages/db/src/platform-client.ts`**
- Log platform database connection on startup

### Phase 6: Business Operations Logging

**File: `packages/api/src/services/store-provisioning.ts`**
- Log provisioning start/completion with timing
- Log local vs Turso database type
- Log Turso API calls and responses
- Log deletion operations

**File: `packages/api/src/domains/platform/stores.ts`**
- Log store creation with admin ID
- Log store suspension/activation (security category)
- Log store deletion with confirmation

**File: `packages/api/src/domains/admin/router.ts`**
- Log customer suspension/unsuspension (audit)
- Log role modifications

---

## Context Type Update

```typescript
export type Context = {
  // ... existing fields ...
  requestId: string;
  log: Logger;  // Pino Logger with tenant context
};
```

---

## Log Categories and Levels

| Level | Category | Events |
|-------|----------|--------|
| error | all | Unrecoverable errors, failed operations |
| warn | security | Auth failures, permission denials, domain violations |
| warn | tenant | Store not found, inactive store access |
| info | request | Request start/end with latency |
| info | tenant | Store resolution success, cache updates |
| info | business | CRUD operations, provisioning |
| debug | security | Successful auth checks |
| debug | database | Connection cache hits, queries |

---

## Example Log Output

```json
{
  "level": "info",
  "timestamp": "2025-01-15T10:30:45.123Z",
  "service": "pampas-store",
  "category": "request",
  "requestId": "Vk9Q8hYbFNw_kT2AqXc-R",
  "tenant": { "storeId": "clxyz123", "storeSlug": "pampas" },
  "auth": { "domain": "admin", "userId": "admin_abc123" },
  "latencyMs": 45,
  "msg": "Request completed"
}
```

---

## Files to Create

| File | Purpose |
|------|---------|
| `packages/logger/package.json` | Package config |
| `packages/logger/src/index.ts` | Main exports |
| `packages/logger/src/config.ts` | Pino configuration |
| `packages/logger/src/types.ts` | Type definitions |
| `packages/logger/src/request-id.ts` | Request ID utilities |

## Files to Modify

| File | Changes |
|------|---------|
| `package.json` (root) | Add packages/logger to workspaces (already covered) |
| `apps/server/package.json` | Add @pampas-store/logger dependency |
| `packages/api/package.json` | Add @pampas-store/logger dependency |
| `packages/db/package.json` | Add @pampas-store/logger dependency |
| `apps/server/src/index.ts` | Request ID middleware, structured logs |
| `packages/api/src/context.ts` | Logger in context, replace console.log |
| `packages/api/src/middleware/store-auth.ts` | Auth/tenant logging |
| `packages/api/src/middleware/customer-auth.ts` | Customer auth logging |
| `packages/api/src/middleware/admin-auth.ts` | Admin auth logging |
| `packages/api/src/middleware/permissions.ts` | Permission logging |
| `packages/db/src/tenant-client.ts` | Connection pool logging |
| `packages/db/src/platform-client.ts` | Startup logging |
| `packages/api/src/services/store-provisioning.ts` | Provisioning logging |
| `packages/api/src/domains/platform/stores.ts` | Store CRUD logging |
| `packages/api/src/domains/admin/router.ts` | Admin action logging |

---

## Environment Variables

```bash
LOG_LEVEL=debug  # trace, debug, info, warn, error, fatal
```
