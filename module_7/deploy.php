<?php
// Secret key to authenticate the webhook
$secret = "your-secret-token";

// Path to the repository on your server
$path = "/home/username/public_html";

// Headers deliver the payload hash
$signature = $_SERVER['HTTP_X_HUB_SIGNATURE'];

// Raw POST data
$payload = file_get_contents('php://input');

// Verify the payload with your secret key
list($algo, $hash) = explode('=', $signature, 2);
if ($hash === hash_hmac($algo, $payload, $secret)) {
    // Execute the commands to pull from the repository
    exec("cd {$path} && git pull");
    echo "Success";
} else {
    // Respond with a failure if the signature doesn't match
    http_response_code(403);
    echo "Forbidden";
}
?>
