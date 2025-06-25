import Cube from 'cubejs';

Cube.initSolver();

export function createSolvedCube() {
  return new Cube();
}

export function isSolved(cube) {
  return cube.isSolved();
}

export function cloneCube(cube) {
  return Cube.fromString(cube.asString());
}

export function applyMoves(cube, moves) {
  cube.move(moves);
  return cube;
}

export function generateRandomMoves(n) {
  const possibleMoves = ["U", "U'", "D", "D'", "L", "L'", "R", "R'", "F", "F'", "B", "B'"];
  const moves = [];
  for (let i = 0; i < n; i++) {
    const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    moves.push(move);
  }
  return moves.join(' ');
}

export function createScrambledCube(n) {
  const cube = createSolvedCube();
  const moves = generateRandomMoves(n);
  cube.move(moves);
  return { cube, moves };
}
