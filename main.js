// size of the grid
const rows = 50;
const cols = 50;

// Function to create an empty grid
function createGrid() {
    const grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols).fill(0);
    }
    return grid;
}

// Function to initialize the grid with live random cells
function randomizeGrid(grid) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = Math.random() > 0.9 ? 1 : 0;
        }
    }
}

// Function to display the grid in the console
function displayGrid(grid) {
    for (let i = 0; i < rows; i++) {
        console.log(grid[i].map(cell => (cell === 1 ? '#' : ' ')).join(''));
    }
}
// Function to update the grid according to the game of life rules
function updateGrid(grid) {
    const newGrid = createGrid();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(grid, i, j);
            if (grid[i][j] === 1) {
                newGrid[i][j] = neighbors === 2 || neighbors === 3 ? 1 : 0;
            } else {
                newGrid[i][j] = neighbors === 3 ? 1 : 0;
            }
        }
    }
    return newGrid;
}

// Function to count the number of living neighbors of a cell
function countNeighbors(grid, x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const neighborX = x + i;
            const neighborY = y + j;
            if (neighborX >= 0 && neighborX < rows && neighborY >= 0 && neighborY < cols) {
                count += grid[neighborX][neighborY];
            }
        }
    }
    count -= grid[x][y];
    return count;
}

// example of use
let initialGrid = createGrid();
randomizeGrid(initialGrid);
console.log('Initial Grid:');
displayGrid(initialGrid);

// Update the grid several times (simulate generations)
for (let generation = 1; generation <= 15; generation++) {
    console.log(`\nGeneration ${generation}:`);
    initialGrid = updateGrid(initialGrid);
    displayGrid(initialGrid);
}
