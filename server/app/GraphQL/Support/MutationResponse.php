<?php

namespace App\GraphQL\Support;

class MutationResponse
{
    public static function success(string $type, mixed $data, ?string $message = null): array
    {
        return [
            '__typename' => $type,
            ...$data,
            'message' => $message,
        ];
    }

    public static function validationError(array $errors, ?string $message = null): array
    {
        return [
            '__typename' => 'MutationError',
            'message' => $message ?? __('Validation failed. Please check the errors below.'),
            'validationErrors' => self::formatValidationErrors($errors),
            'code' => 'VALIDATION_FAILED',
        ];
    }

    public static function error(string $message, ?string $code = null, ?array $validationErrors = null): array
    {
        return [
            '__typename' => 'MutationError',
            'message' => $message,
            'validationErrors' => $validationErrors,
            'code' => $code ?? 'ERROR',
        ];
    }

    public static function internalError(?string $message = null): array
    {
        return self::error(
            $message ?? __('An internal error occurred. Please try again.'),
            'INTERNAL_ERROR'
        );
    }

    private static function formatValidationErrors(array $errors): array
    {
        $formatted = [];

        foreach ($errors as $field => $messages) {
            if (is_array($messages)) {
                $formatted[] = [
                    'field' => $field,
                    'messages' => $messages,
                ];
            } else {
                $formatted[] = [
                    'field' => $field,
                    'messages' => [$messages],
                ];
            }
        }

        return $formatted;
    }
}
