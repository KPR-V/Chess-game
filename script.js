const gameboard = document.getElementById("gameboard")
const player_display = document.getElementById("player")
const info_display = document.getElementById("info_display")
const width = 8
let playergo = "black's"
player_display.textContent = "black's"
const startpieces = [
  elephant, horse, bishop, queen, king, bishop, horse, elephant,
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
  pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
  elephant, horse, bishop, queen, king, bishop, horse, elephant,
]
function createboard() {
  startpieces.forEach((startpiece, i) => {
    const square = document.createElement('div');
    square.classList.add('square');
    square.innerHTML = startpiece;
    square.setAttribute('square-id', i)
    if (i <= 15 || i >= 48) {
      square.firstChild.setAttribute('draggable', true);
    }
    const row = Math.floor((63 - i) / 8) + 1
    if (row % 2 === 0) {
      square.classList.add(i % 2 === 0 ? "red" : "green")

    }
    else {
      square.classList.add(i % 2 === 0 ? "green" : "red")
    }


    if (i <= 15) {
      square.firstChild.classList.add("black's")
      square.firstChild.firstChild.classList.add('black')
    }
    if (i >= 48) {
      square.firstChild.classList.add("white's")
      square.firstChild.firstChild.classList.add('white')
    }
    gameboard.append(square);

  })
}


createboard();



let allsquares = document.getElementsByClassName("square")
allsquares = Array.from(allsquares)
allsquares.forEach((square) => {

  square.addEventListener('dragstart', dragstart)
  square.addEventListener('dragover', dragover)
  square.addEventListener('drop', drop)

})
let startpositionid;
let draggedelement;
function dragstart(e) {
  startpositionid = e.target.parentNode.getAttribute('square-id');
  draggedelement = e.target;
  // console.log(startpositionid,draggegelement,e)
  console.log("started dragging")
}
function dragover(e) {
  e.preventDefault();
  console.log("Draggin over baby")
}

function drop(e) {
  e.stopPropagation()
  console.log(draggedelement)
  const correctgo = draggedelement.classList.contains(playergo)
  const taken = e.target.classList.contains('piece')
  const valid = checkifvalid(e.target)
  const opponentsgo = playergo === "white's" ? "black's" : "white's"
  let takenbyopponent;
  try {
    if (e.target.firstChild && e.target.firstChild.classList.contains(opponentsgo)) {
      takenbyopponent = true
    }
  } catch {
    takenbyopponent = false
  }
  console.log(`Taken by opponent: ${takenbyopponent}`)
  if (correctgo) {
    if (takenbyopponent && valid) {
      e.target.parentNode.append(draggedelement)
      e.target.remove()
      changeplayer()
      checkforwin()
      return
    }
    else if (taken && !takenbyopponent) {
      info_display.textContent = "you cannot go here "
      setTimeout(() => info_display.textContent = "", 2000)
      return
    }
    else if (valid) {
      console.log("yehahh")
      console.log(e.target)
      changeplayer()
      checkforwin()
      return
    }
  }

}



function changeplayer() {
  if (playergo === " black's ") {
    reverseid()
    playergo = " white's "
    player_display.textContent = " white's "
  }
  else {
    revertid()
    playergo = " black's "
    player_display.textContent = " black's "
  }
}


function reverseid() {
  const squares = document.querySelectorAll(".square")
  squares.forEach((square, i) =>
    square.setAttribute('square-id', (width * width - 1) - i))
}
function revertid() {
  const squares = document.querySelectorAll(".square")
  squares.forEach((square, i) =>
    square.setAttribute('square-id', i))

}

