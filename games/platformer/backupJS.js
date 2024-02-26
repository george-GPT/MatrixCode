const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const coinSound = new Audio();
coinSound.src = 'bubble.mp3';
coinSound.preload = 'auto'; // Preload the sound file
const backgroundMusic = new Audio();
backgroundMusic.src = 'pokemon.mp3'; // Load background music
backgroundMusic.loop = true; // Loop the background music
backgroundMusic.volume = 0.15; // Set volume to 70%
const textureImage = new Image();
textureImage.src = 'wall.jpg';
const obstacles = [];
// Define a buffer margin around the coin for safer positioning
const coinBufferMargin = 10; // Increase this value as needed
let scoreFontSize = 20; // Normal font size
let isScoreAnimating = false;
let scoreAnimationDuration = 0.5; // Duration in seconds
let scoreAnimationTime = 0;

function playCoinSound() {
  coinSound.currentTime = 0; // Reset sound to the beginning to allow repeated play
  coinSound.play();
}

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Define initial player speed
const initialPlayerSpeed = 0.8;

// Function to calculate vertical difference between game canvas and visible screen
const verticalDifference = (canvas.height - window.innerHeight) / 2;

function generateObstacles() {
  const minObstacleDistance = 150; // Maintain sufficient space between obstacles
  const minObstacleWallDistance = 75; // Ensure obstacles are not too close to the game boundaries
  const numObstacles = Math.floor(Math.random() * 5) + 3; // Slightly more obstacles, between 3 and 7

  obstacles.length = 0; // Clear any existing obstacles

  for (let i = 0; i < numObstacles; i++) {
    let obstacleWidth = Math.random() * 50 + 30; // Adjust width for smaller obstacles
    let obstacleHeight = Math.random() * 50 + 30; // Adjust height for smaller obstacles
    let obstacleX, obstacleY;
    let validObstaclePosition = false;

    attemptLoop: while (!validObstaclePosition) {
      obstacleX = Math.random() * (canvas.width - obstacleWidth);
      obstacleY = Math.random() * (canvas.height - obstacleHeight);

      // Check against boundaries
      if (
        obstacleX < minObstacleWallDistance ||
        obstacleY < minObstacleWallDistance ||
        obstacleX + obstacleWidth > canvas.width - minObstacleWallDistance ||
        obstacleY + obstacleHeight > canvas.height - minObstacleWallDistance
      ) {
        continue; // Too close to boundary, retry
      }

      // Check against other obstacles
      for (const other of obstacles) {
        const distanceX = Math.abs(
          obstacleX + obstacleWidth / 2 - (other.x + other.width / 2)
        );
        const distanceY = Math.abs(
          obstacleY + obstacleHeight / 2 - (other.y + other.height / 2)
        );
        const minDistanceX =
          (obstacleWidth + other.width) / 2 + minObstacleDistance;
        const minDistanceY =
          (obstacleHeight + other.height) / 2 + minObstacleDistance;

        if (distanceX < minDistanceX && distanceY < minDistanceY) {
          continue attemptLoop; // Overlaps with another obstacle, retry
        }
      }

      validObstaclePosition = true; // Passed both checks
    }

    if (validObstaclePosition) {
      obstacles.push({
        x: obstacleX,
        y: obstacleY,
        width: obstacleWidth,
        height: obstacleHeight,
      });
    }
  }
}

