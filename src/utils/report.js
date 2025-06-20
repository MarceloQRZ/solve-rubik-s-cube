import fs from 'fs';
import path from 'path';

export function saveReport(algorithmName, scrambleMoves, result, filename = 'report.txt') {
  const content = `
======================
   Relatório de Busca
======================

🔍 Algoritmo: ${algorithmName}
🎲 Movimentos embaralhados: ${scrambleMoves}
✅ Solução encontrada: ${result ? 'Sim' : 'Não'}

${result ? `
🔁 Caminho da solução: ${result.path.join(' ')}
📦 Total de passos: ${result.steps}
⏱️ Tempo gasto: ${result.time.toFixed(4)} segundos
🧠 Memória estimada: ${result.memory} (tamanho da fila)
🌱 Nós expandidos: ${result.expandedNodes}
🌿 Fator de ramificação médio: ${result.branchingFactor}
` : `
⚠️ A solução não foi encontrada pelo algoritmo.
`}

`.trim();

  const outputDir = path.resolve('./results');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`\n📄 Relatório salvo em: ${filePath}`);
}
