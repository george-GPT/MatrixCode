const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
const coinSound = new Audio()
coinSound.src = 'bubble.mp3'
coinSound.preload = 'auto' // Preload the sound file
const backgroundMusic = new Audio()
backgroundMusic.src = 'pokemon.mp3' // Load background music
backgroundMusic.loop = true // Loop the background music
backgroundMusic.volume = 0.15 // Set volume to 70%
const textureImage = new Image()
textureImage.src = 'wall.jpg'
const obstacles = []
// Define a buffer margin around the coin for safer positioning
const coinBufferMargin = 10 // Increase this value as needed
let scoreFontSize = 20 // Normal font size
let isScoreAnimating = false
let scoreAnimationDuration = 0.5 // Duration in seconds
let scoreAnimationTime = 0
let popupClosed = false
let score = 0 // Use let if the score will change, or const if it will remain constant.

function playCoinSound() {
  coinSound.currentTime = 0 // Reset sound to the beginning to allow repeated play
  coinSound.play()
}

// Set canvas size
canvas.width = 800
canvas.height = 600

// Define initial player speed
const initialPlayerSpeed = 2

// Function to calculate vertical difference between game canvas and visible screen
const verticalDifference = (canvas.height - window.innerHeight) / 2

function generateObstacles() {
  // Clear any existing obstacles
  obstacles.length = 0

  // Define static obstacles
  // Example layout: [x, y, width, height]
  const staticObstacles = [
    [50, 100, 100, 30],
    [200, 200, 150, 30],
    [400, 300, 200, 30],
    [600, 100, 100, 30],
    [150, 450, 150, 30],
    [350, 550, 200, 30],
    [550, 400, 100, 30],
  ]

  // Loop through the defined obstacles and add them to the obstacles array
  staticObstacles.forEach((obstacle) => {
    obstacles.push({
      x: obstacle[0],
      y: obstacle[1],
      width: obstacle[2],
      height: obstacle[3],
    })
  })
}

// Call generateObstacles() here to ensure it's done once and the obstacles layout is static
generateObstacles()

// Function to draw obstacles on the canvas
function drawObstacles() {
  // Create pattern from texture image
  const texturePattern = ctx.createPattern(textureImage, 'repeat')

  obstacles.forEach((obstacle) => {
    // Set pattern as fill style
    ctx.fillStyle = texturePattern

    // Draw obstacle shape
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height)
  })
}

// Load player image
const playerImage = new Image()
playerImage.src = 'raccoon.png' // Adjust the path to match where your image is located

const coinImage = new Image()
coinImage.src = 'coin.png' // Adjust the path to match where your image is located

const powerUpImage = new Image()
powerUpImage.src = 'coke.png' // Replace with the path to your power-up image

const powerUpPlayer = new Image()
powerUpPlayer.src = 'hedgehog.png' // Path to your sparkle image

// New game state variables
let gameRunning = false
let timeLeft = 25 // 30 seconds to play the game
let gameTimer
let highScore = 0

// Start Game button element
const startButton = document.createElement('button')
startButton.textContent = 'Play Again'
startButton.style.position = 'absolute'
startButton.onclick = startGame
document.body.appendChild(startButton)

function randomizePowerUpPosition() {
  let validPowerUpPosition = false
  let attempts = 0
  const maxAttempts = 1000
  const powerUpArea = {
    width: powerUp.width + 2 * coinBufferMargin,
    height: powerUp.height + 2 * coinBufferMargin,
  }

  while (!validPowerUpPosition && attempts < maxAttempts) {
    // Generate random position considering powerUp size plus buffer
    let powerUpX =
      Math.random() * (canvas.width - powerUpArea.width) + coinBufferMargin
    let powerUpY =
      Math.random() * (canvas.height - powerUpArea.height) + coinBufferMargin

    // Check for obstacle collision
    let collisionDetected = false
    for (let obstacle of obstacles) {
      if (
        powerUpX < obstacle.x + obstacle.width &&
        powerUpX + powerUpArea.width > obstacle.x &&
        powerUpY < obstacle.y + obstacle.height &&
        powerUpY + powerUpArea.height > obstacle.y
      ) {
        collisionDetected = true
        break // No need to check other obstacles if collision is detected
      }
    }

    // If no collision is detected, the position is valid
    if (!collisionDetected) {
      validPowerUpPosition = true
      powerUp.x = powerUpX
      powerUp.y = powerUpY
    }
    attempts++
  }

  if (attempts >= maxAttempts) {
    console.error(
      'Failed to place the power-up in a valid position after many attempts.'
    )
  }
}

