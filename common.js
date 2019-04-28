//создание поля игры
let field = document.createElement('div');
field.className = 'field';

//наполнение поля ячейками
for (let i = 0; i < 100; i++) {
	field.innerHTML += '<div class="excel"></div>';
}

//добавление поля в HTML
document.body.appendChild(field);

// excel - ячейки поля
// x и y координаты на поле x - строки, а y - столбцы
let excel = document.getElementsByClassName('excel');
let x = 1,
		y = 10;

//присваивание ячейкам своих координат 
for (let i = 0; i < excel.length; i++) {
	if (x > 10) {
		x = 1;
		y--;
	}
	excel[i].setAttribute('data-posX', x);
	excel[i].setAttribute('data-posY', y);
	x++;
}

//функция генерации начальных координат змеи
function generateSnake() {
	let posX = Math.round(Math.random() * (10 - 3) + 3),
			posY = Math.round(Math.random() * (10 - 1) + 1);
	return [posX, posY];
}

//coordinates - случайно сгенерированные координаты головы змеи
//snakeBody - массив ячеек на основе координат из coordinates
let coordinates = generateSnake();
let snakeBody = [document.querySelector('[data-posX = "' + coordinates[0] + '"][data-posY = "' +
coordinates[1] + '"]'), document.querySelector('[data-posX = "' + (coordinates[0] - 1) + '"][data-posY = "' +
coordinates[1] + '"]'), document.querySelector('[data-posX = "' + (coordinates[0] - 2) + '"][data-posY = "' +
coordinates[1] + '"]')];

//добавление каждому блоку змеи класса .snakeBody
for (let i = 0; i < snakeBody.length; i++) {
	snakeBody[i].classList.add('snakeBody');
}

//добавление голове змеи класса .head
snakeBody[0].classList.add('head');

//apple - переменная в которой лежит ячейка с яблоком
let apple;

//функция создания яблока
function createApple() {
	//генерация координат яблока
	function generateApple() {
		let posX = Math.round(Math.random() * (10 - 1) + 1),
			posY = Math.round(Math.random() * (10 - 1) + 1);
		return [posX, posY];
	}

	//coordinates - случайно сгенерированные координаты яблока
	let appleCoordinates = generateApple();
	
	//в apple заносится ячейка выбранная на основе координат из appleCoordinates  
	apple = document.querySelector('[data-posX = "' + appleCoordinates[0] + '"][data-posY = "' +
	appleCoordinates[1] + '"]');

	//если координаты сгенерированного яблока совпадают с координатами змеи, то яблоко генерируется снова
	//пока не будут сгенерированны координаты свободной ячейки
	while(apple.classList.contains('snakeBody')) {
		appleCoordinates = generateApple();
		apple = document.querySelector('[data-posX = "' + appleCoordinates[0] + '"][data-posY = "' +
		appleCoordinates[1] + '"]');
	}

	//добавление ячейке в которой лежит яблоко класс .apple
	apple.classList.add('apple');
}

//вызов функции создания яблока
createApple(); 	

//timerChecked - если false, то игра закончена или еще не начата, если true, то игра идет
let timerChecked = false;

//direction - направление змеи
//steps - переменная для пошагового срабатывания функции, т.е.
//если нажата сначала стрелка →, а потом быстро стрелка в верх ↑, то
//сначала, в обязательном порядке змея повернет в право, а потом подымется на верх, без "прыжков" 
let direction = 'right',
		steps = true;

//input - переменная хранящая input
let input = document.createElement('input');

//добавление input на страницу и добавление ему класса .input
document.body.appendChild(input);
input.classList.add('input');

//score - счетчик очков
let score = 0;

//занесение в input начальное значение счетчика score
input.value = `Ваши очки: ${score}`;

//interval - переменная для таймера вызывающего функцию раз в n-е время 
var interval;

