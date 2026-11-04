# PRD de Design — Ausculta: configuração de IA, transcrição e guarda do áudio

> Para colar no projeto do Ausculta no Claude Design, sobre o protótipo atual (handoff de 01/10/2026).
> **Substitui** as seções 7.10 ("IAs usadas nas análises") e 7.11 ("Consultas aguardando análise") do `prd-design-ausculta-captura-e-ia.md`, que continuam valendo no restante.
> Segue o template do PRD de Design (9 seções).

---

## 1. Contexto e proposta

**Problema.** Algumas clínicas não aceitam que o áudio das consultas, com a voz do responsável e do veterinário, vá para serviços externos. A configuração atual só permite ligar ou desligar a "IA na nuvem" inteira, o que obriga essas clínicas a abrir mão da análise de melhor qualidade. Além disso, mesmo sem IA na nuvem, o áudio fica guardado na nuvem do Ausculta, e a clínica não tem como escolher isso.

**Solução.** Um único lugar, em Configurações da conta, onde o dono decide três coisas: quais IAs analisam as consultas, onde o áudio é transcrito e onde o áudio fica guardado. Em todo o sistema, o veterinário vê de forma discreta o que essa configuração significa para cada consulta, sem nenhum toque a mais no fluxo principal.

## 2. Público e personas

- **Dono ou administrador da conta.** Define a política de dados da clínica. Precisa entender as consequências de cada escolha antes de confirmar.
- **Veterinário da equipe.** Não configura nada, mas precisa saber, na consulta, onde o áudio foi transcrito e se poderá ouvi-lo depois.
- **Responsável jurídico ou cliente exigente da clínica.** Lê a Central de Confiança para confirmar que a configuração é cumprida (ver o PRD da Central de Confiança).

## 3. Fluxos de usuário

1. Como dono da conta, quero escolher se as consultas são analisadas pela IA na nuvem, pela IA do aparelho ou pelas duas.
2. Como dono da conta, quero que o áudio seja transcrito no aparelho e só o texto vá para a IA na nuvem, para que a voz das pessoas não saia do aparelho.
3. Como dono da conta, quero escolher se o áudio fica guardado na nuvem, é apagado após a aprovação ou fica só no aparelho.
4. Como dono da conta, quero entender as consequências de cada mudança e registrar o motivo antes de confirmar.
5. Como veterinário, quero ver, na consulta, onde o áudio foi transcrito e analisado.
6. Como veterinário, quero saber quando um trecho de áudio não pode mais ser ouvido e por quê.
7. Como veterinário de uma conta sem IA do aparelho, quero ser avisado quando uma consulta feita offline ficar sem análise e encontrá-la no Painel para analisar depois.
8. Como membro da equipe que não é dono, quero ver a configuração em modo leitura.

## 4. Modos e variações

### 4.1 As três escolhas

| Escolha | Opções | Padrão |
|---|---|---|
| **IAs que analisam** | IA na nuvem · IA do aparelho (marque uma ou as duas) | As duas |
| **Transcrição do áudio** (só quando a IA na nuvem está marcada) | Na nuvem (mais precisa) · No aparelho (o áudio não sai do aparelho) | Na nuvem |
| **Guarda do áudio** | Cifrado na nuvem do Ausculta · Apagar da nuvem após a aprovação · Só no aparelho | Cifrado na nuvem |

### 4.2 Regras entre as escolhas

- Pelo menos uma IA fica sempre marcada.
- "Transcrição no aparelho" exige o modelo do aparelho: a "IA do aparelho" fica marcada e travada, com a nota "Necessária para transcrever no aparelho".
- "Guarda só no aparelho" exige que o áudio nunca saia do aparelho: a transcrição passa para "no aparelho" automaticamente, e a opção "na nuvem" fica desabilitada com a nota "Indisponível com a guarda só no aparelho".

### 4.3 O que acontece em cada combinação

| Configuração | Com internet | Sem internet |
|---|---|---|
| Nuvem (transcrição na nuvem) + aparelho — **padrão** | Áudio ao provedor de transcrição; texto ao Claude | Tudo no aparelho; "Refazer análise da IA" na nuvem depois, se o veterinário quiser |
| Nuvem (transcrição no aparelho) + aparelho | Transcreve no aparelho; só o texto vai ao Claude | Tudo no aparelho |
| Só nuvem (transcrição na nuvem) | Áudio ao provedor; texto ao Claude | Consulta guardada sem análise; Painel avisa |
| Só aparelho | Tudo no aparelho | Tudo no aparelho |

## 5. O que priorizar nesta entrega

| Prioridade | O quê |
|---|---|
| **Essencial** | Cartão "Análise das consultas por IA" (7.1), cartão "Guarda do áudio" (7.2), diálogos de mudança (7.3), linha de sistema na revisão (7.5), áudio indisponível (7.6) |
| **Recomendado** | Linha no Consentimento (7.4), etapas no Processando (7.4), Painel com consultas aguardando análise (7.7) |
| **Depois** | Histórico de mudanças da configuração na própria tela (7.8) |

