# Handoff: Q-Cost AI — plataforma de custos da qualidade

## Visão geral

Q-Cost AI é um SaaS corporativo que apura **custo da qualidade** em indústrias, classificando cada evento de custo na estrutura **PAF** (Prevenção, Avaliação, Falha interna, Falha externa). Um evento entra na plataforma por três caminhos — pessoa, sistema corporativo ou agente de IA —, é lido e classificado por IA, revisado e aprovado por uma pessoa, e só então entra na apuração contábil.

O público é diretoria industrial, gerência de qualidade e controladoria. A operação é diária e densa em dados; a interface é deliberadamente sóbria e silenciosa.

24 arquivos de design, três idiomas (pt-BR / en / es), tema claro e escuro.

## Sobre os arquivos deste pacote

Os arquivos em `design_files/` são **referências de design criadas em HTML** — protótipos que mostram aparência e comportamento pretendidos, **não código de produção para copiar**.

A tarefa é **recriar estes designs no ambiente já existente do codebase alvo** (React, Vue, SwiftUI, nativo, etc.), usando seus padrões e bibliotecas estabelecidos. Se ainda não houver ambiente, escolha o framework mais adequado ao projeto e implemente lá.

Os arquivos usam um runtime de protótipo (`support.js`) que **não deve ser portado**: ele existe só para os HTML abrirem no navegador. O que importa é a estrutura, os valores e o comportamento documentados abaixo.

Cada arquivo tem duas partes: o template (markup entre `<x-dc>` e `</x-dc>`) e uma classe de lógica no `<script>` ao final, onde ficam estado, dicionários de tradução e dados de exemplo. Os dicionários (`DICT`) são a fonte de toda a cópia nos três idiomas — use-os como base do arquivo de i18n.

## Fidelidade

**Alta fidelidade.** Cores, tipografia, espaçamentos, estados e cópia estão finalizados. Recrie a UI fielmente usando as bibliotecas do codebase. Os números, nomes de empresa, fornecedores e eventos são dados de exemplo — substitua por dados reais.

---

## Sistema visual

A referência viva é `Q-Cost AI Design System v2.dc.html` (paleta, tipografia, componentes) e `Q-Cost AI Fundacoes v2.dc.html` (princípios e regras de aplicação). Leia as duas antes de implementar.

### Princípio

Densidade informacional alta com calma visual. **A estrutura vem de linhas de 1px, não de sombras nem de blocos coloridos.** Superfícies raramente são cartões flutuantes: são regiões delimitadas por bordas compartilhadas, frequentemente em grade contínua (`gap:0` com `border-right` entre células). Cor é quase ausente; quando aparece, carrega significado.

### Tokens de cor

Definidos como variáveis CSS em `:root`, alternados por `[data-theme="dark"]`. Todo o layout referencia `var(--*)`, nunca hex direto.

**Tema claro**
```css
--bg:#FBFBFA; --surf:#FFFFFF; --surf2:#F3F3F2; --line:#E6E6E4; --line2:#D4D4D1;
--ink:#131313; --ink2:#5E5E5C; --ink3:#6F6F6D;
--acc:#131313; --accInk:#FFFFFF; --sig:#79621F; --sigBg:#F6F4EF;
--pos:#2F6260; --neg:#7E3F4A; --warn:#79621F; --info:#46597A;
--posBg:#F0F4F4; --negBg:#F6F2F2; --warnBg:#F6F4EF; --infoBg:#F2F3F6;
--c1:#131313; --c2:#535353; --c3:#8F8F8D; --c4:#C6C6C3;
--paf1:#265C7A; --paf2:#257266; --paf3:#AA7123; --paf4:#91363E;
--paf1Soft:rgba(38,92,122,0.12);  --paf1Line:rgba(38,92,122,0.28);
--paf2Soft:rgba(37,114,102,0.12); --paf2Line:rgba(37,114,102,0.28);
--paf3Soft:rgba(170,113,35,0.14); --paf3Line:rgba(170,113,35,0.32);
--paf4Soft:rgba(145,54,62,0.14);  --paf4Line:rgba(145,54,62,0.32);
```

**Tema escuro**
```css
--bg:#0A0A0A; --surf:#0F0F0F; --surf2:#151515; --line:#1F1F1F; --line2:#2B2B2B;
--ink:#F0F0F0; --ink2:#9A9A9A; --ink3:#8E8E8E;
--acc:#F0F0F0; --accInk:#0A0A0A; --sig:#C3A653; --sigBg:#201D13;
--pos:#5E9B98; --neg:#C2848D; --warn:#C3A653; --info:#8B9DBE;
--posBg:#141B1B; --negBg:#20191A; --warnBg:#201D13; --infoBg:#1A1C20;
--c1:#F0F0F0; --c2:#B0B0B0; --c3:#787878; --c4:#4A4A4A;
--paf1:#4E93B8; --paf2:#3E9E8F; --paf3:#D19A45; --paf4:#C4737C;
--paf1Soft:rgba(78,147,184,0.16);  --paf1Line:rgba(78,147,184,0.34);
--paf2Soft:rgba(62,158,143,0.16);  --paf2Line:rgba(62,158,143,0.34);
--paf3Soft:rgba(209,154,69,0.16);  --paf3Line:rgba(209,154,69,0.34);
--paf4Soft:rgba(196,115,124,0.16); --paf4Line:rgba(196,115,124,0.34);
```

