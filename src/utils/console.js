import { saveReport } from './report.js';

export function exibirResultadoBusca(nomeAlgoritmo, resultado, movimentosIniciais, nomeArquivo) {
  console.log(`\n🔎 Executando ${nomeAlgoritmo}...`);

  if (resultado) {
    console.log(`✔️ Solução ${nomeAlgoritmo} encontrada:`);
    console.log('Movimentos:', resultado.path.join(' '));
    console.log('Passos:', resultado.steps);
    console.log('Tempo (s):', resultado.time);
    console.log('Nós expandidos:', resultado.expandedNodes);
    console.log('Memória (est.):', resultado.memory);
    console.log('Fator de ramificação médio:', resultado.branchingFactor);
  } else {
    console.log(`❌ ${nomeAlgoritmo} não encontrou solução.`);
  }

  saveReport(nomeAlgoritmo, movimentosIniciais, resultado, nomeArquivo);
}
