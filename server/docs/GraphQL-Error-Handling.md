# GraphQL Error Handling System

This document explains the global error handling system for GraphQL mutations in the Pampas Store application.

## Overview

The error handling system provides a consistent way to handle validation errors, business logic errors, and internal errors across all GraphQL mutations.

## Key Components

### 1. BaseMutation Class
**Location**: `app/GraphQL/Support/BaseMutation.php`

All mutations should extend this base class to get access to common error handling methods:

```php
use App\GraphQL\Support\BaseMutation;

class YourMutation extends BaseMutation
{
    public function __invoke($_, array $args): array
    {
        try {
            // Your mutation logic here
            
            return $this->success('YourSuccessPayload', [
                'data' => $result
            ], __('Operation successful'));
            
        } catch (\Exception $e) {
            return $this->handleException($e, __('Custom error message'));
        }
    }
}
```

### 2. MutationResponse Helper
**Location**: `app/GraphQL/Support/MutationResponse.php`

Provides static methods for creating consistent response formats:

```php
// Success response
MutationResponse::success('PayloadType', ['field' => $value], 'Success message');

// Validation error
MutationResponse::validationError($validator->errors()->messages());

// Generic error
MutationResponse::error('Error message', 'ERROR_CODE');

// Internal error
MutationResponse::internalError('Custom message');
```

### 3. Shared GraphQL Types
**Location**: `graphql/shared-types.graphql`

Defines common types used across all mutations:

```graphql
type ValidationError {
    field: String!
    message: String!
}

type MutationError {
    message: String!
    validationErrors: [ValidationError!]
    code: String
}

interface MutationSuccess {
    message: String
}
```

## Usage Patterns

### 1. Basic Mutation with Validation

```php
final class CreateSomething extends BaseMutation
{
    public function __invoke($_, array $args): array
    {
        try {
            $validated = $this->validateInput($args, new CreateSomethingRequest());
            
            if (isset($validated['__typename'])) {
                return $validated; // Validation failed
            }
            
            $result = Something::create($validated);
            
            return $this->success('CreateSomethingPayload', [
                'something' => $result,
            ], __('Created successfully'));
            
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}
```

### 2. GraphQL Schema Pattern

```graphql
type CreateSomethingPayload implements MutationSuccess {
    something: Something
    message: String
}

union CreateSomethingResult = CreateSomethingPayload | MutationError

type Mutation {
    createSomething(input: CreateSomethingInput!): CreateSomethingResult!
}
```

### 3. Client Query Pattern

```graphql
mutation CreateSomething($input: CreateSomethingInput!) {
    createSomething(input: $input) {
        ... on CreateSomethingPayload {
            something {
                id
                name
            }
            message
        }
        ... on MutationError {
            message
            code
            validationErrors {
                field
                message
            }
        }
    }
}
```

## Error Codes

The system uses standardized error codes:

- `VALIDATION_FAILED`: Validation errors occurred
- `INTERNAL_ERROR`: Unexpected server error
- `NOT_FOUND`: Resource not found
- `UNAUTHORIZED`: User not authorized
- `FORBIDDEN`: User lacks permissions

## Localization

All error messages support localization:

```php
// In your mutation
return $this->error(__('errors.not_found'), 'NOT_FOUND');

// In resources/lang/en/errors.php
'not_found' => 'The requested resource was not found.',

// In resources/lang/es/errors.php  
'not_found' => 'No se encontró el recurso solicitado.',
```

## Testing

Test both success and error scenarios:

```php
it('handles validation errors', function () {
    $response = $this->graphQL('mutation { ... }', ['input' => []]);
    
    $response->assertJson([
        'data' => [
            'yourMutation' => [
                'message' => 'Validation failed...',
                'code' => 'VALIDATION_FAILED',
                'validationErrors' => [/* ... */]
            ]
        ]
    ]);
});
```

## Benefits

1. **Consistency**: All mutations return errors in the same format
2. **Localization**: Built-in support for multiple languages
3. **Type Safety**: GraphQL union types ensure type safety
4. **Developer Experience**: Easy to implement new mutations
5. **Client Handling**: Predictable error structure for frontend
6. **Logging**: Automatic error logging for debugging

## Migration Guide

To migrate existing mutations to this system:

1. Extend `BaseMutation` instead of creating standalone classes
2. Replace custom error handling with `$this->handleException()`
3. Use `$this->success()` for success responses
4. Update GraphQL schema to use union types
5. Update tests to check for the new response format