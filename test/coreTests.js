import Cube from 'cubejs';
import { heuristicaQtdErrado } from '../src/utils/heuristics.js';
import { cloneCube, createScrambledCube, isSolved } from '../src/cube/cubeManager.js';

Cube.initSolver();

// Teste 1: cubo resolvido
const cuboResolvido = new Cube();
const heuristicaResolvido = heuristicaQtdErrado(cuboResolvido);
console.log("\n[Teste 1] Heurística de cubo resolvido (esperado: 0):", heuristicaResolvido);

// Teste 2: clonagem e modificação
const cuboOriginal = new Cube();
const copiaCubo = cloneCube(cuboOriginal);
copiaCubo.move("U");
let cuboMudou = cuboOriginal.asString() !== copiaCubo.asString();
console.log("\n[Teste 2] O cubo original foi alterado após mexer na cópia? (esperado: false):", cuboMudou);

// Teste 3: verificação de resolução
console.log("\n[Teste 3] O cubo resolvido está de fato resolvido? (esperado: true):", isSolved(cuboResolvido));

// Teste 4: embaralhamento e verificação
const { cube: cuboBaguncado, moves: movimentosFeitos } = createScrambledCube(5);
console.log("\n[Teste 4] Cubo embaralhado está resolvido? (esperado: false):", isSolved(cuboBaguncado));
console.log("Movimentos aplicados:", movimentosFeitos);

// Teste 5: solver interno da lib
const solucaoInterna = cuboBaguncado.solve();
console.log("\n[Teste 5] Solução encontrada pelo resolvedor interno (esperado: string de movimentos):", solucaoInterna);
console.log("Número de passos na solução:", solucaoInterna.split(' ').length);
