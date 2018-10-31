// I had to change the button from class to id because I couldn't get the listener to work using
//   this:       buttonEl = document.getElementsByClassName('btn.btn-primary')
//   with this: buttonEl.addEventListener('click', showQty)

var content = document.getElementById('content')
var containerEl = document.getElementById('container')

// gameState is the var that was called Nim in the template code
const initialGameState = {
    playerTurn: 1, 
    NumOfPebbles: 16,
    winner: null
}

let gameState = deepCopy(initialGameState)

//let theGame = deepCopy(gameState)

function resetGame () {
    gameState = deepCopy(initialGameState)
    //theGame = deepCopy(initialGameState)
    console.log('Resetting the Game!' + gameState.winner)
    renderGame()
  }

// -----------------------------------------------------------------------------
// Game State + Logic
// -----------------------------------------------------------------------------
function onTake () {
    if (gameState.winner != null) {
        resetGame()
        init()
    }  else {
        var takePebbles = document.getElementById('takeInput')
        gameState.NumOfPebbles = gameState.NumOfPebbles - takePebbles.value
        console.log('You took ' + takePebbles.value + ' Pebbles')   
        checkWinnerState()
    }
      
}

function checkWinnerState () {
    
  if ((gameState.NumOfPebbles === 1) || (gameState.NumOfPebbles === 0)) {
      console.log('Made to only ONE pebble')
      gameState.winner = gameState.playerTurn
      buildWinnerMsg()
      renderGame()
  } else {
    if (gameState.playerTurn === 1) {
        gameState.playerTurn = 2
    } 
    else {
        gameState.playerTurn = 1
    } }
    console.log('Winner set to ' + gameState.winner)
    console.log('it is Player ' + gameState.playerTurn + 's Turn!')
    init()   
}

// -----------------------------------------------------------------------------
// HTML
// -----------------------------------------------------------------------------

function buildPebblesLeftMsg () {
    console.log('There are ' + gameState.NumOfPebbles + ' Pebbles Left')
    return '<h4>There are ' + gameState.NumOfPebbles + ' pebbles left</h4>'
}

function buildPebbleGraphic () {
    var pebCount = gameState.NumOfPebbles
    let pebblePartHTML = '<div class="w-50 text-center pebble-container">'
        pebblePartHTML += '<div class="pebble"></div>'
    for (let i = 1; i < pebCount; i++) {
        pebblePartHTML += '<div class="pebble"></div>'
    }
    pebblePartHTML += '</div>'
    return pebblePartHTML   
}

function buildPlayerTurnMsg () {
    return '<h4>It is player ' + gameState.playerTurn + 's turn! How many pebbles will you take?</h4>'
}

function buildWinnerMsg () {
    
    return '<h4>Player '+ gameState.winner + ' WINS! Click the Take button to Reset the game.</h4>'
}

function buildQtySelector () {
    // Check remaining quauntity; if < 3
    if (gameState.NumOfPebbles >= 3) {
        // build selector with 3 options
        return '<div><select id="takeInput"><option value="1">1</option><option value="2">2</option><option value="3">3</option></select>'
    } else if (gameState.NumOfPebbles === 2) {
        // build selector with 2 options
        console.log('Hey! Only 2 Options')
        return '<div><select id="takeInput"><option value="1">1</option><option value="2">2</option></select>'
    }  else {
        // build selector with only 1 option
        console.log('Hey! Only 1 Option')
        return '<div><select id="takeInput"><option value="1">1</option></select>'
    }  
}

function buildTakebutton () {
    return  '<button id="takeButton">Take</button>'
}

function buildGame (game) {
    console.log('got to buildGame function')
    let html = '<div class="container d-flex flex-column justify-content-start align-items-center">'
    if (gameState.winner != null) {
        console.log('Player ' + gameState.winner + ' WINS! There are ' + gameState.NumOfPebbles + ' Pebbles Left')
        html += buildWinnerMsg(gameState)
        html += buildTakebutton(gameState)
    } else {
        html += buildPebbleGraphic(gameState)
        html += buildPebblesLeftMsg(gameState)
        html += buildPlayerTurnMsg(gameState)
        html += buildQtySelector(gameState)
        html += buildTakebutton(gameState)
    }
    return html
 }


// -----------------------------------------------------------------------------
// Events
// -----------------------------------------------------------------------------
function addEvents () {
  //console.info('Adding DOM events now')
  buttonEl.addEventListener('click', onTake)
}

// -----------------------------------------------------------------------------
// Rendering
// -----------------------------------------------------------------------------
//let buttonEl = null

let renderCount = 0

function renderGame() {

    // Change this render function to use the "game" parameter//
    renderCount++
    console.info('Rendering game now! Render #' + renderCount)
    console.log('Got the the renderGame function')
    return content.innerHTML = buildGame(gameState)


    // return `
    //     <div class="container d-flex flex-column justify-content-start align-items-center">
    //         <h4>There are 16 pebbles left</h4>
    //         <div class="w-50 text-center pebble-container">
    //             <div class="pebble"></div>
    //             <div class="pebble"></div>
    //             <div class="pebble"></div>
    //             <div class="pebble"></div>
    //             <div class="pebble"></div>
    //             <div class="pebble"></div>
    //             <div class="pebble"></div>
    //             <div class="pebble"></div>
    //             <div class="pebble"></div>
    //             <div class="pebble"></div>
    //             <div class="pebble"></div>
    //             <div class="pebble"></div>
    //             <div class="pebble"></div>
    //             <div class="pebble"></div>
    //             <div class="pebble"></div>
    //             <div class="pebble"></div>
    //         </div>
    //         <h4 class="mt-5">It's player 1's turn! How many pebbles will you take?</h4>
    //         <div>
    //             <select id="takeInput">
    //                 <option value="1">1</option>
    //                 <option value="2">2</option>
    //                 <option value="3">3</option>
    //             </select>
    //             <button id="takeButton">Take</button>
    //         </div>
    //     </div>
    // `
}

// -----------------------------------------------------------------------------
// Util
// -----------------------------------------------------------------------------

// function byId (id) {
//     return document.getElementById(id)
//   }
  
  function deepCopy (x) {
    return JSON.parse(JSON.stringify(x))
  }

// -----------------------------------------------------------------------------
// Init
// -----------------------------------------------------------------------------

function init () {
  console.info('Initializing Nim now!')
  renderGame()
  content = document.getElementById('content')
  selectEl = document.getElementById('takeInput')
  buttonEl = document.getElementById('takeButton')
  addEvents()
  console.info('passed call to renderGame in Init function')
}

// -----------------------------------------------------------------------------
// Utility
// -----------------------------------------------------------------------------

function deepCopy (x) {
    return JSON.parse(JSON.stringify(x))
  }

document.addEventListener('DOMContentLoaded', init)
