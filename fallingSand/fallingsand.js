

var canvas = document.getElementById('myCanvas'),
	ctx = canvas.getContext('2d');
const gameCanvasSize = 600;
ctx.canvas.width = gameCanvasSize;
ctx.canvas.height = gameCanvasSize;

var debugArray = [];
let defaultTimer = 5,
	countDownTimer = defaultTimer;
var celGrid = [];
const celSize = 10;
	celsPerLine = canvas.width / celSize;
let timerDark = '#000000',
	timerAccent = '#ff0000',
	// celFillColor = '#00bb00',
	celEmptyColor = '#f2f2f2',
	cellStrokeColor ='#dddddd';
let celFillColor = ['#00fa70','#00e786','#00d197','#00bc9c','#00a89b','#009496','#00818e','#006e82','#195b6f','#2a4858','#195b6f', '#006e82', '#00818e', '#009496', '#00a89b', '#00bc9c', '#00d197', '#00e786'],
	colorCounter = 0;
let mouseDown = false;
let mousePosition = {x: 0, y: 0};
let brushSize = 0;
//-----------------------------------------------INPUT HANDLER----------------------------------------------
document.addEventListener('mousemove', function (e){
	mousePosition.x = e.clientX - canvas.offsetLeft;
	mousePosition.y = e.clientY;
}, false);
document.addEventListener('mousedown', function (e){
	mouseDown = true;
}, false);
document.addEventListener('mouseup', function (e){
	mouseDown = false;
	// makeNewSand(e.clientX - canvas.offsetLeft, e.clientY);
	// debugText(e.clientX - canvas.offsetLeft + ' x - y ' + e.clientY);
}, false);
//--------------------------------------------------METHODS-------------------------------------------------
function isClicked(cel, x, y){
	return ((cel.x < x && cel.x + celSize > x) &&
		(cel.y < y && cel.y + celSize > y));
}
function canPaintSide(row, col){
	return row >= 0 && row < celsPerLine && col >= 0 && col < celsPerLine;
}
function getCelColor(){
	colorCounter++	
	if (colorCounter > celFillColor.length){ colorCounter = 0;}
	return colorCounter;
}
function paintMyCel(row, col){
	celGrid[row][col].alive = true;					
	celGrid[row][col].color = celFillColor[getCelColor()];
}
function paintWithBrush(row, col){
	let myGroupRow = [row - brushSize, row - brushSize, row - brushSize, row, row, row + brushSize, row + brushSize, row + brushSize];
	let myGroupCol = [col - brushSize, col, col + brushSize, col - brushSize, col + brushSize, col - brushSize, col, col + brushSize];
	for (let current in myGroupRow){
		if (canPaintSide(myGroupRow[current], myGroupCol[current])){
			paintMyCel(myGroupRow[current], myGroupCol[current]);
		}	
	}
}
function makeNewSand(x, y){
	for (let row = 0; row < celsPerLine; row++){
		for (let col = 0; col < celsPerLine; col++){
			if (!celGrid[row][col].alive && isClicked(celGrid[row][col], x, y)){
				paintMyCel(row, col);
				if (brushSize > 0){
					paintWithBrush(row, col);
				}	
			}
		}
	}
}

function fallToSide(row, col, side){
	celGrid[row][col].alive = false;
	celGrid[row + 1][col + side].alive = true;	
	celGrid[row + 1][col + side].color = celGrid[row][col].color;
}
function canFallToSide(row, col){
	return col >= 0 && col < celsPerLine && !celGrid[row][col].alive;
}
function fallSand(){
	for (let celRow = celsPerLine-2; celRow >= 0; celRow--) {
		for (let celCol = celsPerLine-1; celCol >= 0; celCol--) {
			if (celGrid[celRow][celCol].alive){
				if (!celGrid[celRow + 1][celCol].alive && celRow <= celsPerLine){
					celGrid[celRow][celCol].alive = false;
					celGrid[celRow + 1][celCol].alive = true;
					celGrid[celRow + 1][celCol].color = celGrid[celRow][celCol].color;
				}else{ 
					let side = Math.random();
					if (canFallToSide(celRow + 1, celCol - 1) && side < 0.5){
						fallToSide(celRow, celCol, -1);
					} else if (canFallToSide(celRow + 1, celCol + 1) && side < 0.5){
						fallToSide(celRow, celCol, 1);
					} 
				}				
			}
		}
	}
}

function createCelsGrid() {
	for (let row = 0; row < celsPerLine; row++) {
		celGrid[row] = [];
		for (let col = 0; col < celsPerLine; col++) {
			celGrid[row][col] = { x: col * celSize, y: row * celSize, alive: false, color: celEmptyColor};
		}
	}
}
//---------------------------------------------------TIMER--------------------------------------------------
function changeTimerColor(color){
	getId('butimer').style.background = color;
	getId('butimer').style.color = color;
	getId('butimer').style.backgroundColor = color;
}
function mainTimer(){
	countDownTimer--;
	if (countDownTimer <= 0){
		countDownTimer = defaultTimer;
		changeTimerColor(timerAccent);
		fallSand();
	}else{
		changeTimerColor(timerDark);
	}
}
//---------------------------------------------------DRAW---------------------------------------------------
function drawRect(x, y, w, h, bgColor) {
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.fillStyle = bgColor;
	ctx.fill();
	ctx.strokeStyle = cellStrokeColor;	
	ctx.stroke();
	ctx.closePath();
}
function drawText(text, x, y, size, color) {
	ctx.font = size + ' Arial';
	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
}
function drawCells() {
	for (celRows of celGrid) {
		for (cel of celRows) {
			drawRect(cel.x, cel.y, celSize, celSize, cel.alive ? cel.color : celEmptyColor);		
			// drawText(String(cel.y).substring(0,1)+':'+String(cel.x).substring(0,1), cel.x + 10, cel.y + 20, '12pt', '#000000');			
		}
	}
}
//---------------------------------------------------MAIN---------------------------------------------------
createCelsGrid();
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//Game Logic
	mainTimer();
	if(mouseDown){
		makeNewSand(mousePosition.x, mousePosition.y);
	}
	//Draw
	drawCells();
	//Timing
	requestAnimationFrame(draw);
}
draw();
//--------------------------------------------------DEBUG---------------------------------------------------
function debugText(text = String){
	debugArray.push(text);
	if(debugArray.length > 20){
		debugArray.shift();
	}
	changeDomText('debug', debugArray.join('<br>'));
}
//-----------------------------------------------DOM ELEMENTS-----------------------------------------------
function changeDomText(id, text){
	getId(id).innerHTML = text;
}
function getId(id){
	return document.getElementById(id);
}
function changeBrushSize(){	
	brushSize = Number(getId('brushslider').value);
	changeDomText('brushlabel', 'Brush Size: ' + brushSize);
}
function changeTimer(){	
	defaultTimer = Number(10 - getId('timeslider').value);
	changeDomText('timerlabel', 'Change timer: ' + getId('timeslider').value);
}