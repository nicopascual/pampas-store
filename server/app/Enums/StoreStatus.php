<?php

namespace App\Enums;

enum StoreStatus: string
{
    case Active = 'ACTIVE';
    case Suspended = 'SUSPENDED';
    case Deleted = 'DELETED';
}
