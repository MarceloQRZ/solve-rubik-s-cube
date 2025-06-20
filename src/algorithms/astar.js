import { MinPriorityQueue } from '@datastructures-js/priority-queue';
import Cube from 'cubejs';
import { misplacedStickersHeuristic } from '../utils/heuristics.js';
import { isSolved } from '../cube/cubeManager.js';

Cube.initSolver();

const MOVES = ["U", "U'", "D", "D'", "L", "L'", "R", "R'", "F", "F'", "B", "B'"];

export async function astar(initialCube) {
  const startTime = performance.now();

  const queue = new MinPriorityQueue((node) => node.f);
  const visited = new Set();

  const initialStateStr = initialCube.asString();

  queue.enqueue({
    stateStr: initialStateStr,
    path: [],
    g: 0,
    f: misplacedStickersHeuristic(initialCube)
  });

  let expandedNodes = 0;
  let memoryPeak = 0;

  while (!queue.isEmpty()) {
    memoryPeak = Math.max(memoryPeak, queue.size());

    const dequeued = queue.dequeue();

if (!dequeued || !dequeued.item || !dequeued.item.stateStr) {
  continue;  // Ignora se o item for inválido
}

const current = dequeued.item;
const currentCube = Cube.fromString(current.stateStr);


    // Verifica se já visitado
    if (visited.has(current.stateStr)) continue;
    visited.add(current.stateStr);

    expandedNodes++;

    // Testa se está resolvido
    if (isSolved(currentCube)) {
      const endTime = performance.now();
      return {
        path: current.path,
        steps: current.path.length,
        time: (endTime - startTime) / 1000,
        expandedNodes,
        memory: memoryPeak,
        branchingFactor: (memoryPeak / expandedNodes).toFixed(2)
      };
    }

    // Gera sucessores
    for (const move of MOVES) {
      const nextCube = Cube.fromString(current.stateStr);
      nextCube.move(move);
      const nextStateStr = nextCube.asString();

      if (!visited.has(nextStateStr)) {
        const g = current.g + 1;
        const h = misplacedStickersHeuristic(nextCube);
        const f = g + h;

        queue.enqueue({
          stateStr: nextStateStr,
          path: [...current.path, move],
          g,
          f
        });
      }
    }
  }

  // Se a fila esvaziar sem encontrar solução
  return null;
}
