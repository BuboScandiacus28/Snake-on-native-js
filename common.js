let field = document.createElement('div');
field.className = 'field';

for (let i = 0; i < 100; i++) {
	field.innerHTML += '<div class="excel"></div>';
}

document.body.appendChild(field);

let excel = document.getElementsByClassName('excel');
let x = 1,
		y = 1;

for (let i = 0; i < excel.length; i++) {
	if (x > 10) {
		x = 1;
		y++;
	}
	excel[i].setAttribute('data-posX', x);
	excel[i].setAttribute('data-posY', y);
	x++;
}