**Não alterar** a tela de gravação. As informações desta configuração aparecem antes (Consentimento) e depois (Processando, Revisão, prontuário).

## 6. Critérios de aceite visíveis

- [ ] CA-01 Uma conta nova vem com as duas IAs marcadas, transcrição na nuvem e áudio cifrado na nuvem.
- [ ] CA-02 Não é possível desmarcar as duas IAs; ao tentar, a tela explica por quê e mantém a marcação.
- [ ] CA-03 Escolher "Transcrição no aparelho" marca e trava a IA do aparelho, com nota explicando.
- [ ] CA-04 Escolher "Só no aparelho" na guarda muda a transcrição para "no aparelho" e desabilita a opção na nuvem, com nota.
- [ ] CA-05 Toda mudança que remove uma capacidade (desmarcar uma IA, transcrever no aparelho, apagar o áudio, guardar só no aparelho) mostra as consequências e só confirma com uma justificativa.
- [ ] CA-06 Mudanças que devolvem uma capacidade confirmam sem justificativa.
- [ ] CA-07 Toda mudança fica registrada na trilha de auditoria, com autor, data, antes, depois e motivo.
- [ ] CA-08 A revisão mostra, no topo, onde a consulta foi transcrita e analisada e o que acontece com o áudio.
- [ ] CA-09 Trechos cujo áudio não pode ser ouvido mostram o motivo, sem esconder o horário nem o texto.
- [ ] CA-10 Membros sem permissão veem a configuração em modo leitura.
- [ ] CA-11 Tudo segue o padrão de design obrigatório, cabe em 320 px sem scroll horizontal e existe em PT, EN e ES.

## 7. Telas e comportamento

### 7.1 Configurações da conta → cartão "Análise das consultas por IA"

- Título "Análise das consultas por IA". Texto: "Escolha quais IAs podem analisar as consultas e onde o áudio é transcrito."
- **Chip "IA na nuvem"** (`cloud`): "Análise mais completa. Envia o texto da consulta, e o áudio se a transcrição for na nuvem."
  - Quando marcado, logo abaixo e recuado 16px, o bloco **"Transcrição do áudio"** com duas pílulas de escolha:
    - "Na nuvem" — "Mais precisa, separa quem falou. O áudio vai ao serviço de transcrição."
    - "No aparelho" — "O áudio não sai do aparelho. Menos precisa com ruído e leva alguns minutos por consulta."
- **Chip "IA do aparelho"** (`cpu`): "Funciona sem internet. Nada sai do aparelho."
  - Travado quando a transcrição é no aparelho: ícone `lock` e nota "Necessária para transcrever no aparelho".
- **Linha de sistema** no fim do cartão, resumindo em uma frase o que vale agora, por exemplo:
  - "Com internet: transcrição e análise na nuvem · Sem internet: no aparelho"
  - "Com internet: transcrição no aparelho, análise na nuvem · Sem internet: no aparelho"
  - "Sempre no aparelho"

### 7.2 Configurações da conta → cartão "Guarda do áudio"

- Título "Guarda do áudio". Texto: "Onde o áudio das consultas fica depois de gravado."
- Três pílulas de escolha:
  - "Cifrado na nuvem do Ausculta" — "Cópia de segurança e escuta em qualquer aparelho da equipe. Prazo de guarda: [a definir com o jurídico]."
  - "Apagar da nuvem após a aprovação" — "Até aprovar, funciona como acima. Depois, o áudio é apagado; o texto e a trilha de auditoria ficam."
  - "Só no aparelho" — "O áudio nunca vai para a nuvem. Não há cópia de segurança: se o aparelho for perdido ou trocado, o áudio se perde, e ninguém o ouve em outro aparelho."
- Sob "Só no aparelho", quando a transcrição estiver na nuvem: nota laranja "A transcrição passará para 'no aparelho'."

### 7.3 Diálogos de mudança

Usam o diálogo de confirmação do protótipo, na variante laranja (atenção).

**Mudança que remove capacidade.** Título no formato "Transcrever no aparelho?", "Apagar o áudio após a aprovação?", "Guardar o áudio só no aparelho?" ou "Desativar a IA na nuvem?". Corpo:
- **Consequências**, em lista curta, específicas da mudança. Exemplos:
  - Transcrever no aparelho: "A transcrição fica menos precisa com ruído." · "Cada consulta leva alguns minutos e usa mais bateria." · "A separação de quem falou depende da voz cadastrada do veterinário." · "Cada aparelho da equipe precisa ter a IA do aparelho instalada."
  - Apagar após a aprovação: "Depois de aprovar, ninguém poderá ouvir os trechos da consulta." · "A exportação deixa de incluir o áudio das consultas aprovadas."
  - Só no aparelho: "Sem cópia de segurança do áudio." · "O áudio só pode ser ouvido no aparelho que gravou." · "Refazer a análise só é possível nesse aparelho."
  - As consequências de desativar uma IA continuam as do PRD de captura e IA.
