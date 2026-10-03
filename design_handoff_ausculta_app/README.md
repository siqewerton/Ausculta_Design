# Handoff: Ausculta: AI Scribe para veterinários (app + landing + conta)

> **Versão de 03/10/2026.** As seções "Atualização…" no fim do documento descrevem as mudanças mais recentes e valem sobre o texto anterior quando houver divergência. Ordem de leitura: `padrao-de-design.md` → este README (visão geral e telas) → seções de atualização, da mais antiga para a mais recente.

## Visão geral
O Ausculta grava a consulta veterinária (com consentimento), transcreve (na nuvem com internet, ou no próprio aparelho sem internet ou quando a clínica escolhe) e gera um rascunho de prontuário **SOAP**, que o médico veterinário revisa, ajusta e aprova. Ele pode funcionar sozinho ou integrado ao PIMS da clínica (ex.: Long Life Pet). O pacote cobre três peças:
- **Landing** (`index.html`): marketing, com escolha de entrada (Long Life Pet, outro PIMS, sem PIMS).
- **Conta** (`Ausculta Conta.dc.html`): criação de conta e login.
- **App** (`Ausculta App.dc.html`): o produto (atendimento, pacientes, conta, ajuda, confiança).

Idiomas: PT (padrão), EN e ES. Temas: claro e escuro.

## Sobre os arquivos de design
Os arquivos deste pacote são **referências de design feitas em HTML**, protótipos que mostram a aparência e o comportamento esperados. **Não são código de produção para copiar.** A tarefa é **recriar essas telas no ambiente do codebase de destino** (React Native, Flutter, SwiftUI, React etc.), com os padrões e bibliotecas já estabelecidos nele. Se ainda não houver ambiente, escolha o framework mais adequado; a prioridade é mobile-first (celular), com suporte a tablet e desktop.

Para abrir: `Ausculta App.html` é a versão autocontida e offline (abre direto no navegador). Os `.dc.html` são as fontes e precisam ser servidos por HTTP, junto com `support.js`, `i18n.js`, `legal-docs.js`, `splash.js`, `styles.css` e `tokens/`. Nos `.dc.html` os estilos ficam inline em cada elemento; a lógica de cada tela está na classe `Component`, no fim do arquivo.

## Fidelidade
**Alta fidelidade (hi-fi).** Cores, tipografia, espaçamentos, estados e textos são finais. Recrie pixel a pixel, usando os tokens abaixo.

## Princípios que guiaram o design
1. **Mínimo de toques no fluxo principal.** O veterinário está atendendo e usa pouco o dispositivo. Exemplos: o consentimento já inicia a gravação (1 toque), e o botão principal da gravação cabe na tela sem rolar.
2. **Alvos de toque ≥ 48px** (`--touch-min`), com ações primárias de 56px.
3. **Voltar padronizado:** só a seta "←" no topo esquerdo, com rótulo acessível "Voltar para X".
4. **Menus ≠ ações.** Itens de menu são linhas de lista (ícone + texto + chevron) e ações são botões (preenchido, contorno ou texto). Nunca um grid de "botões" para navegar, e nada de scroll horizontal.
5. **Espaçamento só pela escala de tokens** (4/8/12/16/24/32/48/64). Não existe `--space-5`.
6. **Contraste WCAG AA** em todos os pares de cor (ver tokens).

## Telas

### Estrutura comum do app
- **Header fixo** (sticky), com fundo `--surface-100`, borda inferior de 1px `--border`, altura mínima de 64px e padding de 8px/16px. Conteúdo com max-width de 960px, centralizado.
  - **Na raiz (Painel):** logo Ausculta (marca de 30px + wordmark Fraunces 600 22px) e avatar de 48px à direita (borda de 2px `--brand`, fundo `--brand-subtle`, iniciais em 700 16px). O avatar abre o menu da conta.
  - **Em telas internas:** botão voltar de 48×48, só com o ícone `arrow-left` de 22px, cor `--ink`, hover `--brand-subtle`, raio full.
  - **Título compacto na rolagem:** quando o `h1` da página sai por cima da tela (bottom < 72px), o título aparece no header ao lado da seta (600 17px/22px, ellipsis), com fade e translateY de 6px→0 em 180ms. Com a página no topo, o header mostra só a seta.
  - **Telas do atendimento** (Consentimento, Gravação, Processando, Revisão): ao lado da seta vai a **identidade do paciente**. Círculo de 40px com a inicial (fundo `--brand-subtle`, texto `--brand-strong`, Fraunces 600 17px), nome em Fraunces 600 18px/22px e linha "espécie · idade · peso" em 13px/18px `--ink-muted`.
- **Título de página (h1):** Public Sans 700 24px/30px, com parágrafo de apoio em `--ink-muted` e gap de 8px.
- **Largura do conteúdo:** 560px nos fluxos (atendimento, paciente, responsável, cancelamento), maior nas telas de configuração.
- **Cartão padrão:** fundo `--surface-000`, raio de 12px (`--radius-md`), `--shadow-card`, padding de 16px.

### 1. Painel
Saudação (h1) com a data acima, o CTA principal "Nova consulta" e a lista de consultas recentes e pendências de sincronização.

### 2. Selecionar paciente → 3. Cadastro rápido
Busca de paciente. Se não achar, o cadastro rápido pede nome, espécie e responsável.
- **Espécie "Outra":** abre um campo para digitar qual é a espécie. O novo valor entra na tabela de espécies da conta e passa a aparecer como opção nos próximos cadastros. Isso vale também no cadastro completo do paciente.

### 4. Consentimento
Duas opções grandes que **já são a ação** (sem botão "confirmar"):
- **"Responsável autorizou"** (primária, fundo `--brand`): "Autorização verbal ou assinada · começa a gravar".
- **"Clínica autorizou"** (secundária, fundo branco, borda `--border-strong`).

Cada opção tem ícone `mic` num círculo de 44px, título 600 17px/22px e subtítulo 13px. Um toque registra o consentimento na trilha de auditoria (usuário, data e hora, LGPD) e inicia a gravação.

### 5. Gravação (tela crítica)
É onde o sistema fica enquanto o médico atende. **A tela inteira precisa caber no viewport sem rolar**, e o botão "Encerrar consulta e gerar SOAP" fica sempre visível.
- **Layout:** coluna com gap de 12px, com altura calculada = altura visível do viewport − topo do container − 24px. Use `visualViewport` e recalcule no resize e sempre que o conteúdo mudar. O **cartão central** usa `flex: 1 1 0` com `min-height: min-content`, então absorve o espaço livre e encolhe até o conteúdo. Os demais blocos têm altura natural. Em telas muito curtas, cai para a altura do conteúdo.
- **Ordem dos blocos:**
  1. **Linha de status:** à esquerda, a pílula de rede (Offline / Sincronizando / Online), com altura de 48px, raio full e borda de 2px. À direita, o relógio em IBM Plex Mono 500 16px com números tabulares.
  2. **Cartão central**, que muda de acordo com o estado:
     - **Gravando:** a onda ao vivo tem 36 barras de 4px, raio full, cor `--danger`, altura de 6–72px pelo RMS do microfone (via `AnalyserNode`, fftSize 512) e transição de height de 120ms. Abaixo, "Gravando a consulta" em 600 16px `--danger`.
     - **Pausado (revisão do áudio):** cabeçalho com um ponto de 8px `--accent-warm` e "Gravação pausada" (600 14px) à esquerda. À direita, "mm:ss / mm:ss" (posição/total) em mono 13px. Abaixo, a onda do áudio gravado: 48 barras, área de 48px, altura pelo pico real de cada trecho. O trecho já ouvido fica em `--brand` e o restante em `--border-strong`. **Tocar na onda faz seek.** Por último, os controles **centralizados**, com gap de 24px: voltar 10s (`rotate-ccw` com o número "10" sobreposto em 8px bold), play/pause (círculo `--brand` de 44px, ícone de 20px branco) e avançar 10s (`rotate-cw`).
  3. **Nota:** ícone `cpu` + "Transcrição rodando localmente no dispositivo" (13px `--ink-muted`). Se o microfone estiver bloqueado, na mesma linha: "· Microfone bloqueado, áudio simulado." e o link "Abrir em nova aba" (só aparece em iframe).
  4. **FAB de gravação**, com 88px e borda de 3px:
     - **Gravando:** fundo `--danger`, ícone de pausa branco, `--shadow-fab` e halo pulsante.
     - **Pausado:** fundo branco, borda `--border-strong` e ícone `mic` `--danger`.
  5. **"Encerrar consulta e gerar SOAP"**: largura total, 56px, borda de 2px `--brand`, fundo branco, texto `--brand` em 600 16px, raio de 20px. Hover com fundo `--brand-subtle`.