function checkifvalid(target) {
  const targetid = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
  const startid = Number(startpositionid)
  const piece = draggedelement.id
  switch (piece) {
    case 'pawn':
      const starterrow = [8, 9, 10, 11, 12, 13, 14, 15]
      if (starterrow.includes(startid) && startid + width * 2 === targetid || startid + width === targetid || startid + width - 1 === targetid && document.querySelector(`[square-id="${startid + width - 1}"]`).firstChild || startid + width + 1 === targetid && document.querySelector(`[square-id="${startid + width + 1}"]`).firstChild) {
        return true
      }

      break;

    case 'horse':
      if (startid + width * 2 - 1 === targetid ||
        startid + width * 2 + 1 === targetid ||
        startid - width * 2 - 1 === targetid ||
        startid - width * 2 + 1 === targetid ||
        startid + width + 2 || startid + width - 2 ||
        startid - width + 2 || startid - width - 2

      ) {
        return true;
      }
      break;

    case 'bishop':
      if (startid + width + 1 === targetid ||
        startid + width * 2 + 2 === targetid && !document.querySelector(`[square-id="${startid + width + 1}"]`).firstChild ||
        startid + width * 3 + 3 === targetid && !document.querySelector(`[square-id="${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 + 2}"]`).firstChild ||

        startid + width * 4 + 4 === targetid && !document.querySelector(`[square-id="${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3 + 3}"]`).firstChild ||

        startid + width * 5 + 5 === targetid && !document.querySelector(`[square-id="${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4 + 4}"]`).firstChild ||

        startid + width * 6 + 6 === targetid && !document.querySelector(`[square-id="${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 5 + 5}"]`).firstChild ||

        startid + width * 7 + 7 === targetid && !document.querySelector(`[square-id="${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 6 + 6}"]`).firstChild ||






        startid - width - 1 === targetid ||
        startid - width * 2 - 2 === targetid && !document.querySelector(`[square-id="${startid - width - 1}"]`).firstChild ||
        startid - width * 3 - 3 === targetid && !document.querySelector(`[square-id="${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 - 2}"]`).firstChild ||

        startid - width * 4 - 4 === targetid && !document.querySelector(`[square-id="${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3 - 3}"]`).firstChild ||

        startid - width * 5 - 5 === targetid && !document.querySelector(`[square-id="${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4 - 4}"]`).firstChild ||

        startid - width * 6 - 6 === targetid && !document.querySelector(`[square-id="${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 5 - 5}"]`).firstChild ||

        startid - width * 7 - 7 === targetid && !document.querySelector(`[square-id="${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 6 - 6}"]`).firstChild ||





        startid - width + 1 === targetid ||
        startid - width * 2 + 2 === targetid && !document.querySelector(`[square-id="${startid - width + 1}"]`).firstChild ||
        startid - width * 3 + 3 === targetid && !document.querySelector(`[square-id="${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 + 2}"]`).firstChild ||

        startid - width * 4 + 4 === targetid && !document.querySelector(`[square-id="${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3 + 3}"]`).firstChild ||

        startid - width * 5 + 5 === targetid && !document.querySelector(`[square-id="${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4 + 4}"]`).firstChild ||

        startid - width * 6 + 6 === targetid && !document.querySelector(`[square-id="${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 5 + 5}"]`).firstChild ||

        startid - width * 7 + 7 === targetid && !document.querySelector(`[square-id="${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 6 + 6}"]`).firstChild ||






        startid + width - 1 === targetid ||
        startid + width * 2 - 2 === targetid && !document.querySelector(`[square-id="${startid + width - 1}"]`).firstChild ||
        startid + width * 3 - 3 === targetid && !document.querySelector(`[square-id="${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 - 2}"]`).firstChild ||

        startid + width * 4 - 4 === targetid && !document.querySelector(`[square-id="${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3 - 3}"]`).firstChild ||

        startid + width * 5 - 5 === targetid && !document.querySelector(`[square-id="${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4 - 4}"]`).firstChild ||

        startid + width * 6 - 6 === targetid && !document.querySelector(`[square-id="${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 5 - 5}"]`).firstChild ||

        startid + width * 7 - 7 === targetid && !document.querySelector(`[square-id="${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 6 - 6}"]`).firstChild
      ) {
        return true;
      } break;

    case 'elephant':

      if (
        startid + width === targetid ||
        startid + width * 2 === targetid && !document.querySelector(`[square-id="${startid + width}"]`).firstChild ||
        startid + width * 3 === targetid && !document.querySelector(`[square-id="${startid + width}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2}"]`).firstChild ||
        startid + width * 4 === targetid && !document.querySelector(`[square-id="${startid + width}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3}"]`).firstChild ||

        startid + width * 5 === targetid && !document.querySelector(`[square-id="${startid + width}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4}"]`).firstChild ||


        startid + width * 6 === targetid && !document.querySelector(`[square-id="${startid + width}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 5}"]`).firstChild ||

        startid + width * 7 === targetid && !document.querySelector(`[square-id="${startid + width}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 6}"]`).firstChild ||






        startid - width === targetid ||
        startid - width * 2 === targetid && !document.querySelector(`[square-id="${startid - width}"]`).firstChild ||
        startid - width * 3 === targetid && !document.querySelector(`[square-id="${startid - width}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2}"]`).firstChild ||
        startid - width * 4 === targetid && !document.querySelector(`[square-id="${startid - width}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3}"]`).firstChild ||

        startid - width * 5 === targetid && !document.querySelector(`[square-id="${startid - width}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4}"]`).firstChild ||


        startid - width * 6 === targetid && !document.querySelector(`[square-id="${startid - width}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 5}"]`).firstChild ||

        startid - width * 7 === targetid && !document.querySelector(`[square-id="${startid - width}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 6}"]`).firstChild ||





        startid + 1 === targetid ||
        startid + 2 === targetid && !document.querySelector(`[square-id="${startid + 1}"]`).firstChild ||
        startid + 3 === targetid && !document.querySelector(`[square-id="${startid + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + 2}"]`).firstChild ||
        startid + 4 === targetid && !document.querySelector(`[square-id="${startid + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + 3}"]`).firstChild ||

        startid + 5 === targetid && !document.querySelector(`[square-id="${startid + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + 4}"]`).firstChild ||


        startid + 6 === targetid && !document.querySelector(`[square-id="${startid + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + 4}"]`).firstChild && !document.querySelector(`[square-id="${startid + 5}"]`).firstChild ||

        startid + 7 === targetid && !document.querySelector(`[square-id="${startid + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + 4}"]`).firstChild && !document.querySelector(`[square-id="${startid + 5}"]`).firstChild && !document.querySelector(`[square-id="${startid + 6}"]`).firstChild ||





        startid - 1 === targetid ||
        startid - 2 === targetid && !document.querySelector(`[square-id="${startid - 1}"]`).firstChild ||
        startid - 3 === targetid && !document.querySelector(`[square-id="${startid - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - 2}"]`).firstChild ||
        startid - 4 === targetid && !document.querySelector(`[square-id="${startid - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - 3}"]`).firstChild ||

        startid - 5 === targetid && !document.querySelector(`[square-id="${startid - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - 4}"]`).firstChild ||


        startid - 6 === targetid && !document.querySelector(`[square-id="${startid - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - 4}"]`).firstChild && !document.querySelector(`[square-id="${startid - 5}"]`).firstChild ||

        startid - 7 === targetid && !document.querySelector(`[square-id="${startid - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - 4}"]`).firstChild && !document.querySelector(`[square-id="${startid - 5}"]`).firstChild && !document.querySelector(`[square-id="${startid - 6}"]`).firstChild) {

        return true;
      }

      break;
    case 'queen':

      if (startid + width + 1 === targetid ||
        startid + width * 2 + 2 === targetid && !document.querySelector(`[square-id="${startid + width + 1}"]`).firstChild ||
        startid + width * 3 + 3 === targetid && !document.querySelector(`[square-id="${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 + 2}"]`).firstChild ||

        startid + width * 4 + 4 === targetid && !document.querySelector(`[square-id="${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3 + 3}"]`).firstChild ||

        startid + width * 5 + 5 === targetid && !document.querySelector(`[square-id="${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4 + 4}"]`).firstChild ||

        startid + width * 6 + 6 === targetid && !document.querySelector(`[square-id="${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 5 + 5}"]`).firstChild ||

        startid + width * 7 + 7 === targetid && !document.querySelector(`[square-id="${startid + width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 6 + 6}"]`).firstChild ||






        startid - width - 1 === targetid ||
        startid - width * 2 - 2 === targetid && !document.querySelector(`[square-id="${startid - width - 1}"]`).firstChild ||
        startid - width * 3 - 3 === targetid && !document.querySelector(`[square-id="${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 - 2}"]`).firstChild ||

        startid - width * 4 - 4 === targetid && !document.querySelector(`[square-id="${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3 - 3}"]`).firstChild ||

        startid - width * 5 - 5 === targetid && !document.querySelector(`[square-id="${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4 - 4}"]`).firstChild ||

        startid - width * 6 - 6 === targetid && !document.querySelector(`[square-id="${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 5 - 5}"]`).firstChild ||

        startid - width * 7 - 7 === targetid && !document.querySelector(`[square-id="${startid - width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 6 - 6}"]`).firstChild ||





        startid - width + 1 === targetid ||
        startid - width * 2 + 2 === targetid && !document.querySelector(`[square-id="${startid - width + 1}"]`).firstChild ||
        startid - width * 3 + 3 === targetid && !document.querySelector(`[square-id="${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 + 2}"]`).firstChild ||

        startid - width * 4 + 4 === targetid && !document.querySelector(`[square-id="${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3 + 3}"]`).firstChild ||

        startid - width * 5 + 5 === targetid && !document.querySelector(`[square-id="${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4 + 4}"]`).firstChild ||

        startid - width * 6 + 6 === targetid && !document.querySelector(`[square-id="${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 5 + 5}"]`).firstChild ||

        startid - width * 7 + 7 === targetid && !document.querySelector(`[square-id="${startid - width + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2 + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3 + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4 + 4}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 5 + 5}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 6 + 6}"]`).firstChild ||






        startid + width - 1 === targetid ||
        startid + width * 2 - 2 === targetid && !document.querySelector(`[square-id="${startid + width - 1}"]`).firstChild ||
        startid + width * 3 - 3 === targetid && !document.querySelector(`[square-id="${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 - 2}"]`).firstChild ||

        startid + width * 4 - 4 === targetid && !document.querySelector(`[square-id="${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3 - 3}"]`).firstChild ||

        startid + width * 5 - 5 === targetid && !document.querySelector(`[square-id="${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4 - 4}"]`).firstChild ||

        startid + width * 6 - 6 === targetid && !document.querySelector(`[square-id="${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 5 - 5}"]`).firstChild ||

        startid + width * 7 - 7 === targetid && !document.querySelector(`[square-id="${startid + width - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2 - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3 - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4 - 4}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 5 - 5}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 6 - 6}"]`).firstChild ||





        startid + width === targetid ||
        startid + width * 2 === targetid && !document.querySelector(`[square-id="${startid + width}"]`).firstChild ||
        startid + width * 3 === targetid && !document.querySelector(`[square-id="${startid + width}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2}"]`).firstChild ||
        startid + width * 4 === targetid && !document.querySelector(`[square-id="${startid + width}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3}"]`).firstChild ||

        startid + width * 5 === targetid && !document.querySelector(`[square-id="${startid + width}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4}"]`).firstChild ||


        startid + width * 6 === targetid && !document.querySelector(`[square-id="${startid + width}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 5}"]`).firstChild ||

        startid + width * 7 === targetid && !document.querySelector(`[square-id="${startid + width}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startid + width * 6}"]`).firstChild ||






        startid - width === targetid ||
        startid - width * 2 === targetid && !document.querySelector(`[square-id="${startid - width}"]`).firstChild ||
        startid - width * 3 === targetid && !document.querySelector(`[square-id="${startid - width}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2}"]`).firstChild ||
        startid - width * 4 === targetid && !document.querySelector(`[square-id="${startid - width}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3}"]`).firstChild ||

        startid - width * 5 === targetid && !document.querySelector(`[square-id="${startid - width}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4}"]`).firstChild ||


        startid - width * 6 === targetid && !document.querySelector(`[square-id="${startid - width}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 5}"]`).firstChild ||

        startid - width * 7 === targetid && !document.querySelector(`[square-id="${startid - width}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 4}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 5}"]`).firstChild && !document.querySelector(`[square-id="${startid - width * 6}"]`).firstChild ||





        startid + 1 === targetid ||
        startid + 2 === targetid && !document.querySelector(`[square-id="${startid + 1}"]`).firstChild ||
        startid + 3 === targetid && !document.querySelector(`[square-id="${startid + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + 2}"]`).firstChild ||
        startid + 4 === targetid && !document.querySelector(`[square-id="${startid + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + 3}"]`).firstChild ||

        startid + 5 === targetid && !document.querySelector(`[square-id="${startid + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + 4}"]`).firstChild ||


        startid + 6 === targetid && !document.querySelector(`[square-id="${startid + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + 4}"]`).firstChild && !document.querySelector(`[square-id="${startid + 5}"]`).firstChild ||

        startid + 7 === targetid && !document.querySelector(`[square-id="${startid + 1}"]`).firstChild && !document.querySelector(`[square-id="${startid + 2}"]`).firstChild && !document.querySelector(`[square-id="${startid + 3}"]`).firstChild && !document.querySelector(`[square-id="${startid + 4}"]`).firstChild && !document.querySelector(`[square-id="${startid + 5}"]`).firstChild && !document.querySelector(`[square-id="${startid + 6}"]`).firstChild ||





        startid - 1 === targetid ||
        startid - 2 === targetid && !document.querySelector(`[square-id="${startid - 1}"]`).firstChild ||
        startid - 3 === targetid && !document.querySelector(`[square-id="${startid - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - 2}"]`).firstChild ||
        startid - 4 === targetid && !document.querySelector(`[square-id="${startid - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - 3}"]`).firstChild ||

        startid - 5 === targetid && !document.querySelector(`[square-id="${startid - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - 4}"]`).firstChild ||


        startid - 6 === targetid && !document.querySelector(`[square-id="${startid - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - 4}"]`).firstChild && !document.querySelector(`[square-id="${startid - 5}"]`).firstChild ||

        startid - 7 === targetid && !document.querySelector(`[square-id="${startid - 1}"]`).firstChild && !document.querySelector(`[square-id="${startid - 2}"]`).firstChild && !document.querySelector(`[square-id="${startid - 3}"]`).firstChild && !document.querySelector(`[square-id="${startid - 4}"]`).firstChild && !document.querySelector(`[square-id="${startid - 5}"]`).firstChild && !document.querySelector(`[square-id="${startid - 6}"]`).firstChild) {

        return true;
      }

      break;

    case 'king':
      if (
        startid + 1 === targetid ||
        startid - 1 === targetid ||
        startid + width === targetid ||
        startid - width === targetid ||
        startid + width - 1 === targetid ||
        startid + width + 1 === targetid ||
        startid - width - 1 === targetid ||
        startid - width + 1 === targetid) {
        return true;
      }
  }
}

