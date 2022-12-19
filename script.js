// uzytkownik wybiera jedna z 3 opcji
// porownuje ja z komputerem
// jesli uzytkownik wybral kamien wygrywa z nozyczkami ale przegrywa z papierem
// jesli uzytkownik wybral nozyczki wygrywa z papierem ale przegrywa z kamieniem
//jesli uzytkownik wybral papier wygrywa z kamieniem ale przegrywa z nozyczkami
// jesli uzytkownik wygrywa dostaje o tym komunikat ze wygral
// jesli uzytkownik przegrywa dostaje o tym komunikat ze przegral
// jesli uzytkownik remisuje dostaje o tym komunikat ze zremisowal

//crate an array with 3 options to randomize
// uzytkownik wybiera jedna z 3 opcji i przypisuje do zmiennej
// computer randomize one of 3 options and assigns to variable
// then contiunes comparsion and
//     if users wins
//        then annoucment that he wins
//     else if computer wins
//        then annouccment that computer wins
//     else if draws
//        then annoucment that is draws
//     else if users put something diffrent than one of 3 options
//        then annoucment that he must put diffrent variable

// create an object which contains number of players win and number of computer win
// przekazac do funckji wybor gracza
// jesli gracz wybierze jedna z opcji przejs do etapu 2
// dodac animacje pojawiajacego sie wyniku kto wygral
// jesli gracz wygra zwiekszyc ilosc pkt dla niego i na odwrot
// na koncu wyswietlic wynik

const optionsButtons = document.querySelectorAll(".choose__option");
const gameResultInformation = document.querySelector(".comparsion__result");

// const playerPoints = document.querySelector(".points__player");
// const computerPoints = document.querySelector(".points__computer");
const computerChoiceImg = document.querySelector(".comparsion__computer img");

const numberOfWins = {
  playerWins: 0,
  aiWins: 0,
};

const aiOptions = ["rock", "paper", "scissors"];
function chooseRandomOption() {
  return aiOptions[Math.floor(Math.random() * 3)];
}
const computerChoice = chooseRandomOption();

function displayResult() {
  //dodac wlasciwosci do tekstu zeby sie pojawial po paru sekundach
  setTimeout(() => {
    computerChoiceImg.src = `/img/${computerChoice}.png`;
    computerChoiceImg.style.scale = "1";
    setTimeout(() => {
      gameResultInformation.style.width = "300px";
      gameResultInformation.style.height = "100px";
      gameResultInformation.style.color = "white";
      setTimeout(() => {
        changeStep();
      }, 2000);
    }, 1000);
  }, 500);

  // changeStep();
}

function whoWins(playerChoice, computerChoice) {
  displayResult();
  if (
    (playerChoice.toLowerCase() == "rock" && computerChoice == "scissors") ||
    (playerChoice.toLowerCase() == "scissors" && computerChoice == "paper") ||
    (playerChoice == "paper" && computerChoice == "rock")
  ) {
    console.log("Congratulations YOU WIN!");
  } else if (
    (playerChoice.toLowerCase() == "rock" && computerChoice == "paper") ||
    (playerChoice.toLowerCase() == "scissors" && computerChoice == "rock") ||
    (playerChoice == "paper" && computerChoice == "scissors")
  ) {
    console.log("YOU LOSE");
  } else if (playerChoice.toLowerCase() == computerChoice) {
    console.log("DRAW");
  }
}

let step = 0;
function changeStep() {
  const sectionSteps = document.querySelectorAll("section");

  if (step > 2) {
    step = 0;
  }

  sectionSteps[step].classList.add("hide");
  step++;
  sectionSteps[step].classList.remove("hide");
}

function getPlayerChoice() {
  let playerChoice = this.dataset.option;
  changeStep();
  whoWins(playerChoice, computerChoice);
}

optionsButtons.forEach((optionButton) =>
  optionButton.addEventListener("click", getPlayerChoice)
);
