<?php
$csvFile = 'public_html/csv/CSV-HTML.csv'; // Path to your CSV file

if (($handle = fopen($csvFile, 'r')) !== false) {
    echo '<table border="1">';
    while (($data = fgetcsv($handle, 1000, ',')) !== false) {
        echo '<tr>';
        foreach ($data as $value) {
            echo '<td>' . htmlspecialchars($value) . '</td>';
        }
        echo '</tr>';
    }
    echo '</table>';
    fclose($handle);
} else {
    echo 'Error opening the CSV file.';
}
?>
