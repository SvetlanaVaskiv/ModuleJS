"use strict"
//const canvas = document.getElementById("canvas");
//const ctx = canvas.getContext("2d");

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

/*function circle(positionX, positionY, radius, color) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(positionX, positionY, radius, 0, Math.PI * 2, true);
	ctx.fill();
}

function block(positionX, positionY, width, height, color) {
	ctx.fillStyle = color;
	ctx.fillRect(positionX, positionY, width, height);

}
let circleX = 30;
let circleY = 250;
let moveRight = true;


let moveTop = true;
let blockY = 200;
let heightBlock = 100;
let score = 0;
document.addEventListener('keydown', function (event) {
	if (event.code == "ArrowDown" && blockY + heightBlock !== 500) {
		blockY += 5;
	} else if (event.code == "ArrowUp" && blockY != 0) {
		blockY -= 5;
	}
})
let playGame = setInterval(function () {
	ctx.clearRect(0, 0, 800, 500);
	if (circleY >= blockY && circleY <= blockY + heightBlock && circleX == 725) {
		moveRight = false;
		score++;
	}
	if (circleY - 25 == 0) {
		moveTop = false;
	} else if (circleY + 25 == 500) {
		moveTop = true;
	}
	if (circleX - 25 == 0) {
		moveRight = true;
	}


	if (moveRight == true) {
		circleX++;
	} else {
		circleX--;
	}

	if (moveTop == true) {
		circleY--;
	} else {
		circleY++;
	}


	circle(circleX, circleY, 25, 'red');
	block(750, blockY, 25, heightBlock, 'black');
	if ((circleY <= blockY || circleY >= blockY + heightBlock) && circleX > 725) {
		clearInterval(playGame);
		console.log(score)
	}
}, 0)
*/



class Platform {
	constructor(
		ctx,
		positionX,
		positionY,
		width,
		height,
		color,
	) {
		this._ctx = ctx;
		this._positionX = positionX;
		this._positionY = positionY;
		this._width = width;
		this._height = height;
		this._color = color;
	}
	get positionX() {
		return this._positionX;
	}
	get positionY() {
		return this._positionY;
	}
	get width() {
		return this._width;
	}
	get height() {
		return this._height;
	}
	get color() {
		return this._color;
	}
	set positionX(value) {
		this._positionX = value;
	}
	set positionY(value) {
		this._positionY = value;
	}
	render() {
		this._ctx.beginPath();
		this._ctx.fillStyle = this._color;

		this._ctx.fillRect(
			this.positionX,
			this.positionY,
			this.width,
			this.height
		);
	}
}



class Block {
	constructor(
		positionX,
		positionY,
		width,
		height,
	) {
		this._positionX = positionX;
		this._positionY = positionY;
		this._width = width;
		this._height = height;
	}
	get positionX() {
		return this._positionX;
	}
	get positionY() {
		return this._positionY;
	}
	get width() {
		return this._width;
	}
	get height() {
		return this._height;
	}

	set positionX(value) {
		this._positionX = value;
	}
	set positionY(value) {
		this._positionY = value;
	}

}
const background = new Image();
background.src = "image/background.jpg"
class Field {
	constructor(
		background,
		y = 45,
		width = 1000,
		height = 800,
		score = 0,


	) {
		this._background = background;
		this._y = y;
		this._width = width;
		this._height = height;
		this._score = score;


	}
	get background() {
		return this._background
	}
	get y() {
		return this._y
	}
	set y(value) {
		return this._y
	}


	get width() {
		return this._width;
		;
	}

	set width(value) {
		this._width = value
	}
	get height() {
		return this._height;
		;
	}

	set height(value) {
		this._height = value;
	}
	get score() {
		return this._score
	}
	set score(value) {
		this._score = value;
	}
	render() {
		ctx.drawImage(background, 0, 45, 1000, 800, 0, 45, 1000, 800)

		ctx.rect(0, this.y, this.width, this.height);
		ctx.stroke();
		ctx.font = "bold 50px serif";
		ctx.fillStyle = "#63C";
		ctx.fillText(" Total: " + this.score, 0, 40)
	}

}
class Ball {
	constructor(

		positionX,
		positionY,
		diametr,
	) {
		this._positionX = positionX;
		this._positionY = positionY;
		this._diametr = diametr;
	}
	get radius() {

		return this._diametr / 2;
	}
	get positionX() {
		return this._positionX;
	}
	get positionY() {
		return this._positionY;
	}

