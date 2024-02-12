// Define the main function that will run the user rating app
function userRatingApp() {
  // Declare a variable referencing an HTML element with the ID "itemContainerElement"
  const itemContainerElement = document.getElementById("itemContainerElement");

  // Declare a global variable for creating a "rating" element
  let ratingElement = document.createElement("rating");

  // Define a function to add a rating to an item, which takes 'item' and 'itemID' parameters
  function addRating(item, itemID) {
    // Declare 'userInput' and prompt the user for a rating input
    let userInput = prompt("Rate this item between 1 and 5:");

    // Check if the user canceled the input prompt, and return if so
    if (userInput === null) {
      return; // Exit the function if the user canceled the prompt
    }

    // Parse the user input into an integer
    let userRating = parseInt(userInput, 10);

    // Check if the parsed user rating is between 1 and 5
    if (userRating >= 1 && userRating <= 5) {
      // Push the user rating into the 'ratings' array of the 'item'
      item.ratings.push(userRating);

      // Calculate the total rating and the average rating
      let total = item.ratings.reduce((acc, rating) => acc + rating, 0);
      let average = total / item.ratings.length;

      // Find the 'ratingElement' with the corresponding 'itemID'
      ratingElement = document.getElementById("rating" + itemID);

      // Check if the 'ratingElement' exists, and update its content
      if (ratingElement) {
        ratingElement.textContent = `Average Rating: ${average.toFixed(1)}`;
      } else {
        // If the 'ratingElement' doesn't exist, show an alert
        alert("Please input a value number between 1 and 5.");
      }
    } else {
      // Inform the user if the rating input is out of range
      alert("Please enter a rating between 1 and 5.");
    }
  }

  // Define a function to create an item element with 'item' and 'itemID'
  function createItemElement(item, itemID) {
    // Create a new 'div' element to represent the item
    const itemElement = document.createElement("div");
    itemElement.className = "item";

    // Create a "Rate" button element
    const rateButtonElement = document.createElement("button");
    rateButtonElement.textContent = "Rate";

    // Add an event listener to the "Rate" button to call 'addRating' when clicked
    rateButtonElement.addEventListener("click", function () {
      addRating(item, itemID);
    });

    // Create a 'span' element to display the average rating
    const ratingDisplayElement = document.createElement("span");
    ratingDisplayElement.id = "rating" + itemID;
    ratingDisplayElement.textContent = "Average Rating: Not rated yet";

    // Append the item title, "Rate" button, and rating display to the item element
    itemElement.appendChild(document.createTextNode(item.title));
    itemElement.appendChild(rateButtonElement);
    itemElement.appendChild(ratingDisplayElement);

    // Return the complete item element
    return itemElement;
  }

  // Define a function to initialize the items and render them on the page
  function itemList() {
    // Create an array of items with titles and empty 'ratings' arrays
    const items = [
      { title: "The Dark Knight", ratings: [] },
      { title: "Idiocracy", ratings: [] },
      { title: "Pulp Fiction", ratings: [] },
      { title: "Shutter Island", ratings: [] },
      { title: "Inception", ratings: [] },
    ];

    // Declare and create itemElements, then display them on the web page using a forEach loop
    items.forEach((item, index) => {
      const itemElement = createItemElement(item, index);
      itemContainerElement.appendChild(itemElement);
    });
  }

  // Call the 'itemList' function to initialize and display the items
  itemList();
}

// Call the 'userRatingApp' function to run the user rating application
userRatingApp();
