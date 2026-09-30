# Ausculta — Design System

Ausculta é "o residente clínico que ouve, documenta e desaparece": um assistente de documentação para consultas veterinárias. Ele transcreve a consulta, gera um rascunho SOAP com evidências vinculadas e sincroniza o prontuário no Long Life Pet depois que o veterinário aprova. "Ausculta" é um codinome; a busca formal de marca e domínio ainda não foi feita.

**Fonte:** `uploads/ausculta-design-system.md`. Ela parte da paleta do Discovery e do Pitch Estratégico (`#1F5C73` teal, `#A8611C` âmbar, `#1B2420` tinta, neutros `#F1EFEA`/`#FBF0E2`) e da especificação de telas do PRD de Design (`prd-design-ausculta.md`, não anexado aqui).

**Superfícies do produto (segundo o PRD):**
- Tela 0: landing pública com 3 portas
- 0b: Conta standalone
- Consentimento
- Active Scribe (gravação)
- SOAP Review, com Linked Evidence e alerta de dose

## Estado atual
Fundação completa (cor, tipografia, espaço, raio, sombra, voz, ícones). O primeiro protótipo (hoje `Ausculta Conta.dc.html`) já existe e os **padrões abaixo foram extraídos dele** — ainda como receitas de markup, não como biblioteca React.

## Padrões extraídos do protótipo
Ver `guidelines/patterns.html`.
- **Botão primário** — `brand` / `on-brand`, altura mínima 48px (56px para a ação principal da tela), `radius-lg`, type `button`. Hover: `brand-strong`. Desabilitado: opacidade .45.
- **Botão de aprovação** — `success`, altura 64px, ícone circle-check + "Aprovar e Sincronizar Prontuário". Único uso de `success` como preenchimento. Bloqueado enquanto houver alerta de dose pendente.
- **Botão secundário** — contorno 2px `border-strong` (ou `brand`), fundo `surface-000`.
- **Badge de origem** — "via Long Life Pet" / "via [PIMS]": `brand-subtle` + `brand-strong`, `radius-full`, type caption. Ausente no modo standalone.
- **Badge de rede** — pílula 48px, borda 2px: Offline Mode (âmbar), Sincronizando (brand), Sincronizado (success). Sempre ícone + palavra.
- **FAB de gravação** — 88px, `radius-full`. Repouso: `surface-000` + borda `border-strong` + ícone mic em `danger`. Gravando: `danger` + `shadow-fab` + dois anéis pulsantes (1.4s ease-out).
- **Cartão SOAP** — `surface-000`, borda `border`, `radius-md`, `shadow-card`, padding `space-4`; letra S/O/A/P em mono `brand` antes do título h3; botão de editar 48px.
- **Frase com evidência (Linked Evidence)** — sublinhado pontilhado `border-strong`, offset 5px; hover `brand` + fundo `brand-subtle`; ativa: fundo `accent-warm-subtle`, e o trecho aparece em âmbar na barra do player.
- **Chip de alerta de dose** — `accent-warm-subtle`, borda 2px `accent-warm`, ícone triangle-alert, dados em mono; ações Aceitar (contorno) / Ajustar (preenchido `accent-warm`). Resolvido vira faixa `brand-subtle` com "Rever".
- **Disclosure de IA** — faixa `accent-warm-subtle` + borda 1px `accent-warm`, `radius-sm`, ícone sparkles.
- **Confirmação de sincronização** — `success-subtle` + borda 2px `success`, mensagem dependente do modo.
- **Card de entrada da landing** — `surface-000` + `shadow-card`, `radius-lg`; o card em destaque usa `accent-warm-subtle` + borda `accent-warm`, sem sombra.
- **Opção de rádio grande** — linha 64px, borda 2px; selecionada: `brand` + `brand-subtle`.

### Navegação, filtros e ações
Ver `guidelines/patterns-navigation.html`. Cada nível tem uma forma própria; uma forma nunca serve a dois papéis.
1. **Abas de seção** (trocam o conteúdo da tela) — sem borda nem fundo; ícone 22px sobre rótulo curto 12/16 peso 600; ativa em `brand-strong` com traço de 3px `brand` na base; contador como badge mono no ícone. Máximo 5 abas em colunas iguais, sem rolagem horizontal. Se passar de 5, agrupe (ex.: "Dados" reúne Paciente e Responsável).
2. **Alternador de visão** (2–3 visões do mesmo conteúdo) — trilho `border` com padding 4px, `radius-lg`; opção ativa `surface-000` + sombra leve, inativa `ink-muted`. Opções de largura igual, 44px.
3. **Filtros** (refinam uma lista) — pílula 36px, borda 1px, type 14/20 peso 500; ativo `brand-subtle` + borda `brand` + ícone check. Quebram linha; nunca rolam na horizontal.
4. **Seleção em formulário** — pílula 48px com marcador de rádio (ou checkbox). Nunca navega.
5. **Ações** — botões retangulares `radius-lg` com verbo no rótulo; nunca em pílula. Voltar é sempre a seta no topo com o nome do destino, nunca um botão "Voltar" no corpo da tela.

