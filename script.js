document.addEventListener('DOMContentLoaded', function () {
    // Fetch CSV data
    fetchData();

    // Add event listener to the list-group div
    const listGroup = document.querySelector('.list-group');
    const listGroupItems = document.querySelectorAll('.list-group a');
    const htmlCard = document.getElementById('html-card');
    const cssCard = document.getElementById('css-card');
    const jsCard = document.getElementById('js-card');

    // Handle click on list-group items
    if (listGroup) {
        listGroup.addEventListener('click', function(event) {
            handleListGroupClick(event);
        });
    }

    // Set click events for each card
    if (htmlCard) {
        htmlCard.addEventListener('click', () => redirectToUrl('https://matrixcode.ca/html.html'));
    }
    if (cssCard) {
        cssCard.addEventListener('click', () => redirectToUrl('https://matrixcode.ca/css.html'));
    }
    if (jsCard) {
        jsCard.addEventListener('click', () => redirectToUrl('https://matrixcode.ca/javascript.html'));
    }

    // Attach event listeners for all items within the list-group
    listGroupItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            handleListGroupItemClick(event, this);
        });
    });
});

function handleListGroupClick(event) {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        scrollToTarget(event.target.hash);
    }
}

function handleListGroupItemClick(event, item) {
    event.preventDefault();
    scrollToTarget(item.hash);
}

function scrollToTarget(hash) {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth'
        });
    }
}
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

document.addEventListener('DOMContentLoaded', function () {
    // Fetch CSV data
    fetchData();

    // Add event listeners for all items within the list-group
    const listGroupItems = document.querySelectorAll('.list-group a');
    
    listGroupItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Get the target section's ID (e.g., #htmlCheatSheet)
            var target = this.hash;

            // Use jQuery's animate() function to smoothly scroll to the target
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 800); // 800 milliseconds for the scroll animation duration
        });
    });

    // Rest of your code...
});
