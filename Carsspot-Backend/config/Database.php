<?php 
    class Database {
        // DB params
        private $host = "localhost";
        private $db_name = "cars_project";
        private $username = "root";
        private $password = "";
        private $conn;

        public function connect() {
            $this->conn = null;

            // PHP Data Objects (or PDO ) are a collection of APIs and interfaces that attempt to streamline and consolidate the various ways databases can be accessed and manipulated into a singular package. Thus, the PDOException is thrown anytime something goes wrong while using the PDO class, or related extensions
            try {
                $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->password);

                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch(PDOException $err) {
                echo 'Connection Error: ' . $err->getMessage();
            }
            return $this->conn;
        }
    }