<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used during authentication for various
    | messages that we need to display to the user. You are free to modify
    | these language lines according to your application's requirements.
    |
    */

    'failed' => 'These credentials do not match our records.',
    'password' => 'The provided password is incorrect.',
    'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',

    'login' => [
        'success' => 'Successfully logged in.',
        'error' => 'Login failed. Please try again.',
    ],

    'logout' => [
        'success' => 'Successfully logged out.',
        'error' => 'Logout failed. Please try again.',
    ],

    'registration' => [
        'success' => 'Registration successful.',
        'failed' => 'Registration failed due to validation errors.',
        'error' => 'An error occurred during registration. Please try again.',
    ],

    'invalid_refresh_token' => 'Invalid refresh token.',
    'refresh_token_expired' => 'Refresh token has expired.',
    'token_refreshed' => 'Access token refreshed successfully.',
    'refresh_token_error' => 'An error occurred while refreshing the token. Please try again.',
    'not_authenticated' => 'User not authenticated.',

    'verification' => [
        'success' => 'Email verified successfully.',
        'error' => 'An error occurred during email verification. Please try again.',
        'invalid_token' => 'Invalid verification token.',
        'user_not_found' => 'User not found.',
        'already_verified' => 'Email is already verified.',
        'expired' => 'Verification token has expired.',
    ],

    'password_reset' => [
        'request_success' => 'Password reset instructions have been sent to your email.',
        'request_error' => 'An error occurred while requesting password reset. Please try again.',
        'user_not_found' => 'We could not find a user with that email address.',
        'reset_success' => 'Password has been reset successfully.',
        'reset_error' => 'An error occurred while resetting password. Please try again.',
        'invalid_token' => 'Invalid or expired reset token.',
        'token_expired' => 'Reset token has expired. Please request a new one.',
    ],

    'store' => [
        'create_success' => 'Store created successfully.',
        'create_error' => 'Failed to create store.',
        'update_success' => 'Store settings updated successfully.',
        'update_error' => 'Failed to update store settings.',
        'unauthorized' => 'You are not authorized to update this store\'s settings.',
        'member_invite_success' => 'Member invited to store successfully.',
        'member_invite_error' => 'Failed to invite member to store.',
        'member_already_exists' => 'User is already a member of this store.',
        'member_remove_success' => 'Member removed from store successfully.',
        'member_remove_error' => 'Failed to remove member from store.',
        'member_not_found' => 'Member not found in this store.',
    ],

];
