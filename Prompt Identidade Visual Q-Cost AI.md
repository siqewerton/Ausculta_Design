# Prompt — Identidade visual Q-Cost AI (v2)

Copie o bloco abaixo inteiro no início de um projeto novo.

---

Siga rigorosamente a identidade visual descrita abaixo. É um sistema corporativo silencioso, de densidade editorial: papel off-white quente, tinta quase preta, hairlines, tipografia leve e um único dourado como cor de assinatura. Desktop-first com tema claro e escuro, multilíngue (pt-BR / en / es), WCAG 2.1 AA. Não invente cores, fontes ou componentes fora do que está aqui.

## Princípio

A estrutura vem de linhas de 1px, não de sombras nem de blocos coloridos. Superfícies raramente são "cards flutuantes" — são regiões delimitadas por bordas compartilhadas, frequentemente em grade contínua (`gap:0` com `border-right` entre células). Cor é quase ausente; quando aparece, carrega significado. Nada decorativo, nada arredondado, nada saturado.

## Tipografia

- Interface e texto: **Archivo** (200, 300, 400, 500). Títulos grandes usam peso **200**; quanto maior o texto, mais leve ele é. Peso 500 é o máximo, reservado a ênfase pontual.
- Dados, rótulos de eixo, códigos, IDs, datas, moeda, percentual, timestamps e microlabels: **DM Mono** (400, 500) com `font-variant-numeric: tabular-nums`. Colunas numéricas alinhadas à direita.
- Escala:

| Uso | Especificação |
| --- | --- |
| Título de página | Archivo `clamp(30px, 4.4vw, 46px)` / 1.1 / **200**, letter-spacing -0.03em |
| Kicker acima do título | DM Mono 11px, uppercase, letter-spacing 0.05em, cor `--ink3` |
| Título de seção / card | Archivo 15–17px / 1.3 / 400 |
| Rótulo de seção em header | DM Mono 10–11px, uppercase, letter-spacing 0.04–0.07em, cor `--ink3` |
| Corpo | Archivo 13px / 1.65 / 400, cor `--ink2`, `max-width: 70ch`, `text-wrap: pretty` |
| Auxiliar / legenda | Archivo 11.5px / 1.6, cor `--ink3` |
| Número de KPI | DM Mono `clamp(17px, 2.1vw, 34px)` / 1 / **300**, letter-spacing -0.025em, tabular |

Rótulos de formulário são DM Mono 10px uppercase, não Archivo.

Peso por tamanho: quanto maior o texto, mais leve. Título de página 200, número de KPI 300, interface 400, ênfase pontual 500.

## Tokens de cor

Defina como variáveis CSS e alterne por `[data-theme="dark"]`. Todo o layout referencia `var(--*)`, nunca hex direto.

**Claro**
```css
--bg:#FBFBFA; --surf:#FFFFFF; --surf2:#F3F3F2; --line:#E6E6E4; --line2:#D4D4D1;
--ink:#131313; --ink2:#5E5E5C; --ink3:#6F6F6D;
--acc:#131313; --accInk:#FFFFFF; --sig:#79621F; --sigBg:#F6F4EF;
--pos:#2F6260; --neg:#7E3F4A; --warn:#79621F; --info:#46597A;
--posBg:#F0F4F4; --negBg:#F6F2F2; --warnBg:#F6F4EF; --infoBg:#F2F3F6;
--c1:#131313; --c2:#535353; --c3:#8F8F8D; --c4:#C6C6C3;
```

**Escuro**
```css
--bg:#0A0A0A; --surf:#0F0F0F; --surf2:#151515; --line:#1F1F1F; --line2:#2B2B2B;
--ink:#F0F0F0; --ink2:#9A9A9A; --ink3:#8E8E8E;
--acc:#F0F0F0; --accInk:#0A0A0A; --sig:#C3A653; --sigBg:#201D13;
--pos:#5E9B98; --neg:#C2848D; --warn:#C3A653; --info:#8B9DBE;
--posBg:#141B1B; --negBg:#20191A; --warnBg:#201D13; --infoBg:#1A1C20;
--c1:#F0F0F0; --c2:#B0B0B0; --c3:#787878; --c4:#4A4A4A;
```