- **Áudio real:** MediaRecorder + getUserMedia com `echoCancellation` e `noiseSuppression`.
  - **Pausar:** `pause()` + `requestData()` gera o Blob do que foi gravado e o player fica disponível na hora.
  - **Ouvir:** a reprodução não retoma a gravação.
  - **Retomar:** para a reprodução e continua **o mesmo arquivo**.
  - **Sair da tela:** para as tracks e descarta o áudio.
  - **Relógio:** usa o relógio de parede (`performance.now()`), não contagem de ticks. O total da reprodução usa `audio.duration` quando é finito.
  - **Em produção:** manter o áudio só no dispositivo até o processamento ou a sincronização, criptografado em repouso.

### 6. Processando
Título dinâmico, barra de progresso e modo local (offline, mais lento) ou nuvem. Ao terminar, vai para a Revisão.

### 7. Revisão SOAP
Seções S/O/A/P com frases editáveis. Tocar numa frase toca o trecho de áudio correspondente (a barra do player destaca o segmento em `--accent-warm`). Sugestões de dose e alterações de dados aparecem como decisões com ações diretas (aceitar/ajustar). Também traz as instruções de alta e a aprovação, que assina e bloqueia o prontuário.

### 8. Aprovado
Ícone de check num círculo de 72px `--success-subtle`, mensagem de sincronização e horário de assinatura em mono.

### 9. Pacientes / Responsável / Prontuário do paciente
- **Pacientes:** lista com contador.
- **Prontuário:** cabeçalho com foto ou inicial de 64px, nome no h1 e linha de dados. Menu de opções no padrão de lista (sem abas roláveis). A lista de consultas mostra a data à esquerda, motivo e veterinário no centro, e **selos de status (Aprovado / Não sincronizado) abaixo do motivo, com quebra de linha**; chevron à direita. Não pode haver overflow horizontal em 320px.

### 10. Conta e configurações
Assinatura e faturas (cobrança por consulta documentada, não por dispositivo), Equipe e permissões, Dados da organização, Meu perfil e preferências (idioma, tema, número de registro do veterinário no formato de cada país), Integrações (PIMS ou IA), Cancelamento em 4 etapas (retenção → motivo → dados → confirmação).

### 11. Central de Ajuda e Treinamento
Hub em lista para 4 subtelas: **Chat** com o suporte, **Agendar treinamento ao vivo**, **Enviar e-mail** e **Sugerir melhoria**. Cada uma tem um estado de sucesso num cartão.

### 12. Central de Confiança
Documentos legais (textos em `legal-docs.js`) e "Reportar um problema de segurança" (SLA de 24h).

### Landing (`index.html`)
Header sticky e hero; seções Como funciona / Para quem / Integrações / Segurança; escolha de entrada por PIMS; demo interativa do SOAP.
- **Header no celular (≤ 960px):** logo, "Entrar", "Começar agora" (abaixo de 420px vira "Começar") e o botão de menu de 48px (`menu`/`x`, borda de 1px `--border`, raio de 20px).
- **Menu aberto:** os links aparecem empilhados abaixo, com linhas de 52px e texto 17px `--ink`, separados por uma borda superior. O seletor PT/EN/ES fica embaixo. Tocar num link fecha o menu.
- **Abaixo de 359px** o wordmark é ocultado.

### Conta (`Ausculta Conta.dc.html`)
Criação de conta e login (entrada `#login`).

## Interações e comportamento
- **Splash de carregamento** (`splash.js`): fundo `--surface-100` com a marca de 56px "respirando" (escala 1→1,06 em 1,6s) e uma barra indeterminada de 96×3px. Sai com fade de 220ms quando tema, fontes, tradução e a primeira renderização estão prontos; timeout de 4s. Respeita `prefers-reduced-motion`. Em produção, o equivalente é a splash nativa ou um skeleton.
- **i18n** (`i18n.js`): dicionário PT→EN/ES. O idioma fica salvo em `localStorage['ausculta-lang']`. Em produção, use a solução de i18n do codebase com as mesmas strings.
- **Rede:** a pílula alterna entre Offline, Sincronizando e Online. Quando fica online, o processamento local migra para a nuvem.
- **Toasts** para confirmações curtas.
- **Responsivo:** mobile-first, testado em 320px de largura e 540px de altura (iPhone SE).

## Estado (principais variáveis)
- **Navegação:** `screen`, `hist`, `pid` (paciente), `oid` (responsável), `tab`, subtelas (`helpView`, `trustView`, `cStep`).
- **Atendimento:** `consentBy`, `recording`, `elapsed` (segundos, relógio de parede), `net` (`offline`, `syncing` ou `online`), `proc` (`{ mode, pct, dur, size }`), `mic` (`on` ou `denied`), `pbPlaying`, `pbPos`.
- **Revisão:** `active` (frase/trecho), `dose`, `edits`, `trail` (auditoria), `approvedAt`.
- **Dados:** pacientes, responsáveis, tabela de espécies da conta, plano, tema e idioma.

## Tokens de design
**Cores (claro / escuro):**
- surface-100 `#F1EFEA` / `#141B1C`
- surface-000 `#FFFFFF` / `#1D2624`
- ink `#1B2420` / `#F2EFE9`
- ink-muted `#5C6660` / `#A9B0AC`
- border `#D9D4C9` / `#33403D`
- border-strong `#8C8377` / `#6C7A76`
- brand `#1F5C73` / `#5FA8BE`
- brand-strong `#15414F` / `#7EC0D3`
- on-brand `#FFFFFF` / `#0E1F24`
- brand-subtle `#E4EEF1` / `#132428`
- accent-warm `#A8611C` / `#D68A4A`
- accent-warm-text `#8B4E14` / `#D68A4A`
- accent-warm-subtle `#FBF0E2` / `#2A2118`
- success `#1E7A46` / `#4FA873`
- success-subtle `#E4F0E7` / `#122A1D`
- danger `#B23A2E` / `#E08476` (também usado como a cor de gravação)
- danger-subtle `#F5E2DF` / `#2E1714`

**Espaçamento:** 4, 8, 12, 16, 24, 32, 48, 64. Alvo de toque mínimo: 48.

**Raios:** sm 6, md 12, lg 20, full 9999.

**Sombras:**
- card: `0 1px 2px rgba(27,36,32,.05), 0 6px 16px rgba(27,36,32,.08)`
- fab: `0 8px 24px rgba(178,58,46,.35)`