// Function to draw obstacles on the canvas
function drawObstacles() {
  // Create pattern from texture image
  const texturePattern = ctx.createPattern(textureImage, 'repeat');

  obstacles.forEach((obstacle) => {
    // Set pattern as fill style
    ctx.fillStyle = texturePattern;

    // Draw obstacle shape
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

// Call generateObstacles function at the start of the game
generateObstacles();

// Load player image
const playerImage = new Image();
playerImage.src = 'raccoon.png'; // Adjust the path to match where your image is located

const coinImage = new Image();
coinImage.src = 'coin.png'; // Adjust the path to match where your image is located

// New game state variables
let gameRunning = false;
let timeLeft = 30; // 30 seconds to play the game
let gameTimer;
let highScore = 0;

// Start Game button element
const startButton = document.createElement('button');
startButton.textContent = 'Play Again';
startButton.style.position = 'absolute';
startButton.style.left = '50%';
startButton.style.top = '70%';
startButton.style.transform = 'translate(-50%, -50%)';
startButton.style.padding = '10px 20px';
startButton.style.fontSize = '20px';
startButton.onclick = startGame;
document.body.appendChild(startButton);

function randomizeCoinPosition() {
  let validCoinPosition = false;
  const maxAttempts = 1000;
  let attempts = 0;

  while (!validCoinPosition && attempts < maxAttempts) {
    // Generate random position considering coin size plus buffer
    coin.x =
      Math.random() * (canvas.width - coin.width - 2 * coinBufferMargin) +
      coinBufferMargin;
    coin.y =
      Math.random() * (canvas.height - coin.height - 2 * coinBufferMargin) +
      coinBufferMargin;

    // Check if the coin's adjusted position (with buffer) overlaps with any obstacles
    validCoinPosition = !checkCollisionWithObstacles(
      coin.x - coinBufferMargin,
      coin.y - coinBufferMargin,
      coin.width + 2 * coinBufferMargin,
      coin.height + 2 * coinBufferMargin
    );

    attempts++;
  }

  if (attempts >= maxAttempts) {
    console.error(
      'Failed to place the coin in a valid position after many attempts.'
    );
  }
}

function checkCollisionWithObstacles(x, y, width, height) {
  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    if (
      x < obstacle.x + obstacle.width &&
      x + width > obstacle.x &&
      y < obstacle.y + obstacle.height &&
      y + height > obstacle.y
    ) {
      return true; // Collision detected
    }
  }
  return false; // No collision
}

// Ensure the position is within the canvas
function isWithinCanvas(x, y, width, height) {
  return (
    x >= 0 && y >= 0 && x + width <= canvas.width && y + height <= canvas.height
  );
}

function startGame() {
  playBackgroundMusic();
  gameRunning = true;
  timeLeft = 30; // Reset time left
  score = 0; // Reset score
  player.speed = initialPlayerSpeed; // Set player speed to initialPlayerSpeed
  startButton.style.display = 'none'; // Hide the start button

  // Clear existing obstacles and regenerate them
  obstacles.length = 0; // Clear existing obstacles
  generateObstacles();

  // Randomize player spawn
  let playerX, playerY;
  let validPlayerPosition = false;

  // Keep generating player position until it's not overlapping with any obstacle
  while (!validPlayerPosition) {
    playerX = Math.random() * (canvas.width - player.width);
    playerY = Math.random() * (canvas.height - player.height);

    // Check if player position overlaps with any obstacle
    let playerOverlap = false;
    for (let i = 0; i < obstacles.length; i++) {
      const obstacle = obstacles[i];
      if (
        playerX < obstacle.x + obstacle.width &&
        playerX + player.width > obstacle.x &&
        playerY < obstacle.y + obstacle.height &&
        playerY + player.height > obstacle.y
      ) {
        playerOverlap = true;
        break; // Exit loop since overlap found
      }
    }

    // If no overlap found, set valid position for player
    if (!playerOverlap) {
      validPlayerPosition = true;
    }
  }

  // Set the final valid position for the player
  player.x = playerX;
  player.y = playerY;

  // Call the new function to randomize coin position
  randomizeCoinPosition();

  // Start the game timer
  gameTimer = setInterval(function () {
    timeLeft--;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  // Call game loop
  gameLoop();
}

// Adjusted endGame function
function endGame() {
  stopBackgroundMusic();
  gameRunning = false;
  clearInterval(gameTimer); // Stop the game timer
  highScore = Math.max(highScore, score); // Update high score if current score is greater
  startButton.style.display = 'block'; // Show the start button again
  // Show game over display
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.font = '30px Arial';
  ctx.fillText('Time is Up!', canvas.width / 2, canvas.height / 2 - 40);
  ctx.fillText(
    `Rojee collected ${score} treats!`,
    canvas.width / 2,
    canvas.height / 2
  );

  ctx.fillText(
    'High Score: ' + highScore,
    canvas.width / 2,
    canvas.height / 2 + 40
  );
}

function drawTimer() {
  ctx.font = '24px Georgia'; // Use a cozy font
  ctx.fillStyle = '#FFD700'; // A cozy gold color for the text
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 3;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Soft shadow for depth
  ctx.fillText('Time: ' + timeLeft, canvas.width - 150, 35); // Adjusted position and padding
  // Reset shadow for other elements to not get affected
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
}

// Player properties
const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 45, // Adjust based on your image's size
  height: 45,
  speed: 0.8, // Adjust speed for control
  dx: 0,
  dy: 0,
};

// Coin properties
const coin = {
  x: Math.random() * (canvas.width - 35),
  y: Math.random() * (canvas.height - 35),
  width: 32,
  height: 32,
  isVisible: true,
};

// Score
let score = 0;

function drawCoin() {
  if (coin.isVisible) {
    // Simplified glow effect
    ctx.shadowBlur = 10; // Reduced blur radius for better performance
    ctx.shadowColor = 'rgba(255, 215, 0, 0.8)'; // Gold-yellow glow to match a typical coin color

    // Draw the coin image with a simplified glow effect
    ctx.drawImage(coinImage, coin.x, coin.y, coin.width, coin.height);

    // Reset shadow properties to avoid affecting other drawings
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
  }
}

function drawScore() {
  ctx.font = '24px Georgia'; // Matching font for consistency
  ctx.fillStyle = '#FFA07A'; // Light salmon color for a gentle, fun vibe
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 3;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Consistent shadow styling
  ctx.fillText('Treats Secured: ' + score, canvas.width - 450, 35); // Provide more room for text
  // Reset shadow after drawing
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 0;
}

/// Array to track which keys are currently pressed
const keysPressed = {};

// Inside handleKeydown and handleKeyup, adjust the player's dx and dy directly.
// Example modification for handleKeydown:
function handleKeydown(e) {
  keysPressed[e.key] = true;

  player.dx = 0; // Reset dx and dy to prevent unintended speed accumulation
  player.dy = 0;

  if (keysPressed['ArrowRight'] || keysPressed['d'])
    player.dx = initialPlayerSpeed;
  if (keysPressed['ArrowLeft'] || keysPressed['a'])
    player.dx = -initialPlayerSpeed;
  if (keysPressed['ArrowUp'] || keysPressed['w'])
    player.dy = -initialPlayerSpeed;
  if (keysPressed['ArrowDown'] || keysPressed['s'])
    player.dy = initialPlayerSpeed;
}

// Example adjustment for handleKeyup:
function handleKeyup(e) {
  keysPressed[e.key] = false;

  // If the key released corresponds to the current movement direction, stop the movement
  if ((e.key === 'ArrowRight' || e.key === 'd') && player.dx > 0) player.dx = 0;
  if ((e.key === 'ArrowLeft' || e.key === 'a') && player.dx < 0) player.dx = 0;
  if ((e.key === 'ArrowUp' || e.key === 'w') && player.dy < 0) player.dy = 0;
  if ((e.key === 'ArrowDown' || e.key === 's') && player.dy > 0) player.dy = 0;
}

document.addEventListener('keydown', handleKeydown);
document.addEventListener('keyup', handleKeyup);

function update() {
  // Attempt to move horizontally first
  let horizontalCollision = checkCollisionWithObstacles(
    player.x + player.dx,
    player.y,
    player.width,
    player.height
  );

  if (!horizontalCollision) {
    player.x += player.dx;
  } else {
    // Adjust for sliding, if necessary
  }

  // Then attempt to move vertically
  let verticalCollision = checkCollisionWithObstacles(
    player.x,
    player.y + player.dy,
    player.width,
    player.height
  );

  if (!verticalCollision) {
    player.y += player.dy;
  } else {
    // Adjust for sliding, if necessary
  }

  // Ensure player doesn't move off-screen
  enforceCanvasBounds();
}

function enforceCanvasBounds() {
  // Adjust the boundary checks to account for the size of the player
  const rightBound = canvas.width - player.width;
  const bottomBound = canvas.height - player.height;

  // Ensure player doesn't move off-screen
  player.x = Math.max(0, Math.min(rightBound, player.x));
  player.y = Math.max(0, Math.min(bottomBound, player.y));
}

function playBackgroundMusic() {
  backgroundMusic.currentTime = 0; // Reset music to the beginning
  backgroundMusic.play();
}

function stopBackgroundMusic() {
  backgroundMusic.pause();
}

// Draw player with image
function drawPlayer() {
  ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

// Clear canvas
function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkCollision() {
  if (
    player.x < coin.x + coin.width &&
    player.x + player.width > coin.x &&
    player.y < coin.y + coin.height &&
    player.y + player.height > coin.y &&
    coin.isVisible
  ) {
    playCoinSound();
    // Reset coin position within the canvas, ensuring it doesn't spawn off-screen
    const rightBound = canvas.width - coin.width;
    const bottomBound = canvas.height - coin.height;

    coin.x = Math.random() * rightBound;
    coin.y = Math.random() * bottomBound;
    score += 1; // Increase score by 1 for each coin collected
  }
}

// Updated game loop
function gameLoop() {
  if (gameRunning) {
    clear();
    update();
    checkCollision();
    drawPlayer();
    drawCoin();
    drawObstacles(); // Draw obstacles
    drawScore();
    drawTimer(); // Draw updated timer

    // Check for obstacle collision inside the game loop
    obstacles.forEach((obstacle) => {
      if (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
      ) {
        // Player collided with obstacle, stop player movement
        player.dx = 0;
        player.dy = 0;
        // You can add more actions here, like decreasing player health or displaying a message
      }
    });

    requestAnimationFrame(gameLoop);

    // Check if time is up
    if (timeLeft <= 0) {
      endGame();
    }
  }
}

// Start the game loop once the player image has loaded
playerImage.onload = function () {
  gameLoop();
};

// Call startGame to initially load the game
startGame();
