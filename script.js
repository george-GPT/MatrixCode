document.addEventListener('DOMContentLoaded', function () {
  // Fetch CSV data
  fetchData()

  // Add event listener to the list-group div
  const listGroup = document.querySelector('.list-group')
  const listGroupItems = document.querySelectorAll('.list-group a')
  const htmlCard = document.getElementById('html-card')
  const cssCard = document.getElementById('css-card')
  const jsCard = document.getElementById('js-card')

  // Handle click on list-group items
  if (listGroup) {
    listGroup.addEventListener('click', function (event) {
      handleListGroupClick(event)
    })
  }

  // Set click events for each card
  if (htmlCard) {
    htmlCard.addEventListener('click', () =>
      redirectToUrl('https://matrixcode.ca/html.html')
    )
  }
  if (cssCard) {
    cssCard.addEventListener('click', () =>
      redirectToUrl('https://matrixcode.ca/css.html')
    )
  }
  if (jsCard) {
    jsCard.addEventListener('click', () =>
      redirectToUrl('https://matrixcode.ca/javascript.html')
    )
  }

  // Attach event listeners for all items within the list-group
  listGroupItems.forEach(function (item) {
    item.addEventListener('click', function (event) {
      handleListGroupItemClick(event, this)
    })
  })
})

function handleListGroupClick(event) {
  if (event.target.tagName === 'A') {
    event.preventDefault()
    scrollToTarget(event.target.hash)
  }
}

function handleListGroupItemClick(event, item) {
  event.preventDefault()
  scrollToTarget(item.hash)
}

function scrollToTarget(hash) {
  const targetElement = document.querySelector(hash)
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop,
      behavior: 'smooth',
    })
  }
}
// Function to fetch CSV data from the PHP script and update csvData
function fetchData() {
  fetch('/php/display_data.php') // Update the URL with the correct path to your PHP script
    .then((response) => response.text())
    .then((data) => {
      const csvDataElement = document.getElementById('csvData')
      if (csvDataElement) {
        csvDataElement.innerHTML = data
      }
    })
    .catch((error) => {
      console.error('Error fetching CSV data:', error)
    })
}

// Function to redirect to a specified URL
function redirectToUrl(url) {
  window.location.href = url
}

// Function to open a page by name
function openPage(pageName) {
  const tabContent = document.getElementsByClassName('tab-content');
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = 'none';
  }
  const pageElement = document.getElementById(pageName);
  if (pageElement) {
    pageElement.style.display = 'block';
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

  listGroupItems.forEach(function (item) {
    item.addEventListener('click', function (event) {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Get the target section's ID (e.g., #htmlCheatSheet)
      const target = this.getAttribute('href').substring(1); // Remove the "#" character

      // Find the target element by its ID
      const targetElement = document.getElementById(target);

      // Check if the target element exists
      if (targetElement) {
        // Calculate the distance to scroll
        const offset = targetElement.getBoundingClientRect().top + window.scrollY;

        // Scroll smoothly to the target element
        window.scrollTo({
          top: offset,
          behavior: 'smooth', // Use smooth scrolling behavior
        });
      }
    });
  });
});


// Get all the dropdown elements
const dropdowns = document.getElementsByClassName('tab')

// Loop through the dropdowns and add click event listeners
for (let i = 0; i < dropdowns.length; i++) {
  dropdowns[i].addEventListener('click', function (event) {
    // Prevent the click from affecting other elements
    event.stopPropagation()

    // Toggle the dropdown content
    this.querySelector('.dropdown-content').classList.toggle('show')
  })
}

document.addEventListener('DOMContentLoaded', function () {
  // Function to check if the device is a touch device
  function isTouchDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    )
  }

  if (isTouchDevice()) {
    // Apply click event listeners for touch devices
    const tabs = document.querySelectorAll('.tab')
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function (event) {
        let dropdown = this.querySelector('.dropdown-content')
        if (dropdown) {
          dropdown.style.display =
            dropdown.style.display === 'block' ? 'none' : 'block'
          event.stopPropagation() // Prevents document click from immediately hiding the dropdown
        }
      })
    })
  }

  // Close the dropdown if the user clicks outside of it
  document.addEventListener('click', function (event) {
    const dropdownContents = document.querySelectorAll('.dropdown-content')
    dropdownContents.forEach(function (dropdown) {
      if (!event.target.closest('.tab')) {
        dropdown.style.display = 'none'
      }
    })
  })
})



// Declare variables for HTML elements (question, nextButton, finalScore, optionsList)

// Declare currentQuestionIndex and quizQuestions array

// Initialize user score

// Function to load and display the current question and its child

// Function to disable nextButton

// Function to handle the "Next" button click

// Check if there are more questions > call loadQuestion > otherwise call finalScore + display completion message + hide next button

// Function to display the final score

// Function to set up event listeners

// Call initializers for the first question, event listeners, and disabling next button