Notas de uso:

- `--acc` é **tinta**, não cor de marca: o botão primário é preto sobre branco (branco sobre preto no escuro).
- `--sig` é o dourado de assinatura. Reservado à marca e ao contorno de foco; no máximo um uso adicional por tela. **Nunca em dado de gráfico.**
- `--c1…--c4` é a escala neutra para séries de gráfico sem significado categórico (canais de entrada, plantas, fornecedores).
- As semânticas são dessaturadas — verde-petróleo, vinho, ocre, azul-ardósia. Nunca verde/vermelho puros.

### Cor de negócio vs. cor de sistema

A mesma variável significa coisas diferentes conforme o que ela colore. **Nunca misture os dois papéis no mesmo componente.**

**Elementos de negócio** (custo, variação, categoria, registro)

- Valor monetário é tinta (`--ink`). Dinheiro não recebe cor por ser dinheiro. Única exceção: o KPI de perda, que assume `--neg` por ser sempre indesejado.
- Variação segue a **direção desejada da métrica, não o sinal**. Prevenção subindo é investimento → `--pos`; falha subindo é perda → `--neg`. Um `+` nunca é verde por si só. Implemente como flag `upIsGood` por métrica.
- Estado do registro em tabela densa é apenas texto DM Mono colorido, sem fundo nem borda: confirmado `--pos`, provisório `--warn`, em revisão e ajustado `--info`, agrupado ou sem classificação `--ink3`.
- Categoria usa a paleta PAF, nunca as semânticas.

**Elementos de sistema** (ação, status de fluxo, validação, IA, foco)

- Ação é tinta: primária `--acc`/`--accInk`, secundária contornada em `--line2`, destrutiva contornada em `--neg`. Nenhuma ação usa cor de categoria nem o dourado.
- **Status de ação e de fluxo** usam badge completo: borda 1px na cor do estado, fundo tonal, texto DM Mono 10–11px, sempre com rótulo textual.

### Estado do evento — conjunto canônico

Conjunto fechado de sete estados. Toda tela nomeia o evento com uma destas sete palavras, em caixa de frase e em DM Mono. Duas formas de renderização: em tabela densa, apenas texto colorido, sem fundo nem borda; fora dela, badge com borda, fundo tonal e rótulo. Rascunho, Pendente e Provisório dividem `--warn` de propósito — cor nunca é o único indicador.

| Estado | Token | Quando |
| --- | --- | --- |
| Rascunho | `--warn` | Criado, ainda não submetido |
| Em revisão | `--info` | Sob conferência de um revisor |
| Pendente | `--warn` | Submetido, aguarda decisão |
| Provisório | `--warn` | Aprovado com valor estimado |
| Confirmado | `--pos` | Valor final, entra na apuração |
| Ajustado | `--info` | Reaberto e corrigido após confirmar |
| Cancelado | `--neg` | Rejeitado ou anulado; sai da apuração |

Motivo de fila (Aprovação, Incompletos, Alertas, no Dashboard) e progresso de processamento (as quatro etapas da IA, em Novo Evento) não são estados e não usam forma de badge de status.

### Outros objetos

| Status | Token |
| --- | --- |
| Concluído, ativo, sincronizado | `--pos` / `--posBg` |
| Expirando, limite próximo | `--warn` / `--warnBg` |
| Falhou, expirado, bloqueado | `--neg` / `--negBg` |
| Agendado, em processamento, informativo | `--info` / `--infoBg` |
| Arquivado, inativo, desabilitado | `--ink3` sobre `--surf2` |

- Validação de campo: `--neg` significa operação inválida, não valor ruim — borda e texto em `--neg`, fundo `--negBg`.
- Bloco gerado por IA: borda esquerda de 2px em `--warn` e rótulo mono uppercase na mesma cor.

**Nunca**: colorir um valor só por ser monetário; cor de categoria em botão ou status; `--sig` em série de gráfico; cor de estado sem rótulo textual.

### Categorias PAF

Ordem **fixa** em barras empilhadas, séries, legendas e tabelas — nunca reordenar por valor.

| # | Categoria | Token | Significado |
| --- | --- | --- | --- |
| 1 | Prevenção | `--paf1` #265C7A | Azul petróleo — planejamento, antecipação, controle |
| 2 | Avaliação | `--paf2` #257266 | Verde-azulado — verificação, inspeção, evidência |
| 3 | Falha interna | `--paf3` #AA7123 | Âmbar queimado — perda contida internamente |
| 4 | Falha externa | `--paf4` #91363E | Vinho profundo — impacto no cliente, severidade |

Badge e chip: fundo soft + borda line + texto na cor base, nunca fundo saturado. Card e KPI mantêm base neutra e recebem a cor em barra lateral, bullet, ícone ou número-chave. Tabelas indicam categoria por marcador lateral de 3px × 14px, nunca linha inteira preenchida. Cinza apenas para item sem classificação ou desabilitado.

Variar opacidade da mesma matiz é permitido; trocar matiz, não.

### Tipografia

- **Archivo** (200, 300, 400, 500) para interface e texto. Peso 500 é o máximo, reservado a ênfase pontual. Quanto maior o texto, mais leve ele é.
- **DM Mono** (400, 500) para todo dado, código, ID, data, moeda, percentual, timestamp e microlabel, com `font-variant-numeric: tabular-nums`. Colunas numéricas alinhadas à direita.

