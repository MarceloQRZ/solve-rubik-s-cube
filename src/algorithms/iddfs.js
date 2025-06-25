import { isSolved, cloneCube } from '../cube/cubeManager.js';

const movimentosPossiveis = ["U", "U'", "D", "D'", "L", "L'", "R", "R'", "F", "F'", "B", "B'"];

export async function iddfs(cuboOriginal, profundidadeMaxima = 15) {
  const tempoInicial = performance.now();
  let totalDeNos = 0;
  let maiorTamanhoVisitados = 0;

  let achou = false;
  let respostaFinal = null;

  for (let nivel = 0; nivel <= profundidadeMaxima; nivel++) {
    let conjuntoDeVisitados = new Set();

    let resultadoParcial = await buscaRecursivaComLimite(cuboOriginal, [], nivel, conjuntoDeVisitados);

    totalDeNos += resultadoParcial.qtdExpandido;

    if (resultadoParcial.memAtual > maiorTamanhoVisitados) {
      maiorTamanhoVisitados = resultadoParcial.memAtual;
    }

    if (resultadoParcial.sucesso === true) {
      achou = true;
      respostaFinal = resultadoParcial;
      break;
    }
  }

  if (achou) {
    const tempoFinal = performance.now();

    let objetoResposta = {
      path: respostaFinal.sequencia,
      steps: respostaFinal.sequencia.length,
      time: (tempoFinal - tempoInicial) / 1000,
      expandedNodes: totalDeNos,
      memory: maiorTamanhoVisitados,
      branchingFactor: totalDeNos > 0 ? (maiorTamanhoVisitados / totalDeNos).toFixed(2) : 0
    };

    return objetoResposta;
  } else {
    return null;
  }
}

async function buscaRecursivaComLimite(cuboAtual, listaDeMovimentos, limiteProfundidade, setVisitados) {
  let identificador = cuboAtual.asString();

  if (setVisitados.has(identificador)) {
    return {
      sucesso: false,
      qtdExpandido: 0,
      memAtual: setVisitados.size
    };
  }

  setVisitados.add(identificador);

  if (isSolved(cuboAtual)) {
    return {
      sucesso: true,
      sequencia: listaDeMovimentos,
      qtdExpandido: 1,
      memAtual: setVisitados.size
    };
  }

  if (limiteProfundidade === 0) {
    return {
      sucesso: false,
      qtdExpandido: 1,
      memAtual: setVisitados.size
    };
  }

  let totalLocalExpandido = 1;

  let i = 0;
  while (i < movimentosPossiveis.length) {
    const movimentoEscolhido = movimentosPossiveis[i];

    let cuboNovo = cloneCube(cuboAtual);
    cuboNovo.move(movimentoEscolhido);

    let novaLista = [];
    for (let j = 0; j < listaDeMovimentos.length; j++) {
      novaLista.push(listaDeMovimentos[j]);
    }
    novaLista.push(movimentoEscolhido);

    const retorno = await buscaRecursivaComLimite(cuboNovo, novaLista, limiteProfundidade - 1, setVisitados);

    totalLocalExpandido += retorno.qtdExpandido;

    if (retorno.sucesso === true) {
      return {
        sucesso: true,
        sequencia: retorno.sequencia,
        qtdExpandido: totalLocalExpandido,
        memAtual: setVisitados.size
      };
    }

    i = i + 1;
  }

  return {
    sucesso: false,
    qtdExpandido: totalLocalExpandido,
    memAtual: setVisitados.size
  };
}
