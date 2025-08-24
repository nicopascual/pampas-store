<?php

namespace App\Enums;

enum StorePlan: string
{
    case Free = 'FREE';
    case Pro = 'PRO';
    case Enterprise = 'ENTERPRISE';
}