| Uso | Especificação |
| --- | --- |
| Título de página | Archivo `clamp(30px, 4.4vw, 46px)` / 1.1 / **200**, letter-spacing -0.03em |
| Kicker acima do título | DM Mono 11px, uppercase, letter-spacing 0.05em, `--ink3` |
| Título de seção / card | Archivo 15–17px / 1.3 / 400 |
| Rótulo de seção em header | DM Mono 10–11px, uppercase, letter-spacing 0.04–0.07em, `--ink3` |
| Corpo | Archivo 13px / 1.65 / 400, `--ink2`, `max-width: 70ch`, `text-wrap: pretty` |
| Auxiliar / legenda | Archivo 11.5px / 1.6, `--ink3` |
| Rótulo de formulário | DM Mono 10px, uppercase, letter-spacing 0.07em, `--ink3` |
| Número de KPI | DM Mono `clamp(17px, 2.1vw, 34px)` / 1 / **300**, letter-spacing -0.025em, tabular |

Carregadas do Google Fonts:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@200;300;400;500&family=DM+Mono:wght@400;500&display=swap">
```

### Geometria e superfície

- Raio **0 a 2px** em tudo. Nenhum formato pílula. O marcador do seletor de tema é a única exceção circular.
- Superfície: `background: var(--surf)`, `border: 1px solid var(--line)`. Sombra **somente** em elemento flutuante (dropdown, modal): `0 10px 30px rgba(0,0,0,0.14)`. Nenhuma sombra em conteúdo estático.
- Faixas de KPI: grade `repeat(auto-fit, minmax(min(100%,162px),1fr))` com `gap:0`, bordas compartilhadas e `border-right` entre células.
- Espaçamentos responsivos com `clamp()` — ex. `padding: clamp(20px,2.4vw,28px) clamp(16px,1.8vw,22px)`, `gap: clamp(14px,2vw,24px)`.
- Header fixo (`position: sticky; top:0`) no fundo da página com `border-bottom: 1px solid var(--line)`.
- Largura máxima de conteúdo: 1400px (telas de app), 1240px (landing), 1560px (dashboard).

### Componentes

**Botões** — altura 34px (28px no chrome do header, 38–40px em CTA principal), padding 0 14px, fonte 13px, sem raio.

| Variante | Estilo |
| --- | --- |
| Primária | `background: var(--acc)`, `color: var(--accInk)`, sem borda, hover `opacity:0.88` |
| Secundária | `background: transparent`, `border: 1px solid var(--line2)`, `color: var(--ink)`, hover `border-color: var(--ink3)` |
| Destrutiva | transparente, borda e texto `--neg`, hover fundo `--negBg` |
| Desabilitada | fundo `--surf2`, texto `--ink3`, `cursor: not-allowed` |

**Grupos segmentados** — botões sem borda com `gap:1px` sobre `background: var(--line)`; a linha vira o separador. O item ativo inverte para `--acc` / `--accInk`.

**Campos** — altura 34px, padding 0 10px, `border: 1px solid var(--line2)`, fundo `var(--bg)` ou transparente, fonte 13px (DM Mono em data, número e código). Rótulo em DM Mono 10px uppercase acima, `gap:7px`.

**Foco** — `outline: 1px solid var(--sig); outline-offset: 3px` em todos os controles. Nunca o anel padrão do navegador.

**Links** — `color: inherit; text-decoration: none`; no hover, `underline` com `text-underline-offset:4px` e `text-decoration-thickness:1px`. Links não são azuis.

**Badges** — altura 23–24px, padding 0 9px, borda 1px na cor do estado, fundo tonal, texto DM Mono 10–11px, marcador quadrado de 5px à esquerda. Altura fixa; o rótulo cresce na horizontal.

**Tabelas** — sem borda vertical. `<th>` em DM Mono 10px, peso 400, uppercase, letter-spacing 0.05em, `--ink3`, `border-bottom: 1px solid var(--line)`. Células com `border-bottom: 1px solid var(--line)`, padding 11–17px. Valores em DM Mono tabular à direita. Linhas de detalhe aninhadas recuam o padding-left (14 → 44 → 66px) e usam fundo `--surf2`.

**Ícones** — outline, `stroke-width: 1.8`, `stroke-linecap: square`, `stroke-linejoin: miter`, `currentColor`, 13px em botões e 22px isolados. Nunca preenchidos. Conjunto compatível com Lucide.

**Marca** — três barras descendentes com cauda a 45°: as duas maiores em `currentColor`, a menor e a cauda em `--sig`. Nome "Q-Cost AI" com " AI" em `--sig`.

### Mobile

Abaixo de 680px: navegação do header vira faixa rolável horizontal sem barra de scroll; altura mínima de 34–38px em botões e 36px em campos; links em bloco ganham `min-height:32px`.

---

## Arquitetura de navegação

**Público (sem sessão)**
`Landing` → `Login` → `Onboarding` → app. Mais `Confiança`, `Políticas`, `Status` acessíveis do rodapé.

**Autenticado** — barra de abas fixa, mesma ordem em todas as telas:
`Painel · Eventos · Custos · Auditoria · Alertas · Relatórios`

A aba **Eventos** aponta direto para `Novo Evento`. **Integrações** saiu da barra e passou para o menu do usuário.

Ao criar uma tela nova que entre nessa barra, adicione o item em **todas** as demais para não gerar link inacessível.

**Menu do usuário** (canto direito do header, em todas as telas autenticadas): organização / nome / e-mail / papel no topo, depois Meu perfil · Organização e plantas · Equipe e permissões · separador · Integrações · separador · Central de Ajuda e Treinamento · Central de Confiança · Assinatura e faturas · separador · Sair.

---

## Telas

### 1. Landing (`Q-Cost AI Landing v2.dc.html`)

**Propósito** — converter visitante corporativo em assinante.

**Seções na ordem**: hero com proposta de valor (com "O tamanho do problema" incorporado) · Como funciona (diagrama SVG do fluxo) · **Veja funcionando** (4 vídeos, recorte por objeção, o quarto sobre o modo de dados mínimos) · Seus dados (três garantias, cada uma com link para a Central de Confiança, + bloco "Leve para o seu TI" com documentos empacotados e envio por e-mail em um campo) · Para quem é · Estrutura PAF · Integrações (API/MCP) · Prova · Planos · Cadastro · Rodapé com legal e central de confiança.

Menu do topo: a aba **Segurança** aponta para "Seus dados"; "Estrutura PAF" saiu do menu.

**Pendente**: o modo de dados mínimos depende de aprovação de produto. Se reprovado, saem juntos o quarto vídeo e a garantia (b) de "Seus dados".

A seção de vídeos usa fundo `--surf` para se destacar das vizinhas. Cada cartão abre com a dúvida entre aspas em DM Mono uppercase (`"E se a IA errar?"`), seguida do título e da descrição. Player em `aspect-ratio:16/9` com fundo `--surf2` e botão de play de 46px; duração no canto inferior direito.

**Estado**: idioma (persistido), tema (persistido), projeção de economia interativa.

### 2. Login (`Q-Cost AI Login v2.dc.html`)

E-mail e senha, SSO corporativo, recuperação. Seletor de idioma no header — a escolha é gravada e todas as telas seguintes a respeitam.

### 3. Onboarding (`Q-Cost AI Onboarding v2.dc.html`)

**Cinco passos**: dados da organização → plantas a gerenciar → plano → forma de pagamento → confirmação.

- Campos cadastrais: razão social, código legal (CNPJ/EIN/RFC/CUIT/NIF/NIPC conforme país), segmento, país e moeda, receita de referência, ciclo de apuração.
- **País-moeda-código legal é uma lista única** que dirige rótulo, máscara e validação do código legal e a formatação monetária.
- Plantas: padrão é a própria organização (consolidado); o usuário adiciona unidades.
- Tela final: confirmação + **seção de vídeos** (4 jornadas numeradas) + ponte para a central de ajuda.

**Validação**: campos obrigatórios marcados em `--neg` com resumo no topo; nenhum dado é perdido ao falhar.

### 4. Dashboard (`Q-Cost AI Dashboard v2.dc.html`)

**Propósito** — estado da apuração e o que exige ação.

- Faixa de KPIs com bordas compartilhadas.
- Composição do período: um card por categoria PAF, com barra, valor, participação e **maior subcategoria** do período.
- Série histórica.
- **Eventos que precisam de ação**: tabela com colunas Evento · Origem · Status · Valor · Ação.
  - Coluna **Origem** com badge: API REST em `--info`, MCP em `--warn`, Upload neutro. Alertas não entram nesta fila; vivem só na aba Alertas.
  - Esta tabela é a **única fila de trabalho** do produto. Não existe tela de fila separada.
  - Tempo relativo preciso (3 min, 47 min, 2 h, 1 d), calculado no render.
  - **Ordenação DESC por recência.**
  - O botão de ação é link para `Revisar Evento` com o id do evento na query string.

### 5. Novo Evento (`Q-Cost AI Novo Evento v2.dc.html`)

**Propósito** — registrar um evento manualmente e revisar o que a IA extraiu.

**Fases**: `idle` (upload + prompt) → `busy` (progresso em 4 etapas) → `result` (análise) → `saved`.

É o destino da aba **Eventos**. Na fase `result` a tela segue **a mesma ordem, os mesmos nomes e o mesmo tratamento visual de Revisar Evento** (ver "Sequência de seções do evento" abaixo). As duas telas diferem só no contexto: envio recém-feito aqui, envio já recebido lá.

**Mecanismo de escopo da correção** — exclusivo desta tela: ao corrigir um campo sugerido pela IA, o usuário escolhe entre "só neste evento" (padrão) e "sempre que for esta subcategoria". A segunda opção cria uma **proposta de regra** que um aprovador revisa; nada muda imediatamente e eventos já registrados não são reclassificados. Quando há padrão detectado no histórico, um bloco em `--paf4Soft` mostra a evidência ("Em 7 dos últimos 15 eventos desta subcategoria o custo foi corrigido para cima").

### 6. Revisar Evento (`Q-Cost AI Revisar Evento v2.dc.html`)

**Propósito** — agir sobre um evento que chegou por API, MCP, upload ou regra de alerta. É o destino do botão de ação do dashboard.

Recebe `?ev=<id>` e abre o evento correspondente. Chips de navegação entre os eventos da fila, ordenados por recência.

Seções na ordem do processo (ver "Sequência de seções do evento"). Particularidades:
- **Conteúdo recebido**: o conteúdo bruto — JSON da chamada REST, argumentos da ferramenta MCP, ou o texto livre do upload — com os anexos.
- **Link de rastreio** contextual: upload → Auditoria, API/MCP → Integrações.
- Esclarecimento pendente com a nota de que sistemas e agentes não respondem — a fila só anda com uma pessoa.
- Não exibe alertas (pertencem à aba Alertas) nem a chave de agrupamento como seção própria.

### Sequência de seções do evento (Novo Evento e Revisar Evento)

Ordem fixa, nomes idênticos nas duas telas:

1. **Envio** — dados estruturais gravados pela plataforma (origem, momento, autor, chamada de origem). Grade sem campos de entrada.
2. **Conteúdo recebido** — documento(s), payload ou texto enviado, com anexos.
3. **Contabilização do evento** — contrato fixo de campos contábeis em tabela densa de três colunas. Centro de custo **somente leitura**, vindo do cadastro PAF.
4. **Dados do evento** — campos específicos da subcategoria, com a coluna "Efeito" marcando o que soma no total.
5. **Ocorrências agrupadas** — registros lidos no documento que compõem o total.
6. **Esclarecimentos solicitados** — blocos âmbar (`--warn` / `--warnBg`) com as perguntas da IA.
7. **Barra de decisão** — "Aprovar e contabilizar" (primária) / "Rejeitar evento" (destrutiva).

### 7. Custos (`Q-Cost AI Custos v2.dc.html`)

Apuração navegável: filtro por planta e período (mês / trimestre / ano / personalizado), KPIs, árvore PAF expansível até o evento individual, custo por fornecedor externo e interno, e origem da entrada (Upload / API / MCP).

A árvore recua o padding a cada nível e usa `--surf2` nas linhas aninhadas.

### 8. Editor PAF (`Q-Cost AI Editor PAF v2.dc.html`)

Monta a estrutura de custos da organização. Uma categoria por cartão (as quatro são fixas), com subcategorias em blocos:

- Linha 1: código · nome · remover
- Grade: base de cálculo · conta contábil · **centro de custo geral**
- Disclosure **centro de custo por planta** — em branco herda o geral, e o placeholder mostra o valor herdado. O botão indica o estado: "herda o geral" ou "2 específico(s)".
- Descrição — instrução para a IA

É este cadastro que alimenta o preenchimento automático do centro de custo nas telas de evento.

### 9. Template PAF (`Q-Cost AI Template PAF v2.dc.html`)

Quatro templates prontos por segmento industrial, cada um listando as subcategorias completas.

### 10. Organização e plantas (`Q-Cost AI Organizacao v2.dc.html`)

Cadastro editável (exceto código legal), plantas, histórico temporal da receita de referência, e versionamento da estrutura PAF.

**Troca de moeda** — mudar país-moeda não aplica direto. Abre uma confirmação que informa quanto histórico está em jogo (eventos, custo apurado, desde quando) e obriga escolher:
- converter todo o histórico pela taxa informada (editável, pré-preenchida pela paridade), com prévia do total convertido ao vivo; ou
- manter o passado na moeda anterior, com aviso de que relatórios que cruzam os períodos ficarão em moedas diferentes.

Confirmado, registra o que foi feito e afirma que a troca está na trilha de auditoria com autor, momento, taxa e totais antes e depois.

### 11. Regras de Alerta (`Q-Cost AI Regras de Alerta v2.dc.html`)

Limites por categoria PAF, planta e período, com destinatários e canal.

### 12. Auditoria (`Q-Cost AI Auditoria v2.dc.html`)

Trilha imutável. Filtros por usuário, tipo de ação, categoria PAF, planta, origem (IA/manual) e período. Cada linha expande mostrando estado antes e depois, justificativa registrada e hash do registro.

**O diff textual permanece neutro** (sem cor de categoria) para legibilidade em compliance; a cor PAF aparece só no badge da coluna Categoria.

### 13. Relatórios (`Q-Cost AI Relatorios v2.dc.html`)

Cinco modelos (apuração mensal PAF, COPQ por planta, falhas por fornecedor, evolução 12 meses, pacote de auditoria ISO), histórico de gerações e envio recorrente.

### 14. Integrações (`Q-Cost AI Integracoes v2.dc.html`)

Chaves de API, conector MCP, e o **registro de invocações**: histórico de chamadas REST feitas pelos sistemas do cliente e de ferramentas MCP chamadas pelos agentes de IA do cliente, com endpoint, origem, latência, status e payload.

### 15. Equipe e permissões (`Q-Cost AI Equipe v2.dc.html`)

Papéis (Analista, Aprovador, Administrador) e escopo por planta.

### 16. Perfil (`Q-Cost AI Perfil v2.dc.html`)

Dados pessoais, cargo (lista padronizada com o onboarding), idioma, tema, sessões ativas.

### 17. Assinatura e faturas (`Q-Cost AI Assinatura v2.dc.html`)

Plano vigente, consumo, faturas, dados de cobrança, e o caminho para cancelamento.

### 18. Cancelamento (`Q-Cost AI Cancelamento v2.dc.html`)

Quatro etapas: conversa (o que a conta acumulou + alternativas: pausar, reduzir para o plano Basic, sessão com especialista, ajustar plano e volume contratado) → motivo → seus dados (exportação em CSV do que sai, lista do que será apagado definitivamente) → confirmação com reconhecimento explícito.

### 19. Ajuda e treinamento (`Q-Cost AI Ajuda v2.dc.html`)

Hierarquia **pergunta → FAQ → vídeo → gente**, com o tempo de resposta de cada degrau no topo.

- **Assistente da conta** — selo "VÊ SEUS DADOS". Responde citando o histórico real da conta e devolve chips de link para a tela onde agir. Quando não sabe, diz que não sabe e encaminha para o contato.
- **FAQ** — busca que ignora acento, filtro por tópico, 11 perguntas.
- **Jornadas em vídeo** — 6 vídeos, cada um percorrendo um fluxo inteiro.
- **Falar com a gente** — WhatsApp, e-mail e sessão com especialista, cada um com o caso de uso que justifica o canal. Ao acionar, confirma que a conversa leva conta, tela de origem e as duas últimas perguntas ao assistente.

### 20. Central de confiança (`Q-Cost AI Confianca v2.dc.html`)

Duas profundidades:
- **Resumo executivo** para decisores.
- **Ficha técnica** por domínio, na ordem: acesso da equipe, isolamento entre clientes, anexos, chaves Enterprise, depois os demais (uso de dados pela IA, privacidade, segurança, retenção, segurança financeira, continuidade). Cada item tem três colunas — pergunta do cliente · o que fazemos · como se comprova — e um rótulo de estágio: em operação / em implantação / roadmap / não oferecido.

Mais subprocessadores, documentos (públicos ou sob NDA) e histórico de mudanças de política.

**Pendente**: quatro itens aguardam validação de engenharia e jurídico. O rótulo "rascunho" permanece até a liberação.

### 21–23. Políticas e Status (`Q-Cost AI Politicas v2.dc.html`, `Q-Cost AI Status v2.dc.html`)

Política de privacidade, termos de uso e DPA numa tela com âncoras (`#privacidade`, `#termos`, `#dpa`); status da plataforma com incidentes e disponibilidade.

