// I'm not using ES6 class because I want to try something old
const PLAYER = {
	ONE: 0,
  TWO: 1,
};

function Game () {
	this.player = PLAYER.ONE;
  this.board = Array(15).fill(null).map(x => Array(15).fill(-1));
}

Game.prototype.check = function(i, j) {
  // |
  let tmp = 1;

  for (let a = i-1; a >= 0; a--) {
    if (this.board[a][j] === this.player) tmp++;
    else break;
  }

  for (let a = i+1; a < 15; a++) {
    if (this.board[a][j] === this.player) tmp++;
  }

  if (tmp >= 5) return true;

  // -
  tmp = 1;

  for (let a = j-1; j >= 0; a--) {
    if (this.board[i][a] === this.player) tmp++;
    else break;
  }

  for (let a = j+1; a < 15; a++) {
    if (this.board[i][a] === this.player) tmp++;
  }

  if (tmp >= 5) return true;

  // \
  tmp = 1;

  for (let a = i-1, b = j-1; a >= 0 && b >=0; a--, b--) {
    if (this.board[a][b] === this.player) tmp++;
    else break;
  }

  for (let a = i+1, b = j+1; a < 15 && b < 15; a++, b++) {
    if (this.board[a][b] === this.player) tmp++;
    else break;
  }

  if (tmp >= 5) return true;

  // /
  tmp = 1;

  for (let a = i-1, b = j+1; a >= 0 && b < 15; a--, b++) {
    if (this.board[a][b] === this.player) tmp++;
    else break;
  }

  for (let a = i+1, b = j-1; a < 15 && b >= 0; a++, b--) {
    if (this.board[a][b] === this.player) tmp++;
    else break;
  }

  if (tmp >= 5) return true;
  return false;
};

// grid onclick event
let play = (e) => {
  const className = e.currentTarget.getAttribute('class').split('-');
  const i = Number(className[1]);
  const j = Number(className[2]);

  if (g.board[i][j] === -1) {
    g.board[i][j] = g.player;
    // draw chess
    const chess = document.createElement('div');
    chess.setAttribute('class', 'chess');
    if(g.player === PLAYER.ONE) {
      chess.style.borderColor = '#316093';
    } else {
      chess.style.borderColor = 'red';
    }
    e.currentTarget.appendChild(chess);
    // check win
    if (g.check(i, j)) {
      alert(`${g.player} win!`);
    }
    g.player = g.player === PLAYER.ONE ? PLAYER.TWO : PLAYER.ONE;

  } else {
    alert('you cannot play here');
  }
}

// immediately invoked function
(() => {
	const el = document.querySelector('.board');
	for(let i = 0; i < 15; i++) {
		for (let j = 0; j < 15; j++) {
			let grid = document.createElement('div');
			grid.setAttribute('class', `grid-${i}-${j}`);
			grid.onclick = play;
			el.appendChild(grid);
		}
	}

  g = new Game();
})();