function checkforwin() {

  const kings = Array.from(document.querySelectorAll('#king')).filter(king => king.firstChild != null);
  console.log(kings)
  if (!kings.some(kings => kings.firstChild.classList.contains('white'))) {
    info_display.innerHTML = "BLACK player wins!";
    const allsquares1 = document.querySelectorAll('.square')
    allsquares1.forEach((square) => {
      if (square.firstChild != null) {
        console.log(square.firstChild)
        square.firstChild.setAttribute('draggable', false)
      }
    })
  }
  if (!kings.some(kings => kings.firstChild.classList.contains('black'))) {
    info_display.innerHTML = "WHITE player wins!";
    const allsquares1 = document.querySelectorAll('.square')
    allsquares1.forEach((square) => {
      if (square.firstChild != null) {
        square.firstChild.setAttribute('draggable', false)
      }
    })
  }

}

// function checkforwin() {

//   const kings = Array.from(document.querySelectorAll('#king'))
//   console.log(kings)
//   if (!kings.some(kings => kings.firstChild.classList.contains('white'))) {
//     info_display.innerHTML = "BLACK player wins!";
//     const allsquares1 = document.querySelectorAll('.square')
//     allsquares1.forEach((square) => {
//       if (square.firstChild != null) {
//         console.log(square.firstChild)
//         square.firstChild.setAttribute('draggable', false)
//       }
//     })
//   }
//   if (!kings.some(kings => kings.firstChild.classList.contains('black'))) {
//     info_display.innerHTML = "WHITE player wins!";
//     const allsquares1 = document.querySelectorAll('.square')
//     allsquares1.forEach((square) => {
//       if (square.firstChild != null) {
//         square.firstChild.setAttribute('draggable', false)
//       }
//     })
//   }

// }












