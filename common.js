let field = document.createElement('div');
field.className = 'field';

for (let i = 0; i < 100; i++) {
	field.innerHTML += '<div class="excel"></div>';
}

document.body.appendChild(field);

let excel = document.getElementsByClassName('excel');
let x = 1,
		y = 10;

for (let i = 0; i < excel.length; i++) {
	if (x > 10) {
		x = 1;
		y--;
	}
	excel[i].setAttribute('data-posX', x);
	excel[i].setAttribute('data-posY', y);
	x++;
}

function generateSnake() {
	let posX = Math.round(Math.random() * (10 - 3) + 3),
			posY = Math.round(Math.random() * (10 - 1) + 1);
	return [posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [document.querySelector('[data-posX = "' + coordinates[0] + '"][data-posY = "' +
coordinates[1] + '"]'), document.querySelector('[data-posX = "' + (coordinates[0] - 1) + '"][data-posY = "' +
coordinates[1] + '"]'), document.querySelector('[data-posX = "' + (coordinates[0] - 2) + '"][data-posY = "' +
coordinates[1] + '"]')];

for (let i = 0; i < snakeBody.length; i++) {
	snakeBody[i].classList.add('snakeBody');
}

snakeBody[0].classList.add('head');

let mouse;

function createApple() {
	function generateApple() {
		let posX = Math.round(Math.random() * (10 - 1) + 1),
			posY = Math.round(Math.random() * (10 - 1) + 1);
		return [posX, posY];
	}

	let appleCoordinates = generateApple();
	apple = document.querySelector('[data-posX = "' + appleCoordinates[0] + '"][data-posY = "' +
	appleCoordinates[1] + '"]');

	while(apple.classList.contains('snakeBody')) {
		let appleCoordinates = generateApple();
		apple = document.querySelector('[data-posX = "' + appleCoordinates[0] + '"][data-posY = "' +
		appleCoordinates[1] + '"]');
	}

	apple.classList.add('apple');
}

createApple(); 	

function move() {
	let snakeCoordinates = [snakeBody[0].getAttribute('data-posX'), snakeBody[0].getAttribute('data-posY')];
	snakeBody[0].classList.remove('head');
	snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
	snakeBody.pop();

	if (snakeCoordinates[0] < 10) {
		snakeBody.unshift(document.querySelector('[data-posX = "' + (+snakeCoordinates[0] + 1) + '"][data-posY = "' +
		snakeCoordinates[1] + '"]'));
	} else {
		snakeBody.unshift(document.querySelector('[data-posX = "1"][data-posY = "' +
		snakeCoordinates[1] + '"]'));
	}

	snakeBody[0].classList.add('head');

	for (let i = 0; i < snakeBody.length; i++) {
		snakeBody[i].classList.add('snakeBody');
	}
}

let interval = setInterval(move, 300); 
//console.log(snakeBody);