<?php 
    // headers
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: PUT'); 
    header('Content-Type: application/json');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Access-Control-Allow-Methods, Content-Type, Authorization, x-Requested-With'); 

    include_once '../../config/Database.php';
    include_once '../../models/Car.php';

    $database = new Database();
    $db = $database->connect();

    // instantiate car object
    $car = new Car($db);

    // Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    $car->id = $data->id;
    $car->model = $data->model;
    $car->number = $data->number;
    $car->seatingCapacity = $data->seatingCapacity;
    $car->rentPerDay = $data->rentPerDay;
    $car->isAvailable = $data->isAvailable;

    if($car->updateCar()) {
        echo json_encode(
            array('message' => 'Car Updated refresh to see the changes!')
        );
    } else {
        echo json_encode(
            array('message' => 'Car not Updated')
        );
    }
