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

let direction = 'right',
		steps = false;

let input = document.createElement('input');
document.body.appendChild(input);
input.classList.add('input');

let score = 0;
input.value = `Ваши очки: ${score}`;

function move() {
	let snakeCoordinates = [snakeBody[0].getAttribute('data-posX'), snakeBody[0].getAttribute('data-posY')];
	snakeBody[0].classList.remove('head');
	snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
	snakeBody.pop();

	if (direction == 'right') {
		if (snakeCoordinates[0] < 10) {
			snakeBody.unshift(document.querySelector('[data-posX = "' + (+snakeCoordinates[0] + 1) + '"][data-posY = "' +
			snakeCoordinates[1] + '"]'));
		} else {
			snakeBody.unshift(document.querySelector('[data-posX = "1"][data-posY = "' +
			snakeCoordinates[1] + '"]'));
		}
	} else if (direction == 'left') {
		if (snakeCoordinates[0] > 1) {
			snakeBody.unshift(document.querySelector('[data-posX = "' + (+snakeCoordinates[0] - 1) + '"][data-posY = "' +
			snakeCoordinates[1] + '"]'));
		} else {
			snakeBody.unshift(document.querySelector('[data-posX = "10"][data-posY = "' +
			snakeCoordinates[1] + '"]'));
		}
	} else if (direction == 'up') {
		if (snakeCoordinates[1] < 10) {
			snakeBody.unshift(document.querySelector('[data-posX = "' + snakeCoordinates[0] + '"][data-posY = "' +
			(+snakeCoordinates[1] + 1) + '"]'));
		} else {
			snakeBody.unshift(document.querySelector('[data-posX = "' + snakeCoordinates[0] + '"][data-posY = "1"]'));
		}
	} else if (direction == 'down') {
		if (snakeCoordinates[1] > 1) {
			snakeBody.unshift(document.querySelector('[data-posX = "' + snakeCoordinates[0] + '"][data-posY = "' +
			(+snakeCoordinates[1] - 1) + '"]'));
		} else {
			snakeBody.unshift(document.querySelector('[data-posX = "' + snakeCoordinates[0] + '"][data-posY = "10"]'));
		}
	}
	
	if (snakeBody[0].getAttribute('data-posX') == apple.getAttribute('data-posX') && 
	snakeBody[0].getAttribute('data-posY') == apple.getAttribute('data-posY')) {
		apple.classList.remove('apple');
		let px = snakeBody[snakeBody.length - 1].getAttribute('data-posX'),
				py = snakeBody[snakeBody.length - 1].getAttribute('data-posY');

		snakeBody.push(document.querySelector('[data-posX = "' + px + '"][data-posY = "' + py + '"]'));

		createApple();

		score++;
		input.value = `Ваши очки: ${score}`;
	}

	if (snakeBody[0].classList.contains('snakeBody')) {
		setTimeout(() => {
			alert(`Игра окончена! Ваши очки: ${score}`);
		}, 20)
		clearInterval(interval);
		document.body.style.background = 'red';
	}

	snakeBody[0].classList.add('head');

	for (let i = 0; i < snakeBody.length; i++) {
		snakeBody[i].classList.add('snakeBody');
	}

	steps = true;
}

let interval = setInterval(move, 200); 

window.addEventListener('keydown', function (event) {
	if (steps == true) {
		if (event.keyCode == 37 && direction != 'right') {
			direction = 'left';	
			steps = false;
		}
		if (event.keyCode == 38 && direction != 'down') {
			direction = 'up';	
			steps = false;
		}
		if (event.keyCode == 39 && direction != 'left') {
			direction = 'right';
			steps = false;
		}
		if (event.keyCode == 40 && direction != 'up') {
			direction = 'down';	
			steps = false;
		}
	}
});
//console.log(snakeBody);