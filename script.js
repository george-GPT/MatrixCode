document.addEventListener('DOMContentLoaded', function () {
    // Fetch CSV data
    fetchData();

    // Add event listener to the list-group div
    const listGroup = document.querySelector('.list-group');
    
    if (listGroup) {
        listGroup.addEventListener('click', function(event) {
            // Check if the clicked element is a link
            if (event.target.tagName === 'A') {
                // Prevent default anchor click behavior
                event.preventDefault();

                // Get the target section's ID (e.g., #htmlCheatSheet)
                var target = event.target.hash;

                // Get the target element
                var targetElement = document.querySelector(target);
                if (targetElement) {
                    // Calculate the target's position relative to the viewport
                    var targetOffset = targetElement.getBoundingClientRect().top;

                    // Calculate the current scroll position
                    var scrollOffset = window.pageYOffset || document.documentElement.scrollTop;

                    // Calculate the final scroll position
                    var finalOffset = scrollOffset + targetOffset;

                    // Use smooth scrolling using the scrollTo() method
                    window.scrollTo({
                        top: finalOffset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }


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
