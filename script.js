function openPage(pageName) {
    var i, tabContent;

    // Hide all tab content
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Show the selected tab content
    document.getElementById(pageName).style.display = "block";
}

// Function to fetch CSV data from the PHP script and update csvData
function fetchData() {
    fetch('/php/display_data.php') // Update the URL with the correct path to your PHP script
        .then(response => response.text())
        .then(data => {
            // Update the content of the csvData div
            document.getElementById('csvData').innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching CSV data:', error);
        });
}

// Call the fetchData function when your page loads or at the appropriate time
document.addEventListener('DOMContentLoaded', function () {
    fetchData();
});

// Function to switch tabs and fetch data when a tab is clicked
function openPage(pageName) {
    // Hide all tab content
    var tabContent = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Show the selected tab content
    document.getElementById(pageName).style.display = "block";

    // Fetch CSV data when a tab is opened
    if (pageName === 'csvDataTab') {
        fetchData();
    }
}
