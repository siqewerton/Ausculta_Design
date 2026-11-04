# Design System — Ausculta

> Versão em Markdown do Design System do Ausculta, para colar no Claude Design **antes** do `prd-design-ausculta.md` ao criar o projeto novo. Use os tokens abaixo como fonte única de cor, tipografia, espaçamento, raio e sombra — não invente paleta.

## Do que este sistema parte

Construído a partir das fontes reais já produzidas neste engagement: a paleta cromática já em uso no Discovery e no Pitch Estratégico do Ausculta (`#1F5C73` teal, `#A8611C` âmbar, `#1B2420` tinta, mais os neutros `#F1EFEA`/`#FBF0E2`), e a especificação de telas do PRD de Design — landing pública de 3 portas (+ conta standalone), Consentimento, Active Scribe, SOAP Review com Linked Evidence e alerta de dose. Não há componentes prontos ainda (Botão, Badge, Card) — só fundação (cor, tipografia, espaçamento, raio, sombra). Quando o primeiro protótipo existir, os componentes devem ser extraídos dele, não inventados.

## Fundamentos de conteúdo

Ausculta é "o residente clínico que ouve, documenta e desaparece" — a tecnologia nunca deve competir por atenção com o paciente ou o tutor. Escreva sempre em português do Brasil, no registro de colega para colega: fale com o veterinário como um profissional, nunca em tom fofo de pet-tech B2C. Use verbos diretos e voz ativa: um botão diz exatamente o que vai acontecer ("Aprovar e Sincronizar Prontuário", nunca "Concluir"), e uma confirmação diz o que já aconteceu ("Prontuário atualizado no Long Life Pet"). Nomeie as coisas como o veterinário as reconhece — "prontuário", "consulta", "SOAP" — nunca como o sistema as implementa ("registro", "payload", "sessão"). O disclosure de IA é conteúdo obrigatório: toda tela de revisão carrega "Rascunho gerado por IA — revise antes de aprovar. A IA não diagnostica nem prescreve." Nunca use reticências para simular processamento nem linguagem que sugira que a IA decidiu algo sozinha.

## Dois contextos, duas texturas

- **Landing pública** (Tela 0) — expressiva: usa `display.hero`/`display.title` (Fraunces), `radius-lg` nos painéis, pode combinar `brand`, `accent-warm-subtle` e `brand-subtle` lado a lado. Única tela onde `space-16` aparece.
- **Telas clínicas** (0b Conta, Consentimento, Active Scribe, SOAP Review) — sóbrias e de alto contraste, operáveis com luvas: só `sans` (Public Sans) e `mono` (IBM Plex Mono) para dados, `radius-md`/`radius-sm`, todo alvo de toque em `space-12` (48×48px) no mínimo. Nunca gradiente ou peso decorativo aqui — legibilidade a pleno sol e operação com luvas vêm antes da estética.

## Cor

Dois temas: **Light** e **Dark**. Todos os pares abaixo foram checados por cálculo de contraste (WCAG 2) — não estimativa.

