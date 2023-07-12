<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Budget;

class BudgetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        for ($i = 0; $i < 4; $i++) {
            Budget::create([
                'nameClient' => 'Cliente ' . ($i + 1),
                'nameSeller' => 'Vendedor ' . ($i + 1),
                'description' => 'Descrição do orçamento ' . ($i + 1),
                'value' => 1000 + ($i * 100),
                'dateAndTime' => now(),
            ]);
    }
  }
}