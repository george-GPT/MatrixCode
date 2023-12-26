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

document.addEventListener('DOMContentLoaded', (event) => {
    // Function to redirect to a specified URL
    const redirectToUrl = (url) => {
        window.location.href = url;
    };

    // Add event listener for the HTML card
    const htmlCard = document.getElementById('html-card');
    htmlCard.addEventListener('click', () => redirectToUrl('https://matrixcode.ca/html.html'));

    // Add event listener for the CSS card
    const cssCard = document.getElementById('css-card');
    cssCard.addEventListener('click', () => redirectToUrl('https://matrixcode.ca/css.html'));

    // Add event listener for the JavaScript card
    const jsCard = document.getElementById('js-card');
    jsCard.addEventListener('click', () => redirectToUrl('https://matrixcode.ca/javascript.html'));
});

document.addEventListener('DOMContentLoaded', function() {
    var navTitle = document.querySelector('.nav-menu-title');
    var navMenu = document.querySelector('.card-navigation');
    var table = document.querySelector('.table-title').nextElementSibling; // Assuming the table follows the title

    function updateVerticalCenter() {
        var scrollY = window.scrollY;
        var viewportCenter = window.innerHeight / 2;
        var tableRect = table.getBoundingClientRect();

        // Calculate the top position for the navMenu and navTitle
        var navTopPosition = Math.max(viewportCenter, scrollY + tableRect.top);

        // Apply the styles to navMenu and navTitle to keep them centered
        navMenu.style.position = 'fixed';
        navMenu.style.top = '50%';
        navMenu.style.transform = 'translateY(-50%)';
        navTitle.style.position = 'fixed';
        navTitle.style.top = '50%';
        navTitle.style.transform = 'translateY(-50%)';

        // Adjust the maximum allowed top position based on the table's top position
        if (scrollY < tableRect.top + window.scrollY) {
            navMenu.style.top = `${navTopPosition}px`;
            navMenu.style.transform = 'none';
            navTitle.style.top = `${navTopPosition - navTitle.offsetHeight}px`; // 10px for a little space above nav cards
            navTitle.style.transform = 'none';
        }
    }

    // Update position on scroll and resize
    window.addEventListener('scroll', updateVerticalCenter);
    window.addEventListener('resize', updateVerticalCenter);

    // Set initial position
    updateVerticalCenter();
});