### 24. Design System e Fundações

`Q-Cost AI Design System v2.dc.html` — paleta, tipografia e componentes ao vivo, com alternância de tema que troca os hexes exibidos.
`Q-Cost AI Fundacoes v2.dc.html` — princípios e regras de aplicação da cor.

---

## Modelo de dados do evento — as três faixas

Este é o conceito central da revisão de eventos, e a razão do layout em três faixas nas telas 5 e 6. **Os dados de um evento pertencem a três classes estruturalmente diferentes, e tratá-las como iguais custa clareza ao revisor.**

### Classe 1 — Estrutural do sistema

Gravado pela plataforma na entrada. **Não editável**, não depende da IA.

`ORGANIZATION_ID`, `EVENT_ID`, `EVENT_DATETIME`, `EVENT_SOURCE` (upload/api/mcp/system), `EVENT_USER`, `EVENT_TYPE`, `ATTACHMENTS`, `PROMPT_TEXT`, `STATUS`, `APPROVED_USER`, `APPROVED_DATE`, identificador da chamada de origem.

**Tratamento visual**: faixa de largura inteira no topo, grade de células com fundo `--surf2` e bordas compartilhadas. **Nenhum campo de entrada** — a ausência de caixa é a mensagem de que aqui não há decisão. Status como badge que muda ao aprovar.

