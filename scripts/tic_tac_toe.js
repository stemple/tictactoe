TicTacToeApp = {

    // Keeps track of whose turn it is
    turn: 0,

    // Not sure if I need this, but tells me if game is being played.
    gameState: 0,
    
    board: {

        // contains all the cells on the board
        cells: [],

        // function for creating cells
        createCells: function() {
            // Create grid of 3 x 3 cells
            // Each cell has to have a position and mark state (empty, x or o)
            // These are divs - we need to add a onclick event handler
        }

    },

    // The simple player objects - they have a mark and score.
    players:[
        {mark: "X", score: 0},
        {mark: "O", score: 0}
    ],

    // A function for starting the game
    startGame: function() {
      ++turn;
    },

    // Handles the clicking of a cell
    // TODO: check if cell is already marked - mark only if empty, then change mark state
    markCell: function(cell) {

    },

    // Check to see if someone wins - this is going to be our main algorithm
    checkForWin: function() {

    },
}