# Prompt — Claude Design: alinhar o discurso a onde os dados realmente estão

> Para colar no projeto do Ausculta no Claude Design, sobre o protótipo atual (handoff de 01/10/2026) e junto do `prd-design-ausculta-captura-e-ia.md`.
> Objetivo: nenhum texto da landing, do app ou dos documentos legais pode prometer algo diferente do que a stack do piloto faz com os dados.

---

## 1. Contexto

O Ausculta vai para um piloto com infraestrutura concentrada na Vercel. Vários textos do protótipo foram escritos antes dessa decisão e hoje prometem mais do que o piloto entrega, principalmente que "tudo roda no dispositivo". Um veterinário ou um jurídico de clínica que leia a Central de Confiança precisa encontrar exatamente onde estão o áudio, o texto e o prontuário.

## 2. A realidade do piloto (fonte de verdade para todos os textos)

| Dado | Onde fica no piloto | Região |
|---|---|---|
| Áudio da consulta | Primeiro no aparelho (cifrado). Depois, no armazenamento de arquivos da Vercel (Vercel Blob), cifrado antes do envio | Região padrão da conta da Vercel: **[Estados Unidos — confirmar no painel]** |
| Prontuários, pacientes, responsáveis, auditoria | Banco de dados Neon (Postgres), contratado pela Vercel | Mesma região padrão: **[confirmar]** |
| Anexos (fotos, vídeos, PDFs) | Vercel Blob | Mesma região padrão: **[confirmar]** |
| Transcrição na nuvem | Provedor de transcrição **[a definir]** | **[a definir]** |
| Análise do texto (extração e redação do SOAP) | Anthropic (Claude) | **[a confirmar]** |
| Análise sem internet, ou em contas "só no aparelho" | No próprio aparelho; nada é enviado | Aparelho do veterinário |
| Região definitiva, por país da conta | **Pendente** | Será publicada antes do lançamento |

Regras que decorrem da tabela:
- Com internet e com a IA na nuvem ativa, **o áudio e o texto saem do aparelho**. Os textos nunca podem dizer o contrário.
- A IA do aparelho é usada sem internet e em contas que desativaram a IA na nuvem (configuração "IAs usadas nas análises", do PRD de captura e IA).
- No piloto, os dados ficam **fora do Brasil**. Isso precisa aparecer escrito na Central de Confiança e na Política de privacidade, sem eufemismo.
- Promessas que dependem de contrato ainda não assinado aparecem com **[a confirmar]**, nunca como fato: não treinar modelos, retenção do provedor, criptografia AES-256 em repouso, backup diário.

## 3. O que mudar, tela por tela

Use os textos abaixo como base; ajuste o tom ao da tela, sem mudar o fato.

### 3.1 Landing (`index.html`)

| Texto atual | Problema | Texto novo |
|---|---|---|
| "O Ausculta ouve a consulta, filtra latidos e maquinário e transcreve no próprio dispositivo." | Com internet, a transcrição é na nuvem | "O Ausculta ouve a consulta, filtra latidos e maquinário e transcreve: na nuvem quando há internet, no próprio aparelho quando não há." |
| "Transcrição rodando localmente no dispositivo" (demo) | Idem | "Transcrevendo a consulta" |
| "Grave no estábulo ou no pasto, sem sinal. O SOAP fica pronto no dispositivo e sincroniza quando a rede voltar." | Correto só sem internet; manter, deixando claro o "sem sinal" | "Grave no estábulo ou no pasto, sem sinal. Sem internet, o Ausculta analisa no próprio aparelho e sincroniza quando a rede voltar." |
| Trecho que termina em "no seu dispositivo, mesmo sem internet" | Sugere que tudo é local | Reescrever: "…e funciona mesmo sem internet, analisando no próprio aparelho." |
| Seção de segurança: "Prontuários guardados com segurança" | Sem dizer onde | Acrescentar uma linha: "Onde seus dados ficam: veja a Central de Confiança." com link |

Acrescentar na seção de segurança um item novo, no mesmo componente dos existentes:
- Título: "Você escolhe a IA"
- Texto: "A clínica decide se as consultas podem ser analisadas na nuvem, só no aparelho ou nos dois."

### 3.2 App: Central de Confiança

**Cartão "O que guardamos"** (substitui "Hospedagem e regiões dos servidores: a confirmar com a SIQ antes do lançamento."):
- "Durante o piloto, os dados ficam nos servidores da Vercel e da Neon, na região [Estados Unidos — confirmar]. A região definitiva, por país, está pendente e será publicada antes do lançamento."
- Selo "Piloto" (laranja, atenção) ao lado do título do cartão.

**Cartão "Quem processa seus dados"** (do PRD de captura e IA, seção 7.9), agora com a hospedagem nomeada:

| Finalidade | Fornecedor | Região | Retenção |
|---|---|---|---|
| Hospedagem, banco e arquivos | Vercel (com Neon) | [Estados Unidos — confirmar] | Conforme "O que guardamos" |
| Transcrição do áudio na nuvem | [a definir] | [a definir] | [a confirmar] |
| Análise do texto da consulta | Anthropic (Claude) | [a confirmar] | [a confirmar] |

