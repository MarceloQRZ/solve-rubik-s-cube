import { isSolved, cloneCube } from '../cube/cubeManager.js';

const movesPossiveis = ["U", "U'", "D", "D'", "L", "L'", "R", "R'", "F", "F'", "B", "B'"];

export async function bfs(cuboInicial) {
  const inicio = performance.now();

  let fila = [];
  let vistos = new Set();
  let totalNos = 0;

  fila.push({
    estado: cuboInicial,
    caminho: []
  });

  while (fila.length != 0) {
    let atual = fila[0];
    fila.splice(0, 1);

    let representacao = atual.estado.asString();

    if (!vistos.has(representacao)) {
      vistos.add(representacao);
      totalNos++;

      if (isSolved(atual.estado)) {
        const fim = performance.now();

        let tempoTotal = (fim - inicio) / 1000;

        return {
          path: atual.caminho,
          steps: atual.caminho.length,
          time: tempoTotal,
          expandedNodes: totalNos,
          memory: fila.length,
          branchingFactor: totalNos > 0 ? (fila.length / totalNos).toFixed(2) : 0
        };
      }

      for (let i = 0; i < movesPossiveis.length; i++) {
        let copia = cloneCube(atual.estado);
        copia.move(movesPossiveis[i]);

        let novo = {
          estado: copia,
          caminho: atual.caminho.concat([movesPossiveis[i]])
        };

        fila.push(novo);
      }
    }
  }

  return null;
}
