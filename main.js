// Get the HTML elements with DOM
const startButton = document.querySelector(".start-button")
const selectionDiv = document.querySelector(".selection-div")
const displayResult = document.querySelector(".display-result-section")
const selectionBtn = document.querySelectorAll(".selection-btn") 
const startGameDiv = document.querySelector(".startgame")
const scoreDashBoard = document.querySelector(".score-dashboard")
const userInputResult = document.querySelector(".userInputResult")
const computerInputResult = document.querySelector(".computerInputResult")

// Initialize game variables
let playerScore = 0;
let computerScore = 0;
let eachRound = 0;
let eachGame = 5;

// Start the game
startButton.addEventListener("click", () => {
  selectionDiv.style.display = "block";
  startGameDiv.style.display = "none";

  // Reset game when starting
  playerScore = 0;
  computerScore = 0;
  eachRound = 0;
  updateScoreDisplay();

  displayResult.textContent = ""; // clear old results
})

// Add event listeners to selection buttons
selectionBtn.forEach((button) => {
  button.addEventListener("click", playGame)
})

function updateScoreDisplay() {
  scoreDashBoard.textContent = `Player: ${playerScore} | Computer: ${computerScore} | Round: ${eachRound}/${eachGame}`;
}

function getComputerChoice() {
  let randomGameNumber = Math.random();
  let computerMove = "";

  if (randomGameNumber <= 0.3) {
    computerMove = "Rock";
  } else if (randomGameNumber > 0.3 && randomGameNumber <= 0.6) {
    computerMove = "Paper";
  } else {
    computerMove = "Scissors";
  }

  computerInputResult.textContent = `Computer picked ${computerMove}`;
  return computerMove;
}

function playGame(e) {
  if (eachRound >= eachGame) {
    return; // game already over
  }

  // Get player's input (strip emoji)
  let userInput = e.target.textContent.trim().split(" ")[0];
  userInputResult.textContent = `You chose ${userInput}`;

  // Increment round
  eachRound++;

  let computerMove = getComputerChoice();

  // Determine winner
  let roundResult = "";

  if (userInput === computerMove) {
    roundResult = "It's a tie!";
  } else if (
    (userInput === "Rock" && computerMove === "Scissors") ||
    (userInput === "Scissors" && computerMove === "Paper") ||
    (userInput === "Paper" && computerMove === "Rock")
  ) {
    roundResult = `You chose ${userInput} and computer chose ${computerMove}. You win this round!`;
    playerScore++;
  } else {
    roundResult = `You chose ${userInput} and computer chose ${computerMove}. You lose this round!`;
    computerScore++;
  }

  // Show round result separately
  displayResult.textContent = roundResult;

  // Update scoreboard
  updateScoreDisplay();

  // Check if game is over
  setTimeout(() => {
    if (eachRound >= eachGame) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  let finalMessage = "";

  if (playerScore > computerScore) {
    finalMessage = `🎉 Game Over! You won ${playerScore}-${computerScore}! 🎉`;
  } else if (computerScore > playerScore) {
    finalMessage = `😔 Game Over! Computer won ${computerScore}-${playerScore}! Better luck next time!`;
  } else {
    finalMessage = `🤝 Game Over! It's a tie ${playerScore}-${computerScore}!`;
  }

  displayResult.textContent = finalMessage;

  // Reset UI after 3 seconds
  setTimeout(() => {
    scoreDashBoard.style.display = "none";
    displayResult.style.display = "none";
    selectionDiv.style.display = "none";
    startGameDiv.style.display = "block";
  }, 3000);
}