| Token | Light | Dark | Uso |
|---|---|---|---|
| `surface-100` | `#F1EFEA` | `#141B1C` | Fundo de página em telas clínicas e na landing. |
| `surface-000` | `#FFFFFF` | `#1D2624` | Fundo de cartões elevados (os 4 cartões SOAP, player de áudio, cards da landing). Usar sempre com `shadow-card`. |
| `ink` | `#1B2420` | `#F2EFE9` | Texto principal. Contraste ≥13.8:1 nos dois temas. |
| `ink-muted` | `#5C6660` | `#A9B0AC` | Texto secundário — legendas, "Transcrição rodando localmente no dispositivo". |
| `border` | `#D9D4C9` | `#33403D` | Divisórias decorativas. Não carrega significado — não usar sozinha para indicar estado/erro. |
| `border-strong` | `#8C8377` | `#6C7A76` | Borda que precisa ser percebida — campo em foco, contorno do FAB em repouso (≥3:1). |
| `brand` | `#1F5C73` | `#5FA8BE` | Cor primária — CTAs de navegação, links, ícone ativo. |
| `brand-strong` | `#15414F` | `#7EC0D3` | Hover/pressed de qualquer elemento em `brand`. |
| `on-brand` | `#FFFFFF` | `#0E1F24` | Texto/ícone sobre um preenchimento em `brand`. |
| `brand-subtle` | `#E4EEF1` | `#132428` | Fundo com leve tingimento de marca — badge "Sincronizado", estado selecionado. |
| `accent-warm` | `#A8611C` | `#D68A4A` | Ícones, bordas e texto grande/negrito em âmbar — badge "Offline Mode", ícone do alerta de dose. Contraste 4.16:1 em light: suficiente para ícone/texto grande, **insuficiente para corpo pequeno** — usar `accent-warm-text`. |
| `accent-warm-text` | `#8B4E14` | `#D68A4A` | Variante segura de `accent-warm` para texto corrido pequeno (<19px). |
| `on-accent-warm` | `#FFFFFF` | `#0E1F24` | Texto/ícone sobre um preenchimento em `accent-warm` — botão "Ajustar" do chip de dose. |
| `accent-warm-subtle` | `#FBF0E2` | `#2A2118` | Fundo do chip de alerta de dose e do card de entrada em destaque da landing. |
| `success` | `#1E7A46` | `#4FA873` | Botão "Aprovar e Sincronizar Prontuário", badge "Sincronizado". Exclusivo do fluxo de aprovação — não reaproveitar para "ativo"/"selecionado" (usar `brand-subtle`). |
| `on-success` | `#FFFFFF` | `#0E1F24` | Texto/ícone sobre um preenchimento em `success`. |
| `success-subtle` | `#E4F0E7` | `#122A1D` | Fundo de confirmação leve — toast após sincronizar. |
| `danger` | `#B23A2E` | `#E08476` | Atenção/erro **e** o vermelho do FAB de gravação ativa. Sempre acompanhado de ícone/palavra, nunca só a cor. |
| `on-danger` | `#FFFFFF` | `#0E1F24` | Texto/ícone sobre um preenchimento em `danger`. |
| `danger-subtle` | `#F5E2DF` | `#2E1714` | Fundo de aviso leve — contorno de um cartão SOAP com conflito de merge CRDT pendente de revisão humana. |

Regra: `success` e `danger` nunca são só "verde e vermelho" — `success` puxa para o teal, `danger` é um tijolo alaranjado, e ambos sempre vêm com ícone/palavra, nunca só a cor.

## Tipografia

Três famílias intencionais, cada uma com um papel fixo — nunca misturar fora do seu contexto (todas disponíveis no Google Fonts):

- **Display** — `"Fraunces", Georgia, "Times New Roman", serif`. Só na landing.
  - `hero` — 56px/60px, peso 600 — headline única do topo (ex.: "O residente clínico que ouve, documenta e desaparece").
  - `title` — 32px/38px, peso 600 — títulos de seção da landing.
