import Cube from 'cubejs';
import { misplacedStickersHeuristic } from '../src/utils/heuristics.js';
import { cloneCube, createScrambledCube, isSolved } from '../src/cube/cubeManager.js';

Cube.initSolver();

// === Teste 1: Heurística no cubo resolvido ===
const solvedCube = new Cube();
const hSolved = misplacedStickersHeuristic(solvedCube);
console.log("\n[Teste 1] Heurística de cubo resolvido (esperado: 0):", hSolved);

// === Teste 2: Clonagem de cubo ===
const originalCube = new Cube();
const clone = cloneCube(originalCube);
clone.move("U");
console.log("\n[Teste 2] Original mudou após mexer no clone? (esperado: false):", originalCube.asString() !== clone.asString());

// === Teste 3: Verificação de estado resolvido ===
console.log("\n[Teste 3] isSolved no cubo resolvido (esperado: true):", isSolved(solvedCube));

// === Teste 4: Embaralhamento de 5 movimentos ===
const { cube: scrambledCube, moves } = createScrambledCube(5);
console.log("\n[Teste 4] Cubo embaralhado está resolvido? (esperado: false):", isSolved(scrambledCube));
console.log("Movimentos aplicados:", moves);

// === Teste 5: Solver interno da cubejs ===
const solution = scrambledCube.solve();
console.log("\n[Teste 5] Solução encontrada pelo solver interno (esperado: string de movimentos):", solution);
console.log("Número de passos na solução:", solution.split(' ').length);
