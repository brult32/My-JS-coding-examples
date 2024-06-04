var canvas = document.getElementById('myCanvas'),
	ctx = canvas.getContext('2d');
const gameCanvasSize = 500;
ctx.canvas.width = gameCanvasSize;
ctx.canvas.height = gameCanvasSize;

let debugArray = [];
let defaultTimer = 100,
	countDownTimer = defaultTimer;
let cellGrid = [];
const cellSize = 25;
	rowsCols = canvas.width / cellSize;
let lineColor = '#000000',
	// cellAliveOne = '#d2d2d2',
	cellAliveTwo = '#00bb00',
	// cellAliveThree = '#00bb99',
	cellDeadColor = '#f2f2f2',
	cellStrokeColor ='#000000',
	countDownColor = getId('butimer').style.backgroundColor,
	countDownAccent = '#ff0000';
let mouseDown = false,
	makeCells = false;
//-----------------------------------------------INPUT HANDLER----------------------------------------------
document.addEventListener('mousemove', function(e){
	if (mouseDown){
		checkTouch(e.clientX - canvas.offsetLeft, e.clientY);
	}
}, false);
document.addEventListener('mousedown', function(e){
	mouseDown = true;
}, false);
document.addEventListener('mouseup', function(e){
	mouseDown = false;
	checkTouch(e.clientX - canvas.offsetLeft, e.clientY);
	// debugText(e.clientX - canvas.offsetLeft + ' x - y ' + e.clientY);
}, false);

function isClicked(cel, x, y){
	return ((cel.x < x && cel.x + cellSize > x) &&
		(cel.y < y && cel.y + cellSize > y));
}
function checkTouch(x, y){
	for (cellRows of cellGrid){
		for (cels of cellRows){
			if (isClicked(cels,x, y)){
				// debugText((cels.x).toString() + ':' + (cels.y).toString() + ' touched: ' + x + ' x - y ' + y);
				cels.alive = true;
			}
		}
	}
}
//--------------------------------------------------METHODS-------------------------------------------------
function createCellsGrid() {
	for (let row = 0; row < rowsCols; row++) {
		cellGrid[row] = [];
		for (let col = 0; col < rowsCols; col++) {
			cellGrid[row][col] = { x: col * cellSize, y: row * cellSize, alive: false, sideCells: 0};
		}
	}
}

function clearAdjacentCells(){
	for (let cellRow = 0; cellRow < rowsCols; cellRow++){
		for (let cellCol = 0; cellCol < rowsCols; cellCol++){
			cellGrid[cellRow][cellCol].sideCells = 0;
			//debugText('celclear');
		}
	}
}
function shouldCellDie() {
	clearAdjacentCells();
	for (let cellRow = 0; cellRow < rowsCols; cellRow++) {
		for (let cellCol = 0; cellCol < rowsCols; cellCol++) {
			for (let sideRow = cellRow; sideRow <= cellRow + 1; sideRow++) {
				// debugText('check row: ' + row);
				for (let sideCol = cellCol - 1; sideCol <= cellCol + 1; sideCol++) {
					if (cellRow == sideRow) {
						sideCol++;
						sideCol++;
					} else if (cellCol == 0 && sideCol == -1) {
						sideCol++;
					}
					if (sideCol >= rowsCols || sideRow >= rowsCols) {
						break;
					}
					if (cellGrid[cellRow][cellCol].alive) {
						cellGrid[sideRow][sideCol].sideCells++;
					}
					if (cellGrid[sideRow][sideCol].alive) {
						cellGrid[cellRow][cellCol].sideCells++;
					}
				}
			}
			if (cellGrid[cellRow][cellCol].sideCells < 2 || cellGrid[cellRow][cellCol].sideCells > 3) {
				cellGrid[cellRow][cellCol].alive = false;
			} else if (cellGrid[cellRow][cellCol].sideCells == 3) {
				cellGrid[cellRow][cellCol].alive = true;
			}
		}
	}
}

function changeTimerColor(color){
	getId('butimer').style.background = color;
	getId('butimer').style.color = color;
	getId('butimer').style.backgroundColor = color;
}
function runNextGeneration(){
	countDownTimer--
	if (countDownTimer <= 0){
		shouldCellDie();
		countDownTimer = defaultTimer;
		 changeTimerColor(countDownAccent);
	}else{
		changeTimerColor(countDownColor);
	}
}
//---------------------------------------------------DRAW---------------------------------------------------
function drawRect(x, y, w, h, lColor, bgColor) {
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.fillStyle = bgColor;
	ctx.fill();
	ctx.strokeStyle = lColor;
	ctx.stroke();
	ctx.closePath();
}
function drawText(text, x, y, size, color) {
	ctx.font = size + ' Arial';
	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
}

function drawCells() {
	for (cellRow of cellGrid) {
		for (cel of cellRow) {
			drawRect(cel.x, cel.y, cellSize, cellSize, cellStrokeColor, cel.alive ? cellAliveTwo : cellDeadColor);		
			// drawText(String(cel.x).substring(0,1)+':'+String(cel.y).substring(0,1) + '  .' + cel.sideCells, cel.x + 10, cel.y + 20, '12pt', '#000000');			
		}
	}
}
//---------------------------------------------------MAIN---------------------------------------------------
createCellsGrid();

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//Game Logic
	runNextGeneration();
	if (makeCells) {
		createLife();
	}
	//Draw
	drawCells();
	//Timing
	requestAnimationFrame(draw);
}
draw();
//--------------------------------------------------DEBUG---------------------------------------------------
function debugText(text){
	debugArray.push(text);
	if(debugArray.length > 20){
		debugArray.shift();
	}
	getId('debug').innerHTML = debugArray.join('<br>');
}
function getId(id){
	return document.getElementById(id);
}
//-----------------------------------------------DOM ELEMENTS-----------------------------------------------
function makeNewCells() {
	makeCells = true;
}
function createLife() {
	makeCells = false;
	for (let row in cellGrid){
		for(let col in cellGrid[row]){
			if (!cellGrid[row][col].alive) {
				cellGrid[row][col].alive = Math.random() < 0.4;
			}
		}
	}
}

function changeTimer() {
	defaultTimer = parseInt(getId('mytimer').value);
}

// function changeCellSize() {
// 	cellSize = parseInt(getId('cellsize').value);
// }

// function changeCellColor(value){
// 	cellAliveColor = value;
// }