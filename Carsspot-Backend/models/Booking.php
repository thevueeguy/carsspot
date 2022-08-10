<?php 
    class Booking {
        // DB stuff
        private $conn;
        private $table = 'bookings';

        // Properties
        public $id;
        public $userId;
        public $carId;
        public $numberOfDays;
        public $startDate;

        // Constructor with DB 
        public function __construct($db){
            $this->conn = $db;
        }
        
        // Get bookings
        public function getAllBookings() {
            // Create Query 
            $query = 'SELECT
                id as booking_id, 
                userId as user_id,
                carId as booked_car_id,
                numberOfDays as number_of_days,
                startDate as start_date
            FROM
                '. $this->table.'
            ORDER BY 
                id ASC';

            // Prepare statement
            $stmt = $this->conn->prepare($query);

            // Execute query
            $stmt->execute();

            return $stmt;
        }

        public function bookingsByUserId() {
            // Create Query 
            $query = 'SELECT
                id as booking_id, 
                carId as booked_car_id,
                numberOfDays as number_of_days,
                startDate as start_date
            FROM
                '. $this->table.'
            WHERE
                userId = ?
                LIMIT 0,1';

            // Prepare statement
            $stmt = $this->conn->prepare($query);

            // Bind Id
            $stmt->bindParam(1, $this->userId); 

            // Execute query
            $stmt->execute();

            // //Set properties
            // $this->id = $row['booking_id'];
            // $this->carId = $row['booked_car_id'];
            // $this->numberOfDays = $row['number_of_days'];
            // $this->startDate = $row['start_dat'];

            return $stmt;
        }

        // create booking
        public function createBooking() {       
            // Create query
            $query = 'INSERT INTO ' . 
                    $this->table . '
                SET
                    userId = :userId,
                    carId = :carId,
                    startDate = :startDate,
                    numberOfDays = :numberOfDays';

            // Prepare statement
            $stmt = $this->conn->prepare($query);

            // Clean data
            $this->userId = htmlspecialchars(strip_tags($this->userId));
            $this->carId = htmlspecialchars(strip_tags($this->carId));
            $this->startDate = htmlspecialchars(strip_tags($this->startDate));
            $this->numberOfDays = htmlspecialchars(strip_tags($this->numberOfDays));

            // Bind data
            $stmt->bindParam(':userId', $this->userId);
            $stmt->bindParam(':carId', $this->carId);
            $stmt->bindParam(':startDate', $this->startDate);
            $stmt->bindParam(':numberOfDays', $this->numberOfDays);

            // Execute query
            if($stmt->execute()){
                return true;
            }

            printf('Error: %s.\n', $stmt->error("message"));
            return false;
        }
    }