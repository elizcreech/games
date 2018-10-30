var content = document.getElementById('content');

var rockPaperScissors = "Replace this with your own abstraction of Rock Paper Scissors"

content.innerHTML = renderGame(rockPaperScissors);

// ----------------------------------------------------------------------------
//   Game Logic
// ----------------------------------------------------------------------------

// function to randomly generate computer choice
function computerChoice () {
    let randomChoice = null
    let computerPlay = null
randomChoice = Math.floor(Math.random() * 3)

if (randomChoice === 0) {
    computerPlay = 'Rock'
}  else {
    if (randomChoice === 1) {
        computerPlay = 'Paper'
    }
    else 
    computerPlay = 'Scissors'
}

console.log('random choice is: ' + computerPlay)
}

computerChoice()


// function to compare user's choice wiht computer and determine win/lose

// Optional function to keep score

// ----------------------------------------------------------------------------
//   Build HTML
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
//   Render Game
// ----------------------------------------------------------------------------

function renderGame(game) {
    // Change this render function to use the "game" parameter

    return `
        <div class="container d-flex flex-column justify-content-start align-items-center">
            <h4>Choose your weapon:</h4>
            <div class="w-50 text-center">
                <button class="btn btn-primary">Rock</button>
                <button class="btn btn-primary">Paper</button>
                <button class="btn btn-primary">Scissors</button>
            </div>
            <div class="d-flex justify-content-center">
                <div class="m-5">You played: <b>ROCK</b></div>
                <div class="m-5">The computer played: <b>SCISSORS</b></div>
            </div>
            <h1 class="text-center">You win!</h1>
        </div>
    `
}