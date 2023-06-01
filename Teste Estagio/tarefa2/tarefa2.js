// Configurações do tabuleiro
const ROWS = 60;
const COLS = 60;
const CELL_SIZE = 10;
const WIDTH = COLS * CELL_SIZE;
const HEIGHT = ROWS * CELL_SIZE;

// Criação do canvas
const canvas = document.createElement("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// Criação do tabuleiro
let board = createEmptyBoard();

// Função para criar um tabuleiro vazio
function createEmptyBoard() {
  return Array.from({ length: ROWS }, () => new Array(COLS).fill(0));
}

// Função para desenhar o tabuleiro na tela
function drawBoard() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col] === 1) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
      }
    }
  }
}

// Função para atualizar o estado do tabuleiro
function updateBoard() {
  const newBoard = createEmptyBoard();

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const neighbors = countNeighbors(row, col);

      if (board[row][col] === 1) {
        if (neighbors < 2 || neighbors > 3) {
          newBoard[row][col] = 0;
        } else {
          newBoard[row][col] = 1;
        }
      } else {
        if (neighbors === 3) {
          newBoard[row][col] = 1;
        } else {
          newBoard[row][col] = 0;
        }
      }
    }
  }

  board = newBoard;
}

// Função para contar o número de vizinhos vivos de uma célula
function countNeighbors(row, col) {
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const neighborRow = row + i;
      const neighborCol = col + j;

      if (
        neighborRow >= 0 &&
        neighborRow < ROWS &&
        neighborCol >= 0 &&
        neighborCol < COLS &&
        !(i === 0 && j === 0)
      ) {
        count += board[neighborRow][neighborCol];
      }
    }
  }

  return count;
}

// Função para atualizar o estado do tabuleiro e desenhar na tela
function updateAndDraw() {
  updateBoard();
  drawBoard();
}

// Função para mapear as coordenadas do canvas para as células do tabuleiro
function getCellCoordinates(x, y) {
  const col = Math.floor(x / CELL_SIZE);
  const row = Math.floor(y / CELL_SIZE);
  return { row, col };
}

// Event listener para clicar nas células do tabuleiro
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  const { row