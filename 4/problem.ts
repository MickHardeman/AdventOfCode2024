import { includes, map, split } from "lodash";
import fs from "node:fs";
import { blue, Color, green, red, yellow } from "colors";

const readInput = () => {
  const rawInput = fs.readFileSync("4/input.txt", "utf8");
  const rows = split(rawInput, /\n/g);
  const input = map(rows, (row) => row.split(""));

  return input;
};

const drawBoard = (input: string[][], christmasMode?: boolean) => {
  let output = "";

  for (let row of input) {
    for (let char of row) {
      output += char;
    }
    output += "\n";
  }

  console.log(output);
};

const getRandomColor = (): Color => {
  const colorSeed = Math.floor(Math.random() * 4);
  let colorFunction: Color;

  switch (colorSeed) {
    case 0:
      colorFunction = blue;
      break;
    case 1:
      colorFunction = green;
      break;
    case 2:
      colorFunction = red;
      break;
    default:
    case 3:
      colorFunction = yellow;
      break;
  }

  return colorFunction;
};

const countX_MASOccurrences = (
  board: string[][]
): {
  board: string[][];
  count: number;
} => {
  const hits: { centerX: number; centerY: number }[] = [];
  const directions = [
    [1, 1], // Down Right
    [1, -1], // Down Left
    [-1, -1], // Up Left
    [-1, 1], // Up Right
  ];

  let count = 0;

  const checkCross = (positionX: number, positionY: number): boolean => {
    let pattern = "";

    for (const [directionX, directionY] of directions) {
      pattern += board[positionX + directionX][positionY + directionY];
    }

    return includes(["SSMM", "MSSM", "MMSS", "SMMS"], pattern);
  };

  const colorCross = (centerX: number, centerY: number): void => {
    const colorFunction = getRandomColor();

    board[centerX][centerY] = colorFunction(board[centerX][centerY]);

    for (const [directionX, directionY] of directions) {
      board[centerX + directionX][centerY + directionY] = colorFunction(
        board[centerX + directionX][centerY + directionY]
      );
    }
  };

  for (let i = 1; i < board.length - 1; i++) {
    for (let j = 1; j < board[0].length - 1; j++) {
      if (board[i][j] === "A" && checkCross(i, j)) {
        hits.push({ centerX: i, centerY: j });
        count++;
      }
    }
  }

  for (const { centerX, centerY } of hits) {
    colorCross(centerX, centerY);
  }

  return {
    board,
    count,
  };
};

const countXMASOccurrences = (
  board: string[][]
): {
  board: string[][];
  count: number;
} => {
  //   j --->
  //   ____________________
  //   |XMAMSXMAMSXMAMSX...
  // i |AMSXMAMSXMAMSXMA...
  // | |ASMXMAMSMXMAMSXM...
  // | |AMSXMAMSXMAMSXMA...
  // v |ASMXMSMAMXMASASM...
  //   |ASMXMASMXMAMSXAS...
  //   |...................
  //   |...................

  const targetWord = "XMAS";
  const directions = [
    [0, 1], // Right
    [1, 0], // Down
    [0, -1], // Left
    [-1, 0], // Up
    [1, 1], // Down Right
    [1, -1], // Down Left
    [-1, 1], // Up Right
    [-1, -1], // Up Left
  ];
  const hits: {
    startX: number;
    startY: number;
    directionX: number;
    directionY: number;
  }[] = [];

  let count = 0;

  const checkDirection = (
    positionX: number,
    positionY: number,
    directionX: number,
    directionY: number
  ): boolean => {
    for (let i = 0; i < targetWord.length; i++) {
      const newX = positionX + i * directionX;
      const newY = positionY + i * directionY;

      if (
        newX < 0 ||
        newY < 0 ||
        newX >= board.length ||
        newY >= board[0].length ||
        board[newX][newY] !== targetWord[i]
      ) {
        return false;
      }
    }

    return true;
  };

  const colorDirection = (
    positionX: number,
    positionY: number,
    directionX: number,
    directionY: number
  ): boolean => {
    const colorFunction = getRandomColor();

    for (let i = 0; i < targetWord.length; i++) {
      const newX = positionX + i * directionX;
      const newY = positionY + i * directionY;

      board[newX][newY] = colorFunction(board[newX][newY]);
    }

    return true;
  };

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      for (const [directionX, directionY] of directions) {
        if (checkDirection(i, j, directionX, directionY)) {
          count++;
          hits.push({
            startX: i,
            startY: j,
            directionX,
            directionY,
          });
        }
      }
    }
  }

  for (const { startX, startY, directionX, directionY } of hits) {
    colorDirection(startX, startY, directionX, directionY);
  }

  return { board, count };
};

const solve4 = () => {
  const input = readInput();

  const { count, board } = countX_MASOccurrences(input);

  drawBoard(board);
  console.log(count);
};

export default solve4;