	set positionX(value) {
		this._positionX = value;
	}
	set positionY(value) {
		this._positionY = value;
	}
	set radius(value) {
		this._diametr = value;
	}
	render() {
		ctx.beginPath();
		ctx.fillStyle = '#C3C';

		ctx.arc(
			ball.positionX,
			ball.positionY,
			ball.radius,
			0,
			Math.PI * 2, true
		);
		ctx.fill();
	}

}

let moveDown = true;
let moveRight = true;
let newPosX;
const levelComplete = new Audio('Audio/level_complete.mp3');
const game_complete = new Audio('Audio/game_complete.mp3');
const intro = new Audio('Audio/intro.mp3');
const light_damage1 = new Audio('Audio/light-damage-a1.mp3');
const ball_bounce = new Audio('Audio/ball_bounce.mp3');


let lifeImage = new Image();
let lifeScore = [];
lifeImage.src = "image/heart.png";
for (let i = 0; i < 3; i++) {
	lifeScore.push(lifeImage)
};
let field = new Field();
const platform = new Platform(ctx, 600, 780, 200, 35, '#336');
let ball = new Ball(300, 250, 60,);
let block;
let blocksX = [];
let blocksY = [];
let blocksT = [];
let blocksE = [];
let blocksA = [];
let blocksB = [];
for (let i = 0; i < 7; i++) {
	block = new Block((150 * i) + (i * 2), 50 + i * 65, 90, 90)
	blocksB.push(block)

}

for (let i = 0; i < 7; i++) {
	block = new Block((150 * i) + (i * 2), 450 - i * 65, 90, 90)
	blocksA.push(block)

}

for (let i = 0; i < 10; i++) {
	block = new Block((102 * i) + (i * 2), 550, 30, 35)
	blocksE.push(block)

}
for (let i = 1; i <= 10; i++) {
	block = new Block((90 * i) + (i * 2), 100, 80, 35);
	blocksX.push(block)

}
for (let i = 0; i < 7; i++) {
	block = new Block((102 * i) + (i * 45), 250, 100, 35)
	blocksY.push(block)

}
for (let i = 0; i < 10; i++) {
	block = new Block((102 * i) + (i * 2), 450, 40, 35,)
	blocksT.push(block)

}

document.addEventListener('keydown', function (event) {
	if (event.code == "ArrowRight" && platform.positionX + platform.width !== 1000) {
		newPosX = platform.positionX += 20;
	} else if (event.code == "ArrowLeft" && platform.positionX != 0) {
		newPosX = platform.positionX -= 20;
	}
});

function drawBlock(x, y, width, height,) {
	ctx.beginPath();
	ctx.fillStyle = '#6F3';
	ctx.fillRect(
		x = block.positionX,
		y = block.positionY,
		width = block.width,
		height = block.height
	);
	ctx.fill()
}
function drawImages() {
	ctx.beginPath();

	for (let i = 0; i < lifeScore.length; i++) {
		ctx.drawImage(lifeImage, (65 * i) + 800, 0);
	}

}

const AngryHeart = new Image();
AngryHeart.src = "image/heartNegative.png";
const song = new Audio('Audio/song.mp3')
const on = document.getElementById('on');
const off = document.getElementById('off');