- **Justificativa obrigatória**: pílulas "Política de dados da clínica", "Exigência de cliente ou contrato", "Orientação jurídica", "Qualidade da análise", "Outro" (abre texto obrigatório).
- Primário "Confirmar mudança" (habilitado só com a justificativa) e secundário "Cancelar". Ao cancelar, tudo volta como estava.

**Mudança que devolve capacidade** (marcar uma IA, voltar a transcrever na nuvem, voltar a guardar na nuvem): diálogo simples, sem justificativa. Ao voltar para a guarda na nuvem, o texto avisa: "Vale para as próximas consultas. Áudios já apagados não voltam."

**Tentativa de desmarcar a última IA:** sem diálogo; faixa laranja abaixo do chip: "Mantenha pelo menos uma IA ativa. Sem IA, o Ausculta não consegue gerar o SOAP."

### 7.4 Antes e durante o processamento

- **Consentimento:** linha de sistema discreta acima do texto de LGPD, com ícones de 14px, refletindo a configuração. Exemplos: "Transcrição e análise na nuvem · áudio cifrado na nuvem", "Transcrição no aparelho · análise na nuvem · áudio só no aparelho". Não acrescenta toque.
- **Processando:** as etapas mostram onde cada uma roda: "Transcrevendo no aparelho…", depois "Analisando na nuvem…". Na transcrição no aparelho, a tela avisa: "Pode levar alguns minutos. Você pode atender outro paciente enquanto isso." (o atalho já existe no protótipo).

### 7.5 Revisão SOAP

- Linha de sistema no topo, antes da identificação do paciente, com ícones de 14px e texto de 13px cinza: "Transcrito no aparelho · analisado na nuvem · áudio apagado após a aprovação".
- Tocar na linha abre uma folha inferior curta com o detalhe e o link "Ver na Central de Confiança".
- "Refazer análise da IA" segue a configuração: o subtítulo diz onde a nova análise vai rodar.

### 7.6 Áudio indisponível

- **Após a aprovação, com "Apagar da nuvem após a aprovação":** no prontuário, a consulta mostra o selo cinza "Áudio apagado". Nas frases, o carimbo de ouvir dá lugar ao horário do trecho em IBM Plex Mono, sem ação, e um toque mostra: "Áudio apagado após a aprovação, conforme a configuração da conta."
- **Com "Só no aparelho", em outro aparelho:** selo cinza "Áudio no aparelho que gravou" e o mesmo comportamento das frases, com o texto "O áudio desta consulta fica só no aparelho de [nome do veterinário]."
- O texto do SOAP, os horários e a trilha de auditoria continuam sempre visíveis.

### 7.7 Consultas aguardando análise

Mantém o comportamento da seção 7.11 do PRD de captura e IA: diálogo "Sem internet para analisar" ao encerrar offline numa conta "Só nuvem", cartão no Painel com "N consultas aguardando análise da IA" e carimbo "Analisar", selo "Aguardando análise" no prontuário.

### 7.8 Histórico da configuração (depois)

- No fim dos dois cartões, link de texto "Ver mudanças" que abre a lista das mudanças: data, autor, de → para, motivo.
- Mesmo conteúdo da trilha de auditoria, filtrado por esta configuração.

### 7.9 Modo leitura

Para quem não é dono nem administrador: os cartões aparecem com os controles desabilitados, a linha de sistema de resumo e o texto "Definido pelo dono da conta".

## 8. Design system

Usar o design system do protótipo e o padrão de design obrigatório (`padrao-de-design.md`):
- chip de estado para as IAs, pílula de escolha para transcrição e guarda;
- laranja para atenção e mudanças com consequência; cinza para áudio indisponível; nunca vermelho, porque nenhuma destas escolhas é risco ao paciente nem perda inesperada de dados;
- linha de sistema para mostrar a configuração nas telas da consulta, nunca faixa colorida no corpo;
- diálogo de confirmação do protótipo; IBM Plex Mono em horários; Lucide v0.460.0.

## 9. Fora deste documento

- **Prazo de guarda do áudio na nuvem:** pendente com o jurídico; a tela mostra "[a definir com o jurídico]".
- **Como o áudio é cifrado e onde fica a chave:** arquitetura.
- **Como a configuração chega a cada aparelho e é cumprida offline:** sincronização (backend).
- **Textos da Central de Confiança para cada combinação:** no PRD da Central de Confiança.
- **Escolha do provedor de transcrição:** teste de bancada.
