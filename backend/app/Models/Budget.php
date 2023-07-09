<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = [
        'nameClient',
        'nameSeller',
        'description',
        'value',
        'dateAndTime',
    ];


}
