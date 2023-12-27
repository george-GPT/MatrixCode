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
    var navLinks = document.querySelectorAll('.nav-card');
    var sections = document.querySelectorAll('.content-section');

    function updateActiveSection() {
        var scrollY = window.scrollY;
        
        sections.forEach(function(section) {
            var sectionId = section.getAttribute('id');
            var sectionTop = section.offsetTop;
            var sectionHeight = section.offsetHeight;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(function(link) {
                    var dataSection = link.getAttribute('data-section');
                    if (dataSection === sectionId) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }

    // Function to scroll to the top of the page
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Add event listener for the "Top of the Page" navigation item
    var topOfPageLink = document.querySelector('.nav-card[data-section="topofpage"]');
    topOfPageLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default behavior of the anchor link
        scrollToTop(); // Scroll to the top of the page
    });

    // Update active section on scroll
    window.addEventListener('scroll', updateActiveSection);

    // Set initial active section
    updateActiveSection();
});
