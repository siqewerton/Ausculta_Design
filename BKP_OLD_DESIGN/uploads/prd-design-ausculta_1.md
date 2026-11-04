# PRD de Design — Ausculta

> Documento único para colar no Claude Design ao criar o projeto do Ausculta — substitui o hábito de colar o prompt e depois garimpar manualmente trechos do Discovery/PRD. Junta: o prompt de protótipo já validado + as seções do Discovery relevantes para UX + os trechos do PRD "oficial" que descrevem comportamento visível (não os de arquitetura/backend). Formato definido na seção 15 de `claude/conhecimento-sdd_unificado.md` — leia aquela seção se estiver criando este tipo de artefato pela primeira vez para outro produto.

---

## 1. Contexto e proposta

Médicos-veterinários gastam até 40% do tempo útil da consulta preenchendo prontuário manualmente — pior em campo (rural, domiciliar) ou hospitais sem conectividade. O Ausculta é um AI Scribe + PIMS local-first, operável 100% offline, que capta a consulta, filtra ruído e estrutura o SOAP no dispositivo. É um produto companheiro do Long Life Pet, mas tecnicamente e visualmente independente — precisa se vender sozinho para veterinários que talvez nunca usem o Long Life Pet.

## 2. Público e personas

- **Dr. Marcelo** — veterinário equino, visitante de primeira vez, nunca usou nenhum PIMS (anota em caderno de campo). Chega pela landing por indicação de outro veterinário, se reconhece no bloco "não uso nenhum PIMS hoje", e segue para o cadastro standalone sem precisar entender a arquitetura por trás.
- **Carlos** — médico-veterinário volante, 29 anos, já usa o Long Life Pet como fonte de agenda e prontuário. Jornada: abre o app antes da visita → prontuário do pet já carregado (modo integrado) → grava a consulta em campo, sem internet → revisa e aprova o SOAP → a nota volta ao prontuário do pet no Long Life Pet.
- **Dra. Renata** — veterinária de hospital de alta complexidade, sem conta no Long Life Pet, já usa um PIMS de terceiros — entra pelo bloco "uso outro sistema".

## 3. Fluxos de usuário

- Como veterinário que ainda não conhece o produto, chego pela landing, reconheço minha situação (uso Long Life Pet / uso outro PIMS / não uso nenhum) num dos três blocos, e sigo direto para o onboarding certo, sem preencher formulário genérico.
- Como veterinário volante, gravo a consulta sem internet e recebo o SOAP estruturado, com alerta automático se a dose sugerida ultrapassar o limite para a espécie/peso do paciente.
- Como veterinário, clico em qualquer frase do SOAP gerado e vejo o trecho exato do áudio que a originou (Linked Evidence), útil numa auditoria.

## 4. Modos de operação e o que aparece em cada um

| Modo | Como funciona | O que muda na tela |
|---|---|---|
| Standalone | Paciente cadastrado manualmente no próprio Ausculta; requer conta própria do Ausculta (criada na tela 0b) para sincronizar entre dispositivos. | Sem badge de origem; leva pela tela 0b antes do Consentimento. |
| Integrado ao Long Life Pet | Prontuário do pet é pré-carregado antes da visita agendada; nota aprovada retorna automaticamente ao prontuário do pet. | Badge "via Long Life Pet" no cabeçalho das telas seguintes. |
| Integrado a PIMS terceiro | Conecta via API REST/GraphQL (FHIR-vet) e servidor MCP nativo ao sistema já usado pela clínica. | Badge "via [PIMS conectado]" no cabeçalho das telas seguintes. |

## 5. O que priorizar nesta entrega (Onda 1)

O relatório de mercado (players internacionais cloud-dependentes, mercado brasileiro com IA clínica ainda incipiente) apontou uma janela competitiva real, e priorizou três features de baixo esforço e alta diferenciação para esta primeira entrega — são o que deve ganhar destaque visual no protótipo, não tratamento de rodapé:

1. **Linked Evidence** — cada frase do SOAP rastreável ao trecho de áudio que a originou.
2. **Alerta farmacológico/dose** — aviso quando a dose sugerida ultrapassa o limite por espécie/peso.
3. **Templates por espécie** (referência para próxima rodada de telas, não obrigatório nesta entrega de protótipo).

