<?php 
    // headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Booking.php';

    $database = new Database();
    $db = $database->connect();

    // instantiate booking object
    $booking = new Booking($db);

    // Get Id
    $booking->userId = isset($_GET['userId']) ? $_GET['userId'] : die();

    // getBooking query
    $result = $booking->getAllBookings();

    // Get row count
    $num = $result->rowCount();

    // check if any booking
    if($num>0){
        // bookings array
        $bookings_arr = array();
        $bookings_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            $car_item = array(
                'id' => $booking_id,
                'userId' => $user_id,
                'carId' => $booked_car_id,
                'numberOfDays' => $number_of_days,
                'startDate' => $start_date
            );

            // push to "data"
            array_push($bookings_arr['data'], $car_item);
        }

        // Turn to JSON & OUTPUT
        echo json_encode($bookings_arr);
    } else {
        // No bookings
        echo json_encode(
            array('message' => 'No Cars Found')
        );
    }