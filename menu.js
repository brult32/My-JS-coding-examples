function appendLink(name, target) {
	const tempLI = document.createElement('li');
    tempLI.setAttribute("class", 'menuli');    
	const elem = document.createElement('a');
    elem.setAttribute('name', name);
    elem.setAttribute('href', target);
	elem.setAttribute("class", 'menua');    
    elem.innerHTML = name;
	tempLI.appendChild(elem);
	mainUL.appendChild(tempLI);
}

const mainDiv = document.createElement('div');
mainDiv.setAttribute('class', 'menu-container');
const mainButton = document.createElement('button');
mainButton.setAttribute('type', 'button');
mainButton.setAttribute('class', 'menu-input');
mainButton.setAttribute('id', 'menu-input');
const buttonLabel = document.createElement('label');
buttonLabel.setAttribute('class', 'menu-icon');
buttonLabel.setAttribute('for', 'menu-input');
const secDiv = document.createElement('div');
secDiv.setAttribute('class', 'menu-container-content');
const mainUL = document.createElement('ul');
mainUL.setAttribute('class', 'menuul');
appendLink('Home', 'index.html');
appendLink('Clock', 'clock.html');
appendLink('Breakout', 'breakout.html');
appendLink('Falling Sand', 'fallingsand.html');
appendLink('Game of Life', 'gamelife.html');
appendLink('5', 'pagina.html');
appendLink('Calc', 'calc.html');
appendLink('Idade', 'idade.html');
appendLink('1', 'hi.html');
appendLink('Array', 'array.html');
secDiv.appendChild(mainUL);
mainDiv.appendChild(mainButton);
mainDiv.appendChild(buttonLabel);
mainDiv.appendChild(secDiv);
document.body.appendChild(mainDiv);

// function createLine(){
// 	const elem = document.appendLink('br');
// 	document.body.appendChild(elem);
// }
// createLine();

// appendLink('button', 'Btn', 'a.html');


