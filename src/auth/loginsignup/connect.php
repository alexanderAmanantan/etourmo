<?php

$host = "localhost";
$user = "root";
$pass = "";
$dbname = "etourmo"; 

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    echo "Failed to connect DB" . $conn->connect_error;
}
?>
