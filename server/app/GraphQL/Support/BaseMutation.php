<?php

namespace App\GraphQL\Support;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

abstract class BaseMutation
{
    protected function validateInput(array $args, FormRequest $request, ?string $errorMessage = null): array
    {
        $request->merge($args);
        $validator = validator($args, $request->rules(), $request->messages(), $request->attributes());

        if ($validator->fails()) {
            return MutationResponse::validationError(
                $validator->errors()->messages(),
                $errorMessage
            );
        }

        return $validator->validated();
    }

    protected function handleException(\Exception $e, ?string $message = null): array
    {
        if ($e instanceof ValidationException) {
            return MutationResponse::validationError($e->errors());
        }

        // Log the actual error for debugging
        Log::error('GraphQL Mutation Error', [
            'exception' => $e::class,
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);

        return MutationResponse::internalError($message);
    }

    protected function success(string $type, array $data, ?string $message = null): array
    {
        return MutationResponse::success($type, $data, $message);
    }

    protected function error(string $message, ?string $code = null): array
    {
        return MutationResponse::error($message, $code);
    }
}
