'use strict';
var canvas = document.getElementById('myCanvas'),
	ctx = canvas.getContext('2d');
const gameCanvasSize = 600;
ctx.canvas.width = gameCanvasSize;
ctx.canvas.height = gameCanvasSize;

var debugArray = [];
let gamestart = false;
let mousePosition = {x: 0, y: 0};
let mouseDown = false;
let player = {x: 50, y: 400, size: 20, jump: 0, jumpstart: false, jumptop: false};
let moveLimits = {x:0, y:500, w: canvas.width, h:350};
let moveSpeed = 6,
	jumpmax = 80;
let keyPressed = {right: false, left: false, up: false, down: false};
let obstPosition = {x: canvas.width, w: 60, offset: 50};
let score = 0;
let scoreGiven = false;
//-----------------------------------------------INPUT HANDLER----------------------------------------------
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener('mousemove', function (e){
	mousePosition.x = e.clientX - canvas.offsetLeft;
	mousePosition.y = e.clientY;
}, false);
document.addEventListener('mousedown', function (e){
	mouseDown = true;
}, false);
document.addEventListener('mouseup', function (e){
	mouseDown = false;
}, false);
function keyDownHandler(e) {
	if (e.key == "Right" || e.key == "ArrowRight") {
		keyPressed.right = true;
	}
	else if (e.key == "Left" || e.key == "ArrowLeft") {
		keyPressed.left = true;
	}
	if (e.key == "Up" || e.key == "ArrowUp") {
		keyPressed.up = true;
	}
	else if (e.key == "Down" || e.key == "ArrowDown") {
		keyPressed.down = true;
	}
	if (e.key == "Shift" || e.key == "z") {
		player.jumpstart = true;
	}	
	if (e.key == "s") {
		gamestart = true;
	}
	if (e.key == "o" || e.key == "p") {
		debugText(e.key + ' pressed');
		//debug.outline = !debug.outline;
	}
}
function keyUpHandler(e) {
	if (e.key == "Right" || e.key == "ArrowRight") {
		keyPressed.right = false;
	}
	else if (e.key == "Left" || e.key == "ArrowLeft") {
		keyPressed.left = false;
	}
	if (e.key == "Up" || e.key == "ArrowUp") {
		keyPressed.up = false;
	}
	else if (e.key == "Down" || e.key == "ArrowDown") {
		keyPressed.down = false;
	}}
//--------------------------------------------------METHODS-------------------------------------------------
function updatePlayer(){
	playerMove();
	playerJump();
	playerDie();
}
function playerMove(){
	if (keyPressed.right && getLimit(player.x + player.size/2, moveLimits.w, true)){
		player.x += moveSpeed;
	} else if(keyPressed.left && getLimit(player.x - player.size/2, moveLimits.x, false)){
		player.x -= moveSpeed;
	}
	if (keyPressed.up && getLimit(player.y + player.size/2, moveLimits.h, false)){
		player.y -= moveSpeed;
	} else if(keyPressed.down && getLimit(player.y + player.size/2, moveLimits.y, true)){
		player.y += moveSpeed;
	}
}
function getLimit(player, limit, plus){
	if (plus){
		return player < limit;
	}else{
		return player > limit;
	}	
}
function playerJump(){
	if (player.jumpstart){
		if (!player.jumptop && player.jump > (jumpmax * -1)){
			player.jump -= moveSpeed;
		} 
		if (player.jump <= (jumpmax * -1)){
			player.jumptop = true;
		}
		if (player.jumptop){
			player.jump += moveSpeed;
			if (player.jump >= 0){
				player.jump = 0;
				player.jumptop = false;
				player.jumpstart = false;
			}
		}
	}
}
function playerDie(){
	if (!player.jumpstart && player.x + player.size/2 > obstPosition.x && player.x + player.size/2 < obstPosition.x + obstPosition.w){
		debugText('DIED' + player.x);
		document.location.reload();
	}
}

function updateObst(){
	obstPosition.x -= 5;
	if (obstPosition.x < -20){
		obstPosition.x = canvas.width + 60;
		scoreGiven = false;
	}
	if (!scoreGiven){
		score++;
		scoreGiven = true;
	}
}
//---------------------------------------------------DRAW---------------------------------------------------
function drawLines() {
	drawRect(0, 0, canvas.width, moveLimits.h, 'lightblue', null);	
	drawRect(moveLimits.x, moveLimits.y, canvas.width, moveLimits.h - moveLimits.y, 'lightgray', null);	
	drawRect(0, moveLimits.y, canvas.width, canvas.height, 'green', null);	
}
function drawObst(){
	drawRect(obstPosition.x, moveLimits.h, obstPosition.w, canvas.height, 'lightblue', null);
	drawRect(obstPosition.x, moveLimits.h, obstPosition.w - obstPosition.offset, moveLimits.y, 'gray', null);
	drawRect(obstPosition.x, moveLimits.y, obstPosition.w - obstPosition.offset, moveLimits.h, 'darkgreen', null);
}
function drawPlayer(){
	drawCircle(player.x, player.y + player.size - player.size / 2, player.size / 3, 0, Math.PI, 'gray', null);
	drawCircle(player.x, player.y + player.jump - player.size / 2, player.size, 0, Math.PI * 2, null, 'black');
}

function drawRect(x, y, w, h, fill, stroke) {
	ctx.beginPath();
	ctx.rect(x, y, w, h);	
	drawFill(fill);
	drawStroke(stroke);
	ctx.closePath();
}
function drawCircle(x, y, r, start, end, fill, stroke) {
	ctx.beginPath();
	ctx.arc(x, y, r, start, end);
	drawFill(fill);
	drawStroke(stroke);
	ctx.closePath();
}
function drawFill(fill){
	if (fill){
		ctx.fillStyle = fill;
		ctx.fill();
	}
}
function drawStroke(stroke){
	if (stroke){
		ctx.strokeStyle = stroke;	
		ctx.stroke();
	}
}
function drawText(text, x, y, size, color) {
	ctx.font = size + ' Arial';
	ctx.fillStyle = color;
	ctx.fillText(text, x, y);
}
//---------------------------------------------------MAIN---------------------------------------------------
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//Game Logic
	if(gamestart){
		updatePlayer();
		updateObst();
	}	
	//Draw
	drawLines();
	drawObst();
	drawPlayer();
	drawText(score, canvas.width / 2, 80, '32px', 'black'); 
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