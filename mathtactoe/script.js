// math tac toe
console.log("script connected!")

// to do:
// 1) add tie condition

// each user takes turns placing a number
// the first player to make a row that equals 15 wins

// list of available even numbers on right side
// available odd numbers on left side

// on p1 turn, only select from left side
// on p2 turn, only select from right side

// when number is selected, make board active
// whichever box user clicks, takes the value of the number and adds to the array


// define arrays of win conditions
// push the value of the placed number into the matching variable
// check if array.length = 3
// check all variables if they equal 15, user wins
// else next turn

// global vars
// make the tokens accessable
var $num1 = $('#num1'); $num2 = $('#num2'); $num3 = $('#num3'); $num4 = $('#num4'); $num5 = $('#num5'); $num6 = $('#num6'); $num7 = $('#num7'); $num8 = $('#num8'); $num9 = $('#num9');

// make the game board accessable
var $boxA = $('#a'); $boxB = $('#b'); $boxC = $('#c'); $boxD = $('#d'); $boxE = $('#e'); $boxF = $('#f'); $boxG = $('#g'); $boxH = $('#h'); $boxI = $('#i');

// win conditions
var win1 = []; win2 = []; win3 = []; win4 = []; win5 = []; win6 = []; win7 = []; win8 = [];

// number use states
// this should just be an object
var num1Used = false; num2Used = false; num3Used = false; num4Used = false; num5Used = false; num6Used = false; num7Used = false; num8Used = false; num9Used = false;

// box use states
// this should also be an object
var boxAUsed = false; boxBUsed = false; boxCUsed = false; boxDUsed = false; boxEUsed = false; boxFUsed = false; boxGUsed = false; boxHUsed = false; boxIUsed = false;
var boardActive = false;

// vars for the toast elements
var toastDiv = document.getElementById("toast"); toastImg = document.getElementById("img"); toastText = document.getElementById("desc")

// player instructions
var p1Message = document.getElementById("p1message"); p2Message = document.getElementById("p2message")

// vars for the turn change indicators
var $oddTokens = $('.oddTokens'); $evenTokens = $('.evenTokens')

var $description = $('h4'); $title = $('h1')
var tryAgain = '<a href="#" onclick="window.location.reload(true);">Another round?'

// odd's turn = 1, even's turn = 2
var nextTurn = 1;

function checkForWin () {

    boardActive = false

// check for a tie
if (num1Used && num2Used && num3Used && num4Used && num5Used && num6Used && num7Used && num8Used && num9Used) {
  $evenTokens.removeClass('activePlayer')
  $oddTokens.removeClass('activePlayer')
  $title.text('It\'s a tie!')
  $description.html(tryAgain)
  p1Message.innerHTML = ''
  p2Message.innerHTML = ''
  // console.log("tie!")
} else {

  for (i = 1; i < 9; i++) {
    var currentArr = eval('win'+i)
    if (currentArr.length >= 3) {
      console.log(currentArr)
    // console.log("checking array",currentArr)
    var winningNumbers = currentArr.reduce((a, b) => a + b, 0)
  }
    // console.log(winningNumbers)
    if (winningNumbers === 15) {
      if (nextTurn === 1) {
        // console.log("Player two wins!")
        $title.text('Player Two Wins!')
        $description.html(tryAgain)
        $evenTokens.removeClass('activePlayer').addClass('winPlayer')
        p2Message.innerHTML = ''
        nextTurn = 3
      } else {
        // console.log("Player one wins!")
        $title.text('Player One Wins!')
        $description.html(tryAgain)
        $oddTokens.removeClass('activePlayer').addClass('winPlayer')
        p1Message.innerHTML = ''
        nextTurn = 3
      }
      break;
    } else if (i === 8 && nextTurn === 2) {
      evenTurn()
      // console.log("even's turn is next")
    } else if (i === 8 && nextTurn === 1) {
      oddTurn()
      // console.log("odd's turn is next")
    }
  }
}}


// user selects a number, then selects a box
// place the number selected into the box and array

// make the numbers live

var currentToken

function oddTurn () {

if (nextTurn === 1) {

  $evenTokens.removeClass('activePlayer')
  $oddTokens.addClass('activePlayer')

  // toastImg.innerHTML = '<img src="frog.png">'
  // launchToast('Player One, make your move!')

  p2Message.innerHTML = ''
  p1Message.innerHTML = 'Select a number,<br>then click to place it.'

if (!num1Used) {
  $num1.one('click', function() {
    if (nextTurn === 1) {
    $num1.addClass('usedToken')
    boardActive = true
    currentToken = 1
    placeToken()
    nextTurn = 2
    num1Used = true
  }})}

if (!num3Used){
  $num3.one('click', function() {
    if (nextTurn === 1) {
    $num3.addClass('usedToken')
    boardActive = true
    currentToken = 3
    placeToken()
    nextTurn = 2
    num3Used = true
  }})}

if (!num5Used) {
  $num5.one('click', function() {
    if (nextTurn === 1) {
    $num5.addClass('usedToken')
    boardActive = true
    currentToken = 5
    placeToken()
    nextTurn = 2
    num5Used = true
  }})}

if (!num7Used) {
  $num7.one('click', function() {
    if (nextTurn === 1) {
    $num7.addClass('usedToken')
    boardActive = true
    currentToken = 7
    placeToken()
    nextTurn = 2
    num7Used = true
  }})}

if (!num9Used) {
  $num9.one('click', function() {
    if (nextTurn === 1) {
    $num9.addClass('usedToken')
    boardActive = true
    currentToken = 9
    placeToken()
    nextTurn = 2
    num9Used = true
  }})}
}}

