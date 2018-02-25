// math tac toe

// each user takes turns placing a number

// the first player to make a row that equals 15 wins

//

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

var odd = [1,3,5,7,9]

var even = [2,4,6,8]


// win conditions

let win1 = []; win2 = []; win3 = []; win4 = []; win5 = []; win6 = []; win7 = []; win8 = [];

// game board
// let $boxa = $('#a'); $boxb = $('#b'); $boxc = $('#c'); $boxd = $('#d'); $boxe = $('#e'); $boxf = $('#f'); $boxg = $('#g'); $boxh = $('#h'); $boxi = $('#i');

// options

win1.push(2)
win1.push(5)
win1.push(8)

win7.push(2)
win7.push(5)
win7.push(8)

// console.log(win8)

function oddTurn () {

for (i = 1; i < 9; i++) {

  var currentArr = eval('win'+i)
  console.log("checking array",currentArr)

  var winningNumbers = currentArr.reduce((a, b) => a + b, 0)
  console.log(winningNumbers)

  if (winningNumbers === 15) {
    console.log("you won")
    break;
  } else if (i === 8 && winningNumbers !== 15) {
    console.log("next turn")
    // break;
  } else {
    // console.log("broken")
  }
}


// else if (win8 === 15) {
//     console.log("you won")
//     break;
//   } else if (win8 !== 15) {
//     console.log("next turn")
//   } else {
//     console.log("code broken")
//   }

}

oddTurn()
