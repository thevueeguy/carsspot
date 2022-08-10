<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// include database and object files
include_once '../../config/Database.php';
include_once '../../models/user.php';
 
// get database connection
$database = new Database();
$db = $database->connect();
 
// instantiate user object
$user = new User($db);

$handler = fopen('php://input', 'r');
$request = stream_get_contents($handler);
$data = json_decode($request, true);
// set ID property of user to be edited
$user->email = isset($data['email']) ? $data['email'] : die();
$user->password = base64_encode(isset($data['password']) ? $data['password'] : die());
$user->role = isset($data['role']) ? $data['role'] : die();

// read the details of user to be edited
$stmt = $user->login();
if($stmt->rowCount() > 0){
    // get retrieved row
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    // create array
    $user_arr=array(
        "status" => true,
        "message" => "Successfully Login!",
        "id" => $row['id'],
        "email" => $row['email'],
        "role" => $row['role']
    );
}
else{
    $user_arr=array(
        "status" => false,
        "message" => "Invalid Username or Password!",
    );
}

// make it json format
print_r(json_encode($user_arr));
