const sectionSteps = document.querySelectorAll("section");
const optionsButtons = document.querySelectorAll(".choose__option");
const gameResultInformation = document.querySelector(".comparsion__result");
const playerPoints = document.querySelector(".points__player");
const computerPoints = document.querySelector(".points__computer");
const computerChoiceImg = document.querySelector(".comparsion__computer img");
const playerChoiceImg = document.querySelector(".comparsion__player img");
const statusInformation = document.querySelector(".status-information");
const statusInformationText = document.querySelector(
  ".status-information__text"
);
const endGameInformation = document.querySelector(".end-game-information");
const endGamePopup = document.querySelector(".end-game-popup");
const endPlayerPoints = document.querySelector(".end-player-points");
const endComputerPoints = document.querySelector(".end-computer-points");
const tryAgainButton = document.querySelector(".try-again");

// stores number of wins players and computer
const numberOfWins = {
  playerWins: 0,
  computerWins: 0,
};

// stores options which can computer choose
const aiOptions = ["rock", "paper", "scissors"];

// take random option from aiOptions
function getComputerChoice() {
  return aiOptions[Math.floor(Math.random() * 3)];
}

// stores computerchoice
let computerChoice = getComputerChoice();

// reset all values for the animations to load
function resetValues() {
  computerChoice = getComputerChoice();
  computerChoiceImg.style.scale = "0";
  gameResultInformation.style.width = "0px";
  gameResultInformation.style.height = "0px";
  gameResultInformation.style.color = "transparent";
  statusInformationText.textContent = "Choose!";
}

// display what computer choose and animation to show text load
function displayResult() {
  // everything follows after copule of seconds
  setTimeout(() => {
    computerChoiceImg.src = `/img/${computerChoice}.png`;
    computerChoiceImg.style.scale = "1";
    setTimeout(() => {
      gameResultInformation.style.width = "200px";
      gameResultInformation.style.height = "100px";
      gameResultInformation.style.color = "white";
      setTimeout(() => {
        changeStep();
        statusInformationText.textContent = "Points";
        setTimeout(() => {
          if (numberOfWins.playerWins == 1) {
            playerWins();
          } else if (numberOfWins.computerWins == 1) {
            computerWins();
          } else {
            changeStep();
          }
        }, 2000);
      }, 2000);
    }, 1000);
  }, 500);
}

let step = 0;
// change display
function changeStep() {
  sectionSteps[step].classList.add("hide");
  if (step == 2) {
    step = 0;
    resetValues();
  } else {
    step++;
  }
  sectionSteps[step].classList.remove("hide");
}

function resetGame() {
  numberOfWins.computerWins = 0;
  numberOfWins.playerWins = 0;
  playerPoints.textContent = numberOfWins.playerWins;
  computerPoints.textContent = numberOfWins.computerWins;
  step = 0;
  resetValues();
  sectionSteps[0].classList.remove("hide");
  endGamePopup.classList.add("hide");
  statusInformation.classList.remove("hide");
}

function displayFinalResult() {
  endPlayerPoints.textContent = numberOfWins.playerWins;
  endComputerPoints.textContent = numberOfWins.computerWins;
  statusInformation.classList.add("hide");
  endGamePopup.classList.remove("hide");
  sectionSteps.forEach((sectionStep) => sectionStep.classList.add("hide"));
  tryAgainButton.addEventListener("click", resetGame);
}

function playerWins() {
  endGameInformation.textContent = "Congratulations You Win!!!";
  displayFinalResult();
}

function computerWins() {
  endGameInformation.textContent = "Computer Wins";
  displayFinalResult();
}

function whoWins(playerChoice, computerChoice) {
  displayResult();
  if (
    (playerChoice.toLowerCase() == "rock" && computerChoice == "scissors") ||
    (playerChoice.toLowerCase() == "scissors" && computerChoice == "paper") ||
    (playerChoice == "paper" && computerChoice == "rock")
  ) {
    gameResultInformation.textContent = "You Win!";
    numberOfWins.playerWins++;
    playerPoints.textContent = numberOfWins.playerWins;
  } else if (
    (playerChoice.toLowerCase() == "rock" && computerChoice == "paper") ||
    (playerChoice.toLowerCase() == "scissors" && computerChoice == "rock") ||
    (playerChoice == "paper" && computerChoice == "scissors")
  ) {
    gameResultInformation.textContent = "You Lose!";
    numberOfWins.computerWins++;
    computerPoints.textContent = numberOfWins.computerWins;
  } else if (playerChoice.toLowerCase() == computerChoice) {
    gameResultInformation.textContent = "Draw";
  }
}

function getPlayerChoice() {
  let playerChoice = this.dataset.option;
  playerChoiceImg.src = `img/${playerChoice}.png`;
  statusInformationText.textContent = "Check Result!";
  changeStep();
  whoWins(playerChoice, computerChoice);
}

optionsButtons.forEach((optionButton) =>
  optionButton.addEventListener("click", getPlayerChoice)
);