**Tipografia:**
- **Famílias:**
  - Fraunces 600: display (landing, wordmark e identidade do paciente)
  - Public Sans 400–700: interface
  - IBM Plex Mono 500: dados, tempos e códigos
- **Escala:**
  - Hero 56/60 e Title 32/38 (só na landing)
  - H1 24/30 700, H2 19/26 700, H3 16/22 700
  - Body 16/24, Small 13/18, Caption 12/16 500 (tracking 0,02em)
  - Button 16/20 600 (tracking 0,01em)
  - Data 16/22 e 13/18

A fonte completa dos tokens está em `tokens/*.css`.

## Assets
- **Logo:** `assets/logo/` (marca "diafragma", a oficial, e variantes pulso/eco/reverse). O wordmark é "Ausculta" em Fraunces 600.
- **Ícones:** [Lucide](https://lucide.dev) v0.460.0 (`lucide-static`). Use o pacote Lucide da plataforma de destino. Ícones usados, entre outros: arrow-left, mic, pause, play, rotate-ccw, rotate-cw, cpu, wifi-off, check, chevron-right, menu, x, external-link, link, stethoscope, plug-zap, circle-arrow-down, chart-column.
- **Fotos:** não há imagens de terceiros; as fotos de paciente são enviadas pelo usuário.

## Arquivos
- `Ausculta App.html`: protótipo completo offline (abre direto no navegador).
- `Ausculta App.dc.html`: fonte do app, com todas as telas acima.
- `Ausculta Conta.dc.html`: criação de conta e login.
- `index.html`: landing.
- `i18n.js`: dicionário PT/EN/ES.
- `legal-docs.js`: textos legais da Central de Confiança.
- `splash.js`: tela de carregamento.
- `support.js`: runtime do protótipo (não faz parte do produto).
- `styles.css` e `tokens/`: tokens de cor, espaçamento, tipografia e fontes.
- `assets/logo/`: marcas.
- `padrao-de-design.md`: padrão de design obrigatório (cópia do `CLAUDE.md` do projeto).
- `Padrão de abas.dc.html` e `Padrão de listas longas.dc.html`: estudos que definiram o seletor de área (regra 10) e as listas longas (regra 12).
- `prd/`: PRDs de design aplicados nesta versão.


---

## Atualizações de 30/09/2026 (leia antes das seções acima)

Esta seção substitui o que divergir nas seções anteriores.

### Padrão de design obrigatório
A regra completa está em `CLAUDE.md`, e os cartões de referência em `guidelines/patterns-actions.html`, `patterns-chips.html` e `patterns-alerts.html`.

**Cores (um significado cada)**
- Azul: ação, navegação e dado vindo do áudio.
- Verde: confirmado pelo veterinário.
- Laranja: atenção, precisa de decisão.
- Vermelho: risco ao paciente ou perda de dados.
- Cinza: neutro ou pendente.

**Componentes**
- **Botões:** primário de 56px (64px na aprovação) e secundário com contorno de 2px e 48px.
- **Carimbo de ação:** pílula de 44px, borda de 2px e ícone de 14px. Nunca texto sublinhado como ação.
- **Chip de estado (4 estados):** pendente cinza tracejado, confirmado verde, vindo do áudio azul, obrigatório vermelho tracejado com cadeado.
- **Faixa de alerta:** no cabeçalho do paciente; vermelha para alergia, laranja para problema ativo e cadastro incompleto.
- **Linha de sistema:** sincronização, conexão e modo de processamento ficam numa linha discreta no topo da tela, com texto de 13px cinza e só o ícone colorido.
- **Selo de status:** 6px de raio.
- **Link:** só para navegar ou expandir.

### Revisão do SOAP
- **Objetivo, exame por sistemas:**
  - 10 sistemas em chips.
  - Os não mencionados aparecem em cinza; um toque registra "normal ao exame". O atalho "Examinei: marcar os demais como normais" marca todos de uma vez.
  - Na aprovação, o texto ganha "Sem alterações ao exame: …" e "Não mencionado: …".
  - Os sistemas já registrados ficam recolhidos.
- **Checklist por espécie:** vem do modelo de exame da espécie. A carência é obrigatória em ruminantes, suínos e aves e bloqueia a aprovação.
- **Plano, os 6 elementos da prescrição:** fármaco, dose, via, frequência, duração e indicação.
  - Mostra a dose total calculada.
  - O que falta vem com sugestões de um toque.
- **Avaliação, lista de problemas (POVMR):** chip do problema; ao aprovar, cria ou atualiza o problema.
- **Casos por espécie:** felino (hiporexia), equino (AAEP) e bovino (mastite e carência). Os caninos mantêm o alerta de dose.

### Gravação
- **Áudio real:** MediaRecorder; ao pausar, o trecho gravado pode ser ouvido e navegado (onda, ±10s).
- **Wake lock:** a tela fica ligada enquanto grava.
- **Detecção de interrupção:**
  - Cobre microfone encerrado ou mudo, falha do gravador e app em segundo plano.
  - A interrupção aparece num aviso vermelho e fica registrada na trilha de auditoria.
  - Requisito não funcional: "a gravação nunca perde áudio sem aviso".
- **Subjetivo captado (OLDCHARTS), com a gravação pausada:** grade 4×2 com os 8 itens; ✓ verde para captado e ✕ laranja para o que falta.
- **Altura:** a tela se ajusta à altura visível e o botão "Encerrar" nunca sai da tela (testado em 320×540).

### Paciente
- **Cabeçalho:** faixas de alergia, problema ativo (com "Marcar resolvido") e cadastro incompleto (lista o que falta; "Completar" abre a aba e foca o campo).
- **Resumo clínico:**
  - Desde a última consulta.
  - Linha do tempo de 12 meses, com consultas, problemas e medicamentos.
  - Evolução do peso, com faixa de ±5%.
  - Cobertura do exame: grade de sistemas × consultas, com a descoberta das lacunas.
- **Listas de pacientes e responsáveis:** em ordem alfabética.

### Conta
- **Configurações da conta** substitui "Dados da organização". Reúne o país de atuação, o nome da clínica (só nos planos Clínica e Hospital) e as espécies e modelos de exame.
- **Modelos de exame:** a plataforma define 7 modelos por família de espécie. O usuário só escolhe o modelo para espécies que ele mesmo cria. Espécie nunca usada pode ser apagada; espécie já usada é desativada.
- **Dados para a fatura** ficam em Assinatura e faturas:
  - Pessoa física ou jurídica.
  - Documento e CEP seguem o país de atuação.
  - Vêm preenchidos a partir da criação de conta.

### Landing
- **Seção "Você conhece o SOAP. O Ausculta escreve o seu."** (#soap):
  - quatro cartões S/O/A/P;
  - o Plano que vira ação;
  - "O que não está registrado, não foi feito";
  - os limites da IA;
  - campos por espécie (em breve).
- **Menu no celular:** hambúrguer.
- **Moldura do celular:** atualizada com a tela atual.
- **Glossário:** inclui POVMR, OLDCHARTS, DAMNIT-V, ECC, TPC, CMT, AAEP e CRMV.

### Infraestrutura do protótipo
- **Tela de carregamento** (`splash.js`): a página fica oculta até tema, fontes, tradução e montagem estarem prontos.
- **Traduções:** todas as strings em `i18n.js` (PT, EN e ES).

### Arquivos novos ou alterados
- `CLAUDE.md`
- `backlog-discovery-soap.md` (itens ainda não implementados)
- `guidelines/patterns-*.html`
- `readme.md` (design system)

---

## Atualizações de 01/10/2026 (leia antes das seções acima)

Esta seção substitui o que divergir nas seções anteriores.

### Gravação (tela 5)
- **Ordem vertical:** linha de sistema (selo de rede à esquerda, relógio mono à direita) → cartão branco das ondas (cresce para ocupar o espaço livre) → botão do microfone centralizado → "Encerrar consulta e gerar SOAP" em largura total.
- **Selo de rede** (aviso, não ação): pílula de 32px, borda de 1px, fundo *-subtle, ícone de 16px e texto 600 13px. Estados: "Modo offline" (`wifi-off`, laranja), "Sincronizando" (`refresh-cw`, azul), "Modo online" (`wifi`, verde). No protótipo, o toque simula a troca de rede; em produção, é só leitura.
- **Ondas:** 36 barras de 4px, gap de 4px, vermelhas (`--danger`) gravando. A área tem altura `clamp(48px, 12vh, 136px)`, e as barras vão até cerca de 130px.
- **Linha da marca no cartão:** marca Ausculta de 28px com as 5 barras laranja animadas (equalizador: `scaleY` 0,45→1→0,45 em 1s, ease-in-out, fases defasadas, `transform-origin: center`), "Ausculta" em Fraunces 600 19px (`--ink`) e "está gravando a consulta" em Public Sans 600 16px (`--danger`). Pode quebrar em duas linhas.
- **Microfone bloqueado:** selo de status dentro do cartão, abaixo da linha da marca (raio de 6px, `--danger-subtle`, texto `--danger` 600 12px, ícone `mic-off` de 14px): "Microfone bloqueado, áudio simulado."
- **Removidas:** a linha "Transcrição rodando localmente no dispositivo" e o link "Abrir em nova aba".
- **Botão do microfone:** 104px, ícone de 44px; pulso de 2 anéis (escala 1→1,32, opacidade 0,5→0, 1,4s, o segundo com atraso de 0,7s).
- **"Encerrar consulta e gerar SOAP":** secundário, largura total, altura mínima de 64px.
- **Altura da tela:** altura visível − topo do container − **padding inferior real do `<main>`** (lido do CSS computado, 32px), e não mais 24px fixos. Cabe sem rolar em 320×540.
- **"Gravação pausada":** continua laranja (pausa voluntária = atenção). Vermelho fica para gravando e interrupção involuntária.

### Navegação de volta (seta ←)
- **Gravação:** volta para "Nova consulta" (escolha de paciente), sem passar pelo Consentimento. Com áudio gravado, pede confirmação ("Sair da consulta?", ação vermelha "Sair e descartar gravação") e pausa a gravação enquanto o diálogo está aberto. Registra "Consulta cancelada antes de gerar o SOAP".
- **Revisão de consulta nova:** volta para "Nova consulta" e salva o SOAP como **Rascunho** no prontuário (toast "Rascunho salvo no prontuário de [nome]"). A revisão de um rascunho retomado continua voltando ao prontuário.

### Revisão SOAP: ações secundárias
Abaixo de "Aprovar e Sincronizar Prontuário", lado a lado (quebram em coluna se não couber; mínimo 180px cada, 48px de altura, contorno de 2px, fundo branco):
- **"Refazer análise da IA"** (azul, `refresh-cw`), com subtítulo 12px "Mesmo áudio · IA do dispositivo" (offline) ou "Mesmo áudio · IA na nuvem" (online). Confirma, remove o rascunho anterior, zera edições e vai para Processando.
- **"Apagar consulta"** (vermelho, `trash-2`). Confirma, remove a consulta não aprovada (áudio e rascunho), volta para "Nova consulta" e mostra o toast "Consulta não aprovada apagada".

### Diálogo de confirmação (novo componente)
Substitui todas as janelas nativas do navegador (`window.confirm`); não restou nenhuma no app.
- Overlay `rgba(27,36,32,.45)`; tocar fora cancela. Cartão centralizado, `min(420px, 100vw − 32px)`, raio `--radius-lg`, padding de 24/16/16px, gap de 16px, `role="alertdialog"`.
- Ícone de 24px num círculo de 48px (`--brand-subtle`/`--brand`; destrutivo: `--danger-subtle`/`--danger`), título 700 20px/26px, texto 15px/22px `--ink-muted`.
- Botão de confirmação preenchido de 56px (azul ou vermelho) e "Cancelar" secundário de 48px (contorno de 2px `--border-strong`).
- Usos: sair da gravação, refazer análise, apagar consulta e mudar país de atuação (no cancelar, o seletor volta ao valor anterior).

### Consentimento: enviar áudio já gravado
- Abaixo do texto de LGPD, separado por uma borda superior de 1px `--border`: botão secundário com a **mesma altura dos dois de consentimento (76px, `box-sizing: border-box`)**, contorno de 2px `--border-strong`, ícone `file-audio` num círculo de 44px `--brand-subtle`, título 600 17px "Enviar áudio já gravado", subtítulo 13px "Arquivo do dispositivo · MP3, M4A, WAV" e `chevron-right`.
- Texto de apoio: "Para quando o microfone falhar ou a consulta foi gravada em outro aparelho. Ao enviar, você confirma que houve autorização para gravar."
- **Fluxo:** seletor de arquivo (`audio/*`) → valida o formato → lê a duração → registra na trilha (nome, tamanho, "autorização declarada pelo veterinário") → Processando (IA local se offline, nuvem se online) → Revisão. `consentBy = 'upload'`.
- **Protótipo:** o SOAP gerado ainda é o caso de exemplo; em produção, transcrever o arquivo enviado.

### i18n
- Todas as strings novas estão em `i18n.js` (PT, EN e ES). "Offline Mode" (antes fixo em inglês) virou "Modo offline".
- Strings com dados variáveis usam padrões regex em `P`: "A gravação de MM:SS será descartada…", "Rascunho salvo no prontuário de [nome]" e "Mudar o país de atuação para [país]?".

### Arquivos alterados
- `Ausculta App.dc.html`, `Ausculta App.html` (bundle offline regerado) e `i18n.js`.

---

## Atualizações de 01/10/2026, segunda rodada (leia antes das seções acima)

Esta seção substitui o que divergir nas seções anteriores.

### Gravação: ondas
- A área das ondas ocupa o espaço livre do cartão: `flex: 1 1 0`, com `min-height` de 48px e `max-height` de 240px (substitui o `clamp(48px, 12vh, 136px)`).
- A altura das barras acompanha a altura da área e o volume real do microfone, com sensibilidade maior. Em celulares altos, as ondas crescem em vez de sobrar espaço em branco.

### Gravação: faixa de interrupção de áudio
Aparece quando o áudio pode ter sido interrompido: app em segundo plano, microfone pausado pelo sistema (ligação, por exemplo), microfone desconectado ou falha no gravador.
- Segue o padrão de faixa de alerta vermelha: fundo `--danger-subtle`, raio `--radius-lg` e padding de 12px (16px à esquerda).
- Ícone `triangle-alert` de 18px, alinhado à primeira linha do texto.
- Texto 600 14px/20px `--danger`, `text-wrap: pretty`, com base flexível de 180px.
- Exemplo de texto: "Áudio pode ter sido interrompido: app em segundo plano às 12:53 · 2 s. Confira o trecho antes de aprovar."
- **Espaços não separáveis** (U+00A0) em "às 12:53" e "2 s": o número nunca se separa da unidade.
- Carimbo "Entendi" (`check`, 44px, borda de 2px `--danger`, fundo branco) com `margin-left: auto`. A linha usa `flex-wrap`; em telas estreitas o carimbo passa para baixo do texto, alinhado à direita.

### Consentimento: gravar com o gravador do celular
Nova ação secundária entre "Enviar áudio já gravado" e o texto de apoio. Mesmo estilo e altura (76px, contorno de 2px `--border-strong`, círculo de 44px `--brand-subtle` com ícone `smartphone`, `chevron-right`).
- Título: "Gravar com o gravador do celular".
- Subtítulo: "Continua com a tela apagada · envie ao terminar".
- **Android e desktop:** campo de arquivo `<input type="file" accept="audio/*" capture>`. Abre o gravador do aparelho (ou uma lista de apps, conforme o fabricante). O arquivo volta pelo mesmo fluxo de "Enviar áudio já gravado" (`uploadAudio`).
- **iPhone e iPad** (detectados pelo user agent, ou `MacIntel` com toque): o Safari não abre o app Gravador, então o toque abre um diálogo de instruções.
  - Sobretítulo "iPhone" e título 700 21px "Gravar com o app Gravador".
  - Texto de apoio: "O Gravador continua gravando com a tela apagada ou em outro app."
  - Lista de 3 passos, cada um com o número em mono num círculo de 28px `--brand-subtle`:
    1. "Abra o app Gravador": "Toque no botão vermelho e conduza a consulta normalmente."
    2. "Salve em Arquivos": "Ao terminar, toque na gravação, depois em ••• › Salvar em Arquivos."
    3. "Envie ao Ausculta": "Volte aqui e toque em Escolher gravação."
  - Primário "Escolher gravação" (56px, `file-audio`), que abre o seletor de arquivo e fecha o diálogo ao escolher. Secundário "Fechar" (48px).
  - O passo 2 é necessário porque o seletor de arquivos do iPhone só mostra o app Arquivos.
- Abrir as instruções fica registrado na trilha ("Instruções do app Gravador abertas").

### Limite de gravação em segundo plano (contexto para o app nativo)
- **Safari (aba):** o microfone continua com a tela apagada e ao trocar de app.
- **Atalho "Abrir como App Web" do iOS:** o sistema suspende o microfone em segundo plano. Nenhuma permissão ou manifesto resolve.
- **Até o app nativo:**
  - Criar o atalho com "Abrir como App Web" desligado (abre no Safari).
  - Ou usar o gravador do celular (seção acima).
- **App nativo (Capacitor ou similar):** gravar com código nativo, não com `getUserMedia` dentro do WebView. Só o modo de áudio em segundo plano não basta, porque o WebView é suspenso mesmo assim.
  - **iOS:** `UIBackgroundModes: audio`, `AVAudioSession` em modo de gravação e gravador nativo.
  - **Android:** serviço em primeiro plano do tipo `microphone`, com a permissão `FOREGROUND_SERVICE_MICROPHONE` e uma notificação fixa.
  - **O plugin precisa expor:** iniciar, pausar, retomar e parar; nível de volume (para as ondas); eventos de interrupção (para a faixa acima); e arquivo salvo em partes durante a consulta.

### i18n
- As strings novas (gravador do celular e diálogo do iPhone) estão em `i18n.js` (PT, EN e ES).

### Arquivos alterados
- `Ausculta App.dc.html`, `Ausculta App.html` (bundle offline regerado) e `i18n.js`.
- O padrão de design obrigatório continua em `padrao-de-design.md`.


## Atualização: captura e IA (PRD de design, 01/10/2026)
Fonte: `Ausculta App.dc.html` (versão única; a anterior foi substituída). `Ausculta App.html` é o bundle offline regerado.

### Regra das IAs (Configurações da conta)
- Cartão "IAs usadas nas análises": chips "IA na nuvem" e "IA do aparelho", as duas marcadas por padrão.
- É uma regra da conta, não do perfil. Editam o dono e os administradores (no plano individual, o dono). Os demais veem a regra só para leitura em "IA no aparelho", com "Definido pelo dono da conta".
- Desmarcar abre um diálogo laranja com as consequências e um motivo obrigatório ("Outro" exige texto). A mudança vai para a atividade recente da Central de Confiança.
- A última IA marcada não pode ser desmarcada: a faixa laranja explica o motivo.
- Comportamento por configuração (`aiMode` no protótipo):
  - Ambas: nuvem quando online, aparelho quando offline.
  - Só nuvem: offline não há análise.
  - Só aparelho: sempre no aparelho; sem a IA instalada, não há análise.

### Consultas sem análise
- Quando não há IA disponível, "Encerrar consulta e gerar SOAP" abre o diálogo "Guardar sem análise" ou "Continuar gravando".
- O Painel ganha o cartão "N consultas aguardando análise da IA", com "Analisar" por consulta e "Analisar todas". Sem IA disponível, o carimbo fica desabilitado e mostra o motivo.
- No prontuário do paciente, a consulta aparece com o selo "Aguardando análise".
- Quando a internet volta, um toast com "Ver" leva ao Painel.
- O Consentimento mostra uma faixa laranja nos três casos da seção 4 do PRD. Não bloqueia nada.

### Perfil → grupo "Captura e IA"
O grupo aparece em Meu perfil e no menu da conta, com três telas:
- **Minha voz:** consentimento biométrico próprio, leitura de 20 s, resultado bom ou com ruído, e depois refazer ou excluir.
- **IA no aparelho:** estados não instalada, baixando (com pausa), instalada, apagada pelo navegador e sem espaço; chip "Baixar só no Wi-Fi". Na conta "Só aparelho" aparecem a linha "Nova versão" e o texto de que nenhum dado de consulta é enviado, e "Remover" some.
- **Microfone e captação:** escolha do microfone, aviso de Bluetooth, teste de 5 s com resultado e preferência de manter a tela ligada.

### Revisão SOAP
- Cada frase mostra o falante. Frases seguidas do mesmo falante ficam sob um rótulo só.
- Tocar no rótulo abre uma folha com três pílulas e "Confirmar". No editor de cada frase também há as pílulas de falante.
- Quando a troca muda a frase entre Subjetivo e Objetivo, ela é movida e aparece o toast "Frase movida para …" com "Desfazer". A troca entra na trilha da consulta.
- Pílulas SOAP e Transcrição. A transcrição mostra horário, falante e texto; tocar numa fala destaca o trecho.
- Trecho com áudio ruim: selo "Confira este trecho" com o carimbo "Ouvir". No protótipo, é a segunda frase do Subjetivo.
- Sem voz cadastrada, a linha de sistema "Cadastre sua voz…" aparece uma única vez.
- O subtítulo e o estado desabilitado de "Refazer análise da IA" seguem a configuração da conta.

### Outros
- **Equipe:** selo "Voz cadastrada" ou "Sem voz" e contador de veterinários com voz.
- **Configurações da conta:** cartão "Vocabulário da clínica".
- **Central de Confiança:** cartão "Quem processa seus dados", com fornecedor, região e retenção. Os valores ainda não definidos aparecem como "A confirmar".
- **Tweaks do protótipo:** `aiPolicy` (ambas, nuvem, aparelho) e `deviceAi` (instalada, nao-instalada, baixando, apagada, sem-espaco).
- **i18n:** todas as strings novas estão em `i18n.js` (PT, EN e ES).


## Atualização: seletor de área (01/10/2026)
- Abas, controle segmentado e pílulas usados para navegar entre áreas da mesma tela foram trocados por um único componente, o **seletor em lista**.
- Onde aparece:
  - Pacientes: Pacientes ou Responsáveis.
  - Prontuário: Consultas, Medicação, Exames, Notas, Dados do paciente e Dados do responsável. Os dois "Dados" deixaram de ser uma sub-aba.
  - Revisão SOAP: SOAP ou Transcrição.
- Botão de 48px com ícone, nome da área, "N de M" e chevron. O menu abre em lista logo abaixo, com ícone, nome, contagem e marca de seleção, e fecha ao escolher uma área ou tocar fora.
- Nova regra 10 no padrão de design (`CLAUDE.md`).


## Atualização: discurso de onde os dados ficam (01/10/2026)
Os textos foram alinhados ao que a stack do piloto faz com os dados.
- **Hospedagem:** Vercel, com banco Neon e arquivos no Vercel Blob, na região [Estados Unidos — confirmar].
- **Fornecedores de IA:** transcrição na nuvem [a definir]; análise do texto pela Anthropic (Claude).
- **Condição:** "no aparelho" e "local" só aparecem junto da condição que torna isso verdade (sem internet, ou conta "só no aparelho").
- **Telas alteradas:**
  - Landing (hero, passos, atendimento volante, demo e o item "Você escolhe a IA" com link para a Central de Confiança).
  - Conta: linha do piloto abaixo do botão "Criar conta"; tirado "nunca compartilhados sem sua ação".
  - App, Processando: texto conforme a configuração de IA da conta.
  - App, Central de Confiança: selo "Piloto", região, fornecedores e linha "fora do Brasil".
  - App, Ajuda: perguntas "Funciona sem internet?" e "Onde ficam meus dados?".
- **Documentos legais:** Política de privacidade, Termos de uso e Relatório de segurança, em PT, EN e ES.
- **Pendências:** promessas que dependem de contrato aparecem como [a confirmar]: não treinar modelos, retenção do provedor, AES-256 em repouso e backup diário.
- **Link direto:** `Ausculta App.dc.html#trust` abre a Central de Confiança.


## Atualização: processamento assíncrono (01/10/2026)
- **Fila "Aguardando sua revisão"** no Painel:
  - Ordem: primeiro os rascunhos prontos (cartão laranja, selo "Pronto para revisão"), do mais antigo para o mais recente. Depois as consultas em processamento (cartão tracejado, selo azul "Em transcrição do áudio" ou "Em análise do SOAP pela IA", com %), também do mais antigo para o mais recente.
  - Cada cartão mostra há quanto tempo está na fila ("agora", "há 3 minutos", "há 2 horas", "ontem"), atualizado a cada 10 s.
  - Acima da lista, a linha de sistema "N consultas em processamento".
- **Processamento em segundo plano:** quando o veterinário sai da tela Processando ("Atender outro paciente enquanto isso"), o processamento continua. Ao terminar, aparece o toast "rascunho pronto para revisão", com o carimbo "Revisar".
- **Revisão:** a linha "Processado pela IA…" mostra há quanto tempo o rascunho ficou pronto.
- **No produto:** a fila deve vir do servidor. Os estados são gravada → transcrição (ASR) → análise da IA → regras do SOAP → pronto. O aviso de pronto deve vir por notificação push ou em tempo real.


## Atualização: listas longas (01/10/2026)
- Cada lista tem uma prévia curta e o link "Ver todas… (N)", que abre a lista completa no próprio prontuário. A lista completa tem a seta ← para voltar, busca, filtros com contagem, grupos por mês e "Mostrar mais 20".
- Na fila do Painel, os 5 primeiros aparecem e "Ver fila completa (N)" expande a lista no lugar.
- O paciente Buster tem um histórico fictício longo, só para demonstração (não é salvo).
- A regra entrou como item 12 em `padrao-de-design.md`.


## Atualização: configuração de IA, transcrição e guarda do áudio + Central de Confiança (01/10/2026)
Fontes: `prd-design-ausculta-configuracao-ia-e-audio.md` e `prd-design-ausculta-central-de-confianca.md`.
- **Configurações da conta:**
  - Cartão "Análise das consultas por IA": chips das IAs e, sob "IA na nuvem", o bloco recuado "Transcrição do áudio" (Na nuvem / No aparelho).
  - Cartão novo "Guarda do áudio": Cifrado na nuvem / Apagar após a aprovação / Só no aparelho.
  - Regras entre as escolhas:
    - Transcrição no aparelho trava a IA do aparelho.
    - Guarda só no aparelho força a transcrição no aparelho e desabilita a opção na nuvem.
    - A última IA marcada não pode ser desmarcada.
  - Diálogo laranja com consequências e motivo para tudo que remove capacidade. Diálogo simples, sem motivo, para o que devolve. Tudo vai para a trilha de auditoria.
- **Consentimento:** linha de sistema com onde a consulta será transcrita e analisada e como o áudio será guardado.
- **Processando:** etapas "Transcrevendo no aparelho/na nuvem…" e "Analisando…". Com transcrição no aparelho e internet, o processamento é feito em modo misto (transcrição no aparelho, análise na nuvem).
- **Revisão:** linha de sistema com "Transcrito… · analisado… · áudio…" e há quanto tempo. Um toque abre uma folha com o detalhe e o link para a Central. O subtítulo de "Refazer análise" segue a configuração.
- **Prontuário:**
  - Selo cinza "Áudio apagado" com a guarda "apagar após a aprovação".
  - Selo cinza "Áudio no aparelho que gravou" com a guarda "só no aparelho", em consultas de outros dias.
- **Central de Confiança:**
  - Novos cartões no topo: "Como esta conta trata os dados" (selo Piloto e carimbo Alterar) e "Onde os dados ficam".
  - "Quem processa seus dados" marca cada fornecedor como "Usado nesta conta" ou "Não usado nesta conta".
  - Retenção do áudio conforme a configuração. AES-256 e backup diário marcados como [a confirmar].
- **Landing, Ajuda, documentos legais e Conta:** textos do PRD da Central de Confiança.
- **Tweaks novos:** `transcricao` (nuvem, aparelho) e `guardaAudio` (nuvem, apagar, aparelho).


## Revisão de responsividade e i18n (01/10/2026)
- **Textos da interface:** todas as strings das funções novas estão traduzidas para EN e ES em `i18n.js`, inclusive as que o app monta em tempo real:
  - trilha de auditoria da configuração;
  - etapas da fila;
  - "Rascunho de DD/MM";
  - contagens ("Mostrando X de Y", "Ver todas… (N)").
- **Dados de exemplo:** textos clínicos do protótipo e nomes de raças e regiões ficam em PT, porque são dados e não interface.
- **320 px:** os componentes novos usam flex-wrap, minmax(0, 1fr) e reticências no nome da área. Nenhum tem largura fixa acima de 320 px. Na fila, o selo de etapa pode quebrar linha em idiomas com textos mais longos.


---

## Atualizações de 02/10/2026 (leia antes das seções acima)

Esta seção substitui o que divergir nas seções anteriores. O padrão completo está em `padrao-de-design.md` (regras 6 a 12).

### Família de selos e balões (cor = significado)
- **Selo verde (concluído, sem ação):** retângulo de 28px (`box-sizing: border-box`), raio de 6px, fundo `--success-subtle`, borda de 1px `--success`, ícone de 14px, texto 600 12px. Ex.: "Com internet", "IA do aparelho pronta", "Tudo sincronizado · hora".
- **Selo laranja "Precisa da sua atenção · N"** (`bell-dot`, total em Plex Mono, chevron): reúne no topo da tela tudo o que pede ação. Fechado por padrão; ao tocar, abre logo abaixo um painel laranja com uma linha de 48px por item (ícone de 18px, texto 600 14px e carimbo laranja à direita). Itens em andamento usam ícone azul. Some sem itens.
- **Balão vermelho "Falta para aprovar"** com bico apontando para o botão "Aprovar e Sincronizar Prontuário" desabilitado: lista o que bloqueia (dose, alergia, campo obrigatório por espécie). Cada linha rola até o item e o destaca.
- **Balão verde "Registrado"** na tela de aprovado, com a frase "A história de [paciente] continua daqui."
- Os selos ocupam 28px visuais dentro de um alvo de 44px (margem de −8px). Espaço até o conteúdo abaixo: 16px.

### Revisão SOAP
- **Selo único de processamento:** "Processado na nuvem · há N min" (ou "no aparelho", "no aparelho e na nuvem"), com `shield-check` e chevron. Abre no lugar um painel verde com transcrição, análise e guarda do áudio (substitui a janela inferior).
- **Aviso "Rascunho gerado por IA"** fica acima do player.
- **Player de áudio:** barra de progresso (toque para pular, trecho da frase ativa em laranja), legenda do trecho e tempo "MM:SS / MM:SS" em mono, e controles centralizados iguais aos da gravação pausada (−10s, play/pausa azul de 44px, +10s, gap de 24px). Reproduzir destaca a frase falada no SOAP; tocar numa frase leva o áudio ao início dela.
- **Player não fica fixo.** Ao rolar e o player sair da tela, aparece no cabeçalho uma pílula azul (play/pausa, tempo, mini barra, seta para voltar ao player). Some ao voltar para o player.
- **Cabeçalho:** só o nome do paciente, sem o prefixo "Revisão".

### Nova consulta: ordem dos pacientes ("provável próxima consulta")
1. Retorno hoje ou atrasado até 3 dias (do "retorno em N dias" do Plano aprovado): selo laranja "Retorno hoje" / "Retorno atrasado · dd/mm".
2. Rascunho de hoje (selo laranja), depois atendidos nos últimos 30 dias sem retorno marcado (selo cinza "Última consulta · dd/mm"), do mais recente ao mais antigo.
3. Demais em ordem alfabética (selo cinza "Retorno previsto · dd/mm" ou "Última consulta · dd/mm").
- Ao buscar: primeiro quem começa com o termo, depois alfabético. Busca com 64px, a mesma altura do botão "Primeira consulta".

### Painel e momentos de respiro (ensaio sobre o nome)
- Abaixo de "Bom dia, Nome", em Fraunces 600 17px cinza: "Nenhum prontuário esperando por você." (fila vazia) ou "Hoje você ouviu N consultas. Todas registradas." (após 17h). Some com itens na fila.
- Splash: "O cuidado começa na escuta." · Paciente sem consultas: "A primeira consulta começa a história." · Login e criação de conta: "A IA ouve. Você decide."

### Landing (`index.html`)
- Hero: "Ausculta, do latim *auscultare*: ouvir atentamente." · h1 "O cuidado começa na escuta." · subtítulo "Termine a consulta com o prontuário pronto".
- Novas seções: "O que a consulta revela" (editorial), "O que merece ficar registrado" (antes dos números), "A IA ouve. Você decide." (antes de Segurança) e "Ouvir é cuidar duas vezes" (antes do CTA).
- CTA final: "Comece a escrever menos. Comece a escutar melhor." com o botão "Experimentar o Ausculta". Rodapé: "Ausculta. Ouve a consulta. Organiza o cuidado."
- Celular do hero atualizado com a tela de gravação atual.

### Outros
- Links "Ver todos… (N)" sem sublinhado.
- Vocabulário: "responsável", nunca "tutor" (ES "responsable", EN "owner").
- Todas as strings novas em `i18n.js` (PT, EN e ES).

### Arquivos alterados
- `Ausculta App.dc.html`, `Ausculta Conta.dc.html`, `index.html`, `i18n.js`, `splash.js`, `padrao-de-design.md`, `image-slot.js` (novo no pacote).
- `Ausculta App.html` (bundle offline) **não foi regerado** nesta rodada: use os `.dc.html` servidos por HTTP.


---

## Atualizações de 02/10/2026, segunda rodada (leia antes das seções acima)

### Revisão SOAP · Objetivo: Sinais vitais e Sinais de inflamação
- **Cartão "Sinais vitais"** (acima do "Exame por sistemas"), com parâmetros por espécie: pequenos animais T, FC, FR, PA, TPC, mucosas, hidratação, ECC, ECM, dor; equinos T, FC, FR, TPC, mucosas, hidratação, ECC, dor; bovinos T, FC, FR, mucosas, hidratação, ECC.
- **Extração:** valores ditos em voz alta no Objetivo (regex por parâmetro, `VDEF`). Ex.: "frequência cardíaca 96 bpm", "TPC menor que 2 segundos", "ECC 6 de 9", "escore de dor Glasgow 6 de 24".
- **Faixas de referência por espécie** (`VRANGE`, de exemplo, a validar pela equipe clínica): valor fora da faixa gera selo laranja "FC 210 bpm · acima da faixa de referência (Felino 120–180 bpm)" e continua visível mesmo com os registrados recolhidos.
- **Obrigatórios** (`VREQ`): T e FC para equinos e bovinos. Pendentes bloqueiam a aprovação e entram no balão "Falta para aprovar".
- **Sinais de inflamação por região** (joelho, membro, quarto mamário, orelha…): calor, rubor, aumento de volume, dor e perda de função; pelo menos 2 sinais na mesma região para o bloco aparecer.
- **Lacunas** ("Sinais vitais não mencionados: …", "Joelho esquerdo: rubor não mencionado") vão para o selo laranja "Precisa da sua atenção".

### Padrão único dos dois cartões (Sinais vitais e Exame por sistemas)
- Chips de 44px: azul sólido = registrado no áudio (toque toca o trecho); verde = registrado pelo veterinário; cinza tracejado = não mencionado; vermelho tracejado com cadeado = obrigatório para a espécie.
- Contador "N de M registrados". Já registrados ficam recolhidos ("Mostrar N já registrados" / "Recolher os já registrados").
- Pendente resolve no toque: no exame marca "normal ao exame"; nos sinais vitais abre um campo para o valor medido ("Registrar", "Cancelar", "Remover"). O valor informado entra no texto do Objetivo ao aprovar.
- ECC e escore de dor saíram do modelo de exame de pequenos animais (estão nos sinais vitais).

### Resumo clínico
- Novo bloco **"Sinais vitais registrados"**: último valor de cada parâmetro, data, seta de tendência, valor anterior, faixa de referência; laranja se fora da faixa. Extraído do Objetivo das consultas aprovadas (mesma técnica do peso), ordenado por data.

### Landing: "Tudo o que o Ausculta ouve por você" (#ouve)
- Tabela O quê / Por quê / Como, com link "O que a IA ouve" no menu. "Já no Ausculta" (22 recursos em 5 grupos, prévia com 7 destaques e "Ver todos os recursos (22)") e "Próximas fases" (9). No celular as colunas viram blocos com rótulos de 10px.
- Siglas: incluídas T, FC, FR, PA, ECM e WSAVA.

### Antes de produção
- Validar com veterinários da SIQ as faixas de referência e as formas de falar ECC, ECM e escore de dor.
- `Ausculta App.html` (bundle offline) não foi regerado: use os `.dc.html` servidos por HTTP.


---

## Atualizações de 03/10/2026 (leia antes das seções acima)

Esta seção substitui o que divergir nas seções anteriores. PRDs aplicados (em `prd/`): `prd-design-ausculta-correcoes-clinicas.md` (com `revisao-clinica-prototipo-ausculta.md`) e `prd-design-ausculta-landing-habilidades-ferramentas.md`.

### App: correções clínicas
- **Faixas de referência (`VRANGE`):** Canino FC 60–160, FR 10–30 · Felino FC 140–220, FR 20–40 · Equino FC 28–44, FR 8–16 · Bovino FC 40–80. Linha de 12px abaixo do título do cartão: "Faixas de referência provisórias, em validação pela equipe clínica."
- **Novos sinais vitais:** "Motilidade intestinal" (equinos: presente, diminuída, ausente) e "Movimentos ruminais" (bovinos: número em 2 minutos ou presentes, diminuídos, ausentes). Mesmos 4 estados de chip; entram no contador; não obrigatórios.
- **Caso Buster:** card "Alergia ou reação adversa relatada", item "Dipirona · reação adversa (vômito)", carimbo "Registrar reação adversa"; continua bloqueando a aprovação. No prontuário, o tipo fica ao lado do fármaco.
- **Alerta de dose:** "Meloxicam · sugerido 0,4 mg/kg · limite 0,2 mg/kg (dose inicial) · 0,1 mg/kg (manutenção)" e botão "Ajustar para 0,1 mg/kg (manutenção)".
- **Caso Equino:** "teste de pinça de casco positivo" e "casco do membro torácico direito". Fenilbutazona continua sem duração, para demonstrar o alerta dos 6 elementos.
- **Rubor não mencionado:** continua cinza no cartão de inflamação, mas não entra no selo "Precisa da sua atenção".

### App: Exame por sistemas com o modelo da espécie
- O bloco cinza separado saiu. Os itens do modelo (ex.: recinto e temperatura, fotoperíodo, dieta em exóticos) entram **na mesma lista** dos 10 sistemas, primeiro, com ícone `paw-print` de 14px após o nome (rótulo acessível "item do modelo da espécie").
- Acima da lista, **selo laranja** (raio 6px, `--accent-warm-subtle`, borda 1px, texto 600 12px, `paw-print`): "Modelo [família]: inclui …".
- O contador soma sistemas e itens da espécie ("N de 13 registrados"). "Examinei: marcar os demais como normais" inclui os itens não obrigatórios. Obrigatórios mantêm o cadeado vermelho.

### Landing (`index.html`): taxonomia e reestruturação
- **Três categorias**, cada uma com uma linha de quem age: **Habilidades** ("O Ausculta faz", `#habilidades`), **Ferramentas** ("Você faz", `#ferramentas`) e **Fundamentos** ("Vale para tudo", `#fundamentos`). EN: Abilities, Tools, Foundations · ES: Habilidades, Herramientas, Fundamentos.
- **Item de lista** (mesmo componente nas três): círculo de 48px com ícone de 24px (`--brand-subtle`), título 700 16px, frase 15px; grade `repeat(auto-fit, minmax(min(100%, 320px), 1fr))`. "Em breve": círculo branco com borda tracejada e ícone cinza.
- **Habilidades:** 23 "No Ausculta" em 5 grupos (Ouvir, Organizar, Proteger, Agir, Acompanhar) + 10 "Em breve". **Ferramentas:** 18 em 4 áreas (Consulta, Pacientes e prontuário, Conta e equipe, Integração) + 7 "Em breve".
  - Fechado: só os **6 de maior impacto** (sem "Em breve"). "Ver todas as habilidades (33)" / "Ver todas as ferramentas (25)" abre tudo por grupo e o bloco "Em breve" **sempre por último**.
- **Fundamentos:** abre com "A IA ouve. Você decide."; frase de apoio sobre o prontuário como documento legal; 15 itens (inclui "Prontuário imutável depois de aprovado"); 6 visíveis e "Ver todos os fundamentos (15)".
- **Ordem (AIDA):** Hero → Hoje x Ausculta → ensaio "O que a consulta revela" → "O que merece ficar registrado" → Como funciona → Habilidades → Ferramentas → SOAP → Para quem → Vídeos → Fundamentos → Integrações → "Ouvir é cuidar duas vezes" → **Comece agora** (cartão azul do CTA + "Por onde você começa?" + linha verde "Comece no plano Essencial, sem custo: até 20 consultas por mês.") → **Perguntas frequentes** (`#perguntas`, 10 perguntas em acordeão de 56px) → rodapé.
- **Cabeçalho:** no desktop só logo, idioma, "Entrar" e "Começar agora" (Lei de Hick). Links de seção no **rodapé**; no celular continuam no menu. **Barra fixa "Começar agora"** no celular (≤960px) quando o hero e o bloco de ação estão fora da tela (`IntersectionObserver`).
- **Recolhidos por padrão:** detalhe do SOAP ("Ver o método completo"), detalhe das integrações ("Ver como a integração funciona") e siglas do rodapé ("Siglas usadas nesta página (20)").
- **Hoje x Ausculta:** duas caixas (branca com ✕ cinza; azul com ✓ azul em círculo branco) ligadas por um círculo laranja de 56px com seta; empilham abaixo de 760px com a seta para baixo.
- **SOAP (cartões S/O/A/P, Plano que vira ação, campos por espécie):** atualizados com o que o app já faz (sinais vitais, exame por sistemas, inflamação, problema na lista, 6 elementos, carência, alergia ou reação adversa, adendo após aprovação). "Campos por espécie" deixa de ser "Em breve" e ganha Suínos, Aves e Ruminantes.
- **Botões:** "Começar agora" sem seta em toda a landing; no hero, os dois botões com a mesma largura (até 280px).
- **Citação do ensaio** "Auscultar é prestar atenção…" em Fraunces 32–40px com mais respiro.

### Landing: capítulos (03/10/2026, segunda rodada)
- As seções depois do hero ficam em **4 capítulos**, cada um num bloco de fundo de borda a borda (`data-chapter`):
  - 01 · O problema (`--surface-000`): Hoje x Ausculta, ensaio, "O que merece ficar registrado".
  - 02 · Como o Ausculta resolve (`--surface-100`): Como funciona, Habilidades, Ferramentas, SOAP, Para quem.
  - 03 · Por que confiar (`--brand-subtle`): Vídeos, Fundamentos, Integrações.
  - 04 · Comece (`--surface-000`): Ouvir é cuidar duas vezes, Comece agora, Perguntas frequentes.
- **Marcador de capítulo:** número em Fraunces 600 28px `--accent-warm-text`, fio de 48×1px `--accent-warm` e nome em 12px 600 maiúsculo, tracking 0,1em, `--ink-muted`.
- **Ritmo:** capítulo com padding 64px em cima e 32px embaixo; seções internas com 32px. As bordas de 1px entre seções e os fundos próprios das seções saíram.
- Ícones dos Fundamentos em círculo branco (para contrastar com o fundo azul claro). Anel do círculo de transição "Hoje → Com o Ausculta" em `--surface-000`.
- Correção de 320px: caixa duplicada no bloco de números ("40%") removida; sem rolagem horizontal.

### i18n
- Auditoria das strings da landing e do app contra `i18n.js`: completadas as que faltavam (textos novos do SOAP, FAQ, taxonomia, rótulos acessíveis, sinais vitais novos, casos de exemplo). Dados de exemplo (nomes de pessoas, clínicas e regiões) continuam em PT.

### Antes de publicar
- Validar as faixas de referência com o veterinário responsável (Bovino FC 84 bpm hoje aparece fora da faixa 40–80).
- Fundamentos ainda a construir: áudio cifrado, dados isolados por conta, regras clínicas validadas.
- Região dos dados: "[Estados Unidos — confirmar]".
- Vídeos: entram os depoimentos dos pilotos.
- `Ausculta App.html` (bundle offline) não foi regerado: use os `.dc.html` servidos por HTTP.

### Arquivos alterados
- `Ausculta App.dc.html`, `index.html`, `i18n.js`, `prd/` (3 PRDs novos).
