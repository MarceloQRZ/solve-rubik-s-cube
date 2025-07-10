import { MinPriorityQueue } from '@datastructures-js/priority-queue';
import Cube from 'cubejs';
import { isSolved } from '../cube/cubeManager.js';
import { heuristicaQtdErrado } from '../utils/heuristics.js';

Cube.initSolver();

const movimentosAstar = ["U", "U'", "D", "D'", "L", "L'", "R", "R'", "F", "F'", "B", "B'"];

export async function astar(cuboInicial) {
  let comeco = performance.now();

  let filaPrioridade = new MinPriorityQueue({ compare: (a, b) => a.f - b.f });

  let explorados = new Set();

  let inicioStr = cuboInicial.asString();

  let primeiro = {
    estado: inicioStr,
    caminho: [],
    custo: 0,
    f: heuristicaQtdErrado(cuboInicial)
  };

  filaPrioridade.enqueue(primeiro);

  let nosVisitados = 0;
  let picoMemoria = 0;

  while (!filaPrioridade.isEmpty()) {
    if (filaPrioridade.size() > picoMemoria) {
      picoMemoria = filaPrioridade.size();
    }

    let atualNo = filaPrioridade.dequeue();
    if (!atualNo || !atualNo.estado) {
      continue;
    }

    let atual = atualNo;
    let cuboAtual = Cube.fromString(atual.estado);

    if (!explorados.has(atual.estado)) {
      explorados.add(atual.estado);
      nosVisitados++;

      if (isSolved(cuboAtual)) {
        let fim = performance.now();
        return {
          path: atual.caminho,
          steps: atual.caminho.length,
          time: (fim - comeco) / 1000,
          expandedNodes: nosVisitados,
          memory: picoMemoria,
          branchingFactor: nosVisitados > 0 ? (picoMemoria / nosVisitados).toFixed(2) : 0
        };
      }

      for (let i = 0; i < movimentosAstar.length; i++) {
        let tentativa = Cube.fromString(atual.estado);
        tentativa.move(movimentosAstar[i]);

        let novoEstado = tentativa.asString();

        if (!explorados.has(novoEstado)) {
          let novoCaminho = [];
          for (let j = 0; j < atual.caminho.length; j++) {
            novoCaminho.push(atual.caminho[j]);
          }
          novoCaminho.push(movimentosAstar[i]);

          let novoG = atual.custo + 1;
          let novoH = heuristicaQtdErrado(tentativa);
          let novoF = novoG + novoH;

          let novoNo = {
            estado: novoEstado,
            caminho: novoCaminho,
            custo: novoG,
            f: novoF
          };

          filaPrioridade.enqueue(novoNo);
        }
      }
    }
  }

  return null;
}
