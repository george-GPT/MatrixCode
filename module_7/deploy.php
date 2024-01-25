<?php
// Secret key to authenticate the webhook
$secret = "x5PFxsi@@F+EL[p.Ypr]I5(W7jg(TL&]";

// Path to the repository on your server
$path = "http://www.matrixcode.ca/module_4/deploy.php";

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
} 
?>
