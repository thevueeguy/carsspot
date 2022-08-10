<?php 
    class Car {
        // DB essentials
        private $conn;
        private $table = 'cars';

        // Car properties
        public $id;
        public $model;
        public $number;
        public $seatingCapacity;
        public $rentPerDay;
        public $isAvailable;

        //Constructor with DB (Method)
        public function __construct($db) {
            $this->conn = $db;
        }

        // Get Cars
        public function getAllCars() {
            // Create query 
            $query = 'SELECT 
                    car.id as car_id,
                    car.model as car_model,
                    car.number as car_number,
                    car.seatingCapacity as car_seating_capacity,
                    car.rentPerDay as car_rent_per_day,
                    car.isAvailable as car_is_available
                FROM
                    ' .$this->table. ' car
                ORDER BY
                    car.id ASC';
            
            // Prepare statement
            $stmt = $this->conn->prepare($query);

            // Execute query
            $stmt->execute(); 

            return $stmt;
        }

        public function carById() {
            // Create query 
            $query = 'SELECT 
                    car.id as car_id,
                    car.model as car_model,
                    car.number as car_number,
                    car.seatingCapacity as car_seating_capacity,
                    car.rentPerDay as car_rent_per_day,
                    car.isAvailable as car_is_available
                FROM
                    ' .$this->table. ' car
                WHERE
                    car.id = ?
                LIMIT 0,1';
            
            // Prepare statement
            $stmt = $this->conn->prepare($query);

            // Bind Id
            $stmt->bindParam(1, $this->id); 

            // Execute query
            $stmt->execute(); 

            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            //Set properties
            $this->model = $row['car_model'];
            $this->number = $row['car_number'];
            $this->seatingCapacity = $row['car_seating_capacity'];
            $this->rentPerDay = $row['car_rent_per_day'];
            $this->isAvailable = $row['car_is_available'];
        }

        // Create Car
        public function createCar() {       
            if($this->isAlreadyExist()){
            return false;
        }
            // Create query
            $query = 'INSERT INTO ' . 
                    $this->table . '
                SET
                    model = :model,
                    number = :number,
                    seatingCapacity = :seatingCapacity,
                    rentPerDay = :rentPerDay,
                    isAvailable = :isAvailable';

            // Prepare statement
            $stmt = $this->conn->prepare($query);

            // Clean data
            $this->model = htmlspecialchars(strip_tags($this->model));
            $this->number = htmlspecialchars(strip_tags($this->number));
            $this->seatingCapacity = htmlspecialchars(strip_tags($this->seatingCapacity));
            $this->rentPerDay = htmlspecialchars(strip_tags($this->rentPerDay));
            $this->isAvailable = htmlspecialchars(strip_tags($this->isAvailable));

            // Bind data
            $stmt->bindParam(':model', $this->model);
            $stmt->bindParam(':number', $this->number);
            $stmt->bindParam(':seatingCapacity', $this->seatingCapacity);
            $stmt->bindParam(':rentPerDay', $this->rentPerDay);
            $stmt->bindParam(':isAvailable', $this->isAvailable);

            // Execute query
            if($stmt->execute()){
                return true;
            }

            printf('Error: %s.\n', $stmt->error("message"));

            return false;
        }

        // Update post
        public function updateCar() {
            // Create query
            $query = 'UPDATE ' . 
                    $this->table . '
                SET
                    model = :model,
                    number = :number,
                    seatingCapacity = :seatingCapacity,
                    rentPerDay = :rentPerDay,
                    isAvailable = :isAvailable
                WHERE 
                    id = :id';

            // Prepare statement
            $stmt = $this->conn->prepare($query);

            // Clean data
            $this->model = htmlspecialchars(strip_tags($this->model));
            $this->number = htmlspecialchars(strip_tags($this->number));
            $this->seatingCapacity = htmlspecialchars(strip_tags($this->seatingCapacity));
            $this->rentPerDay = htmlspecialchars(strip_tags($this->rentPerDay));
            $this->isAvailable = htmlspecialchars(strip_tags($this->isAvailable));
            $this->id = htmlspecialchars(strip_tags($this->id));

            // Bind data
            $stmt->bindParam(':id', $this->id);
            $stmt->bindParam(':model', $this->model);
            $stmt->bindParam(':number', $this->number);
            $stmt->bindParam(':seatingCapacity', $this->seatingCapacity);
            $stmt->bindParam(':rentPerDay', $this->rentPerDay);
            $stmt->bindParam(':isAvailable', $this->isAvailable);

            // Execute query
            if($stmt->execute()){
                return true;
            }

            printf('Error: %s.\n', $stmt->error("message"));

            return false;
        }

        // Delete Car
        public function deleteCar() {
            // Create Query
             $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';

             // Prepare statement
             $stmt =  $this->conn->prepare($query);

             $this->id = htmlspecialchars(strip_tags($this->id));

             $stmt->bindParam(':id', $this->id);

             // Execute query
            if($stmt->execute()){
                return true;
            }

            printf('Error: %s.\n', $stmt->error("message"));

            return false;

        }

        function isAlreadyExist(){
            $query = "SELECT *
                FROM
                    " . $this->table . " 
                WHERE
                    number='".$this->number."'";
            // prepare query statement
            $stmt = $this->conn->prepare($query);
            // execute query
            $stmt->execute();
            if($stmt->rowCount() > 0){
                return true;
            }
            else{
                return false;
            }
        }

    }