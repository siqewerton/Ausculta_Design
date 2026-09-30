# Handoff: Ausculta: AI Scribe para veterinários (app + landing + conta)

## Visão geral
O Ausculta grava a consulta veterinária (com consentimento), transcreve no próprio dispositivo (funciona offline) e gera um rascunho de prontuário **SOAP**, que o médico veterinário revisa, ajusta e aprova. Ele pode funcionar sozinho ou integrado ao PIMS da clínica (ex.: Long Life Pet). O pacote cobre três peças:
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
