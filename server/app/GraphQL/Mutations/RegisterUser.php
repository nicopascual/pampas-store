<?php

namespace App\GraphQL\Mutations;

use App\GraphQL\Support\BaseMutation;
use App\Http\Requests\RegisterUserRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;

final class RegisterUser extends BaseMutation
{
    public function __invoke($_, array $args): array
    {
        try {
            $input = $args['input'] ?? $args;
            $validated = $this->validateInput($input, new RegisterUserRequest, __('auth.registration.failed'));

            if (isset($validated['__typename'])) {
                return $validated;
            }

            $userData = $validated;
            $userData['password'] = Hash::make($userData['password']);
            unset($userData['password_confirmation']);

            if (! isset($userData['role'])) {
                $userData['role'] = 'CUSTOMER';
            }

            $user = User::create($userData);

            event(new Registered($user));

            return $this->success('RegisterUserPayload', [
                'user' => $user,
            ], __('auth.registration.success'));

        } catch (\Exception $e) {
            return $this->handleException($e, __('auth.registration.error'));
        }
    }
}
