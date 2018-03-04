const body = document.querySelector("body");
const container = document.querySelector(".gameContainer");
// const board = document.querySelector(".js-board");
const paintCan = document.querySelector(".js-paintCan");

const newColors = [
  { color: "bluePeg", letter: "B" },
  { color: "magentaPeg", letter: "M" },
  { color: "greenPeg", letter: "G" },
  { color: "orangePeg", letter: "O" },
  { color: "whitePeg", letter: "W" },
  { color: "redPeg", letter: "R" }
];

let pegBoard = [];
let masterCodeValues = [];
let feedbackMatrix = [];

// this can become user toggleable for difficulty level
const boardRows = 9;
const boardCells = 3;

// this value equals the number of rows until deincremented by nextTurn
let currentTurn = boardRows;
let currentColor;
let currentRow;
let keyCounter = 0;
let playerInitials = "Player";

// for the modal
// let modal1 = $(document).ready(function(){
//     $('.modal').modal();
//   });

class Pegs {
  constructor(id, color, match = 0) {
    this.color = color;
    this.id = id;
    // match 0 = no match, 1 = color match, 2 = color and location match
    this.match = match;
  }
}

class MasterCode {
  constructor(color) {
    this.color = color;
    this.match = false;
  }
}

// create the board
function createBoardAndPegBoardObj() {
  for (let x = 0; x <= boardRows; x++) {
    // create the html row
    let row = document.createElement("div");
    row.classList.add("row", "js-row" + x);
    container.appendChild(row);
    // make an array for this row
    let rowArr = [];

    for (let y = 0; y <= boardCells; y++) {
      // create the html elements
      let newDiv = document.createElement("div");
      newDiv.classList.add("emptyPeg");
      newDiv.id = "" + x + y;
      row.appendChild(newDiv);
      // push the new object to the row array
      let newPeg = new Pegs("" + x + y);
      rowArr.push(newPeg);
    }
    // push the row array to the pegBoard
    pegBoard.push(rowArr);
  }
}

function printPlayerName() {
  let playerName = document.createElement("div");
  playerName.classList.add("playerInitals");
  playerName.textContent = `Welcome, ${playerInitials}`;
  container.appendChild(playerName);
}

function createGuessButton() {
  let guessButton = document.createElement("button");
  guessButton.classList.add(
    `guessButton`,
    `waves-effect`,
    `waves-light`,
    `btn`,
    `blue-grey`,
    `darken-2`
  );
  guessButton.textContent = "Guess";
  guessButton.addEventListener("click", runCheckGuessButton);
  paintCan.appendChild(guessButton);
}

function showInstructions(stage) {
  let genericFeedbackInstructions = `<p><div class="feedbackPegFull" style="position:relative; top:2px; float: left;"></div>For each black peg, one of your guesses was the correct color in the correct location.<br><div class="feedbackPegHalf" style="position:relative; top:3px; float: left;"></div>For each white peg, one of your guesses was the correct color but in the wrong location.</p>`;
  switch (stage) {
    case 0:
      let instructions = document.createElement("div");
      instructions.classList.add(
        "instructions",
        "card-panel",
        "blue-grey",
        "lighten-3"
      );
      instructions.innerHTML = `<p>Welcome to the game! The mastermind has selected a secret code. Your have ${boardRows +
        1} turns to guess it!</p><p style="text">Start by selecting a color and placing it in the highlighted row. You can also use your keyboard.</p>`;
      container.appendChild(instructions);
      break;
    case 1:
      document.querySelector(
        ".instructions"
      ).innerHTML = `<p>You're on the right track!</p>${genericFeedbackInstructions}`;
      break;
    case 2:
      document.querySelector(
        ".instructions"
      ).innerHTML = `<p>You're so close!</p>${genericFeedbackInstructions}`;
      break;
    case 3:
      document.querySelector(
        ".instructions"
      ).innerHTML = `<p>None of your guesses match the master code. Make another guess!</p>`;
      break;
    case 4:
      document.querySelector(
        ".instructions"
      ).innerHTML = `Better luck next time!`;
      break;
    case 5:
      document.querySelector(
        ".instructions"
      ).innerHTML = `Congrats, you beat the mastermind!`;
      break;
    case 6:
      document.querySelector(
        ".instructions"
      ).innerHTML = `<h5>Last turn!<br>You can do this.</h5><p>Go over the feedback from your previous guesses, and when you're ready, lock in that final guess.`;
  }
}

function runCheckGuessButton() {
  let activePegs = document.querySelectorAll(".activePeg");
  if (activePegs.length != 0) {
    Materialize.toast(`Looks like you're missing a guess.`, 2000);
  } else {
    checkGuess(currentTurn);
  }
}

function createPaintCan() {
  for (let i = 0; i < newColors.length; i++) {
    let paintBrush = document.createElement("div");
    paintBrush.classList.add("paintBrush", newColors[i].color);
    paintBrush.id = newColors[i].color;
    paintBrush.innerHTML = `${newColors[i].letter}`;
    paintBrush.addEventListener("click", highlightPaintCan);
    paintCan.appendChild(paintBrush);
  }
}