let playGame = setInterval(function () {
	ctx.clearRect(0, 0, field.width, field.height + field.y + ball.radius);
	song.play()
	field.render();
	ball.render(600)
	for (block of blocksX) (
		drawBlock());
	for (block of blocksY) (
		drawBlock()
	);
	platform.render();
	for (lifeImage of lifeScore) {
		drawImages()
	}





	let minusLife = lifeScore.length + 1;



	if (ball.positionX >= newPosX
		&& ball.positionX <= newPosX + platform.width
		&& ball.positionY + ball.radius === platform.positionY

	) {
		ball_bounce.play()
		moveDown = true;
		field.score++;
	} else if (ball.positionY + ball.radius === platform.positionY
		&& ball.positionX >= platform.positionX
		&& ball.positionX <= platform.positionX + platform.width

	) {
		ball_bounce.play()
		moveDown = true;
		field.score++;
	}

	for (block of blocksT) (
		drawBlock());
	let deletT = 0;
	for (block of blocksT) {
		if (ball.positionX >= block.positionX
			&& ball.positionX <= block.positionX + block.width
			&& ball.positionY - ball.radius <= block.positionY + block.height
		) {
			light_damage1.play();

			blocksT.splice(deletT, 1)
			moveDown = false;
		}
		deletT++;
	}

	let deletY = 0;
	for (block of blocksY) {
		if (ball.positionX >= block.positionX
			&& ball.positionX <= block.positionX + block.width
			&& ball.positionY - ball.radius <= block.positionY + block.height
		) {
			light_damage1.play();

			blocksY.splice(deletY, 1)
			moveDown = false;
		}
		deletY++;
	}
	let deletX = 0;
	for (block of blocksX) {
		if (ball.positionX >= block.positionX
			&& ball.positionX <= block.positionX + block.width
			&& ball.positionY - ball.radius <= block.positionY + block.height
		) {
			light_damage1.play();
			blocksX.splice(deletX, 1);
			moveDown = false;
		}
		deletX++;
	}




	if (blocksY.length === 0 && blocksT.length === 0 && blocksX.length === 0) {
		for (block of blocksE) (
			drawBlock()

		);
		for (block of blocksA) (
			drawBlock()

		);
		for (block of blocksB) (
			drawBlock()

		);


		let deletA = 0;
		for (block of blocksA) {
			if (ball.positionX + ball.radius >= block.positionX
				&& ball.positionX - ball.radius <= block.positionX + block.width + 1
				&& ball.positionY - ball.radius === block.positionY + block.height
			) {
				light_damage1.play();

				blocksA.splice(deletA, 1)
				moveDown = false;
			}
			else if (ball.positionX - ball.radius > block.positionX
				&& ball.positionX - ball.radius < block.positionX + block.width
				&& ball.positionY + ball.radius === block.positionY

			) {
				light_damage1.play();

				blocksA.splice(deletA, 1)
				moveDown = false;
			}
			deletA++;
		}
		let deletE = 0;
		for (block of blocksE) {
			if (ball.positionX + ball.radius >= block.positionX
				&& ball.positionX - ball.radius <= block.positionX + block.width + 1
				&& ball.positionY - ball.radius === block.positionY + block.height

			) {
				light_damage1.play();

				blocksE.splice(deletE, 1)
				moveDown = false;
			}
			else if (ball.positionX + ball.radius > block.positionX
				&& ball.positionX - ball.radius < block.positionX + block.width
				&& ball.positionY + ball.radius === block.positionY

			) {
				light_damage1.play();

				blocksE.splice(deletE, 1)
				moveDown = false;
			}
			deletE++;


		}

		let deletB = 0;
		for (block of blocksB) {
			if (ball.positionX + ball.radius >= block.positionX
				&& ball.positionX - ball.radius <= block.positionX + block.width + 1
				&& ball.positionY - ball.radius === block.positionY + block.height

			) {
				light_damage1.play();

				blocksB.splice(deletB, 1)
				moveDown = false;
			} else if (ball.positionX - ball.radius > block.positionX
				&& ball.positionX - ball.radius < block.positionX + block.width
				&& ball.positionY + ball.radius === block.positionY

			) {
				light_damage1.play();

				blocksB.splice(deletB, 1)
				moveDown = false;
			}
			deletB++;
		}
	}



	if (ball.positionY > platform.positionY + ball.radius) {
		ball.positionY = platform.positionY - ball.radius * 2;
		ball.positionX = newPosX + platform.width / 2
			|| platform.positionX + platform.width / 2;
		moveDown = true;
		lifeScore.splice(0, 1);
		minusLife--;

		if (!minusLife) {
			clearInterval(playGame);
			song.pause()

			intro.play()
			ctx.drawImage(AngryHeart, 250, 100);
			ctx.fillStyle = '#90C'
			ctx.font = " 180px serif";
			ctx.fillText('Game over', 120, 700);

			setTimeout(function () {
				document.location.reload()
			}, 14000)
		}
	}
	let count = blocksA.length + blocksB.length + blocksE.length;
	if (!count) {
		song.pause()

		game_complete.play()
		ctx.beginPath()
		ctx.fillStyle = '#90C'
		ctx.font = " 100px serif";
		ctx.fillText('Congratulations,', 160, 300);
		ctx.fillText(' you are a winner !!!', 120, 600);
		clearInterval(playGame);

		setTimeout(function () {
			document.location.reload()
		}, 11000)

	}


	if (ball.positionY === field.y + ball.radius) {
		ball_bounce.play()

		moveDown = false;
	}
	if (ball.positionX === field.width - ball.radius) {
		ball_bounce.play()
		moveRight = false;
	}
	if (ball.positionX === ball.radius) {
		ball_bounce.play()
		moveRight = true;
	}
	if (moveRight === true) {
		ball.positionX += 5;
	} else {
		ball.positionX -= 5;
	}
	if (moveDown === true) {
		ball.positionY -= 5;
	} else {
		ball.positionY += 5;
	}


}, 20)