Texto de apoio conforme a configuração da conta (já definido no PRD de captura e IA), mais uma linha fixa:
- "No piloto, os dados ficam fora do Brasil. Essa transferência segue as garantias da LGPD descritas na Política de privacidade."

**Compromissos:** o item "Os prontuários não são vendidos nem usados para treinar modelos de terceiros." ganha o complemento "[a confirmar nos contratos com os fornecedores]" até os contratos estarem assinados.

### 3.3 App: Processando e Revisão

| Texto atual | Texto novo |
|---|---|
| "Assim que houver internet, o processamento passa para a nuvem e termina na hora. A IA do dispositivo só é usada quando você está offline." | Varia pela configuração da conta: **nuvem e aparelho:** "Com internet, a análise é feita na nuvem. Sem internet, no próprio aparelho." · **só nuvem:** "A análise é feita na nuvem. Sem internet, a consulta fica guardada até a conexão voltar." · **só aparelho:** "A análise é feita no próprio aparelho. Nada é enviado para IAs na nuvem." |
| "Internet de volta · o processamento passou para a nuvem" | Manter só quando a IA na nuvem estiver ativa |

### 3.4 App: Ajuda (perguntas frequentes)

| Pergunta | Resposta atual | Resposta nova |
|---|---|---|
| Funciona sem internet? | "Sim. A gravação e a transcrição rodam no dispositivo. O prontuário fica salvo localmente e sincroniza com a nuvem quando a conexão voltar." | "Sim. Sem internet, a gravação e a análise acontecem no próprio aparelho, e o prontuário sincroniza quando a conexão voltar. Com internet, a análise é feita na nuvem, a menos que a clínica tenha escolhido usar só o aparelho." |
| Nova: "Onde ficam meus dados?" | — | "Durante o piloto, nos servidores da Vercel e da Neon, na região [Estados Unidos — confirmar]. A lista completa de fornecedores e regiões está na Central de Confiança." |

### 3.5 Documentos legais (`legal-docs.js`)

| Documento | Texto atual | Texto novo |
|---|---|---|
| Política de privacidade | "Servidores em [país e região a confirmar]. Transferências internacionais, quando ocorrerem, seguem as garantias previstas na LGPD." | "Durante o piloto, os servidores ficam em [Estados Unidos — região a confirmar], contratados da Vercel e da Neon. Essa transferência internacional segue as garantias previstas na LGPD [mecanismo a definir pelo jurídico]. A região definitiva será informada antes do lançamento." |
| Relatório de segurança | "Hospedagem em [provedor, país e região a confirmar]…" | "Hospedagem na Vercel, com banco Neon, na região [confirmar]…" e manter "[a confirmar]" em criptografia em repouso e backup até a verificação |
| Relatório de segurança | "A transcrição pode rodar no próprio dispositivo. Quando usa provedores de IA na nuvem, o contrato proíbe retenção para treino e uso próprio dos dados." | "A análise roda no próprio aparelho sem internet ou quando a clínica desativa a IA na nuvem. Quando usa provedores de IA na nuvem, os contratos [a confirmar] proíbem retenção para treino e uso próprio dos dados." |

Atualizar EN e ES no mesmo arquivo, com o mesmo conteúdo.

### 3.6 Conta: criação

Abaixo do aceite dos Termos, linha de 13px cinza: "Durante o piloto, os dados ficam fora do Brasil. Saiba onde na Central de Confiança." com link.

## 4. Regras para todas as telas

- Nunca escrever "no Brasil", "local" ou "no dispositivo" sem a condição que torna isso verdade (sem internet, ou conta "só no aparelho").
- Região, fornecedor ou garantia ainda não confirmados aparecem entre colchetes, como no restante do protótipo.
- O selo "Piloto" marca tudo o que muda no lançamento; ele usa o selo de status do padrão de design, na cor laranja.
- Seguir o padrão de design obrigatório (`padrao-de-design.md`) e manter PT, EN e ES em `i18n.js`.

## 5. Critérios de aceite

- [ ] Nenhuma frase da landing, do app ou dos documentos legais diz que o áudio ou o texto ficam só no aparelho sem a condição correspondente.
- [ ] A Central de Confiança diz, sem rolar além do primeiro cartão, que no piloto os dados ficam fora do Brasil e que a região definitiva está pendente.
- [ ] O cartão "Quem processa seus dados" nomeia Vercel (com Neon) e Anthropic; transcrição aparece como "[a definir]".
- [ ] O texto de Processando muda conforme a configuração "IAs usadas nas análises".
- [ ] Toda promessa que depende de contrato está marcada como "[a confirmar]".
- [ ] Os três idiomas têm o mesmo conteúdo.

## 6. Fora deste prompt

- O mecanismo jurídico da transferência internacional (cláusulas, consentimento ou outra base): decisão do jurídico.
- A região definitiva por país: pendente na stack.
- O fornecedor de transcrição: sai do teste de bancada.
