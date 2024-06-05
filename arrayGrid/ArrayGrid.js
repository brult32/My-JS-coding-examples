var canvas = document.getElementById('myCanvas'),
	ctx = canvas.getContext('2d');

var cellGrid = [];

const cellSize = 100;
	rowsCols = canvas.width / cellSize;
//--------------------------------------------------CREATE GRID---------------------------------------------
function createCellsGrid() {
	for (var row = 0; row < rowsCols; row++) {
		cellGrid[row] = [];
		for (var col = 0; col < rowsCols; col++) {
			cellGrid[row][col] = { x: col * cellSize, y: row * cellSize};
		}
	}
}
createCellsGrid();
//---------------------------------------------------DRAW---------------------------------------------------
function drawRect(x, y, w, h) {
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.fillStyle = '#f2f2f2';
	ctx.fill();
	ctx.strokeStyle = '#000000';
	ctx.stroke();
	ctx.closePath();
}
function drawText(text, x, y) {
	ctx.font = '12pt Arial';
	ctx.fillStyle = '#000000';
	ctx.fillText(text, x, y);
}

function drawCells() {
	for (cellRows of cellGrid) {
		for (cel of cellRows) {
			drawRect(cel.x, cel.y, cellSize, cellSize);		
			drawText('['+String(cel.y).substring(0,1)+']['+String(cel.x).substring(0,1)+']', cel.x + 10, cel.y + 20);
		}
	}
}
//---------------------------------------------------MAIN LOOP----------------------------------------------
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//Draw
	drawCells();
	//Timing
	requestAnimationFrame(draw);
}
draw();