### Classe 2 — Padrão de contabilização da plataforma

O **contrato fixo**: todo evento carrega estes campos, sempre os mesmos, na mesma ordem. É o que entra na apuração e no razão.

`EVENT_DATE`, `CATEGORY_PAF`, `SUBCATEGORY_PAF`, `PLANT`, `CURRENCY`, `TOTAL_ACCOUNTED_COST`, `COST_CENTER`, `SUPPLIER_TYPE`, `SUPPLIER_NAME` (nullable), `CUSTOMER` (nullable).

**Tratamento visual**: card com o total ancorado no topo ao lado do par categoria-subcategoria em cor PAF soft/line. Grade de nove campos editáveis com etiqueta de confiança. Contador de pendências no cabeçalho.

**A forma é constante** — campos nulos aparecem como "não se aplica" em ramo fixo (fundo `--surf2`, sem borda de input) em vez de sumirem, porque o usuário precisa aprender a forma da tela uma vez e escaneá-la para sempre.

### Classe 3 — Específico do evento

Extraído dinamicamente; varia conforme a subcategoria. Sustenta o valor contabilizado e fica no log para rastreio.

Ex.: `BATCH_NUMBER`, `QUANTITIES`, `VALUES_AND_CURRENCIES_FOUND` (custo do material refugado, frete de retorno, diárias de auditor…).

