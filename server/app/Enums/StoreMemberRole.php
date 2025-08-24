<?php

namespace App\Enums;

enum StoreMemberRole: string
{
    case Owner = 'OWNER';
    case Manager = 'MANAGER';
    case Staff = 'STAFF';
}