function randomizeCoinPosition() {
  let validCoinPosition = false
  let attempts = 0
  const maxAttempts = 1000
  const coinArea = {
    width: coin.width + 2 * coinBufferMargin,
    height: coin.height + 2 * coinBufferMargin,
  }

  while (!validCoinPosition && attempts < maxAttempts) {
    // Generate random position considering coin size plus buffer
    let coinX =
      Math.random() * (canvas.width - coinArea.width) + coinBufferMargin
    let coinY =
      Math.random() * (canvas.height - coinArea.height) + coinBufferMargin

    // Check for obstacle collision
    let collisionDetected = false
    for (let obstacle of obstacles) {
      if (
        coinX < obstacle.x + obstacle.width &&
        coinX + coinArea.width > obstacle.x &&
        coinY < obstacle.y + obstacle.height &&
        coinY + coinArea.height > obstacle.y
      ) {
        collisionDetected = true
        break // No need to check other obstacles if collision is detected
      }
    }

    // If no collision is detected, the position is valid
    if (!collisionDetected) {
      validCoinPosition = true
      coin.x = coinX
      coin.y = coinY
    }
    attempts++
  }

  if (attempts >= maxAttempts) {
    console.error(
      'Failed to place the coin in a valid position after many attempts.'
    )
  }
}

function checkCollisionWithObstacles(x, y, width, height) {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i]
    if (
      x < obstacle.x + obstacle.width &&
      x + width > obstacle.x &&
      y < obstacle.y + obstacle.height &&
      y + height > obstacle.y
    ) {
      return true // Collision detected
    }
  }
  return false // No collision
}

// Ensure the position is within the canvas
function isWithinCanvas(x, y, width, height) {
  return (
    x >= 0 && y >= 0 && x + width <= canvas.width && y + height <= canvas.height
  )
}

function startGame() {
  // Ensure the popup and other game setup logic is correctly initialized
  if (!popupClosed) {
    return // Make sure to return early if necessary conditions are not met
  }
  playBackgroundMusic()
  gameRunning = true
  timeLeft = 25 // Reset time left
  score = 0 // Reset score
  player.speed = initialPlayerSpeed // Set player speed to initialPlayerSpeed
  startButton.style.display = 'none' // Ensure the button is hidden when the game starts
  let validPlayerPosition = false
  const maxPlayerAttempts = 1000
  let playerAttempts = 0

  while (!validPlayerPosition && playerAttempts < maxPlayerAttempts) {
    player.x = Math.random() * (canvas.width - player.width)
    player.y = Math.random() * (canvas.height - player.height)

    if (
      !checkCollisionWithObstacles(
        player.x,
        player.y,
        player.width,
        player.height
      )
    ) {
      validPlayerPosition = true
    }
    playerAttempts++
  }

  if (playerAttempts >= maxPlayerAttempts) {
    console.error(
      'Failed to place the player in a valid position after many attempts.'
    )
  }

  // Randomize coin position safely away from obstacles
  randomizeCoinPosition()
  randomizePowerUpPosition()

  // Start the game timer
  gameTimer = setInterval(function () {
    timeLeft--
    if (timeLeft <= 0) {
      endGame()
    }
  }, 1000)

  // Call game loop
  gameLoop()
}