**Tratamento visual**: em `Revisar Evento`, tabela com colunas Campo · Valor · De onde veio · **Efeito** — e é a coluna de efeito que fecha o raciocínio, marcando as linhas de custo com "→ soma no total". Em `Novo Evento`, cartões (não tabela), porque aqui os campos carregam o mecanismo de escopo da correção, que não cabe numa célula.

### Etiquetas de confiança

| Etiqueta | Significado | Cor | Borda / fundo do campo |
| --- | --- | --- | --- |
| EXTRAÍDO | Lido diretamente do documento | `--pos` | `--line2` / `--surf` |
| SUGERIDO | Estimado pela IA | `--warn` | `--warn` / `--warnBg` |
| FALTANDO | Não identificado, obrigatório | `--neg` | `--neg` / `--negBg` |
| DO CADASTRO | Vem da estrutura PAF da organização | `--info` | `--info` / `--infoBg` |
| SESSÃO | Usuário da sessão, travado | `--ink3` | `--line` / `--surf2` |
| REVISADO | Editado pelo usuário | `--ink` | `--ink3` / `--surf` |

Ao editar qualquer campo, a etiqueta passa a REVISADO.

---

## Regras de negócio

### Centro de custo

Vem do cadastro da estrutura PAF, não do documento. Cada subcategoria tem um centro geral e, opcionalmente, um específico por planta. O evento herda o da sua planta; sem específico, usa o geral. Trocar a planta troca o centro. Editar manualmente marca como REVISADO e vale só para aquele evento — **não conta como pendência nem entra na proposta de regra organizacional**, já que não é decisão da IA.