- **Sans** (interface) — `"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
  - `h1` — 24px/30px, peso 700 — título de tela clínica.
  - `h2` — 19px/26px, peso 700 — subseção dentro de uma tela.
  - `h3` — 16px/22px, peso 700 — título de cartão (rótulo SOAP: Subjetivo/Objetivo/Avaliação/Plano).
  - `body` — 16px/24px, peso 400 — texto corrido, texto SOAP.
  - `body-strong` — 16px/24px, peso 600 — ênfase (nome do paciente, termo clínico).
  - `small` — 13px/18px, peso 400 — texto secundário.
  - `caption` — 12px/16px, peso 500, letter-spacing 0.02em — eyebrow, tag "via Long Life Pet".
  - `button` — 16px/20px, peso 600, letter-spacing 0.01em — sempre dentro de um alvo de toque `space-12`.
- **Mono** (dados) — `"IBM Plex Mono", "SFMono-Regular", Consolas, monospace`.
  - `data-md` — 16px/22px, peso 500 — dose sugerida, peso do paciente (números tabulares).
  - `data-sm` — 13px/18px, peso 500 — timecode do waveform, timestamp de sincronização.

## Espaçamento

`space-1` 4px · `space-2` 8px · `space-3` 12px (padding de chip/badge) · `space-4` 16px (padding de cartão; gutter mobile) · `space-6` 24px (entre os 4 cartões SOAP) · `space-8` 32px (entre seções) · **`space-12` 48px — piso mínimo de qualquer alvo de toque operável com luva** · `space-16` 64px (respiro da landing; nunca nas telas clínicas densas).

## Raio

`radius-sm` 6px (chips, badges) · `radius-md` 12px (cartões — equivalente ao `rounded-xl` do Tailwind) · `radius-lg` 20px (painéis grandes da landing, botão primário) · `radius-full` 9999px (FAB de gravação, badges arredondados).

## Sombra

- `shadow-card` — `0 1px 2px rgba(27,36,32,.05), 0 6px 16px rgba(27,36,32,.08)` (light) / `0 1px 2px rgba(0,0,0,.4), 0 6px 16px rgba(0,0,0,.35)` (dark) — elevação dos cartões SOAP e painéis.
- `shadow-fab` — `0 8px 24px rgba(178,58,46,.35)` (light) / `0 8px 24px rgba(224,132,118,.3)` (dark) — glow do FAB durante gravação ativa.

## Iconografia

Lucide, traço de 2px, sem preenchimento/duotone, nunca emoji como ícone funcional. Todo estado semântico (sucesso, atenção, gravando) é ícone + palavra, nunca só a cor.

## Marca e logotipo

Não há logotipo desenhado. Até que exista um, o nome "Ausculta" é sempre composto em `display.hero`/`display.title`, nunca reconstruído como símbolo. "Ausculta" é codinome de trabalho — busca formal de marca/domínio ainda pendente.

## Tokens prontos para uso (CSS)

```css
:root {
  --surface-100:#F1EFEA; --surface-000:#FFFFFF; --ink:#1B2420; --ink-muted:#5C6660;
  --border:#D9D4C9; --border-strong:#8C8377;
  --brand:#1F5C73; --brand-strong:#15414F; --on-brand:#FFFFFF; --brand-subtle:#E4EEF1;
  --accent-warm:#A8611C; --accent-warm-text:#8B4E14; --on-accent-warm:#FFFFFF; --accent-warm-subtle:#FBF0E2;
  --success:#1E7A46; --on-success:#FFFFFF; --success-subtle:#E4F0E7;
  --danger:#B23A2E; --on-danger:#FFFFFF; --danger-subtle:#F5E2DF;
  --font-display:"Fraunces", Georgia, "Times New Roman", serif;
  --font-sans:"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono:"IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px; --space-6:24px;
  --space-8:32px; --space-12:48px; --space-16:64px;
  --radius-sm:6px; --radius-md:12px; --radius-lg:20px; --radius-full:9999px;
  --shadow-card:0 1px 2px rgba(27,36,32,.05), 0 6px 16px rgba(27,36,32,.08);
  --shadow-fab:0 8px 24px rgba(178,58,46,.35);
}
[data-theme="dark"] {
  --surface-100:#141B1C; --surface-000:#1D2624; --ink:#F2EFE9; --ink-muted:#A9B0AC;
  --border:#33403D; --border-strong:#6C7A76;
  --brand:#5FA8BE; --brand-strong:#7EC0D3; --on-brand:#0E1F24; --brand-subtle:#132428;
  --accent-warm:#D68A4A; --accent-warm-text:#D68A4A; --on-accent-warm:#0E1F24; --accent-warm-subtle:#2A2118;
  --success:#4FA873; --on-success:#0E1F24; --success-subtle:#122A1D;
  --danger:#E08476; --on-danger:#0E1F24; --danger-subtle:#2E1714;
  --shadow-card:0 1px 2px rgba(0,0,0,.4), 0 6px 16px rgba(0,0,0,.35);
  --shadow-fab:0 8px 24px rgba(224,132,118,.3);
}
```