function assignPaintColor(evt) {
  // remove all paintbrush active classes
  let id = evt.target.id;
  evt.target.classList.remove(
    "whitePeg",
    "magentaPeg",
    "orangePeg",
    "bluePeg",
    "redPeg",
    "greenPeg",
    "activePeg",
    "emptyPeg"
  );
  pegBoard[id[0]][id[1]].color = currentColor;
  // solving for edge case when user clicks peg before selecting color
  if (currentColor != undefined) {
    evt.target.classList.add(currentColor);
  }
}

function makePegRowKeyboardActive() {
  document.addEventListener("keydown", assignKeyboardPainter);
}

function assignKeyboardPainter(evt) {
  if (evt.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  switch (evt.keyCode) {
    case 66:
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.add("bluePeg");
      pegBoard[currentTurn][keyCounter].color = "bluePeg";
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.remove("activePeg", "emptyPeg");
      keyCounter++;
      break;
    case 77:
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.add("magentaPeg");
      pegBoard[currentTurn][keyCounter].color = "magentaPeg";
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.remove("activePeg", "emptyPeg");
      keyCounter++;
      break;
    case 71:
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.add("greenPeg");
      pegBoard[currentTurn][keyCounter].color = "greenPeg";
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.remove("activePeg", "emptyPeg");
      keyCounter++;
      break;
    case 79:
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.add("orangePeg");
      pegBoard[currentTurn][keyCounter].color = "orangePeg";
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.remove("activePeg", "emptyPeg");
      keyCounter++;
      break;
    case 87:
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.add("whitePeg");
      pegBoard[currentTurn][keyCounter].color = "whitePeg";
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.remove("activePeg", "emptyPeg");
      keyCounter++;
      break;
    case 82:
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.add("redPeg");
      pegBoard[currentTurn][keyCounter].color = "redPeg";
      document
        .getElementById(pegBoard[currentTurn][keyCounter].id)
        .classList.remove("activePeg", "emptyPeg");
      keyCounter++;
      break;
    case 13:
      runCheckGuessButton();
    // checkGuess(currentTurn);
    default:
      return; // Quit when this doesn't handle the key event.
  }
  if (keyCounter > boardCells) {
    setTimeout(function() {
      if (keyCounter > boardCells) {
        Materialize.toast(`Press return to submit your guess.`, 1500);
      }
    }, 2000);
  }
  evt.preventDefault();
}

function assignPegRowEventListeners(turn) {
  for (i = 0; i < pegBoard[0].length; i++) {
    let pegDiv = document.getElementById(pegBoard[turn][i].id);
    pegDiv.addEventListener("click", assignPaintColor);
  }
}

function removePegRowEventListeners(turn) {
  let oldTurn = turn + 1;
  // console.log("turning off previous listeners from", oldTurn);
  for (i = 0; i < pegBoard[0].length; i++) {
    let pegDiv = document.getElementById(pegBoard[oldTurn][i].id);
    pegDiv.removeEventListener("click", assignPaintColor);
    pegDiv.removeEventListener("keydown", assignKeyboardPainter);
  }
}

function highlightPaintCan(evt) {
  currentColor = evt.target.id;
  let allBrushes = document.querySelectorAll(".paintBrush");
  // omg so this is the only easy way to loop over a node list
  for (let brush of allBrushes) {
    brush.classList.remove("activePaintColor");
  }
  evt.target.classList.add("activePaintColor");
}

function createMasterCodes() {
  // debugger;
  let choices = newColors.length;
  let counter = boardCells + 1;
  for (i = 0; i < counter; i++) {
    while (counter > 0) {
      let index = Math.floor(Math.random() * choices);
      counter--;
      // swap the last element with it
      newColors[choices] = newColors[index];
      let masterCode = new MasterCode(newColors[index].color);
      masterCodeValues.push(masterCode);
    }
  }
}

function appendMasterCodesDiv() {
  let masterCodeDiv = document.createElement("div");
  masterCodeDiv.classList.add(
    "masterCodeDiv",
    "card-panel",
    "blue-grey",
    "darken-2",
    "fade"
  );
  document.querySelector(".paintCan").style.display = "none";
  for (i = 0; i < masterCodeValues.length; i++) {
    let eachMasterCode = document.createElement("div");
    eachMasterCode.classList.add("masterCode");
    eachMasterCode.classList.add(masterCodeValues[i].color);
    masterCodeDiv.appendChild(eachMasterCode);
  }
  container.appendChild(masterCodeDiv);
}

function setMasterCodesFalse() {
  for (let i = 0; i < masterCodeValues.length; i++) {
    masterCodeValues[i].match = false;
  }
}

function createFeedbackDiv() {
  // get the div
  let feedbackWrapper = document.querySelector(".feedbackWrapper");
  // create the row in the div
  for (i = 0; i <= boardRows; i++) {
    let feedbackRow = document.createElement("div");
    feedbackRow.classList.add("feedbackRow", i);
    // create the four boxes
    for (x = 0; x <= boardCells; x++) {
      let feedbackPeg = document.createElement("div");
      feedbackPeg.classList.add("feedbackPeg");
      feedbackPeg.id = "f" + i + x;
      feedbackRow.appendChild(feedbackPeg);
    }
    container.appendChild(feedbackRow);
  }
}

// sort this array after generating it
function makeFeedbackArray(turn) {
  for (let i = 0; i < pegBoard[turn].length; i++) {
    feedbackMatrix.push(pegBoard[turn][i].match);
    // console.log(feedbackMatrix);
    feedbackMatrix.sort();
    // console.log(feedbackMatrix)
  }
  // console.log("feedback:", feedbackMatrix);
}

function checkScore() {
  let score = feedbackMatrix.reduce((a, b) => a + b);
  if (score === 8) {
    console.log("you win");
    showInstructions(5);
    appendMasterCodesDiv();
  } else if (currentTurn < 1) {
    console.log("you lost");
    showInstructions(4);
    appendMasterCodesDiv();
  } else if (currentTurn < 2) {
    printFeedback();
    showInstructions(6);
    nextTurn();
  } else if (score === 0) {
    printFeedback();
    showInstructions(3);
    nextTurn();
  } else if (score > 4) {
    printFeedback();
    showInstructions(2);
    nextTurn();
  } else if (score > 1) {
    printFeedback();
    showInstructions(1);
    nextTurn();
  } else {
    printFeedback();
    showInstructions(1);
    nextTurn();
  }
}

function printFeedback() {
  // get dom elements for current turn ('f' + x + i)
  // 'f' prepends the element id, x = current turn, i = element index
  for (i = 0; i <= boardCells; i++) {
    let feedbackPeg = document.getElementById(`f${currentTurn}${i}`);
    // console.log(feedbackPeg);
    // console.log(`print ${feedbackMatrix[i]}`);
    switch (feedbackMatrix[i]) {
      case 0:
        // feedbackPeg.classList.add("noMatch");
        break;
      case 1:
        feedbackPeg.classList.remove("feedbackPeg");
        feedbackPeg.classList.add("feedbackPegHalf");
        break;
      case 2:
        feedbackPeg.classList.remove("feedbackPeg");
        feedbackPeg.classList.add("feedbackPegFull");
    }
  }
}

function checkGuess(turn) {
  // for each item check for full matches
  for (let i = 0; i < masterCodeValues.length; i++) {
    if (pegBoard[turn][i].color === masterCodeValues[i].color) {
      // console.log(pegBoard[turn][i].color,masterCodeValues[i].color,"full match")
      pegBoard[turn][i].match = 2;
      masterCodeValues[i].match = true;
    }
  }
  for (let i = 0; i < masterCodeValues.length; i++) {
    if (pegBoard[turn][i].match === 0) {
      for (let x = 0; x < masterCodeValues.length; x++) {
        if (
          pegBoard[turn][i].color === masterCodeValues[x].color &&
          masterCodeValues[x].match === false &&
          pegBoard[turn][i].match === 0
        ) {
          // console.log("master code",masterCodeValues)
          // console.log("peg board",pegBoard[turn])
          // console.log(pegBoard[turn][i].color,masterCodeValues[x].color,"half match")
          pegBoard[turn][i].match = 1;
          masterCodeValues[x].match = true;
        }
      }
    }
  }
  makeFeedbackArray(currentTurn);
  keyCounter = 0;
  checkScore();
}

function nextTurn() {
  // currentRow.classList.remove('activePeg')
  feedbackMatrix = [];
  currentTurn--;
  currentRow = document.querySelectorAll(`.row`)[currentTurn];
  setMasterCodesFalse();
  applyActivePegStyle();
  // reassign the event listeners
  removePegRowEventListeners(currentTurn);
  assignPegRowEventListeners(currentTurn);
  makePegRowKeyboardActive(currentTurn);
  // currentRow.children.classList.add('activePeg')
}

function modalForm() {
  let form = document.querySelector(".input-field");
  let nameInput = document.querySelector(".playerInitials");
  form.addEventListener("submit", function(evt) {
    evt.preventDefault();
    playerInitials = nameInput.value.toUpperCase();
    printPlayerName();
  });
}

function applyActivePegStyle() {
  for (i = 0; i <= boardCells; i++) {
    let activePeg = currentRow.children[i];
    activePeg.classList.add("activePeg");
  }
}

function youLost() {
  showInstructions(3);
}

function youWin() {
  showInstructions(4);
}

function init() {
  currentTurn = boardRows;
  createBoardAndPegBoardObj();
  currentRow = document.querySelectorAll(`.row`)[currentTurn];
  applyActivePegStyle();
  createPaintCan();
  createFeedbackDiv();
  assignPegRowEventListeners(currentTurn);
  createMasterCodes();
  createGuessButton();
  showInstructions(0);
  makePegRowKeyboardActive();
  //  $('#modal1').modal().modal('open');
  //  modalForm()
  console.log("the master code is", masterCodeValues);
  printPlayerName();
}

init();
