# PRD de Design — Ausculta: Central de Confiança e landing alinhadas ao tratamento real dos dados

> Para colar no projeto do Ausculta no Claude Design, sobre o protótipo atual (handoff de 01/10/2026), junto do `prd-design-ausculta-configuracao-ia-e-audio.md`.
> **Substitui** o `prompt-claude-design-ausculta-dados-na-nuvem.md` e a seção 7.9 ("Quem processa seus dados") do `prd-design-ausculta-captura-e-ia.md`.
> Segue o template do PRD de Design (9 seções).

---

## 1. Contexto e proposta

**Problema.** Vários textos do protótipo prometem mais privacidade do que o piloto entrega, como "transcreve no próprio dispositivo", quando, com internet, a transcrição acontece na nuvem. Além disso, a conta agora escolhe onde o áudio é transcrito e onde fica guardado, e a Central de Confiança não mostra o que essa escolha significa. Uma clínica que não aceita áudio em serviços externos precisa conseguir confirmar, por escrito, que a configuração dela é cumprida.

**Solução.** A Central de Confiança passa a mostrar, no topo, como **esta conta** trata os dados: onde o áudio é transcrito, onde o texto é analisado, onde o áudio fica guardado e em que região. Fornecedores, regiões e compromissos aparecem como são no piloto, com o que ainda falta confirmar marcado. A landing deixa de prometer processamento local incondicional e passa a vender a escolha.

## 2. Público e personas

- **Dono da clínica ou responsável jurídico.** Lê a Central de Confiança antes de contratar ou ao responder a um cliente. Quer fatos: quem, onde, por quanto tempo.
- **Veterinário da equipe.** Abre a Central quando um responsável pergunta para onde vai a gravação.
- **Visitante da landing.** Decide se confia o suficiente para criar a conta.

## 3. Fluxos de usuário

1. Como dono da clínica, quero ver no topo da Central de Confiança como a minha conta trata o áudio e o texto das consultas.
2. Como responsável jurídico, quero a lista de fornecedores que tocam os dados, a região e a retenção, sabendo quais são usados pela minha conta.
3. Como veterinário, quero uma resposta simples para dar ao responsável: "a gravação fica onde?".
4. Como visitante da landing, quero saber que posso escolher entre nuvem e aparelho antes de criar a conta.
5. Como qualquer usuário, quero saber o que vale só no piloto e o que muda no lançamento.

## 4. Modos e variações

### 4.1 A realidade do piloto (fonte de verdade para todos os textos)

| Dado | Onde fica | Região |
|---|---|---|
| Prontuários, pacientes, responsáveis, auditoria | Banco Neon, contratado pela Vercel | Região padrão da conta da Vercel: **[Estados Unidos — confirmar no painel]** |
| Anexos | Vercel Blob | Mesma região **[confirmar]** |
| Áudio guardado | Conforme a configuração da conta: Vercel Blob (cifrado antes do envio) ou só no aparelho | Mesma região **[confirmar]**, ou o aparelho |
| Áudio para transcrição na nuvem | Provedor de transcrição **[a definir]** | **[a definir]** |
| Texto para análise na nuvem | Anthropic (Claude) | **[a confirmar]** |
| Análise sem internet ou "só aparelho" | O próprio aparelho | Aparelho do veterinário |
| Região definitiva, por país | **Pendente** | Publicada antes do lançamento |

### 4.2 O que muda por configuração da conta

O cartão "Como esta conta trata os dados" (7.1) monta três linhas a partir da configuração:

| Configuração | Transcrição do áudio | Análise do texto | Guarda do áudio |
|---|---|---|---|
| Padrão | Na nuvem, com internet (provedor de transcrição); no aparelho, sem internet | Na nuvem, com internet (Anthropic); no aparelho, sem internet | Cifrado na nuvem do Ausculta |
| Transcrição no aparelho | Sempre no aparelho | Na nuvem, com internet; no aparelho, sem internet | Conforme a escolha de guarda |
| Só nuvem | Na nuvem; sem internet, a consulta espera | Na nuvem | Conforme a escolha de guarda |
| Só aparelho | Sempre no aparelho | Sempre no aparelho | Conforme a escolha de guarda |
| Guarda "apagar após a aprovação" | — | — | Cifrado na nuvem até a aprovação; depois, apagado |
| Guarda "só no aparelho" | Sempre no aparelho | — | Só no aparelho que gravou, sem cópia de segurança |

## 5. O que priorizar nesta entrega

