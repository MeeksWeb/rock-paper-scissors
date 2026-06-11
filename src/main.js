import "./style.css";

const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissors = document.querySelector(".scissors");
const playerMove = document.querySelector(".player-move");
const computerMove1 = document.querySelector(".computer-move");
const outcome = document.querySelector(".outcome");
const winScore = document.querySelector(".score-wins");
const loseScore = document.querySelector(".score-losses");
const drawScore = document.querySelector(".score-draws");
const resetBtn = document.querySelector(".reset-btn");

let computerChoice = "";
let result = "";
let wins = 0;
let losses = 0;
let draws = 0;

function randomNum() {
  const randomNumber = Math.floor(Math.random() * 12) + 1;

  if (randomNumber <= 4) {
    computerChoice = "Rock";
  } else if (randomNumber > 4 && randomNumber <= 8) {
    computerChoice = "Paper";
  } else if (randomNumber > 8 && randomNumber <= 12) {
    computerChoice = "Scissors";
  }
  return computerChoice;
}

function rockChoice() {
  const computerChose = randomNum();
  if (computerChoice === "Rock") {
    result = "It's a tie";
  } else if (computerChoice === "Paper") {
    result = "You lost";
  } else if (computerChoice === "Scissors") {
    result = "You won";
  }

  playerMove.textContent = "Rock";
  computerMove1.textContent = computerChose;
  resultColor(result);
  allScores(result);
  // checkRound()
}

function paperChoice() {
  const computerChose = randomNum();
  if (computerChoice === "Rock") {
    result = "You won";
  } else if (computerChoice === "Paper") {
    result = "It's a tie";
  } else if (computerChoice === "Scissors") {
    result = "You lost";
  }
  playerMove.textContent = "Paper";
  computerMove1.textContent = computerChose;
  resultColor(result);
  allScores(result);
}

function scissorsChoice() {
  const computerChose = randomNum();
  if (computerChoice === "Rock") {
    result = "You lost";
  } else if (computerChoice === "Paper") {
    result = "You won";
  } else if (computerChoice === "Scissors") {
    result = "It's a tie";
  }
  playerMove.textContent = "Scissors";
  computerMove1.textContent = computerChose;
  resultColor(result);
  allScores(result);
}

function allScores(gameResult) {
  if (gameResult === "You won") {
    winScore.textContent = ++wins;
  } else if (gameResult === "You lost") {
    loseScore.textContent = ++losses;
  } else if (gameResult === "It's a tie") {
    drawScore.textContent = ++draws;
  }
  const currentScoreObject = storageScore(wins, losses, draws);
  addItemToStorage(currentScoreObject);
  checkRound();
}

function displayResults() {
  const scoreObject = getFromStorage();

  scoreObject.forEach((element) => {
    //update them
    wins = element.wins;
    losses = element.losses;
    draws = element.draws;

    // send to screen
    winScore.textContent = wins;
    loseScore.textContent = losses;
    drawScore.textContent = draws;
  });
}

const storageScore = (win, loss, draw) => {
  return {
    wins: win,
    losses: loss,
    draws: draw,
  };
};

//a function to check color of result
function resultColor(gameResult) {
  if (gameResult === "You won") {
    outcome.textContent = gameResult;
    outcome.className =
      "text-green-500 bg-green-500/10 w-50 border border-green-500 px-4 py-1 rounded-full text-center";
  } else if (gameResult === "You lost") {
    outcome.textContent = gameResult;
    outcome.className =
      "text-red-500 bg-red-500/10 w-50 border border-red-500 px-4 py-1 rounded-full text-center";
  } else if (gameResult === "It's a tie") {
    outcome.textContent = gameResult;
    outcome.className =
      "text-yellow-500 bg-yellow-500/10 w-50 border border-yellow-500 px-4 py-1 rounded-full text-center";
  }
}

//a function to set the score to 0
function clearScore() {
  const scoreObject = getFromStorage();
  if (confirm("Are you sure to clear all scores?")) {
    localStorage.clear();
    wins = 0;
    losses = 0;
    draws = 0;
    winScore.textContent = 0;
    loseScore.textContent = 0;
    drawScore.textContent = 0;
    playerMove.textContent = "-";
    computerMove1.textContent = "-";
    outcome.textContent = "";
    outcome.className = "";
  }
}

//without the confirm
function clearScore2() {
  const scoreObject = getFromStorage();
  localStorage.clear();
  wins = 0;
  losses = 0;
  draws = 0;
  winScore.textContent = 0;
  loseScore.textContent = 0;
  drawScore.textContent = 0;
  playerMove.textContent = "-";
  computerMove1.textContent = "-";
  outcome.textContent = "";
  outcome.className = "";
}

function getFromStorage() {
  let itemFromStorage;
  if (localStorage.getItem("items") === null) {
    itemFromStorage = [];
  } else {
    itemFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemFromStorage;
}

function addItemToStorage(item) {
  const itemFromStorage = getFromStorage();
  itemFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}

function checkRound() {

  if (wins === 12) {
    alert("You won this round");
    clearScore2();
  }
  if (losses === 12) {
    alert("You lost this round");
    clearScore2();
  } else if (draws === 12) {
    alert("This round ended in a tie");
    clearScore2();
  }
}

rock.addEventListener("click", rockChoice);
paper.addEventListener("click", paperChoice);
scissors.addEventListener("click", scissorsChoice);
resetBtn.addEventListener("click", clearScore);
document.addEventListener("DOMContentLoaded", displayResults); // LocalStorage
