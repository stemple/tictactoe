TicTacToeApp = {

    // Keeps track of whose turn it is
    turn: 0,

    // Not sure if I need this, but tells me if game is being played.
    gameStarted: false,

    // The play button
    play_btn: document.getElementById("play_btn"),
    
    // This is the board object
    board: {

        // contains all the cells on the board
        cells: [],

        render: function() {
            for(let i = 0; i < this.cells.length; i++) {
                cell = this.cells[i];
                if(cell.mark == -1) {
                    cell.element.textContent = "O";
                } else if (cell.mark == 1) {
                    cell.element.textContent = "X";
                } else {
                    cell.element.textContent = "";
                }
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
                   mark: 0,
                   element: cellDiv,
               }
               // Add the onclick event handler
               // mark the cell and then render board
               cell.element.onclick = function() {
                   // Mark the cell
                   TicTacToeApp.markCell(cell);
                   // Render the board
                   TicTacToeApp.board.render();
                   // Check for win
                   TicTacToeApp.checkForWin();
                   // Check for Tie
                   TicTacToeApp.checkForTie();
               }
               // Add the cell to the board's cells array
               this.cells.push(cell);
            }
        }

    },

    // The simple player objects - they have a mark and score.
    players:[
        {mark: 1, score: 0},
        {mark: -1, score: 0}
    ],

    // Do all the things that need to happen before we can play!
    init: function() {
        // Bind the play button to the startGame function
        this.play_btn.onclick = function() {
            this.startGame();
        }.bind(TicTacToeApp);
        
        // Build the board
        this.board.createCells();
    },
    
    // A function for starting the game
    startGame: function() {
        // Reset the board
        this.resetGame();
        this.gameStarted = true;
        this.turn = this.turn + 1;
        this.turn = 0;
        this.play_btn.textContent = "RESET?";
    },

    endGame: function() {
        this.gameStarted = false;
        this.play_btn.textContent = "PLAY?";
    },

    resetGame: function() {
        // Clean up the board
        for(let i = 0; i < this.board.cells.length; i++) {
            cell = this.board.cells[i];
            cell.mark = 0;
            cell.element.classList.remove("occupied");
        }
        this.board.render();
    },

    // Handles the clicking of a cell
    // TODO: check if cell is already marked - mark only if empty, then change mark state
    markCell: function(cell) {
        if(this.gameStarted == false) { return }
        if(cell.mark == 0) {
            // cell is unmarked, then mark it with current player
            cell.mark = this.players[this.turn % 2].mark;
            cell.element.classList.add("occupied");
            this.turn = this.turn + 1;
        } else {
            // do nothing - don't change the mark
        }
    },

    // Check to see if someone wins - this is going to be our main algorithm
    checkForWin: function() {
        // Add each row, column, diagonal
        let cells = this.board.cells;
        let r1 = cells[0].mark + cells[1].mark + cells[2].mark;
        let r2 = cells[3].mark + cells[4].mark + cells[5].mark;
        let r3 = cells[6].mark + cells[7].mark + cells[8].mark;
        let c1 = cells[0].mark + cells[3].mark + cells[6].mark;
        let c2 = cells[1].mark + cells[4].mark + cells[7].mark;
        let c3 = cells[2].mark + cells[5].mark + cells[8].mark;
        let d1 = cells[0].mark + cells[4].mark + cells[8].mark;
        let d2 = cells[6].mark + cells[4].mark + cells[2].mark;

        // Check if row, column or diagonal totals = -3 or +3
        if (r1 == 3 || r2 == 3 || r3 == 3 || c1 == 3 || c2 == 3 || c3 == 3 || d1 == 3 || d2 == 3) {
            // X wins.

            this.win(this.players[0]);
        } else if (r1  == -3 || r2  == -3 || r3  == -3 || c1  == -3 || c2  == -3 || c3  == -3 || d1 == -3 || d2 == -3) {
            // O wins
            this.win(this.players[1]);
        }
        console.log("diagonal 1", d1);
        console.log("diagonal 2", d2);

    },

    checkForTie: function() {
        // Game has ended when turn = 9
        if(this.turn == 9) {
            this.endGame();
        }
    },

    win: function(player) {
        ++player.score;
        this.endGame();
    },

}

TicTacToeApp.init();