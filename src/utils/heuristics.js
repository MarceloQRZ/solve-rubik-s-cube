import Cube from 'cubejs';
Cube.initSolver();

const cuboModeloResolvido = new Cube();

export function heuristicaQtdErrado(cuboAtual) {
  let estadoAtual = cuboAtual.asString();
  let estadoIdeal = cuboModeloResolvido.asString();

  let totalErrado = 0;

  for (let i = 0; i < estadoAtual.length; i++) {
    if (estadoAtual[i] !== estadoIdeal[i]) {
      totalErrado++;
    }
  }

  return totalErrado;
}
