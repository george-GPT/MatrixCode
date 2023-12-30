document.addEventListener('DOMContentLoaded', function () {
    // Fetch CSV data
    fetchData();

    // Add event listeners for the cards if they exist
    const htmlCard = document.getElementById('html-card');
    if (htmlCard) {
        htmlCard.addEventListener('click', () => redirectToUrl('https://matrixcode.ca/html.html'));
    }

    const cssCard = document.getElementById('css-card');
    if (cssCard) {
        cssCard.addEventListener('click', () => redirectToUrl('https://matrixcode.ca/css.html'));
    }

    const jsCard = document.getElementById('js-card');
    if (jsCard) {
        jsCard.addEventListener('click', () => redirectToUrl('https://matrixcode.ca/javascript.html'));
    }
});

// Function to fetch CSV data from the PHP script and update csvData
function fetchData() {
    fetch('/php/display_data.php') // Update the URL with the correct path to your PHP script
        .then(response => response.text())
        .then(data => {
            const csvDataElement = document.getElementById('csvData');
            if (csvDataElement) {
                csvDataElement.innerHTML = data;
            }
        })
        .catch(error => {
            console.error('Error fetching CSV data:', error);
        });
}

// Function to redirect to a specified URL
function redirectToUrl(url) {
    window.location.href = url;
}

// Function to open a page by name
function openPage(pageName) {
    var tabContent = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    var pageElement = document.getElementById(pageName);
    if (pageElement) {
        pageElement.style.display = "block";
    }

    // Fetch CSV data when a tab is opened
    if (pageName === 'csvDataTab') {
        fetchData();
    }
}
