<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mygoods";

function connect (){
    $conn = new mysqli("localhost", "root", "", "mygoods");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}

function init() { //выводим список товара
    $conn = connect();
    $sql = "SELECT * FROM goods";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
  $out = array();
        while($row = $result->fetch_assoc()) {
            $out[$row["id"]] = $row;
        }
        echo json_encode($out);
            } else {
  echo "0";
}
$conn->close();
}