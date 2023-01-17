let area = document.getElementById("area"); // fields
let cells = document.getElementsByClassName("cell"); // cell
let whoWins = document.getElementById("whoWins"); // winner
let currentPlayer = document.getElementById("currentPl"); // current player
// let roundHistory = []; // game history

let roundHistory;
if (localStorage.getItem("roundHistory")) {
	roundHistory = JSON.parse(localStorage.getItem("roundHistory"));
} else {
	roundHistory = [];
}

let player = "X";
let stat = {
	X: 0,
	O: 0,
	D: 0
}; // statistics object

let winCombination = [
	// Комбинация выигрыша
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7]
];

for (let i = 1; i <= 9; i++) {
	// Отрисовывает 9 ячеек
	area.innerHTML += `<div class="cell" pos="${i}"></div>`;
}

for (let i = 0; i < cells.length; i++) {
	cells[i].addEventListener("click", cellOnclick);
}

function cellOnclick() {
	let data = [];
	if (!this.innerHTML) {
		// Проверяем ячейку
		this.innerHTML = player;
	} else {
		alert("ячейку уже заняли");
		return;
	}
	for (let i in cells) {
		if (cells[i].innerHTML == player) {
			data.push(parseInt(cells[i].getAttribute("pos")));
		}
	}
	if (checkWinner(data)) {
		stat[player] += 1; // Обновляем статистику
		whoWins.innerHTML = "Победа" + [player];
		roundHistory.push(whoWins.innerHTML);
		document.getElementById(
			"roundHistory"
		).innerHTML += `Победа ${player} <br>`;
		// localStorage.setItem("roundHistory", JSON.stringify(roundHistory));
		refresh();
	} else {
		let draw = true;
		for (let i in cells) {
			if (cells[i].innerHTML == "") draw = false;
		}
		if (draw) {
			stat.D += 1;
			whoWins.innerHTML = "Ничья";
			roundHistory.push(whoWins.innerHTML);
			document.getElementById("roundHistory").innerHTML += `Ничья <br>`;
			// localStorage.setItem("roundHistory", JSON.stringify(roundHistory));
			refresh();
		}
	}
	player = player === "X" ? "O" : "X";
	currentPlayer.innerHTML = player.toLocaleLowerCase();

	console.log(roundHistory);
}

// Get history from Local Storage
// window.onload = function () {
// 	if (localStorage.getItem("roundHistory")) {
// 		document.getElementById("roundHistory").innerHTML =
// 			localStorage.getItem("roundHistory");
// 	}
// };

function checkWinner(data) {
	for (let i in winCombination) {
		let win = true;
		for (let j in winCombination[i]) {
			let id = winCombination[i][j];
			let ind = data.indexOf(id);
			if (ind == -1) {
				win = false;
			}
		}
		if (win) return true;
	}
	return false;
}

function refresh() {
	for (let i = 0; i < cells.length; i++) {
		cells[i].innerHTML = "";
	}
	updateState();
}

function updateState() {
	document.getElementById("sX").innerHTML = stat.X;
	document.getElementById("sO").innerHTML = stat.O;
	document.getElementById("sD").innerHTML = stat.D;
}

// Reset button
let resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", resetGame);

function resetGame() {
	// Current player
	player = "X";
	currentPlayer.innerHTML = player;

	// Game result
	whoWins.innerHTML = "";

	// Game history
	roundHistory = [];
	document.getElementById("roundHistory").innerHTML = "";

	// Clear the innerHTML of the cells
	for (let i = 0; i < cells.length; i++) {
		cells[i].innerHTML = "";
	}

	// Statistics
	stat = {
		X: 0,
		O: 0,
		D: 0
	};
	sX.innerHTML = stat.X;
	sO.innerHTML = stat.O;
	sD.innerHTML = stat.D;
}