function evenTurn () {
// console.log(nextTurn)
if (nextTurn === 2) {

  $oddTokens.removeClass('activePlayer')
  $evenTokens.addClass('activePlayer')

  // toastImg.innerHTML = '<img src="panda_face.png">'
  // launchToast('Player Two, make your move!')

  p1Message.innerHTML = ''
  p2Message.innerHTML = 'Select a number,<br>then click to place it.'

if (!num2Used) {
  $num2.one('click', function() {
    if (nextTurn === 2) {
    $num2.addClass('usedToken')
    boardActive = true
    currentToken = 2
    placeToken()
    nextTurn = 1
    num2Used = true
  }})}

if (!num4Used) {
  $num4.one('click', function() {
    if (nextTurn === 2) {
    $num4.addClass('usedToken')
    boardActive = true
    currentToken = 4
    placeToken()
    nextTurn = 1
    num4Used = true
  }})}

if (!num6Used) {
  $num6.one('click', function() {
    if (nextTurn === 2) {
    $num6.addClass('usedToken')
    boardActive = true
    currentToken = 6
    placeToken()
    nextTurn = 1
    num6Used = true
  }})}

if (!num8Used) {
  $num8.one('click', function() {
    if (nextTurn === 2) {
    $num8.addClass('usedToken')
    boardActive = true
    currentToken = 8
    placeToken()
    nextTurn = 1
    num8Used = true
  }})}
}}

// game board

function placeToken () {

// turns out that feeding the token value as an arugment
// stores the first argument value in all the event handlers forever,
// even when a new argument is passed to the parent function
// ugh

if (boardActive) {

  if(!boxAUsed) {
    $boxA.one('click', function() {
    if (boardActive) {
    $boxA.addClass('usedBox')
    $boxA.text(currentToken)
    win1.push(currentToken)
    win4.push(currentToken)
    win7.push(currentToken)
    boxAUsed = true
    checkForWin()
  }})}

  if (!boxBUsed) {
  $boxB.one('click', function() {
    if (boardActive) {
    $boxB.addClass('usedBox')
    $boxB.text(currentToken)
    win2.push(currentToken)
    win4.push(currentToken)
    boxBUsed = true;
    checkForWin()
  }})}

  if (!boxCUsed) {
  $boxC.one('click', function() {
    if (boardActive) {
    $boxC.addClass('usedBox')
    $boxC.text(currentToken)
    win3.push(currentToken)
    win4.push(currentToken)
    win8.push(currentToken)
    boxCUsed = true;
    checkForWin()
  }})}

  if (!boxDUsed) {
  $boxD.one('click', function() {
    if (boardActive) {
    $boxD.addClass('usedBox')
    $boxD.text(currentToken)
    win1.push(currentToken)
    win5.push(currentToken)
    boxDUsed = true;
    checkForWin()
  }})}

  if (!boxEUsed) {
  $boxE.one('click', function() {
    if (boardActive) {
    $boxE.addClass('usedBox')
    $boxE.text(currentToken)
    win2.push(currentToken)
    win5.push(currentToken)
    win7.push(currentToken)
    win8.push(currentToken)
    boxEUsed = true;
    checkForWin()
  }})}

  if (!boxFUsed) {
  $boxF.one('click', function() {
    if (boardActive) {
    $boxF.addClass('usedBox')
    $boxF.text(currentToken)
    win3.push(currentToken)
    win5.push(currentToken)
    boxFUsed = true;
    checkForWin()
  }})}

  if (!boxGUsed) {
  $boxG.one('click', function() {
    if (boardActive) {
    $boxG.addClass('usedBox')
    $boxG.text(currentToken)
    win1.push(currentToken)
    win6.push(currentToken)
    win8.push(currentToken)
    boxGUsed = true;
    checkForWin()
  }})}

  if (!boxHUsed) {
  $boxH.one('click', function() {
    if (boardActive) {
    $boxH.addClass('usedBox')
    $boxH.text(currentToken)
    win2.push(currentToken)
    win6.push(currentToken)
    boxHUsed = true;
    checkForWin()
  }})}

  if (!boxIUsed) {
  $boxI.one('click', function() {
    if (boardActive) {
    $boxI.addClass('usedBox')
    $boxI.text(currentToken)
    win3.push(currentToken)
    win6.push(currentToken)
    win7.push(currentToken)
    boxIUsed = true;
    checkForWin()
  }})}

}}

// Now for the toast code from
// Pierre Smith
// https://codepen.io/kipp0/pen/pPNrrj
// and emoji images courtesy of
// https://www.webpagefx.com/tools/emoji-cheat-sheet/

function launchToast(str) {
    toastText.textContent = str;
    toastDiv.className = "show";
    setTimeout(function(){ toastDiv.className = toastDiv.className.replace("show", ""); }, 5000);
}

function startGame () {
  // set the style for player one
  // toastImg.innerHTML = '<img src="checkered_flag.png">'
  // launchToast('Welcome to the game!')
  setTimeout(oddTurn, 1000)
}


startGame();