//функция движения змеи
function move() {
	//snakeCoordinates координаты головы змеи
	let snakeCoordinates = [snakeBody[0].getAttribute('data-posX'), snakeBody[0].getAttribute('data-posY')];
	
	//удаления у головы змеи класса .head
	snakeBody[0].classList.remove('head');
	//удаление у последнего элемента тела змеи класса .snakeBody
	snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
	//удаление из массива ячеек тела змеи последнего элемента
	snakeBody.pop();

	//при движении вправо
	if (direction == 'right') {
		//если змея не вышла за границу поля
		if (snakeCoordinates[0] < 10) {
			//добавление в начало массива координаты первого элемента по направлению движения
			//увеличении координаты x, т.е. движение вправо 
			snakeBody.unshift(document.querySelector('[data-posX = "' + (+snakeCoordinates[0] + 1) + '"][data-posY = "' +
			snakeCoordinates[1] + '"]'));
		} else {
			//если была пересечена правая граница x > 10, то начинать с самого начала x = 1
			snakeBody.unshift(document.querySelector('[data-posX = "1"][data-posY = "' +
			snakeCoordinates[1] + '"]'));
		}
		//при движении влево
	} else if (direction == 'left') {
		//если змея не вышла за границу поля
		if (snakeCoordinates[0] > 1) {
			//добавление в начало массива координаты первого элемента по направлению движения
			//уменьшение координаты x, т.е. движение в лево
			snakeBody.unshift(document.querySelector('[data-posX = "' + (+snakeCoordinates[0] - 1) + '"][data-posY = "' +
			snakeCoordinates[1] + '"]'));
		} else {
			//если была пересечена левая граница x < 1, то начинать с самого начала x = 10
			snakeBody.unshift(document.querySelector('[data-posX = "10"][data-posY = "' + snakeCoordinates[1] + '"]'));
		}
		//при движении в верх
	} else if (direction == 'up') {
		//если змея не вышла за границу поля
		if (snakeCoordinates[1] < 10) {
			//добавление в начало массива координаты первого элемента по направлению движения
			//увеличение координаты y, т.е. движение в верх
			snakeBody.unshift(document.querySelector('[data-posX = "' + snakeCoordinates[0] + '"][data-posY = "' +
			(+snakeCoordinates[1] + 1) + '"]'));
		} else {
			//если была пересечена верхняя граница y > 10, то начинать с самого начала y = 1
			snakeBody.unshift(document.querySelector('[data-posX = "' + snakeCoordinates[0] + '"][data-posY = "1"]'));
		}
		//при движении в низ
	} else if (direction == 'down') {
		//если змея не вышла за границу поля
		if (snakeCoordinates[1] > 1) {
			//добавление в начало массива координаты первого элемента по направлению движения
			//уменьшение координаты y, т.е. движение в низ
			snakeBody.unshift(document.querySelector('[data-posX = "' + snakeCoordinates[0] + '"][data-posY = "' +
			(+snakeCoordinates[1] - 1) + '"]'));
		} else {
			//если была пересечена нижняя граница y < 1, то начинать с самого начала y = 10
			snakeBody.unshift(document.querySelector('[data-posX = "' + snakeCoordinates[0] + '"][data-posY = "10"]'));
		}
	}
	
	//если змея "съела" яблоко (координаты головы змеи и яблока совпадают)
	if (snakeBody[0].getAttribute('data-posX') == apple.getAttribute('data-posX') && 
	snakeBody[0].getAttribute('data-posY') == apple.getAttribute('data-posY')) {
		//удаление у ячейки в которой находится яблоко класа .apple
		apple.classList.remove('apple');

		//px - координаты по x последней ячейки в теле змеи
		//py - координаты по y последней ячейки в теле змеи
		let px = snakeBody[snakeBody.length - 1].getAttribute('data-posX'),
				py = snakeBody[snakeBody.length - 1].getAttribute('data-posY');

		//добавление в конец тела змеи новой ячейки (копии последнего элемента, т.е. наращивание тела змеи)
		snakeBody.push(document.querySelector('[data-posX = "' + px + '"][data-posY = "' + py + '"]'));

		//генерация нового яблока
		createApple();

		//увеличение счетчика очков и занесение нового результата в input
		score++;
		input.value = `Ваши очки: ${score}`;
	}

	//если голова попала на тело, т.е. конец игры змея сама себя съела
	if (snakeBody[0].classList.contains('snakeBody')) {
		//остановка таймера
		clearInterval(interval);
		//false - игра окончена
		timerChecked = false;
		//вывод экрана с надписью о конце игры и количеством очков
		pause.getElementsByTagName('p')[0].innerHTML = `Игра окончена! Ваши очки: ${score}`;
		pause.getElementsByClassName('bg')[0].style.background = 'red';
		pause.classList.remove('active');
	}

	//добавление перемещенному первому элементу тела змеи класса .head
	snakeBody[0].classList.add('head');

	//добавление всем ячейкам тела змеи класса .snakeBody
	for (let i = 0; i < snakeBody.length; i++) {
		snakeBody[i].classList.add('snakeBody');
	}

	//true - перемещение змеи закончено
	steps = true;
} 