function endGame() {
  stopBackgroundMusic()
  gameRunning = false
  clearInterval(gameTimer) // Stop the game timer

  let isNewHighScore = score > highScore
  if (isNewHighScore) {
    highScore = score // Update the high score if the current score is greater
    drawNewHighScore()
  }
  // Delay the popup display to ensure the high score message is seen first
  setTimeout(function () {
    displayEndGamePopup(isNewHighScore)
  }, 1000) // Delay of 1000 milliseconds (1 second)

  // Create and style the popup
  const popup = document.createElement('div')
  popup.className = 'popup'

  const heading = document.createElement('h2')
  heading.textContent = 'Time is Up!'
  heading.style.color = '#ff00ff' // Match the specified style

  const scoreText = document.createElement('p')
  scoreText.textContent = `Rojee collected ${score} treats!`

  const highScoreText = document.createElement('p')
  highScoreText.textContent = `High Score: ${highScore}`

  // Update the button text and onclick event
  const playAgainButton = document.createElement('button')
  playAgainButton.textContent = 'Play Again' // Set the button text
  playAgainButton.style.display = 'hidden'
  playAgainButton.onclick = function () {
    document.body.removeChild(popup)
    popupClosed = true // Update the variable to indicate the popup is closed
    startGame() // Restart the game
  }

  // Append elements to the popup
  popup.appendChild(heading)
  popup.appendChild(scoreText)
  popup.appendChild(highScoreText)
  popup.appendChild(playAgainButton)

  // Append the popup to the document body
  document.body.appendChild(popup)
}

function drawNewHighScore() {
  ctx.font = 'bold 48px Comic Sans MS' // Example font, adjust as needed
  ctx.fillStyle = 'gold' // Example color, adjust as needed
  ctx.textAlign = 'center'
  // Adjust the Y position to move the text higher up on the screen
  ctx.fillText('NEW HIGHSCORE!!!', canvas.width / 2, 80) // Adjust Y position as needed
}

function drawTimer() {
  ctx.font = 'bold 28px Comic Sans MS' // Bold Comic Sans font with size 28
  ctx.fillStyle = '#FFD700' // Cozy gold color for the text
  ctx.shadowOffsetX = 3 // Adjusted shadow offset for more visibility
  ctx.shadowOffsetY = 3
  ctx.shadowBlur = 5 // Increased shadow blur for softer effect
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)' // Soft shadow for depth

  // Keep text and value in the same location
  ctx.fillText('Time: ' + timeLeft, canvas.width - 150, 35) // Adjusted position and padding

  // Reset shadow for other elements to not get affected
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0
  ctx.shadowBlur = 0
}

function drawPlayer() {
  const imageToDraw = player.powerUpActive ? powerUpPlayer : playerImage

  if (player.powerUpActive) {
    // Apply glow effect
    ctx.shadowBlur = 20 // Adjust the glow size
    ctx.shadowColor = 'gold' // Choose glow color
  }

  // Draw the player image
  ctx.drawImage(imageToDraw, player.x, player.y, player.width, player.height)

  // Reset shadow properties to avoid affecting other drawings
  if (player.powerUpActive) {
    ctx.shadowBlur = 0
  }
}

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 45,
  height: 45,
  speed: 2,
  dx: 0,
  dy: 0,
  powerUpActive: false, // New property to track if power-up is active
  powerUpActiveTwo: false,
  powerUpEndTime: 0, // When the power-up effect should end
  powerUpEndTimeTwo: 0,
}

const powerUp = {
  x: Math.random() * (canvas.width - 35),
  y: Math.random() * (canvas.height - 35),
  width: 45,
  height: 45,
  isVisible: true, // Make sure this is uncommented and used
  effectDuration: 6000, // 8 seconds in milliseconds
  speedDuration: 6000,
  speedBoost: 4, // The increased speed when the power-up is collected
}