| Prioridade | O quê |
|---|---|
| **Essencial** | Cartão "Como esta conta trata os dados" (7.1), cartão "Onde os dados ficam" (7.2), "Quem processa seus dados" com marcação por conta (7.3), correções da landing (7.6) |
| **Recomendado** | Compromissos com "[a confirmar]" (7.4), Ajuda (7.7), documentos legais (7.8) |
| **Depois** | Linha na criação de conta (7.9) |

## 6. Critérios de aceite visíveis

- [ ] CA-01 O primeiro cartão da Central de Confiança diz como esta conta trata transcrição, análise e guarda do áudio, e muda quando a configuração muda.
- [ ] CA-02 A Central diz, sem rolar além do segundo cartão, que no piloto os dados ficam fora do Brasil e que a região definitiva está pendente.
- [ ] CA-03 "Quem processa seus dados" marca cada fornecedor como "Usado nesta conta" ou "Não usado nesta conta".
- [ ] CA-04 Numa conta com transcrição no aparelho, o provedor de transcrição aparece como "Não usado nesta conta".
- [ ] CA-05 Nenhuma frase da landing, do app ou dos documentos legais diz que o áudio ou o texto ficam no aparelho sem a condição correspondente.
- [ ] CA-06 Toda promessa que depende de contrato ou verificação está marcada "[a confirmar]".
- [ ] CA-07 Tudo segue o padrão de design obrigatório, cabe em 320 px sem scroll horizontal e existe em PT, EN e ES.

## 7. Telas e comportamento

### 7.1 Central de Confiança → cartão "Como esta conta trata os dados" (novo, primeiro cartão)

- Título "Como esta conta trata os dados". Selo laranja "Piloto" ao lado.
- Três linhas, cada uma com ícone de 18px, rótulo em 600 e texto montado pela tabela 4.2:
  - `audio-lines` **Transcrição do áudio:** "Na nuvem quando há internet; no aparelho quando não há."
  - `file-text` **Análise do texto:** "Na nuvem quando há internet; no aparelho quando não há."
  - `hard-drive` **Guarda do áudio:** "Cifrado na nuvem do Ausculta."
- Rodapé de 13px: "Definido em Configurações da conta." Dono e administrador veem o carimbo neutro "Alterar".

### 7.2 Central de Confiança → cartão "Onde os dados ficam" (substitui "Hospedagem e regiões: a confirmar")

- Texto: "Durante o piloto, os dados ficam nos servidores da Vercel e da Neon, na região [Estados Unidos — confirmar]. A região definitiva, por país, está pendente e será publicada antes do lançamento."
- Linha seguinte: "No piloto, os dados ficam fora do Brasil. Essa transferência segue as garantias da LGPD descritas na Política de privacidade."
- Se a guarda do áudio for "só no aparelho", acrescenta: "O áudio desta conta não é guardado nesses servidores."

### 7.3 Central de Confiança → "Quem processa seus dados"

| Finalidade | Fornecedor | Região | Retenção | Nesta conta |
|---|---|---|---|---|
| Hospedagem, banco e arquivos | Vercel (com Neon) | [Estados Unidos — confirmar] | Conforme "O que guardamos" | Usado |
| Transcrição do áudio na nuvem | [a definir] | [a definir] | [a confirmar: apagado após transcrever] | Usado / Não usado |
| Análise do texto da consulta | Anthropic (Claude) | [a confirmar] | [a confirmar] | Usado / Não usado |

- A última coluna usa o selo de status: verde "Usado" ou cinza "Não usado".
- Em telas estreitas, a tabela vira uma lista de cartões, um por fornecedor, sem scroll horizontal.
- Texto de apoio: "Quando a análise acontece no aparelho, nada é enviado a esses fornecedores de IA."

### 7.4 Central de Confiança → "O que guardamos" e "Compromissos"

- Na linha "Áudio das consultas" da tabela de retenção: "Conforme a configuração da conta: cifrado na nuvem ([prazo a definir com o jurídico]), apagado após a aprovação, ou só no aparelho."
- "Os prontuários não são vendidos nem usados para treinar modelos de terceiros" ganha o complemento "[a confirmar nos contratos com os fornecedores]".
- Promessas técnicas ainda não verificadas também levam "[a confirmar]": criptografia AES-256 em repouso nos servidores e cópia de segurança diária.

### 7.5 Processando

