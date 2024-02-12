  // This function fetches data from the provided URL
        function fetchData(url) {
            fetch(url)
                .then(response => {
                    // Check if the response is ok (status code 200-299)
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json(); // Parse JSON data from the response
                })
                .then(data => {
                    displayData(data); // Call function to handle the data
                })
                .catch(error => {
                    console.error('Fetching error:', error);
                    displayError(error); // Call function to handle errors
                });
        }

        // This function handles displaying the data on the webpage
        function displayData(data) {
            // Implementation depends on how you want to display the data
            // For example, displaying JSON data in a preformatted tag:
            document.getElementById('dataContainer').textContent = JSON.stringify(data, null, 2);
        }

        // This function handles errors and displays them on the webpage
        function displayError(error) {
            document.getElementById('errorContainer').textContent = error.message;
        }

        // Call fetchData when the window loads
        window.onload = () => {
            fetchData('https://your-api-url.com/data'); // Replace with your API URL
        };




        // Function to fetch weather data
function fetchWeather(location) {
    // TODO: Construct the URL for the weather API
    const url = ''; // You will need to construct this based on the API you choose

    fetch(url)
        .then(response => {
            // TODO: Check if the response is ok and handle HTTP errors
            return response.json();
        })
        .then(data => {
            // TODO: Process and display the data
            displayWeather(data);
        })
        .catch(error => {
            // TODO: Handle any errors that occurred during fetch
            console.error('Error fetching weather:', error);
        });
}

// Function to display weather data
function displayWeather(weatherData) {
    // TODO: Implement how you want to display the weather data
    // Hint: Modify the innerHTML of the weatherDisplay element
}

// Event listener for the button click
document.getElementById('fetchWeather').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    fetchWeather(location); // Call fetchWeather with the user input
});

// Optional: Handle 'Enter' key in the input field for better user experience
