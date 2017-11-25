const getValueSafe = (board, [x,y]) => ((board[x] || [] )[y] && 1)|| 0;
const gvs = getValueSafe;

const neighborsCount = (board, [x,y]) => 0 +
        gvs(board, [x-1, y-1]) + gvs(board, [x-1, y]) +  gvs(board, [x-1, y+1]) +
        gvs(board, [x, y-1]) + gvs(board, [x, y+1]) +
        gvs(board, [x+1, y-1]) +  gvs(board, [x+1, y]) +  gvs(board, [x+1, y+1]);

const nextCellState = (board, [x,y]) => {
    const nC = neighborsCount(board, [x,y]);

    return (nC < 2 || nC > 3)  ?  0 : (nC === 2) ?
        /*(*/board[x][y] /*?  board[x][y]-1 : 0)*/  : 10
};

const nextRound = (board) =>
     board.map((row,i)=>
         row.map((cell,j)=>
            nextCellState(board, [i, j]) ));


const render = (board) => board
    .map(row => `
        <div class="GOL__row">
            ${row.map(cell => `
                <div class="GOL__cell GOL__cell_${cell? "alive":"dead"}"></div>
            `).join("")}
        </div>`).join("");

 let board = Array(20).fill().map( () => Array(20).fill().map(() => Math.round(Math.random())));

// let board = [
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,10,10,10,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0]
// ];

const gameEl = document.getElementById("game");
gameEl.innerHTML = render(board);

setInterval( () => {
    board = nextRound(board);
    gameEl.innerHTML = render(board)
} , 400);




















