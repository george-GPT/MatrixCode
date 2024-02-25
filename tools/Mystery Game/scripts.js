const noButton = document.getElementById('no')
const gifDisplay = document.getElementById('gifDisplay') // Container for GIFs
const collageContainer = document.getElementById('collage-container') // Container for GIFs
const yesButton = document.getElementById('yes')
const continueButton = document.getElementById('continueButton')
const continueButtonTwo = document.getElementById('continueButtonTwo')
const continueButtonThree = document.getElementById('continueButtonThree')
const infoDisplay = document.getElementById('infoDisplay')
const infoDisplayTwo = document.getElementById('infoDisplayTwo')
const infoDisplayThree = document.getElementById('infoDisplayThree')
const infoDisplayFour = document.getElementById('infoDisplayFour')
const buttonContainers = document.getElementById('buttonContainers')
const questionDisplay = document.getElementById('questionDisplay')
const finalScreen = document.getElementById('finalScreen')
const finalYesCheckbox = document.getElementById('finalYes')

yesButton.addEventListener('click', function () {
  questionDisplay.style.display = 'none' // Hides the question display
  gifDisplay.style.display = 'none' // Hides the GIF display
  infoDisplay.style.display = 'block' // Sets the info display to be visible
  noButton.style.display = 'none'
  yesButton.style.display = 'none'
  collageContainer.style.display = 'block'
  continueButton.style.display = 'block'
})

// Function to embed a GIF
function embedGif(gifUrl, container, className) {
  // Create an img element
  const gif = document.createElement('img')
  // Set the src attribute to the GIF URL
  gif.src = gifUrl
  // Set class for styling
  gif.className = className
  // Append the img element to the container
  container.appendChild(gif)
}

noButton.addEventListener('click', function () {
  // Clear the container
  gifDisplay.innerHTML = ''

  // Define the GIF URLs
  const firstGifUrl =
    'https://media1.tenor.com/m/Z6uHH2k0_vEAAAAd/understandable-have-nice-day.gif'
  const secondGifUrl =
    'https://media1.tenor.com/m/7JhCpDbT00YAAAAC/crycat-crying-cat.gif'
  const thirdGifUrl =
    'https://media1.tenor.com/m/t7_iTN0iYekAAAAd/sad-sad-cat.gif' // New GIF URL

  // Create a new container for the first GIF and add the 'gif' class
  const firstGifContainer = document.createElement('div')
  firstGifContainer.className = 'gif-container'
  gifDisplay.appendChild(firstGifContainer)

  // Embed the first GIF in the new container
  embedGif(firstGifUrl, firstGifContainer, 'gif')

  // Create a new container for the second GIF, add the 'gif' class and 'right' class
  const secondGifContainer = document.createElement('div')
  secondGifContainer.className = 'gif-container right'
  gifDisplay.appendChild(secondGifContainer)

  // Embed the second GIF in the new container
  embedGif(secondGifUrl, secondGifContainer, 'gif')

  // Create a new container for the third GIF, add the 'gif' class
  const thirdGifContainer = document.createElement('div')
  thirdGifContainer.className = 'gif-container center' // You might want to adjust the class if you need it to have specific styling or positioning
  gifDisplay.appendChild(thirdGifContainer)

  // Embed the third GIF in the new container
  embedGif(thirdGifUrl, thirdGifContainer, 'gif')
})

continueButton.addEventListener('click', function () {
  infoDisplay.style.display = 'none' // Hide the first info display
  infoDisplayTwo.style.display = 'block' // Show the second info display
  collageContainer.style.display = 'none'
  continueButton.style.display = 'none'
  continueButtonThree.style.display = 'block'
})

continueButtonThree.addEventListener('click', function () {
  infoDisplay.style.display = 'none' // Hide the first info display
  infoDisplayTwo.style.display = 'none' // Show the second info display
  infoDisplayThree.style.display = 'block'
  collageContainer.style.display = 'none'
  continueButton.style.display = 'none'
  continueButtonTwo.style.display = 'block'
  continueButtonThree.style.display = 'none'
})

continueButtonTwo.addEventListener('click', function () {
  infoDisplayThree.style.display = 'none'
  infoDisplayFour.style.display = 'block'
  buttonContainers.style.display = 'none'
  finalScreen.style.display = 'block'
})

// Assume finalYesCheckbox is already defined and references the checkbox input
finalYesCheckbox.addEventListener('change', function () {
  // Get the label element to hide/show
  const label = document.getElementById('finalLabel')

  // Check if the checkbox is checked
  if (finalYesCheckbox.checked) {
    // URL of the GIF you want to display
    const gifUrl =
      'https://www.system-concepts.com/wp-content/uploads/2020/02/excited-minions-gif.gif'
    // Get the new container where the GIF will be displayed
    const container = document.getElementById('finalGifContainer')
    // Call embedGif function to display the GIF
    embedGif(gifUrl, container, 'excited-gif')

    // Optionally display a popup window
    alert("Let's goooooooooo")

    // Hide the label
    label.style.display = 'none'
    finalYesCheckbox.style.display = 'none'
  } else {
    // Clear the container if the checkbox is unchecked
    document.getElementById('finalGifContainer').innerHTML = ''

    // Show the label again
    label.style.display = '' // Or you can use 'block' or 'inline', depending on its original display type
  }
})