- `--acc` é **tinta**, não uma cor de marca: o botão primário é preto sobre branco (ou branco sobre preto no escuro).
- `--sig` é o dourado de assinatura. Aparece em: contorno de foco, marca, e no máximo um acento por tela. Nunca preenche áreas grandes.
- `--c1…--c4` é a escala neutra para séries de gráfico sem significado categórico.
- Semânticas (`--pos`, `--neg`, `--warn`, `--info`) são dessaturadas — verde-petróleo, vinho, ocre, azul-ardósia. Nunca verde/vermelho puros.

## Categorias de domínio

Se o produto tiver um eixo classificatório fixo (no Q-Cost AI é o PAF), atribua uma matiz dessaturada por categoria, em ordem fixa, com fundo soft e borda line derivados da mesma matiz:

```css
--cat1:#265C7A; --cat2:#257266; --cat3:#AA7123; --cat4:#91363E;
--cat1Soft:rgba(38,92,122,0.12);  --cat1Line:rgba(38,92,122,0.28);
/* escuro: sobe um passo de luminosidade — #4E93B8 #3E9E8F #D19A45 #C4737C, soft/line 0.16/0.34 */
```

Regras: badge e chip usam fundo soft + borda line + texto na cor base, nunca fundo saturado. Card e KPI mantêm base neutra e recebem a cor em barra, bullet, ícone ou número-chave. Gráficos mantêm a ordem fixa em barras, séries e legendas — nunca reordenar por valor; variar opacidade da mesma matiz é permitido, trocar matiz não. Tabelas indicam categoria por badge ou marcador lateral, nunca linha inteira preenchida. A cor indica categoria, não estado — aprovado, pendente e erro continuam em `--pos` / `--neg` / `--warn` / `--info`. Cinza apenas para item sem classificação ou desabilitado.

## Cor de negócio vs. cor de sistema

A mesma variável significa coisas diferentes conforme o que ela colore. Nunca misture os dois papéis no mesmo componente.

**Elementos de negócio** (custo, variação, categoria, registro)

- Valor monetário é tinta (`--ink`). Dinheiro não recebe cor por ser dinheiro. Única exceção: o KPI de perda, que assume `--neg` por ser sempre indesejado.
- Variação segue a **direção desejada da métrica, não o sinal**. Investimento (prevenção, avaliação) subindo é `--pos`; falha subindo é `--neg`. Um `+` nunca é verde por si só. Implemente como `upIsGood` por métrica.
- Estado do registro em tabela densa é apenas texto DM Mono colorido, sem fundo nem borda: confirmado `--pos`, provisório `--warn`, em revisão e ajustado `--info`, agrupado ou sem classificação `--ink3`. O badge completo (borda + fundo tonal) fica para cabeçalhos e detalhe de evento.
- Categoria usa a paleta de categorias, nunca as semânticas.

**Elementos de sistema** (ação, status de ação, validação, IA, foco)

- Ação é tinta, não cor de marca: primária `--acc`/`--accInk`, secundária contornada em `--line2`, destrutiva contornada em `--neg`. Nenhuma ação usa cor de categoria nem o dourado.
- **Status de ação e de fluxo** — pendente, aguardando aprovação, em análise, aprovado, rejeitado, expirado — usam badge completo: borda 1px na cor do estado, fundo tonal correspondente, texto DM Mono 10.5–11px, sempre acompanhado de rótulo textual.

| Status | Token |
| --- | --- |
| Aprovado, concluído, ativo, sincronizado | `--pos` / `--posBg` |
| Pendente, aguardando aprovação, em rascunho, expirando | `--warn` / `--warnBg` |
| Rejeitado, falhou, expirado, bloqueado | `--neg` / `--negBg` |
| Em análise, em revisão, agendado, informativo | `--info` / `--infoBg` |
| Arquivado, inativo, desabilitado | `--ink3` sobre `--surf2` |

- Validação de campo: `--neg` significa operação inválida, não valor ruim — borda e texto em `--neg`, fundo `--negBg`. Sucesso de operação usa `--pos` com a mesma gramática.
- Bloco gerado por IA: borda esquerda de 2px em `--warn` e rótulo mono uppercase na mesma cor.
- `--sig` é reservado à marca e ao contorno de foco. No máximo um uso adicional por tela; nunca em dado de gráfico.

