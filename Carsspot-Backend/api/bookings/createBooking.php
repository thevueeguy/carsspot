<?php 
    // headers
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST'); 
    header('Content-Type: application/json');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Access-Control-Allow-Methods, Content-Type, Authorization, x-Requested-With'); 

    include_once '../../config/Database.php';
    include_once '../../models/Booking.php';
    include_once '../../models/Car.php';

    $database = new Database();
    $db = $database->connect();

    // instantiate Booking object
    $Booking = new Booking($db);
    $car = new Car($db);

    // Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    $Booking->userId = $data->userId;
    $Booking->carId = $data->carId;
    $Booking->numberOfDays = $data->numberOfDays;
    $Booking->startDate = $data->startDate;
    $car->id = $data->carId;
    $car->isAvailable = 0;


    if($Booking->createBooking()) {
        if($car->unavailCar()){
            echo json_encode(
                array('message' => 'Booking created refresh to see the results!')
            );
        }
    } else {
        echo json_encode(
            array('message' => 'Booking already exists')
        );
    }
