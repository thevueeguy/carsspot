<?php 
    // headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Car.php';

    $database = new Database();
    $db = $database->connect();

    // instantiate car object
    $car = new Car($db);

    // Get Id
    $car->id = isset($_GET['id']) ? $_GET['id'] : die();

    // Get car
    $car->carById();

    // create array
    $car_arr = array(
        'id' => $car->id,
        'model' => $car->model,
        'number' => $car->number,
        'seatingCapacity' => $car->seatingCapacity,
        'rentPerDay' => $car->rentPerDay,
        'isAvailable' => $car->isAvailable
    );

    // Make Json
    print_r(json_encode($car_arr));

     