import {
  createScrambledCube,
  isSolved
} from './cube/cubeManager.js';
import { iddfs } from './algorithms/iddfs.js';
import { astar } from './algorithms/astar.js';
import { exibirResultadoBusca } from './utils/console.js';
import { bfs } from './algorithms/bfs.js';

const N = 1; 
const { cube, moves } = createScrambledCube(N);

console.log(`Movimentos aplicados (${N}):`, moves);
console.log('Estado resolvido antes da busca?', isSolved(cube));


const result = await bfs(cube);
exibirResultadoBusca('Busca em Largura (BFS)', result, moves, `bfs-n${N}.txt`);

const iddfsResult = await iddfs(cube, 13);
exibirResultadoBusca('Busca em Profundidade Iterativa (IDDFS)', iddfsResult, moves, `iddfs-n${N}.txt`);

const astarResult = await astar(cube);
exibirResultadoBusca('Busca A*', astarResult, moves, `astar-n${N}.txt`);