// Coin properties
const coin = {
  x: Math.random() * (canvas.width - 35),
  y: Math.random() * (canvas.height - 35),
  width: 40,
  height: 40,
  isVisible: true,
}

function drawScore() {
  ctx.font = 'bold 28px Comic Sans MS' // Bold Comic Sans font
  ctx.fillStyle = '#FFA07A' // Light salmon color for a gentle, fun vibe
  ctx.shadowOffsetX = 2
  ctx.shadowOffsetY = 2
  ctx.shadowBlur = 3
  ctx.shadowColor = 'rgba(0, 0, 0, .8)' // Consistent shadow styling
  ctx.fillText('Treats Secured: ' + score, canvas.width - 520, 35) // Provide more room for text
  // Reset shadow after drawing
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0
  ctx.shadowBlur = 0
}

function drawCoin() {
  if (coin.isVisible) {
    // Simplified glow effect
    ctx.shadowBlur = 10 // Reduced blur radius for better performance
    ctx.shadowColor = 'rgba(255, 215, 0, 0.8)' // Gold-yellow glow to match a typical coin color

    // Draw the coin image with a simplified glow effect
    ctx.drawImage(coinImage, coin.x, coin.y, coin.width, coin.height)

    // Reset shadow properties to avoid affecting other drawings
    ctx.shadowBlur = 0
    ctx.shadowColor = 'transparent'
  }
}

function drawPowerUp() {
  if (powerUp.isVisible) {
    // Simplified glow effect
    ctx.shadowBlur = 15 // Reduced blur radius for better performance
    ctx.shadowColor = 'rgba(255, 215, 0, 0.8)' // Gold-yellow glow to match a typical coin color

    // Draw the coin image with a simplified glow effect
    ctx.drawImage(
      powerUpImage,
      powerUp.x,
      powerUp.y,
      powerUp.width,
      powerUp.height
    )

    // Reset shadow properties to avoid affecting other drawings
    ctx.shadowBlur = 0
    ctx.shadowColor = 'transparent'
  }
}

function applySpeedBoost() {
  player.speed = 4 // Set the boosted speed

  // Set a flag and record the start time of the boost
  player.powerUpActive = true
  player.powerUpActiveTwo = true
  player.powerUpStartTime = Date.now() // Record the start time instead of the end time
  player.powerUpEndTimeTwo = Date.now() + powerUp.speedDuration //
}

/// Array to track which keys are currently pressed
const keysPressed = {}

// Inside handleKeydown and handleKeyup, adjust the player's dx and dy directly.
// Example modification for handleKeydown:
function handleKeydown(e) {
  keysPressed[e.key] = true

  player.dx = 0 // Reset dx and dy to prevent unintended speed accumulation
  player.dy = 0

  if (keysPressed['ArrowRight'] || keysPressed['d'])
    player.dx = initialPlayerSpeed
  if (keysPressed['ArrowLeft'] || keysPressed['a'])
    player.dx = -initialPlayerSpeed
  if (keysPressed['ArrowUp'] || keysPressed['w'])
    player.dy = -initialPlayerSpeed
  if (keysPressed['ArrowDown'] || keysPressed['s'])
    player.dy = initialPlayerSpeed
}

// Example adjustment for handleKeyup:
function handleKeyup(e) {
  keysPressed[e.key] = false

  // If the key released corresponds to the current movement direction, stop the movement
  if ((e.key === 'ArrowRight' || e.key === 'd') && player.dx > 0) player.dx = 0
  if ((e.key === 'ArrowLeft' || e.key === 'a') && player.dx < 0) player.dx = 0
  if ((e.key === 'ArrowUp' || e.key === 'w') && player.dy < 0) player.dy = 0
  if ((e.key === 'ArrowDown' || e.key === 's') && player.dy > 0) player.dy = 0
}

document.addEventListener('keydown', handleKeydown)
document.addEventListener('keyup', handleKeyup)

// Function to close the popup and start the game
function closePopup() {
  var popup = document.getElementById('popup')
  popup.style.display = 'none'
  popupClosed = true // Update the variable to indicate the popup is closed
  startGame() // Start the game
}