### Conversão de moeda no evento

Quando o documento vem em moeda diferente da organização, a IA converte pela taxa do dia do evento e a tela exibe um bloco com três números lado a lado: **valor no documento · taxa aplicada · valor contabilizado**. A taxa é editável antes de aprovar. Os campos de custo mostram o código da moeda de origem no rótulo; o total é sempre na moeda da organização. Taxa e valor original ficam registrados no evento e na trilha de auditoria.

### Aprovação

Bloqueada enquanto houver campo obrigatório vazio (tipicamente o centro de custo). Nenhum caminho de entrada dispensa aprovação humana — evento criado por API ou MCP entra como rascunho analisado e espera uma pessoa, igual a um upload manual.

### Permissões

Por papel e por planta. Analista registra e corrige mas não aprova; pode propor que uma correção vire regra da subcategoria, e a proposta vai para um aprovador. Um analista de uma planta não enxerga custo de outra, salvo escopo consolidado.

---

## Internacionalização

Três idiomas: **pt-BR, en, es**. A preferência é gravada em `localStorage` sob a chave `qcost-lang-v2` e lida por todas as telas — trocar o idioma na landing mantém a escolha no login, no onboarding e no app. O tema segue o mesmo padrão sob `qcost-theme-v2`.

Cada tela tem um objeto `DICT` com as três traduções completas. Porte esses objetos para o sistema de i18n do codebase.

**Regras que valem em qualquer idioma:**

- Rótulos dimensionados por conteúdo, nunca por largura fixa. Botões e badges crescem no eixo horizontal e truncam com reticências, nunca quebram altura. Prever 30–40% de expansão de pt-BR e es sobre o inglês.
- **Moeda, número, data e separadores vêm do locale**, via `Intl.NumberFormat` e `Intl.DateTimeFormat`. Nunca concatene `dd/mm/yyyy` à mão — em inglês "19/09/2026" lê como mês 19.
- **Valores editados são guardados como número**, junto com o texto cru e o locale em que foram digitados. Enquanto o idioma não muda, mostra-se o texto digitado; ao trocar, reformata a partir do número. Guardar a string formatada e reparsá-la com os separadores do locale corrente destrói o valor (`"100.000"` em pt-BR vira 100 em en-US).
- Acentuação latina completa.

---

## Estado e persistência

| Chave | Conteúdo |
| --- | --- |
| `qcost-lang-v2` | `"pt-BR"` \| `"en"` \| `"es"` |
| `qcost-theme-v2` | `"light"` \| `"dark"` |

Estado local por tela (fase do fluxo, campos editados, filtros, acordeões) é efêmero no protótipo; no produto real virá do backend.

---

## Acessibilidade

- Contraste mínimo 4.5:1 para texto; 3:1 apenas em escala de título.
- Cor **nunca** é o único indicador de estado — sempre acompanhada de rótulo textual e, quando cabe, de marcador.
- Foco de teclado visível em todos os controles: `outline: 1px solid var(--sig); outline-offset: 3px`.
- `aria-label` em todo botão apenas com ícone (alternar tema, menu da conta, remover, filtros).
- Alvos de toque nunca abaixo de 34px de altura.

---

## Assets

Nenhuma imagem binária. Todos os gráficos, diagramas, ícones e a marca são **SVG inline** dentro dos arquivos HTML, desenhados com `stroke` e `currentColor` — herdam o tema automaticamente.

Os players de vídeo na landing, no onboarding e na central de ajuda são **placeholders**: moldura, botão de play, duração e descrição. O conteúdo em vídeo ainda será produzido.

Fontes carregadas do Google Fonts (Archivo e DM Mono).

---

## Arquivos

Todos em `design_files/`. Abra qualquer um diretamente no navegador.

