# Q-Cost AI — instruções do projeto

## Paleta oficial do PAF (obrigatória)

Categorias do modelo PAF nunca são codificadas em cinza. Use sempre os tokens:

```css
--paf1: #265C7A; /* Prevenção — azul petróleo: planejamento, antecipação, controle */
--paf2: #257266; /* Avaliação — verde-azulado escuro: verificação, inspeção, evidência */
--paf3: #AA7123; /* Falha interna — âmbar queimado: perda contida internamente */
--paf4: #91363E; /* Falha externa — vinho profundo: impacto no cliente, severidade */
```

Fundos suaves e bordas (badges, chips, destaques leves):

```css
--paf1Soft: rgba(38,92,122,0.12);  --paf1Line: rgba(38,92,122,0.28);
--paf2Soft: rgba(37,114,102,0.12); --paf2Line: rgba(37,114,102,0.28);
--paf3Soft: rgba(170,113,35,0.14); --paf3Line: rgba(170,113,35,0.32);
--paf4Soft: rgba(145,54,62,0.14);  --paf4Line: rgba(145,54,62,0.32);
```

No tema escuro cada matiz sobe um passo de luminosidade (`#4E93B8`, `#3E9E8F`, `#D19A45`, `#C4737C`), com soft/line em 0.16/0.34 — mesma matiz, contraste preservado.

### Regras de aplicação

- Badge e chip: fundo soft + borda line + texto na cor base. Nunca fundo 100% saturado.
- Card e KPI: base neutra do sistema; cor da categoria em barra, bullet, ícone ou número-chave. Não preencher o card inteiro.
- Gráficos: ordem fixa Prevenção → Avaliação → Falha interna → Falha externa, em barras empilhadas, séries e legendas. Nunca reordenar por valor. Variar opacidade da mesma matiz é permitido; trocar matiz, não.
- Tabelas: badge, ponto colorido ou marcador lateral. Nunca linha inteira preenchida.
- A cor indica categoria, não estado. Aprovado, pendente, erro e sucesso continuam em `--pos` / `--neg` / `--warn` / `--info`.
- Cinza apenas para item sem classificação, oculto ou desabilitado.
- Séries que não são PAF (canais de entrada, fornecedores externos/internos) permanecem na escala neutra `--c1…--c4`.
- Sem gradientes vibrantes, neon ou saturação alta. O tom é executivo, corporativo e técnico.

## Navegação

Toda tela autenticada carrega a mesma barra de abas, na ordem: Painel · Eventos · Custos · Alertas · Auditoria · Relatórios · Integrações. Ao criar uma tela nova que entre nessa barra, adicionar o item em todas as demais para não gerar link inacessível.

## Marca

Símbolo: três barras descendentes com cauda a 45° — as duas maiores em tinta, a menor e a cauda em `--sig`. Nome "Q-Cost AI" com "AI" em `--sig`.