function updateMovementSpeed() {
  const speed = player.speed
  player.dx = 0
  player.dy = 0

  if (keysPressed['ArrowRight'] || keysPressed['d']) {
    player.dx = speed
  }
  if (keysPressed['ArrowLeft'] || keysPressed['a']) {
    player.dx = -speed
  }
  if (keysPressed['ArrowUp'] || keysPressed['w']) {
    player.dy = -speed
  }
  if (keysPressed['ArrowDown'] || keysPressed['s']) {
    player.dy = speed
  }
}

function update() {
  updateMovementSpeed() // Update movement speed based on current speed and keys pressed

  // Existing collision detection and movement code...
  let horizontalCollision = checkCollisionWithObstacles(
    player.x + player.dx,
    player.y,
    player.width,
    player.height
  )
  if (!horizontalCollision) {
    player.x += player.dx
  }

  let verticalCollision = checkCollisionWithObstacles(
    player.x,
    player.y + player.dy,
    player.width,
    player.height
  )
  if (!verticalCollision) {
    player.y += player.dy
  }

  enforceCanvasBounds()

  // Power-up active check and revert speed logic...
  if (player.powerUpActive && Date.now() >= player.powerUpStartTime + 6000) {
    player.speed = initialPlayerSpeed // Revert to the original speed
    player.powerUpActive = false
  }
}

function enforceCanvasBounds() {
  // Adjust the boundary checks to account for the size of the player
  const rightBound = canvas.width - player.width
  const bottomBound = canvas.height - player.height

  // Ensure player doesn't move off-screen
  player.x = Math.max(0, Math.min(rightBound, player.x))
  player.y = Math.max(0, Math.min(bottomBound, player.y))
}

function playBackgroundMusic() {
  backgroundMusic.currentTime = 0 // Reset music to the beginning
  backgroundMusic.play()
}

function stopBackgroundMusic() {
  backgroundMusic.pause()
}

// Clear canvas
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function checkCollision() {
  // Check collision with coin
  if (
    player.x < coin.x + coin.width &&
    player.x + player.width > coin.x &&
    player.y < coin.y + coin.height &&
    player.y + player.height > coin.y &&
    coin.isVisible
  ) {
    playCoinSound()
    randomizeCoinPosition() // Reposition the coin
    score += 1 // Increase score by 1 for each coin collected
  }

  // Check collision with power-up
  if (
    player.x < powerUp.x + powerUp.width &&
    player.x + player.width > powerUp.x &&
    player.y < powerUp.y + powerUp.height &&
    player.y + player.height > powerUp.y &&
    powerUp.isVisible
  ) {
    randomizePowerUpPosition() // Reposition the power-up for next time
    player.powerUpActive = true
    player.powerUpEndTime = Date.now() + powerUp.effectDuration // Set when the power-up effect should end

    applySpeedBoost() // Apply the speed boost for 6 seconds
    powerUp.isVisible = false // Hide the power-up after collection
  }
}

function gameLoop() {
  if (gameRunning) {
    clear()
    update()
    checkCollision() // Check coin collision
    drawPlayer()
    drawCoin()
    drawPowerUp()
    drawObstacles() // Draw obstacles
    drawScore()
    drawTimer()

    requestAnimationFrame(gameLoop)

    // Check if time is up
    if (timeLeft <= 0) {
      endGame()
    }

    if (!powerUp.isVisible && Date.now() > player.powerUpEndTime) {
      randomizePowerUpPosition() // This will reposition the power-up
      powerUp.isVisible = true // Make the power-up visible again for collection
    }
  }
}

// Start the game loop once the player image has loaded
playerImage.onload = function () {
  gameLoop()
}

// Call startGame to initially load the game
startGame()

function initializeGame() {
  requestAnimationFrame(gameLoop) // Starts the game loop
}

initializeGame()