Voice-to-Invoice e diagnóstico assistido ficam fora desta rodada (Onda 2/backlog) — não é necessário prever espaço para eles no protótipo agora.

## 6. Critérios de aceite visíveis (o protótipo precisa demonstrar isto)

- [ ] A landing apresenta três blocos de entrada (Long Life Pet / outro PIMS / standalone), cada um com CTA próprio, sem exigir login para ler a proposta de valor.
- [ ] Nenhuma nota entra no prontuário sem o gesto explícito "Aprovar e Sincronizar".
- [ ] Toda frase do SOAP gerado é clicável e abre o trecho de áudio de origem (Linked Evidence).
- [ ] Um alerta de dose é emitido quando o valor sugerido ultrapassa o limite por espécie/peso, e o veterinário pode aceitar ou ajustar.

## 7. Telas e comportamento (instrução de execução)

Você é um Engenheiro de Frontend Sênior, Especialista em UX Médico e Copywriter de produto B2B.

Crie um protótipo interativo em React usando Tailwind CSS para o **Ausculta** — um PWA de Prontuário Veterinário (PIMS) com AI Scribe. O design deve ser mobile-first, acessível para uso com luvas e em ambientes externos (alto contraste, todos os alvos de toque com no mínimo 48×48px / `p-4`). Use Lucide React para ícones e priorize legibilidade médica com tipografia clean e espaçamentos consistentes (`gap-4`, `p-4`). A landing page pode usar uma paleta mais expressiva (gradientes sutis, tipografia maior); as telas de uso clínico devem manter alto contraste e sobriedade.

O aplicativo tem 4 telas principais navegáveis, mais um passo intermediário exclusivo de um dos fluxos (0b, logo abaixo):

### 0. LANDING PAGE (pública, sem login — a porta de entrada do produto)

Esta é a tela mais importante para conversão: precisa atrair três públicos diferentes com a mesma proposta central, sem forçar nenhum deles a se explicar duas vezes.

- **Hero**: nome "Ausculta", headline curta que carrega a metáfora do produto (ex.: "O residente clínico que ouve, documenta e desaparece") e subheadline objetiva sobre o que o produto faz (transcreve a consulta em SOAP, 100% offline).
- **Três cards de entrada, lado a lado (ou empilhados em mobile)**, cada um com ícone, um título de identificação, uma frase de valor específica para aquele público e um CTA próprio:
  1. **"Já uso o Long Life Pet"** — "Conecte com um clique. Seu prontuário chega pronto antes da visita, e a nota volta sozinha depois." CTA: "Conectar ao Long Life Pet".
  2. **"Uso outro sistema (PIMS)"** — "Não troque de sistema. O Ausculta se pluga ao seu PIMS atual via integração segura, sem migração." CTA: "Conectar meu PIMS".
  3. **"Não uso nenhum PIMS hoje"** — "Comece só com o Scribe. Prontuário, agenda básica e faturamento simples, sem depender de mais nada." CTA: "Começar agora".
- **Barra de diferenciais** (4 ícones curtos): Offline-first / Hub agnóstico (MCP) / Proteção jurídica (evidência ligada ao áudio) / Alerta de dose por espécie.
- **Rodapé simples**: uma linha de confiança ("Seus dados clínicos nunca ficam presos a um único sistema") e um link discreto "Já tem conta? Entrar".

Cada card, ao ser clicado, leva à tela de Consentimento já no contexto certo (ex.: se veio do card 1, o cabeçalho da próxima tela já mostra "via Long Life Pet") — **exceto o card 3**, que passa antes pela tela 0b abaixo.

### 0b. CRIAR CONTA / ENTRAR (somente no fluxo do card "Não uso nenhum PIMS hoje")

Os cards 1 e 2 nunca passam por aqui — eles herdam a conta já validada do Long Life Pet ou do PIMS conectado. Mas quem clica em "Começar agora" (card 3) não tem nenhum sistema por trás: sem uma conta própria do Ausculta, o prontuário ficaria preso a um único aparelho, o que inviabiliza o uso em qualquer clínica com mais de um profissional ou dispositivo. Por isso, este card leva a uma tela curta de conta antes do Consentimento:

- Título objetivo: "Crie sua conta Ausculta" — subheadline de uma linha: "É o que guarda seus prontuários e permite abrir no celular, no tablet da recepção, ou onde você precisar."
- Campos: e-mail, senha, e um campo opcional "CRMV (opcional nesta versão)".
- Um link secundário "Já tem conta? Entrar" (mesmo destino do rodapé da landing) para quem está reinstalando ou trocando de aparelho.
- Botão grande "Criar conta e continuar" leva à tela de Consentimento (sem badge de origem, já que é modo standalone).
- Rodapé discreto: "Seus dados ficam nesta conta, isolados de qualquer outra clínica — nunca compartilhados sem sua ação."

### 1. CONSENTIMENTO (antes de gravar — obrigatório, não pule esta tela)

Tela curta e objetiva confirmando que o tutor (ou a clínica, em atendimento sem tutor presente) autorizou a gravação da consulta para fins de prontuário. Um botão grande "Confirmar e iniciar" libera a tela de gravação; sem essa confirmação, o botão de gravar na tela 2 fica desabilitado. Mostre a origem do contexto (badge "via Long Life Pet" / "via [PIMS conectado]" / sem badge no modo standalone).

### 2. TELA DE GRAVAÇÃO (ACTIVE SCRIBE)

- Top bar mostrando o paciente ("Buster — Golden Retriever") e a tag de origem, se aplicável.
- Badge de rede/sincronização: "Offline Mode" em tom âmbar sem rede; "Sincronizando…" / "Sincronizado" quando a conexão volta.
- No centro inferior, um FAB vermelho pulsante simulando gravação ativa.
- Visualizador de onda sonora (waveform simulado).
- Rótulo discreto: "Transcrição rodando localmente no dispositivo".

### 3. TELA DE AUDITORIA E EDIÇÃO (SOAP REVIEW)

- Player de áudio fixo no topo com play/pause.
- 4 cartões editáveis SOAP em português — **Subjetivo, Objetivo, Avaliação, Plano** — `bg-white`, `border-slate-200`, `rounded-xl`, sombra suave.
- **Linked Evidence**: cada frase dentro dos cartões é clicável (sublinhado pontilhado sutil ao passar o mouse/toque) e, ao tocar, destaca no player o trecho exato do áudio que originou aquele texto — simule esse comportamento com um estado visual de "reproduzindo trecho X".
- **Alerta farmacológico/dose**: se o texto do Plano mencionar um medicamento, mostre um chip de alerta amarelo/laranja abaixo do cartão ("⚠ Dose sugerida acima do limite para o peso do paciente — revisar") como exemplo do comportamento, com opção "Aceitar" ou "Ajustar".
- Aviso acima dos cartões: "Rascunho gerado por IA — revise antes de aprovar. A IA não diagnostica nem prescreve."
- Botão verde vibrante no final: **"Aprovar e Sincronizar Prontuário"**. Ao clicar, mostre o destino: "Prontuário atualizado no Long Life Pet" / "Sincronizado com [PIMS conectado]" / "Sincronizado com sua conta Ausculta — disponível em qualquer dispositivo" (standalone).

## 8. Design system

Cole `ausculta-design-system.md` inteiro no Claude Design **antes** deste documento — é a fonte vigente de tokens (cor, tipografia, espaçamento, raio, sombra). O design system publicado como Artifact (`https://claude.ai/artifact/UtWF5e4CFMy7sgeyammtmX`) tem o mesmo conteúdo, mas não aparece na lista do Claude Design; não dependa dele até isso ser resolvido.

## 9. Fora deste documento (fica no PRD oficial e no Discovery, não repita aqui)

Modelo de consistência CRDT por domínio de dado (LWW/OR-Set/MVR), requisitos funcionais de backend (RF-001 a RF-012), interoperabilidade MCP/FHIR-vet, ADRs, política de retenção de áudio, e o critério de aceite de merge entre dispositivos. Nada disso muda o que a tela mostra — é contrato para quem for construir de verdade (Claude Code / Lovable), não para o protótipo. Ver `claude/prd-ausculta.md` e o Discovery — Ausculta.docx.
