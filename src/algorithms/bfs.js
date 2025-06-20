import { isSolved, cloneCube } from '../cube/cubeManager.js';

// Todos os movimentos possíveis
const MOVES = ["U", "U'", "D", "D'", "L", "L'", "R", "R'", "F", "F'", "B", "B'"];

export async function bfs(initialCube) {
  const startTime = performance.now();

  const visited = new Set();
  const queue = [];

  queue.push({
    cube: initialCube,
    path: [],
  });

  let expandedNodes = 0;

  while (queue.length > 0) {
    const current = queue.shift();
    const cubeStr = current.cube.asString();

    // Evita estados repetidos
    if (visited.has(cubeStr)) continue;
    visited.add(cubeStr);

    expandedNodes++;

    if (isSolved(current.cube)) {
      const endTime = performance.now();
      return {
        path: current.path,
        steps: current.path.length,
        time: (endTime - startTime) / 1000, // segundos
        expandedNodes,
        memory: queue.length,
        branchingFactor: (expandedNodes > 1)
          ? (queue.length / expandedNodes).toFixed(2)
          : 0,
      };
    }

    for (const move of MOVES) {
      const newCube = cloneCube(current.cube);
      newCube.move(move);

      queue.push({
        cube: newCube,
        path: [...current.path, move],
      });
    }
  }

  // Caso não encontre solução (não deve ocorrer com estados gerados)
  return null;
}
