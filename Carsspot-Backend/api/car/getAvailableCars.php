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

    // Car query
    $result = $car->getAllCars();

    // Get row count
    $num = $result->rowCount();

    $car->isAvailable = 1;

    // check if any car
    if($num>0){
        // car array
        $cars_arr = array();
        $cars_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $car_item = array(
                'id' => $car_id,
                'model' => $car_model,
                'number' => $car_number,
                'seatingCapacity' => $car_seating_capacity,
                'rentPerDay' => $car_rent_per_day,
                'isAvailable' => $car_is_available
            );

            if($car_item['isAvailable'])
            array_push($cars_arr['data'], $car_item);
        }

        // Turn to JSON & OUTPUT
        echo json_encode($cars_arr);
    } else {
        echo json_encode(
            array('message' => 'No Cars Found')
        );
    }