## Decisões tomadas no protótipo
- O PRD cita "⚠" e "Sincronizando…"; o sistema proíbe emoji e reticências de processamento — usamos o ícone triangle-alert e "Sincronizando" com ícone.
- A landing não usa gradiente (o PRD permite "sutis"); o contraste vem das superfícies brand/âmbar.
- Hero usa `clamp(40px, 6vw, 56px)` para caber em mobile; 56/60 no desktop.

## Conteúdo
- Texto sempre em português do Brasil, de colega para colega. O leitor é um profissional; nada de tom fofo de pet-tech B2C.
- Verbos diretos e voz ativa. Um botão diz o que vai acontecer ("Aprovar e Sincronizar Prontuário", nunca "Concluir"). Uma confirmação diz o que já aconteceu ("Prontuário atualizado no Long Life Pet").
- Use os nomes que o veterinário conhece: prontuário, consulta, SOAP. Nunca os nomes internos do sistema: registro, payload, sessão.
- **Disclosure obrigatório** em toda tela de revisão: "Rascunho gerado por IA — revise antes de aprovar. A IA não diagnostica nem prescreve."
- Nada de reticências para simular processamento. Nada de linguagem que sugira que a IA decidiu algo sozinha.
- Sem emoji.

## Fundamentos visuais
- **Dois contextos.**
  - Landing: expressiva. Usa Fraunces display, `radius-lg` nos painéis e pode combinar `brand`, `accent-warm-subtle` e `brand-subtle`. É a única tela que usa `space-16`.
  - Telas clínicas: sóbrias e de alto contraste. Só Public Sans e IBM Plex Mono, `radius-md`/`radius-sm`, todo alvo de toque com no mínimo 48×48px (operação com luvas). Sem gradiente e sem peso decorativo.
- **Cor.** Temas claro e escuro (`[data-theme="dark"]`), com todos os pares checados por contraste WCAG 2.
  - `success` é exclusivo do fluxo de aprovação. Para "ativo" ou "selecionado", use `brand-subtle`.
  - `danger` serve para erro/atenção e também é o vermelho do FAB durante a gravação.
  - `accent-warm` tem contraste 4.16:1: serve para ícone e texto grande. Para corpo pequeno, use `accent-warm-text`.
- **Estado nunca é só cor.** Sempre ícone + palavra.
- **Bordas.**
  - `border` é decorativa e não carrega significado.
  - `border-strong` (≥3:1) é para foco e para o FAB em repouso.
- **Cartões.** `surface-000` + `shadow-card` + `radius-md`. `shadow-fab` aparece só durante a gravação ativa.
- **Hover/pressed.** `brand` → `brand-strong`. Foco: anel de 2px em `brand`.
- **Não definido na fonte:** animação, imagem/fotografia, texturas, blur. Não invente; defina a partir do primeiro protótipo.

## Tipografia
- **Fraunces** (display, só na landing)
  - hero 56/60, peso 600
  - title 32/38, peso 600
- **Public Sans** (interface)
  - h1 24/30 · h2 19/26 · h3 16/22, peso 700
  - body 16/24, peso 400; body-strong peso 600
  - small 13/18
  - caption 12/16, peso 500, tracking 0.02em
  - button 16/20, peso 600, tracking 0.01em
- **IBM Plex Mono** (dados)
  - data-md 16/22, peso 500
  - data-sm 13/18, peso 500

As fontes vêm do Google Fonts por `@import` (`tokens/fonts.css`).

## Iconografia
Lucide (CDN), traço de 2px, sem preenchimento ou duotone. Emoji nunca é ícone funcional. Não existe logotipo: o nome "Ausculta" é sempre composto em Fraunces (display.hero/title), nunca redesenhado como símbolo.

## Marca e logotipo
Criado a pedido do usuário (rodada 1, `Ausculta Logo.dc.html`). Recomendado: **Diafragma** — o diafragma do estetoscópio visto de frente, com uma onda de voz em âmbar dentro dele. Alternativas: **A de pulso** e **Eco**.
- Arquivos: `assets/logo/ausculta-mark-diafragma.svg` (teal + âmbar), `-reverse.svg` (branco + âmbar escuro, para fundo `brand`), `ausculta-mark-a-pulso.svg`, `ausculta-mark-eco.svg`.
- Wordmark: "Ausculta" em Fraunces 600, tracking -0.01em, ao lado do símbolo (símbolo ≈ 1,2× a altura das maiúsculas).
- Ícone de app: símbolo reverso sobre `brand`, cantos de 22/88.
- Tamanho mínimo do símbolo: 20px. Não redesenhar, não aplicar gradiente, não trocar as cores.
- Nome ainda sujeito à busca formal de marca (INPI/USPTO/WIPO).

## Índice
- `styles.css`: ponto de entrada, só `@import`s
- `tokens/`
  - `colors.css`: claro/escuro + aliases semânticos
  - `typography.css`
  - `spacing.css`: espaço, raio, sombra
  - `fonts.css`
  - `base.css`: fundo, links, foco
- `guidelines/`: cards de espécime (Colors, Type, Spacing, Brand, Patterns)
- `Ausculta Conta.dc.html`: criação de conta (plano, conta, dados do plano) e login
- `assets/logo/`: símbolos SVG
- `Ausculta Landing v2.dc.html`: landing pública
- `Ausculta Logo.dc.html`: exploração de logo
- `SKILL.md`
