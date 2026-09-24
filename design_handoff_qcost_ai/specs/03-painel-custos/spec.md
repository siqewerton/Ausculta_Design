# 03 · Painel e Custos

## Contexto
O Painel mostra o estado da apuração e o que exige ação; é a única fila de trabalho do produto. Custos é a apuração navegável até o evento individual.

Ref.: `README.md › Telas 4 e 7`, `› Cor de negócio vs. cor de sistema`, `› Categorias PAF`; `design_files/Q-Cost AI Dashboard v2.dc.html`, `Q-Cost AI Custos v2.dc.html`.

## Critérios de aceite

### Painel
- **PNL-AC-01** Faixa de KPIs em grade de bordas compartilhadas (`gap:0`, `border-right` entre células).
- **PNL-AC-02** Composição do período: um card por categoria PAF, na ordem fixa, com barra, valor, participação e maior subcategoria.
- **PNL-AC-03** Série histórica com as quatro séries PAF na ordem fixa.
- **PNL-AC-04** Tabela "Eventos que precisam de ação": Evento · Origem · Status · Valor · Ação, ordenada por recência (DESC).
- **PNL-AC-05** Origem em badge: API REST `--info`, MCP `--warn`, Upload neutro.
- **PNL-AC-06** Alertas não entram na fila.
- **PNL-AC-07** Tempo relativo calculado no render (3 min, 47 min, 2 h, 1 d).
- **PNL-AC-08** A ação leva a Revisar Evento com `?ev=<id>`.
- **PNL-AC-09** Motivo de fila (Aprovação, Incompletos) não usa forma de badge de status.

### Custos
- **PNL-AC-10** Filtros: planta e período (mês, trimestre, ano, personalizado com Campo Data em ISO).
- **PNL-AC-11** Árvore PAF expansível categoria → subcategoria → evento, com recuo por nível e `--surf2` nas linhas aninhadas.
- **PNL-AC-12** Custo por fornecedor externo e interno e por origem (Upload/API/MCP) usam a escala neutra `--c1…--c4`, não cores PAF.

### Cor de negócio
- **PNL-AC-13** Valor monetário em `--ink`; exceção: KPI de perda em `--neg`.
- **PNL-AC-14** Variação colorida pela direção desejada da métrica (`upIsGood`), não pelo sinal.
- **PNL-AC-15** `--sig` nunca em dado de gráfico.
- **PNL-AC-16** Somente eventos Confirmados, Provisórios e Ajustados entram nos totais; o total distingue ou sinaliza provisórios.

## Questões abertas
- PNL-AC-16: provisórios somam no total principal ou em linha separada? Confirmar com controladoria.
- Analista com escopo de uma planta vê o consolidado da organização? (Constituição V.2 sugere que não.)
