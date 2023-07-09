<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('budgets', function (Blueprint $table) {
            $table->id();
            $table->string('nameClient');
            $table->string('nameSeller');
            $table->string('description');
            $table->integer('value');
            $table->string('dateAndTime');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('budgets');
    }
};
