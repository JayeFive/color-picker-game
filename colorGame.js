const defaultBackground = "#232323";

var numSquares = 6;
var colors = generateRgb(numSquares);

var squares = document.querySelectorAll(".square");
var winningColor = chooseWinner();
var rgbDisplay = document.querySelector("#rgb-display");
var clickedColor;
var messegeDisplay = document.querySelector("#messege");
var hardMode = true;
var h1 = document.querySelector("h1");
var btns = document.querySelectorAll(".btn");

//initialize the "Hard" button with the .selected class -- the third element in the buttons array
btns[2].classList.add("selected");
var selectedBtn = document.querySelector(".selected");

//add event listeners for the three buttons
for (var i = 0; i < btns.length; i++) {
		btns[i].addEventListener("click", newGame(i));
}

mainGame();



//****Functions List****//

function newGame(btnClicked) {
	return function() {
		btns[0].textContent = "New Colors";
		messegeDisplay.textContent = "";
		colorsInit();
		
		if (btnClicked !== 0) {
			numSquares = btnClicked * 3;
			btns[btnClicked].classList.add("selected");
			
			if (btnClicked === 1) {
				btns[btnClicked + 1].classList.remove("selected");
				hardMode = true;

			} else if (btnClicked === 2) {
				btns[btnClicked - 1].classList.remove("selected");
				hardMode = false;
			}
		}


		mainGame();
	};
}


function mainGame() {
	// 	//pick a new random color from array
	colors = generateRgb(numSquares);
	winningColor = chooseWinner();
	rgbDisplay.textContent = winningColor;
	
	//change colors of squares
	if(hardMode) {
		for(var i = 0; i < squares.length; i++) {
			if (colors[i]){
				squares[i].style.backgroundColor = colors[i];
			} else {
				squares[i].style.display = "none";
			}
		}
	} else {
		for (var i = 0; i < squares.length; i++) {
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		}
	}

	//add click listeners to squares
	for(var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function() {
			//grab color of clicked square
			clickedColor = this.style.backgroundColor;
			//compare color of winningColor
			if(clickedColor === winningColor) {
				changeColors(winningColor);
			} else {
				this.style.backgroundColor = defaultBackground;
				messegeDisplay.textContent = "Try Again";
			}
		});
	}
}


function colorsInit() {
	h1.style.backgroundColor = null;
	selectedBtn = document.querySelector(".btn.selected").style.backgroundColor = null;
}


function changeColors(color) {
	messegeDisplay.textContent = "Correct!";

	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}

	h1.style.backgroundColor = color;
	btns[0].textContent = "Play Again?";
	selectedBtn = document.querySelector(".btn.selected").style.backgroundColor = color;
	
}


function resetColors() {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
	}

}


function chooseWinner() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}


function generateRgb(num) {
	var arr = [];

	for(var i = 0; i < num; i++){
		arr.push(randomColor());
	}

	return arr;
}


function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}