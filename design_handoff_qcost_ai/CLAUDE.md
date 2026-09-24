# Q-Cost AI — instruções para o Claude Code

Este pacote é a entrada de design para o desenvolvimento orientado a especificação (SDD) do Q-Cost AI. Coloque a pasta inteira na raiz do repositório (ex.: `docs/design/`) e mantenha este arquivo como contexto do projeto.

## Como usar o pacote

1. `specs/constitution.md` — princípios inegociáveis. Vale para toda spec, plano e tarefa. Leia primeiro.
2. `specs/README.md` — índice das specs por domínio, ordem de implementação e rastreabilidade tela → arquivo.
3. `specs/NN-dominio/spec.md` — o quê e por quê: histórias, critérios de aceite, fora de escopo, questões abertas. Não contém decisão de stack.
4. `README.md` — referência visual e de comportamento completa (tokens, componentes, telas). As specs remetem a ele por seção.
5. `design_files/*.dc.html` — protótipos de alta fidelidade. Abra no navegador para ver o comportamento. **Não porte o HTML nem o `support.js`**; recrie no stack do projeto.
6. `CHANGELOG.md` — decisões de design por data. Ao sincronizar uma nova versão do pacote, leia o changelog e atualize só as specs afetadas.

## Fluxo SDD esperado

Para cada spec: `spec.md` (fornecido) → `plan.md` (você gera: arquitetura, stack, contratos de API, modelo de dados) → `tasks.md` (você gera: tarefas pequenas, testáveis, com referência ao critério de aceite) → implementação → verificação contra os critérios de aceite e o protótipo.

- Cada tarefa cita o ID do critério que satisfaz (ex.: `EVT-AC-07`).
- Critério ambíguo ou em conflito com o protótipo: pare e registre em "Questões abertas" da spec. Não invente comportamento.
- O protótipo vence em aparência; a spec vence em regra de negócio.

## Regras que mais quebram na implementação

- Cor PAF indica categoria, nunca estado. Estado usa `--pos/--neg/--warn/--info`.
- Ordem PAF fixa: Prevenção → Avaliação → Falha interna → Falha externa. Nunca ordenar por valor.
- Raio 0–2px. Sem pílulas, sem sombra em conteúdo estático, sem gradiente.
- Número, moeda e data sempre via `Intl.*` do locale. Valor editado guardado como número.
- Nenhum evento entra na apuração sem aprovação humana, independente da origem (upload, API, MCP).
- Barra de abas idêntica em todas as telas autenticadas. Tela nova na barra → adicionar em todas.
