<?php

return [
    'failed' => 'Estas credenciales no coinciden con nuestros registros.',
    'password' => 'La contraseña proporcionada es incorrecta.',
    'throttle' => 'Demasiados intentos de acceso. Inténtelo de nuevo en :seconds segundos.',

    'registration' => [
        'success' => 'Usuario registrado exitosamente. Por favor revise su correo electrónico para verificar su cuenta.',
        'failed' => 'El registro falló debido a errores de validación.',
        'error' => 'Ocurrió un error durante el registro. Por favor intente de nuevo.',
    ],

    'verification' => [
        'success' => 'Correo electrónico verificado exitosamente.',
        'error' => 'Ocurrió un error durante la verificación del correo electrónico. Por favor intente de nuevo.',
        'invalid_token' => 'Token de verificación inválido.',
        'user_not_found' => 'Usuario no encontrado.',
        'already_verified' => 'El correo electrónico ya está verificado.',
        'expired' => 'El token de verificación ha expirado.',
    ],

    'password_reset' => [
        'request_success' => 'Las instrucciones para restablecer la contraseña han sido enviadas a su correo electrónico.',
        'request_error' => 'Ocurrió un error al solicitar el restablecimiento de contraseña. Por favor intente de nuevo.',
        'user_not_found' => 'No pudimos encontrar un usuario con esa dirección de correo electrónico.',
        'reset_success' => 'La contraseña ha sido restablecida exitosamente.',
        'reset_error' => 'Ocurrió un error al restablecer la contraseña. Por favor intente de nuevo.',
        'invalid_token' => 'Token de restablecimiento inválido o expirado.',
        'token_expired' => 'El token de restablecimiento ha expirado. Por favor solicite uno nuevo.',
    ],
];