//добавление элементов управления
window.addEventListener('keydown', function (event) {
	//если функция движения змеи закончила свое выполнение
	if (steps == true) {
		//если нажата стрелочка ← и змея не движется вправо (невозможность поворота на 180 градусов)
		if (event.keyCode == 37 && direction != 'right') {
			//если игра еще не начата, то начать ее 
			if (timerChecked == false) {
				interval = setInterval(move, 200);
				timerChecked = true;
			}
			//изменение направление на лево
			direction = 'left';	
			//false - поворот змеи в указанную сторону не закончен 
			steps = false;
		}
		//если нажата стрелочка ↑ и змея не движется в низ (невозможность поворота на 180 градусов)
		if (event.keyCode == 38 && direction != 'down') {
			//если игра еще не начата, то начать ее 
			if (timerChecked == false) {
				interval = setInterval(move, 200);
				timerChecked = true;
			}
			//изменение направление на верх
			direction = 'up';	
			//false - поворот змеи в указанную сторону не закончен
			steps = false;
		}
		//если нажата стрелочка → и змея не движется влево (невозможность поворота на 180 градусов)
		if (event.keyCode == 39 && direction != 'left') {
			//если игра еще не начата, то начать ее 
			if (timerChecked == false) {
				interval = setInterval(move, 200);
				timerChecked = true;
			}
			//изменение направление на право
			direction = 'right';
			//false - поворот змеи в указанную сторону не закончен
			steps = false;
		}
		//если нажата стрелочка ↓ и змея не движется в верх (невозможность поворота на 180 градусов)
		if (event.keyCode == 40 && direction != 'up') {
			//если игра еще не начата, то начать ее 
			if (timerChecked == false) {
				interval = setInterval(move, 200);
				timerChecked = true;
			}
			//изменение направление на низ
			direction = 'down';	
			//false - поворот змеи в указанную сторону не закончен
			steps = false;
		}
	}
	//если нажат пробел
	if (event.keyCode == 32) {
		//если игра идет
		if (timerChecked != false) {
			//если экран паузы не вызван, то вызвать, а игру остановить
			if (pause.classList.contains('active')) {
				clearInterval(interval);
				pause.getElementsByTagName('p')[0].innerHTML = 'pause';
				pause.getElementsByClassName('bg')[0].style.background = 'black';
			} else {
				//иначе продолжить игру
				interval = setInterval(move, 200);
			}
			//вызов или закрытие экрана паузы
			pause.classList.toggle('active');
		}
	}
	//если нажата кнопка R
	if (event.keyCode == 82) {
		//остановка змеи
		clearInterval(interval);

		//скрытие экрана паузы или конца игры
		pause.classList.add('active');

		//false - игра не начата
		timerChecked = false;

		//возвращение направления змеи к значению по умолчанию (право)
		direction = 'right';

		//обнуление значения счетчика и занесение значения в input
		score = 0;
		input.value = `Ваши очки: ${score}`;

		//удаление существующей змеи
		for (let i = 0; i < snakeBody.length; i++) {
			snakeBody[i].classList.remove('snakeBody');
		}
		snakeBody[0].classList.remove('head');

		//уменьшение размера змеи до начального
		snakeBody.length = 3;

		//генерация змеи в новом случайном месте
		coordinates = generateSnake();
		snakeBody = [document.querySelector('[data-posX = "' + coordinates[0] + '"][data-posY = "' +
		coordinates[1] + '"]'), document.querySelector('[data-posX = "' + (coordinates[0] - 1) + '"][data-posY = "' +
		coordinates[1] + '"]'), document.querySelector('[data-posX = "' + (coordinates[0] - 2) + '"][data-posY = "' +
		coordinates[1] + '"]')];
		
		//добавление новой змее тела
		for (let i = 0; i < snakeBody.length; i++) {
			snakeBody[i].classList.add('snakeBody');
		}

		//добавление новой змее головы
		snakeBody[0].classList.add('head');

		//удаление ячейки с яблоком
		apple.classList.remove('apple');

		//генерация новой ячейки с яблоком
		createApple();
	}
});
//console.log(snakeBody);