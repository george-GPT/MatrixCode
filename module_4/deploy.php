<?php
// Secret key to authenticate the webhook
$secret = "x5PFxsi@@F+EL[p.Ypr]I5(W7jg(TL&]";

// Path to the repository on your server
$path = "/home2/mimumomy/public_html"; // Local path where your repository is cloned

// Make sure we're working with a POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Headers deliver the payload hash
    $signature = $_SERVER['HTTP_X_HUB_SIGNATURE_256'] ?? false;

    // Raw POST data
    $payload = file_get_contents('php://input');

    // Verify the payload with your secret key
    if ($signature) {
        [$algo, $hash] = explode('=', $signature, 2);
        $payloadHash = hash_hmac('sha256', $payload, $secret);

        if (hash_equals($hash, $payloadHash)) {
            // Execute the commands to pull from the repository
            $output = shell_exec("cd {$path} && git pull 2>&1");
            echo "Success: " . $output;
        } else {
            header('HTTP/1.0 403 Forbidden');
            echo "Invalid signature\n";
            exit;
        }
    } else {
        header('HTTP/1.0 400 Bad Request');
        echo "HTTP header 'X-Hub-Signature-256' is missing.\n";
        exit;
    }
} else {
    header('HTTP/1.0 400 Bad Request');
    echo "This endpoint only supports POST requests.\n";
    exit;
}
?>
