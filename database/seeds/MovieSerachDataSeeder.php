<?php

use Illuminate\Database\Seeder;

class MovieSerachDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Models\moviesearch\Moviesearch_data::class, 1)->create();
    }
}
