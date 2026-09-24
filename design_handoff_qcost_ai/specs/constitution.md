# Constituição — Q-Cost AI

Princípios que nenhuma spec, plano ou tarefa pode violar. Alterar um artigo exige registro no `CHANGELOG.md` do pacote de design.

## I. Humano aprova, IA propõe
1. Todo evento de custo passa por aprovação humana antes de entrar na apuração. Não existe caminho automático — nem por API, nem por MCP, nem por regra.
2. A IA extrai, sugere e pergunta. Cada valor carrega a sua procedência (EXTRAÍDO, SUGERIDO, FALTANDO, DO CADASTRO, SESSÃO, REVISADO).
3. Correção do usuário vale só para o evento, salvo quando ele escolhe propor regra. Proposta de regra passa por aprovador e nunca reclassifica eventos já registrados.

## II. Rastreabilidade total
1. Toda mudança de estado, valor, taxa, estrutura PAF ou moeda gera registro imutável na trilha de auditoria com autor, momento, antes, depois e justificativa.
2. O total de uma contabilização é a soma das ocorrências. Nunca é digitado.
3. Ocorrências lidas = agrupadas + triagem, verificável em tela.

## III. Modelo PAF é o eixo
1. Quatro categorias fixas, nesta ordem: Prevenção, Avaliação, Falha interna, Falha externa.
2. Subcategoria, conta contábil e centro de custo vêm do cadastro PAF da organização, não do documento.
3. Cores PAF (`--paf1…4`) identificam categoria e nada mais. Estado e ação nunca usam cor PAF.

## IV. Forma constante
1. O contrato de contabilização tem sempre os mesmos campos na mesma ordem. Campo nulo aparece como "não se aplica"; não some.
2. Novo Evento e Revisar Evento seguem a mesma sequência de seções, com os mesmos nomes.
3. O conjunto de estados do evento é fechado: Rascunho, Em revisão, Pendente, Provisório, Confirmado, Ajustado, Cancelado.

## V. Isolamento e permissão
1. Dados de uma organização nunca são visíveis a outra.
2. Permissão por papel (Analista, Aprovador, Administrador) e por planta. Analista não aprova.

## VI. Internacionalização desde o início
1. pt-BR, en e es completos. Nenhuma string fixa em código.
2. Número, moeda e data via `Intl.NumberFormat` / `Intl.DateTimeFormat`. Valor editado persiste como número + texto cru + locale.
3. Layout tolera 40% de expansão de texto sem quebrar altura de controle.

## VII. Sistema visual
1. Tokens de `README.md › Tokens de cor` são a única fonte de cor. Nada de hex solto.
2. Estrutura por linhas de 1px. Raio 0–2px. Sombra só em elemento flutuante. Sem gradiente.
3. Archivo para interface (máx. peso 500), DM Mono tabular para todo dado.
4. Contraste mínimo 4.5:1; cor nunca é o único indicador; foco visível em `--sig`.