| Arquivo | Tela |
| --- | --- |
| `Q-Cost AI Landing v2.dc.html` | Landing pública |
| `Q-Cost AI Login v2.dc.html` | Entrada |
| `Q-Cost AI Onboarding v2.dc.html` | Criação de conta (5 passos) |
| `Q-Cost AI Template PAF v2.dc.html` | Templates de estrutura PAF |
| `Q-Cost AI Editor PAF v2.dc.html` | Editor da estrutura PAF |
| `Q-Cost AI Dashboard v2.dc.html` | Painel |
| `Q-Cost AI Novo Evento v2.dc.html` | Registro manual de evento |
| `Q-Cost AI Revisar Evento v2.dc.html` | Ação sobre evento da fila |
| `Q-Cost AI Custos v2.dc.html` | Apuração navegável |
| `Q-Cost AI Regras de Alerta v2.dc.html` | Alertas |
| `Q-Cost AI Auditoria v2.dc.html` | Trilha de auditoria |
| `Q-Cost AI Relatorios v2.dc.html` | Relatórios |
| `Q-Cost AI Integracoes v2.dc.html` | API, MCP e registro de invocações |
| `Q-Cost AI Equipe v2.dc.html` | Equipe e permissões |
| `Q-Cost AI Perfil v2.dc.html` | Perfil do usuário |
| `Q-Cost AI Organizacao v2.dc.html` | Organização, plantas e moeda |
| `Q-Cost AI Assinatura v2.dc.html` | Assinatura e faturas |
| `Q-Cost AI Cancelamento v2.dc.html` | Fluxo de cancelamento |
| `Q-Cost AI Ajuda v2.dc.html` | Central de ajuda |
| `Q-Cost AI Confianca v2.dc.html` | Central de confiança |
| `Q-Cost AI Politicas v2.dc.html` | Privacidade, termos e DPA |
| `Q-Cost AI Status v2.dc.html` | Status da plataforma |
| `Q-Cost AI Design System v2.dc.html` | Sistema visual ao vivo |
| `Q-Cost AI Fundacoes v2.dc.html` | Princípios e regras de cor |
| `support.js` | Runtime do protótipo — **não portar** |

---

## Ordem sugerida de implementação

1. **Tokens e tipografia** — antes de qualquer tela. Sem isso nada mais bate.
2. **Chrome compartilhado** — header, barra de abas, menu do usuário, seletor de idioma e tema.
3. **Dashboard e Custos** — validam a faixa de KPIs, a grade de bordas compartilhadas e a tabela densa.
4. **Editor PAF** — é pré-requisito de dados para as telas de evento (centro de custo, subcategorias).
5. **Novo Evento e Revisar Evento** — o núcleo do produto e as telas mais complexas. Implemente as três faixas antes de refinar detalhe.
6. **Onboarding e Landing** — dependem do sistema pronto.
7. **Demais telas** de apoio.


## Agrupamento de ocorrências (envio → contabilização → ocorrência)

Três níveis, com nomes fixos na interface:

- **Envio** — o que entra: documento(s), orientação em texto e a execução da IA. Tem origem (upload, API, MCP, regra), autor e momento. Não é aprovável.
- **Evento (contabilização)** — a unidade de revisão, aprovação e lançamento, definida pela chave de agrupamento: competência · categoria PAF · subcategoria · planta · centro de custo · moeda · tipo de fornecedor · fornecedor · cliente. O total é a soma das ocorrências, nunca digitado.
- **Ocorrência** — cada registro lido no documento. Consultável, filtrável e corrigível; nunca aprovável isoladamente.

Um envio produz N contabilizações; uma contabilização agrupa N ocorrências; uma ocorrência pertence a exatamente uma contabilização ou à triagem. A soma agrupadas + triagem = lidas é exibida e verificável em tela.

### Onde cada nível aparece

| Tela | Papel |
| --- | --- |
| Novo Evento | Resumo de consolidação ao fim da análise: ocorrências lidas, contabilizações geradas, ocorrências em triagem e as revisões evitadas. Lista as contabilizações resultantes e o bloco de triagem agrupado por motivo. |
| Revisar Evento | Composição do total por componente de custo e a tabela de ocorrências com busca, ordenação, paginação e seleção. Editar uma dimensão da chave na contabilização inteira move — e funde, quando já existe irmã com a mesma chave no envio; editar em parte das ocorrências divide. Os dois efeitos são mostrados antes de confirmar, com contagem e valor. A exclusão manda as ocorrências à triagem do envio de origem, com motivo. |

Motivo de fila (Aprovação, Incompletos, Alertas) e progresso de processamento (as quatro etapas da IA) não são estados e não usam forma de badge de status.

---

## Última sincronização — 23/09/2026

Registro completo das decisões em `CHANGELOG.md`.

### Sincronização anterior — 22/09/2026

- Tela **Eventos** (fila de envios) eliminada; a aba Eventos abre `Novo Evento`. Alertas saíram da fila do Painel e vivem só na aba Alertas.
- **Novo Evento** e **Revisar Evento** compartilham a mesma experiência: ordem das seções, nomes ("Envio", "Contabilização do evento", "Dados do evento"), tabela de três colunas na contabilização, campo Documento, centro de custo somente leitura vindo do cadastro PAF, bloco âmbar de esclarecimento e barra "Aprovar e contabilizar / Rejeitar evento".
- **Central de Confiança** reestruturada em resumo executivo + ficha técnica de doze domínios com as colunas pergunta · o que fazemos · como se comprova e quatro rótulos de estágio.
- **Landing**: aba "Segurança" no lugar de "Estrutura PAF", seção "Seus dados", seção PAF movida para depois de "Para quem é", e o bloco "O tamanho do problema" incorporado ao topo.