Os textos por configuração ficam no PRD de configuração (seção 7.4). Removem-se as frases "A IA do dispositivo só é usada quando você está offline" e "o processamento passou para a nuvem" quando não forem verdade para a conta.

### 7.6 Landing (`index.html`)

| Texto atual | Texto novo |
|---|---|
| "O Ausculta ouve a consulta, filtra latidos e maquinário e transcreve no próprio dispositivo." | "O Ausculta ouve a consulta, filtra latidos e maquinário e transcreve: na nuvem quando há internet, no próprio aparelho quando não há ou quando a clínica prefere." |
| "Transcrição rodando localmente no dispositivo" (demo) | "Transcrevendo a consulta" |
| "Grave no estábulo ou no pasto, sem sinal. O SOAP fica pronto no dispositivo e sincroniza quando a rede voltar." | "Grave no estábulo ou no pasto, sem sinal. Sem internet, o Ausculta analisa no próprio aparelho e sincroniza quando a rede voltar." |
| Trecho que termina em "no seu dispositivo, mesmo sem internet" | "…e funciona mesmo sem internet, analisando no próprio aparelho." |

**Novo bloco na seção de segurança**, no mesmo componente dos itens existentes: título "Você escolhe onde ficam os dados", com três itens curtos:
- "Transcrição na nuvem, mais precisa, ou no aparelho, sem enviar a voz."
- "Análise na nuvem, no aparelho ou nos dois."
- "Áudio guardado cifrado, apagado após a aprovação ou só no aparelho."
- Link "Veja na Central de Confiança".

### 7.7 Ajuda (perguntas frequentes)

| Pergunta | Resposta nova |
|---|---|
| Funciona sem internet? | "Sim. Sem internet, a gravação e a análise acontecem no próprio aparelho, e o prontuário sincroniza quando a conexão voltar. Com internet, a análise usa a nuvem, a menos que a clínica tenha escolhido usar só o aparelho." |
| Nova: "Para onde vai a gravação?" | "Depende da configuração da clínica: o áudio pode ser transcrito na nuvem ou no aparelho, e guardado cifrado na nuvem, apagado após a aprovação ou só no aparelho. A Central de Confiança mostra como está a sua conta." |
| Nova: "Onde ficam meus dados?" | "Durante o piloto, nos servidores da Vercel e da Neon, na região [Estados Unidos — confirmar]. A lista de fornecedores está na Central de Confiança." |

### 7.8 Documentos legais (`legal-docs.js`)

| Documento | Texto novo |
|---|---|
| Política de privacidade (servidores) | "Durante o piloto, os servidores ficam em [Estados Unidos — região a confirmar], contratados da Vercel e da Neon. Essa transferência internacional segue as garantias da LGPD [mecanismo a definir pelo jurídico]. A região definitiva será informada antes do lançamento." |
| Política de privacidade (áudio) | "O áudio pode ser transcrito por um provedor contratado ou no próprio aparelho, e guardado cifrado nos nossos servidores, apagado após a aprovação ou mantido só no aparelho, conforme a configuração escolhida pela clínica." |
| Relatório de segurança (hospedagem) | "Hospedagem na Vercel, com banco Neon, na região [confirmar]." Criptografia em repouso e backup diário com "[a confirmar]" até a verificação. |
| Relatório de segurança (IA) | "A análise roda no próprio aparelho sem internet ou quando a clínica escolhe. Quando usa provedores de IA na nuvem, os contratos [a confirmar] proíbem retenção para treino e uso próprio dos dados." |

Atualizar EN e ES com o mesmo conteúdo.

### 7.9 Criação de conta (depois)

Abaixo do aceite dos Termos, linha de 13px cinza: "Durante o piloto, os dados ficam fora do Brasil. Você escolhe onde o áudio é transcrito e guardado em Configurações da conta." com link para a Central de Confiança.

## 8. Design system

Usar o design system do protótipo e o padrão de design obrigatório (`padrao-de-design.md`):
- selo de status laranja "Piloto" para o que muda no lançamento; selos verde "Usado" e cinza "Não usado" por fornecedor;
- nenhum vermelho: transparência não é alerta de risco;
- tabelas viram listas de cartões em telas estreitas;
- PT, EN e ES em `i18n.js`.

## 9. Fora deste documento

- Mecanismo jurídico da transferência internacional e prazo de guarda do áudio: jurídico.
- Região definitiva por país e fornecedor de transcrição: pendentes na stack.
- Configuração da conta em si (telas e regras): `prd-design-ausculta-configuracao-ia-e-audio.md`.
