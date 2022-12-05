<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Todo;

class TodoSeeder extends Seeder
{
    // constructor
    public function run($data)
    {
        $i = 0;
        while($i<10){
            $todo = new Todo();
            $todo->name = "$data->name - $i";
            $todo->description = "this is a description for $data->name - $i";
            $todo->user_id = $data->id;
            $todo->image = $data->image;
            $todo->save();
            $i++;
        }
    }
}
