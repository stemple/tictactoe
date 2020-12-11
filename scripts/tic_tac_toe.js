TicTacToeApp = {

    // Keeps track of whose turn it is
    turn: 0,

    // Not sure if I need this, but tells me if game is being played.
    gameStarted: false,
    
    // This is the board object
    board: {

        // contains all the cells on the board
        cells: [],

        render: function() {
            for(let i = 0; i < this.cells.length; i++) {
                cell = this.cells[i];
                cell.element.textContent = cell.mark;
            }
        },

        // function for creating cells
        createCells: function() {
            // Create grid of 3 x 3 cells
            // Each cell has to have a position and mark state (empty, x or o)
            // These are divs - we need to add a onclick event handler
            let playArea = document.getElementById("board"); 
            for(let i = 0; i < 9; i++) {
               let cellDiv = document.createElement("div");
               cellDiv.id = "c" + i;
               cellDiv.className = "cell"
               playArea.append(cellDiv);
               let cell = {
                   pos: i,
                   mark: "",
                   element: cellDiv,
               }
               // Add the onclick event handler
               // mark the cell and then render board
               cell.element.onclick = function() {
                   TicTacToeApp.markCell(cell);
                   TicTacToeApp.board.render();
               }
               // Add the cell to the board's cells array
               this.cells.push(cell);
            }
        }

    },

    // The simple player objects - they have a mark and score.
    players:[
        {mark: "X", score: 0},
        {mark: "O", score: 0}
    ],

    // Do all the things that need to happen before we can play!
    init: function() {
        this.board.createCells();
    },
    
    // A function for starting the game
    startGame: function() {
      this.gameStarted = true;
      this.turn = this.turn + 1;
    },

    // Handles the clicking of a cell
    // TODO: check if cell is already marked - mark only if empty, then change mark state
    markCell: function(cell) {
        console.log("Attempting to mark cell", cell);
        if(cell.mark == "") {
            // cell is unmarked, then mark it with current player
            cell.mark = this.players[this.turn % 2].mark;
            this.turn = this.turn + 1;
        } else {
            // do nothing - don't change the mark
        }
    },

    // Check to see if someone wins - this is going to be our main algorithm
    checkForWin: function() {
        return false;
    },

}

TicTacToeApp.init();