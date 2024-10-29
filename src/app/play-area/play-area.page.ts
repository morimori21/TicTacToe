import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'; // Import AlertController

interface Player {
  name: string;
  symbol: 'X' | 'O';
}

interface Enemy {
  name: string;
  symbol: 'X' | 'O';
}

@Component({
  selector: 'app-play-area',
  templateUrl: './play-area.page.html',
  styleUrls: ['./play-area.page.scss'],
})
export class PlayAreaPage implements OnInit {
  player: Player;
  enemy: Enemy;
  currentPlayer: Player | Enemy | null;
  message: string;
  board: string[][];
  isGameOver: boolean;
  showSymbols: boolean;

  constructor(private alertController: AlertController) { // Inject AlertController
    this.player = { name: 'Player', symbol: 'X' };
    this.enemy = { name: 'Enemy', symbol: 'O' };
    this.currentPlayer = null;
    this.message = '';
    this.board = this.initializeBoard();
    this.isGameOver = false;
    this.showSymbols = false; // To control the visibility of symbols
  }

  ngOnInit() {}

  initializeBoard(): string[][] {
    return [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
  }

  async tossCoin(): Promise<void> { // Make the function async
    const tossResult = Math.random() < 0.5;
    this.player.symbol = Math.random() < 0.5 ? 'X' : 'O';
    this.enemy.symbol = this.player.symbol === 'X' ? 'O' : 'X';
    this.currentPlayer = tossResult ? this.player : this.enemy;

    this.showSymbols = true; // Show the symbols after the game has started

    // Display alert with the current player
    const currentPlayerName = this.currentPlayer === this.player ? 'You' : 'Enemy';
    const alert = await this.alertController.create({
      header: 'Game Start',
      message: `${currentPlayerName} goes first with ${this.currentPlayer.symbol}!`,
      buttons: ['OK'],
    });

    await alert.present(); // Present the alert

    // After the alert is closed, let the enemy move if it's their turn
    if (this.currentPlayer === this.enemy) {
      setTimeout(() => this.enemyMove(), 0);
    }
  }

  startGame(): void {
    this.board = this.initializeBoard(); // Reset the board when starting a new game
    this.tossCoin();
    this.isGameOver = false; 
    this.message = ''; // Clear the message
  }

  makeMove(rowIndex: number, colIndex: number): void {
    if (
      this.board[rowIndex][colIndex] === '' &&
      this.currentPlayer &&
      !this.isGameOver
    ) {
      this.board[rowIndex][colIndex] = this.currentPlayer.symbol;

      if (!this.checkWin()) {
        this.currentPlayer =
          this.currentPlayer === this.player ? this.enemy : this.player;

        if (this.currentPlayer === this.enemy && !this.isGameOver) {
          setTimeout(() => this.enemyMove(), 0);
        }
      }
    }
  }

  enemyMove(): void {
    const availableMoves: { row: number; col: number }[] = [];

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (this.board[row][col] === '') {
          availableMoves.push({ row, col });
        }
      }
    }

    if (availableMoves.length > 0) {
      const move =
        availableMoves[Math.floor(Math.random() * availableMoves.length)];
      this.board[move.row][move.col] = this.enemy.symbol;

      if (!this.checkWin()) {
        this.currentPlayer = this.player; // Switch back to player after enemy move
      }
    }
  }

  checkWin(): boolean {
    const winConditions = [
      [this.board[0][0], this.board[0][1], this.board[0][2]],
      [this.board[1][0], this.board[1][1], this.board[1][2]],
      [this.board[2][0], this.board[2][1], this.board[2][2]],
      [this.board[0][0], this.board[1][0], this.board[2][0]],
      [this.board[0][1], this.board[1][1], this.board[2][1]],
      [this.board[0][2], this.board[1][2], this.board[2][2]],
      [this.board[0][0], this.board[1][1], this.board[2][2]],
      [this.board[0][2], this.board[1][1], this.board[2][0]],
    ];

    for (const condition of winConditions) {
      if (
        condition[0] &&
        condition[0] === condition[1] &&
        condition[1] === condition[2]
      ) {
        const winnerSymbol = condition[0];
        const winnerName =
          winnerSymbol === this.player.symbol
            ? this.player.name
            : this.enemy.name;
        this.message = `${winnerName} wins!`;
        this.isGameOver = true;
        return true;
      }
    }

    let isDraw = true;
    for (let row of this.board) {
      for (let cell of row) {
        if (cell === '') {
          isDraw = false;
          break;
        }
      }
      if (!isDraw) {
        break;
      }
    }

    if (isDraw) {
      this.message = "It's a draw!";
      this.isGameOver = true;
      return true;
    }

    return false;
  }

  playAgain(): void {
    this.board = this.initializeBoard(); 
    this.message = '';
    this.isGameOver = false; 
    this.currentPlayer = null; 
    this.showSymbols = false; // Hide symbols again
    this.startGame(); 
  }
}