<?php

// $food = array(1,2,3,4,5,6);

// array_push($food, "alo");
// array_pop($food);
// array_shift($food);
// //retorna um novo array
// $food = array_reverse($food);


// for($i = 0; $i < count($food); $i++){
//     echo $food[$i];
// }

// foreach ($food as $foods) {
//     echo $foods;
// }


class Car
{
    private $name;

    public function __construct($carName)
    {
        $this->name = $carName;
    }

    public function getCarName()
    {
        return $this->name;
    }

    public function setCarName($carName)
    {
        $this->name = $carName;
    }
}

$bmw = new Car("Bmw");

// $bmw->setCarName("Bmw");
echo $bmw->getCarName();
