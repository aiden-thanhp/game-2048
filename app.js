document.addEventListener("DOMContentLoaded", () => {
  const boardDisplay = document.querySelector(".board");
  const numbers = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  const messageContainer = document.querySelector(".header");

  //Create a board tiles
  function createBoard() {
    for (let r = 0; r < numbers.length; r++) {
      for (let c = 0; c < numbers.length; c++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        const id = `${r}${c}`;
        tile.setAttribute("id", `${id}`);
        tile.innerHTML = numbers[r][c];
        boardDisplay.appendChild(tile);
      }
    }
  }
  createBoard();

  //Change styles of the tiles
  function classControl(id) {
    const tile = document.getElementById(id);
    switch (tile.innerHTML) {
      case "2":
        tile.setAttribute("class", "");
        tile.classList.add("tile", "n2");
        break;
      case "4":
        tile.setAttribute("class", "");
        tile.classList.add("tile", "n4");
        break;
      case "8":
        tile.setAttribute("class", "");
        tile.classList.add("tile", "n8");
        break;
      case "16":
        tile.setAttribute("class", "");
        tile.classList.add("tile", "n16");
        break;
      case "32":
        tile.setAttribute("class", "");
        tile.classList.add("tile", "n32");
        break;
      case "64":
        tile.setAttribute("class", "");
        tile.classList.add("tile", "n64");
        break;
      case "128":
        tile.setAttribute("class", "");
        tile.classList.add("tile", "n128");
        break;
      case "256":
        tile.setAttribute("class", "");
        tile.classList.add("tile", "n256");
        break;
      case "512":
        tile.setAttribute("class", "");
        tile.classList.add("tile", "n512");
        break;
      case "1024":
        tile.setAttribute("class", "");
        tile.classList.add("tile", "n1024");
        break;
      case "2048":
        tile.setAttribute("class", "");
        tile.classList.add("tile", "n2048");
        break;
      default:
        tile.setAttribute("class", "");
        tile.classList.add("tile");
    }
  }

  //Generate a random number
  function getBlankTiles(board) {
    const blankTiles = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++)
        if (board[i][j] === 0) {
          blankTiles.push([i, j]);
        }
    }
    return blankTiles;
  }

  function generate() {
    const blankTiles = getBlankTiles(numbers);
    const randomTile =
      blankTiles[Math.floor(Math.random() * blankTiles.length)];
    const newId = `${randomTile[0]}${randomTile[1]}`;
    const num = document.getElementById(`${newId}`);
    num.innerHTML = "2";
    numbers[randomTile[0]][randomTile[1]] = 2;
    classControl(newId);
    check();
  }
  generate();
  generate();

  //Create a function to combine adjacent numbers

  function combine(array) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      if (array[i] === array[i + 1]) {
        newArray.push(array[i] + array[i + 1]);
        i++;
      } else newArray.push(array[i]);
    }
    return newArray;
  }

  //Create a function to move all number to the right/left
  function moveRight() {
    let numberedTiles = [];
    let zeroTiles = [];
    for (let r = 0; r < numbers.length; r++) {
      for (let c = 0; c < numbers.length; c++) {
        if (numbers[r][c] !== 0) numberedTiles.push(numbers[r][c]);
      }
      const newNumberedTiles = combine(numberedTiles);
      for (let i = 0; i < 4 - newNumberedTiles.length; i++) {
        zeroTiles.push(0);
      }
      const newTiles = [...zeroTiles, ...newNumberedTiles];
      for (let i = 0; i < newTiles.length; i++) {
        numbers[r][i] = newTiles[i];
        const num = document.getElementById(`${r}${i}`);
        num.innerHTML = `${newTiles[i]}`;
        classControl(`${r}${i}`);
      }
      numberedTiles = [];
      zeroTiles = [];
      check();
    }
  }

  function moveLeft() {
    let numberedTiles = [];
    let zeroTiles = [];
    for (let r = 0; r < numbers.length; r++) {
      for (let c = 0; c < numbers.length; c++) {
        if (numbers[r][c] !== 0) numberedTiles.push(numbers[r][c]);
      }
      const newNumberedTiles = combine(numberedTiles);
      for (let i = 0; i < 4 - newNumberedTiles.length; i++) {
        zeroTiles.push(0);
      }
      const newTiles = [...newNumberedTiles, ...zeroTiles];
      for (let i = 0; i < newTiles.length; i++) {
        numbers[r][i] = newTiles[i];
        const num = document.getElementById(`${r}${i}`);
        num.innerHTML = `${newTiles[i]}`;
        classControl(`${r}${i}`);
      }
      numberedTiles = [];
      zeroTiles = [];
      check();
    }
  }

  //Create a function to move all number to the up/down
  function moveUp() {
    let numberedTiles = [];
    let zeroTiles = [];
    for (let c = 0; c < numbers.length; c++) {
      for (let r = 0; r < numbers.length; r++) {
        if (numbers[r][c] !== 0) numberedTiles.push(numbers[r][c]);
      }
      const newNumberedTiles = combine(numberedTiles);
      for (let i = 0; i < 4 - newNumberedTiles.length; i++) {
        zeroTiles.push(0);
      }
      const newTiles = [...newNumberedTiles, ...zeroTiles];
      for (let i = 0; i < newTiles.length; i++) {
        numbers[i][c] = newTiles[i];
        const num = document.getElementById(`${i}${c}`);
        num.innerHTML = `${newTiles[i]}`;
        classControl(`${i}${c}`);
      }
      numberedTiles = [];
      zeroTiles = [];
      check();
    }
  }

  function moveDown() {
    let numberedTiles = [];
    let zeroTiles = [];
    for (let c = 0; c < numbers.length; c++) {
      for (let r = 0; r < numbers.length; r++) {
        if (numbers[r][c] !== 0) numberedTiles.push(numbers[r][c]);
      }
      const newNumberedTiles = combine(numberedTiles);
      for (let i = 0; i < 4 - newNumberedTiles.length; i++) {
        zeroTiles.push(0);
      }
      const newTiles = [...zeroTiles, ...newNumberedTiles];
      for (let i = 0; i < newTiles.length; i++) {
        numbers[i][c] = newTiles[i];
        const num = document.getElementById(`${i}${c}`);
        num.innerHTML = `${newTiles[i]}`;
        classControl(`${i}${c}`);
      }
      numberedTiles = [];
      zeroTiles = [];
      check();
    }
  }

  //Control key press
  function control(e) {
    if (e.keyCode === 39) {
      keyRight();
    } else if (e.keyCode === 37) {
      keyLeft();
    } else if (e.keyCode === 38) {
      keyUp();
    } else if (e.keyCode === 40) {
      keyDown();
    }
  }
  document.addEventListener("keyup", control);

  function keyRight() {
    moveRight();
    generate();
    generate();
    highscore();
  }

  function keyLeft() {
    moveLeft();
    generate();
    generate();
    highscore();
  }

  function keyUp() {
    moveUp();
    generate();
    generate();
    highscore();
  }

  function keyDown() {
    moveDown();
    generate();
    generate();
    highscore();
  }

  //Show the Score:
  function highscore() {
    const arr = numbers.flat();
    const score = Math.max(...arr);
    const scoreLine = document.querySelector(".score-display");
    scoreLine.innerHTML = `Your score is: ${score}`;
  }

  //Create a message
  function noAdjacent() {
    if (numbers.flat().includes(0)) return false;

    let result = [];
    for (let r = 0; r < numbers.length; r++) {
      let rowArr = [];
      for (let c = 0; c < numbers.length; c++) {
        rowArr.push(numbers[r][c]);
      }
      const combined = combine(rowArr);
      if (combined.length === 4) result.push(true);
      else result.push(false);
    }
    for (let c = 0; c < numbers.length; c++) {
      let columnArr = [];
      for (let r = 0; r < numbers.length; r++) {
        columnArr.push(numbers[r][c]);
      }
      const combined = combine(columnArr);
      if (combined.length === 4) result.push(true);
      else result.push(false);
    }

    if (result.includes(false)) return false;
    else return true;
  }

  function checkWin() {
    if (numbers.flat().includes(2048)) {
      const newMessage = document.createElement("h2");
      newMessage.classList.add("text-center", "mb-3");
      newMessage.innerHTML = "Congratulations! You Win";
      messageContainer.appendChild(newMessage);
    }
  }

  function checkLose() {
    if (!document.querySelector(".game-over")) {
      if (!checkWin() && noAdjacent()) {
        const newMessage = document.createElement("h2");
        newMessage.classList.add("game-over", "text-center", "mb-3");
        newMessage.innerHTML = "Game Over!";
        messageContainer.appendChild(newMessage);
      }
    }
  }

  function check() {
    checkWin();
    checkLose();
  }
});