<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

// get database connection
include_once '../../config/Database.php';
include_once '../../models/user.php';

// instantiate user object
$database = new Database();
$db = $database->connect();
 
$user = new User($db);
 
$handler = fopen('php://input', 'r');
$request = stream_get_contents($handler);
$data = json_decode($request, true);

// set user property values
$user->email = $data['email'];
$user->password = base64_encode($data['password']);
$user->role = $data['role'];

// $user->created = date('Y-m-d H:i:s');
 
// create the user
if($user->signup()){
    $user_arr=array(
        "status" => true,
        "message" => "Successful Signup!",
        "id" => $user->id,
        "email" => $user->email,
        "role" => $user->role
    );
}
else{
    $user_arr=array(
        "status" => false,
        "message" => "Username already exists!"
    );
}
print_r(json_encode($user_arr));
