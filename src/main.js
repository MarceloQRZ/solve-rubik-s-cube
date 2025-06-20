import {
  createScrambledCube,
  isSolved
} from './cube/cubeManager.js';
import { saveReport } from './utils/report.js';
import { iddfs } from './algorithms/iddfs.js';
import { astar } from './algorithms/astar.js';

import { bfs } from './algorithms/bfs.js';

const N = 2; //  Comece com embaralhamento pequeno
const { cube, moves } = createScrambledCube(N);

console.log(`Movimentos aplicados (${N}):`, moves);
console.log('Estado resolvido antes da busca?', isSolved(cube));

  const result = await bfs(cube);

  if (result) {
    console.log('\n✔️ Solução encontrada:');
    console.log('Movimentos:', result.path.join(' '));
    console.log('Passos:', result.steps);
    console.log('Tempo (s):', result.time);
    console.log('Nós expandidos:', result.expandedNodes);
    console.log('Memória (est. tamanho fila):', result.memory);
    console.log('Fator de ramificação médio:', result.branchingFactor);
  } else {
    console.log(' Solução não encontrada.');
  }
  saveReport('Busca em Largura (BFS)', moves, result, `bfs-n${N}.txt`);

// --------------------------------------------------------------------------------------

  console.log('\n🔎 Executando IDDFS...');
  const iddfsResult = await iddfs(cube, 10);  // tente até profundidade 10

  if (iddfsResult) {
    console.log('✔️ Solução IDDFS encontrada:');
    console.log('Movimentos:', iddfsResult.path.join(' '));
    console.log('Passos:', iddfsResult.steps);
    console.log('Tempo (s):', iddfsResult.time);
    console.log('Nós expandidos:', iddfsResult.expandedNodes);
    console.log('Memória (est.):', iddfsResult.memory);
    console.log('Fator de ramificação médio:', iddfsResult.branchingFactor);
  } else {
    console.log('❌ IDDFS não encontrou solução no limite de profundidade.');
  }

  saveReport('Busca em Profundidade Iterativa (IDDFS)', moves, iddfsResult, `iddfs-n${N}.txt`);

// --------------------------------------------------------------------------------------

 console.log("\n🔎 Executando A*...");
 const astarResult = await astar(cube);

 if (astarResult) {
   console.log("✔️ Solução A* encontrada:");
   console.log("Movimentos:", astarResult.path.join(' '));
   console.log("Passos:", astarResult.steps);
   console.log("Tempo (s):", astarResult.time);
   console.log("Nós expandidos:", astarResult.expandedNodes);
   console.log("Memória (est.):", astarResult.memory);
   console.log("Fator de ramificação médio:", astarResult.branchingFactor);
 } else {
   console.log("❌ A* não encontrou solução.");
 }

 saveReport('Busca A*', moves, astarResult, `astar-n${N}.txt`);