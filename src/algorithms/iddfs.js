import { isSolved, cloneCube } from '../cube/cubeManager.js';

const MOVES = ["U", "U'", "D", "D'", "L", "L'", "R", "R'", "F", "F'", "B", "B'"];

export async function iddfs(initialCube, maxDepth = 20) {
  const startTime = performance.now();
  let expandedNodes = 0;
  let memoryPeak = 0;

  for (let depth = 0; depth <= maxDepth; depth++) {
    const visited = new Set();

    const result = await dfsLimited(initialCube, [], depth, visited);

    expandedNodes += result.expanded;

    memoryPeak = Math.max(memoryPeak, result.memory);

    if (result.found) {
      const endTime = performance.now();
      return {
        path: result.path,
        steps: result.path.length,
        time: (endTime - startTime) / 1000,
        expandedNodes,
        memory: memoryPeak,
        branchingFactor: (expandedNodes > 1)
          ? (memoryPeak / expandedNodes).toFixed(2)
          : 0,
      };
    }
  }

  return null;
}

async function dfsLimited(cube, path, limit, visited) {
  const cubeStr = cube.asString();

  if (visited.has(cubeStr)) return { found: false, expanded: 0, memory: visited.size };
  visited.add(cubeStr);

  if (isSolved(cube)) {
    return { found: true, path, expanded: 1, memory: visited.size };
  }

  if (limit === 0) {
    return { found: false, expanded: 1, memory: visited.size };
  }

  let totalExpanded = 1;

  for (const move of MOVES) {
    const newCube = cloneCube(cube);
    newCube.move(move);

    const result = await dfsLimited(newCube, [...path, move], limit - 1, visited);
    totalExpanded += result.expanded;

    if (result.found) {
      return {
        found: true,
        path: result.path,
        expanded: totalExpanded,
        memory: visited.size
      };
    }
  }

  return { found: false, expanded: totalExpanded, memory: visited.size };
}