**Nunca** — colorir um valor só por ser monetário; cor de categoria em botão; `--sig` em série de gráfico; cor de estado sem rótulo textual.

## Geometria e superfície

- Raio **0 a 2px**. Nenhum formato pílula. Ícone de tema é a única exceção circular.
- Superfície: `background: var(--surf)`, `border: 1px solid var(--line)`. Sombra somente em elementos flutuantes (dropdown, modal): `0 10px 30px rgba(0,0,0,0.14)`. Nenhuma sombra em conteúdo estático.
- Faixas de KPI: grade `repeat(auto-fit, minmax(min(100%,162px),1fr))` com `gap:0`, bordas compartilhadas nas quatro faces e `border-right` entre células.
- Espaçamentos responsivos com `clamp()` — ex. `padding: clamp(20px,2.4vw,28px) clamp(16px,1.8vw,22px)`, `gap: clamp(14px,2vw,24px)`.
- Header fixo (`position: sticky; top:0`) no fundo da página com `border-bottom: 1px solid var(--line)`.

## Componentes

**Botões** — altura 34px (28px no chrome do header), padding 0 14px, fonte 13px, sem raio.

- Primário: `background: var(--acc)`, `color: var(--accInk)`, sem borda.
- Secundário: `background: transparent`, `border: 1px solid var(--line2)`, `color: var(--ink)`.
- Terciário: sem borda nem fundo, sublinhado no hover.
- Grupos segmentados: botões sem borda com `gap:1px` sobre `background: var(--line)` — a linha vira o separador. O item ativo inverte para `--acc` / `--accInk`.

**Campos** — altura 34px, padding 0 10px, `border: 1px solid var(--line2)`, fundo transparente, fonte 13px (DM Mono em data, número e código). Rótulo em DM Mono 10px uppercase acima, `gap:7px`. Erro: borda e texto em `--neg`, fundo `--negBg`.

**Foco** — `outline: 1px solid var(--sig); outline-offset: 3px` em todos os controles. Nunca o anel padrão do navegador.

**Links** — `color: inherit; text-decoration: none`; no hover, `underline` com `text-underline-offset:4px` e `text-decoration-thickness:1px`. Links não são azuis.

**Badges** — altura 23–24px, padding 0 9px, borda 1px na cor do estado, fundo tonal correspondente, texto DM Mono 10–11px. Altura fixa; o rótulo cresce na horizontal.

**Tabelas** — sem borda vertical. Categoria indicada por marcador lateral de 3px × 14px na cor da categoria, à esquerda do rótulo. `<th>` em DM Mono 10px, peso 400, uppercase, letter-spacing 0.05em, cor `--ink3`, `border-bottom: 1px solid var(--line)`. Células com `border-bottom: 1px solid var(--line)`, padding 11–16px. Valores em DM Mono tabular à direita. Linhas de detalhe aninhadas recuam o padding-left (14 → 44 → 66px) e usam fundo `--surf2`. Linha de total sem borda inferior, rótulo em DM Mono uppercase.

**Ícones** — outline, `stroke-width: 1.8`, `stroke-linecap: square`, `stroke-linejoin: miter`, `currentColor`, 13px em botões e 22px isolados. Nunca preenchidos.

## Mobile

Abaixo de 680px: navegação do header vira faixa rolável horizontal sem barra de scroll; altura mínima de 34–38px em botões e 36px em campos; links em bloco ganham `min-height:32px`, links inline permanecem inline.

## Multilíngue

Rótulos dimensionados por conteúdo, nunca por largura fixa. Botões e badges crescem no eixo horizontal e truncam com reticências, nunca quebram altura. Prever 30–40% de expansão de pt-BR e es sobre o inglês.

## Marca

Símbolo: três barras descendentes com cauda a 45° — as duas maiores em `--ink`, a menor e a cauda em `--sig`. Nome com o sufixo em `--sig`.

## Fora do sistema

Gradientes, neon, saturação alta, azul de link, cor de marca preenchendo botões, ícones preenchidos, emoji na interface, ilustrações, cantos acima de 2px, sombras em conteúdo estático, peso de fonte acima de 500, IBM Plex, Inter, Roboto, Arial.
