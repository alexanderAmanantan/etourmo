<?php 
include 'connect.php'; // Make sure to include your database connection

header('Content-Type: application/json'); // Set the response type to JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$response = array(); // Initialize a response array

session_start(); // Start the session

if (isset($_POST['action'])) {
    if ($_POST['action'] == 'SignUp') {
        $firstName = trim($_POST['fName']);
        $lastName = trim($_POST['lName']);
        $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL); // Sanitize email
        
        // Validate the email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response['status'] = 'error';
            $response['message'] = 'Invalid email format';
            echo json_encode($response);
            exit();
        }

        $password = $_POST['password'];

        // Validate password length
        if (strlen($password) < 8) {
            $response['status'] = 'error';
            $response['message'] = 'Password must be at least 8 characters long';
            echo json_encode($response);
            exit();
        }

        // Hash the password
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        // Prepare and execute the email check
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $response['status'] = 'error';
            $response['message'] = 'Email Address Already Exists!';
        } else {
            // Prepare and execute the insert query
            $insertStmt = $conn->prepare("INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)");
            $insertStmt->bind_param("ssss", $firstName, $lastName, $email, $passwordHash);
            if ($insertStmt->execute()) {
                $response['status'] = 'success';
                $response['message'] = 'Registration successful!';
            } else {
                $response['status'] = 'error';
                $response['message'] = 'Error: ' . $conn->error;
            }
            $insertStmt->close(); // Close the statement
        }
        $stmt->close(); // Close the statement
    } elseif ($_POST['action'] == 'SignIn') {
        $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
        $password = $_POST['password'];

        // Validate the email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response['status'] = 'error';
            $response['message'] = 'Invalid email format';
            echo json_encode($response);
            exit();
        }

        // Prepare and execute the select query
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            // Verify the password using password_verify
            if (password_verify($password, $row['password'])) {
                $_SESSION['email'] = $row['email'];
                $_SESSION['firstName'] = $row['firstName'];
                $_SESSION['lastName'] = $row['lastName'];
                $response['status'] = 'success';
                $response['message'] = 'Login successful!';
            } else {
                $response['status'] = 'error';
                $response['message'] = 'Incorrect Email or Password';
            }
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Incorrect Email or Password';
        }
        $stmt->close(); // Close the statement
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'No action specified';
}

echo json_encode($response); // Return the response as JSON

// Close the database connection
$conn->close();
?>
