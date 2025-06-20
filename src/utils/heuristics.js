import Cube from 'cubejs';
Cube.initSolver();

const solvedCube = new Cube(); // Estado solução de referência

/**
 * Heurística: número de peças (stickers) fora do lugar.
 * Retorna um valor inteiro >= 0.
 */
export function misplacedStickersHeuristic(cube) {
  const current = cube.asString();
  const goal = solvedCube.asString();

  let misplaced = 0;
  for (let i = 0; i < current.length; i++) {
    if (current[i] !== goal[i]) misplaced++;
  }

  return misplaced;
}
