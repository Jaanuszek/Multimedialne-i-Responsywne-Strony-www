class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.gameStatus = document.getElementById('gameStatus');
        this.gameBoard = document.getElementById('gameBoard');
        this.resetBtn = document.getElementById('resetBtn');
        
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        
        this.init();
    }
    
    init() {
        this.updateStatus();
        this.gameBoard.addEventListener('click', (e) => this.handleCellClick(e));
        this.resetBtn.addEventListener('click', () => this.resetGame());
    }
    
    handleCellClick(e) {
        const cell = e.target;
        
        if (!cell.classList.contains('cell')) return;
        
        const cellIndex = parseInt(cell.dataset.index);
        
        if (this.board[cellIndex] !== '' || !this.gameActive) return;
        
        this.makeMove(cellIndex, cell);
    }
    
    makeMove(index, cell) {
        this.board[index] = this.currentPlayer;
        cell.textContent = this.currentPlayer;
        cell.classList.add(this.currentPlayer.toLowerCase());
        
        if (this.checkWin()) {
            this.gameActive = false;
            this.highlightWinningCells();
            this.updateStatus(`🎉 Gracz ${this.currentPlayer} wygrał!`, 'winner');
        } else if (this.checkDraw()) {
            this.gameActive = false;
            this.updateStatus('🤝 Remis!', 'draw');
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateStatus();
        }
    }
    
    checkWin() {
        return this.winningConditions.some(condition => {
            const [a, b, c] = condition;
            return this.board[a] && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    highlightWinningCells() {
        this.winningConditions.forEach(condition => {
            const [a, b, c] = condition;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                
                const cells = this.gameBoard.children;
                cells[a].classList.add('winning');
                cells[b].classList.add('winning');
                cells[c].classList.add('winning');
            }
        });
    }
    
    updateStatus(message = null, statusClass = null) {
        this.gameStatus.className = 'game-status';
        
        if (message) {
            this.gameStatus.textContent = message;
            if (statusClass) {
                this.gameStatus.classList.add(statusClass);
            }
        } else {
            this.gameStatus.textContent = `Gracz ${this.currentPlayer} - Twój ruch`;
            this.gameStatus.classList.add(`player-${this.currentPlayer.toLowerCase()}`);
        }
    }
    
    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        Array.from(this.gameBoard.children).forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
        });
        
        this.updateStatus();
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});