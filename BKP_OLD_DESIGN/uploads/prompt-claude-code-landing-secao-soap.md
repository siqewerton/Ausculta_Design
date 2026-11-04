# Prompt — Claude Code: seção "SOAP" na landing do Ausculta (v2)

> Cole este prompt no Claude Code, na raiz da pasta `design_handoff_ausculta_app/` (conteúdo do AUSCULTA_HANDOFF.zip).
> Bases: design handoff de 29/09/2026 · Discovery v3.0 · decisões de templates de 30/09/2026 · `base-conhecimento-scribe-soap-veterinario.md` (curada nesta versão: erros corrigidos e afirmações sem fonte retiradas).

---

## Papel e objetivo

Você é um engenheiro front-end sênior e redator de produto, trabalhando na landing do **Ausculta**, um AI Scribe para médicos-veterinários. O Ausculta grava a consulta com consentimento, transcreve no dispositivo (funciona offline) e gera um rascunho de prontuário **SOAP**, que o veterinário revisa e aprova.

Crie **uma nova seção na landing** (`index.html`) que convença o veterinário a experimentar o Ausculta. O argumento central:

> Você aprendeu a fazer um SOAP completo. Na correria, ele sai incompleto. O Ausculta escreve o SOAP que você faria com tempo, a partir do que você disse na consulta, e a decisão clínica continua sendo sua.

O leitor é um médico-veterinário cético, que:
- domina o SOAP e vai notar qualquer erro técnico no texto;
- tem medo de a IA inventar achados, diagnosticar por ele ou gerar risco ético-profissional;
- atende em campo, em clínica ou em hospital, muitas vezes sem internet;
- não quer trocar o sistema que já usa.

Por isso, **precisão técnica é o que convence**. Um termo clínico errado derruba a credibilidade da seção inteira.

## Antes de escrever código, leia

1. `README.md` — telas, princípios de design, tokens e regras de fidelidade.
2. `index.html` — a landing atual: estrutura, padrão de componente (template no topo, classe `Component` no fim) e seções existentes (hero, "O problema", "Por onde você começa?", "Como funciona", "Para quem", vídeos, integrações, segurança, glossário de siglas, CTA final).
3. **A demo interativa de SOAP que já existe** em `index.html` (constante `DEMO`, trechos de áudio, alerta de dose do meloxicam). A nova seção **complementa** essa demo; não a duplique. Reaproveite componente ou dados se fizer sentido.
4. `i18n.js` — dicionário PT→EN/ES. Toda string nova entra nele.
5. `tokens/*.css` e `styles.css`.

Resuma em 5 linhas o que encontrou e onde pretende inserir a seção **antes** de editar.

---

## Conhecimento de domínio: o prontuário SOAP veterinário

Base factual da seção. Não acrescente fatos clínicos, estatísticas ou referências normativas além destes.

### Método

O SOAP é a ferramenta de evolução do **prontuário orientado a problemas**, proposto por Lawrence Weed nos anos 1960 e adaptado à veterinária como **POVMR** (*Problem-Oriented Veterinary Medical Record*). O prontuário se organiza em torno de uma **lista mestre de problemas**; cada problema recebe sua própria avaliação e seu próprio plano. As quatro seções são metodologicamente separadas: o que o responsável relata não vai para o Objetivo, e interpretação clínica só entra na Avaliação.

### S — Subjetivo: o que o responsável relata

- **Queixa principal:** motivo da consulta e duração, em uma frase.
- **História da doença atual**, organizada pelo roteiro **OLDCHARTS**: início (agudo, hiperagudo, crônico), localização, duração, caracterização (ex.: tosse seca ou produtiva; vômito com alimento ou bile), fatores de piora ou melhora, progressão, frequência e horário, gravidade percebida.
- **Histórico e preventivos:** vacinação, vermifugação e controle de ectoparasitas, doenças e cirurgias prévias, reações adversas a medicamentos.
- **Alimentação e manejo:** dieta (tipo, marca, quantidade, petiscos), ambiente, acesso à rua, contato com outros animais, acesso a toxinas ou corpos estranhos.
- A linguagem leiga do responsável é registrada em termos clínicos sem mudar o sentido: "está triste" → prostração ou letargia; "comendo mal" → hiporexia; "vomitando água amarela" → êmese biliosa.

### O — Objetivo: o que é medido e observado

Só dados mensuráveis, observáveis e reprodutíveis. Nenhuma interpretação.
- **Parâmetros vitais e biométricos:** peso (e variação desde a última consulta), temperatura retal, frequência cardíaca e qualidade do pulso, frequência e padrão respiratório, mucosas, tempo de preenchimento capilar (TPC), escore de condição corporal (ECC, escala 1–9 ou 1–5), escore de dor por escala validada, estado de hidratação.
- **Exame físico por sistemas:** aparência geral e estado mental; pele e anexos; olhos, ouvidos, nariz e cavidade oral; cardiovascular; respiratório; gastrointestinal; urogenital; musculoesquelético; neurológico; linfonodos; reprodutivo; endócrino; hematológico e imunológico; outros (microchip, hérnias).
- **Exames complementares:** hemograma, bioquímica, urinálise, testes rápidos, imagem, com os valores numéricos.

### A — Avaliação: o raciocínio clínico

- **Lista de problemas**, ativos e inativos, cada um no maior nível de certeza que os dados permitem.
- **Diagnósticos diferenciais** ordenados do mais ao menos provável, com a justificativa a partir de S e O. Esquemas como o **DAMNIT-V** (degenerativo, anomalia congênita, metabólico, neoplásico ou nutricional, inflamatório ou infeccioso, trauma ou tóxico, vascular) ajudam o veterinário a não esquecer categorias.
- **Diagnóstico de trabalho**, definitivo ou "pendente de exames complementares".

### P — Plano: o que será feito

Quatro subdivisões:
- **Diagnóstico (Dx):** exames solicitados e o objetivo de cada um.
- **Terapêutico (Tx):** cada medicamento com os **6 elementos da prescrição** — fármaco, dose (mg/kg e total), via, frequência, duração e indicação.
- **Comunicação ao responsável (Cx):** o que foi explicado — prognóstico, reações adversas, restrições, manejo, sinais de alerta.
- **Acompanhamento (Mx):** data e objetivo do retorno e o que o responsável deve observar em casa.

### O prontuário como documento

O prontuário é documento médico-legal: datado, sem rasuras, assinado pelo veterinário com o número de registro profissional. Na prática ético-profissional vale a máxima **"o que não está registrado, não foi feito"**: um sistema examinado e não anotado pode ser lido como exame não feito. Por isso achados normais também precisam estar escritos.

### Variações por espécie

- Pequenos animais: ECC e escore de dor.
- Equinos: grau de claudicação (escala AAEP 0–5), testes de flexão, pulso digital.
- Bovinos e produção: produção de leite, CMT, período de carência dos fármacos; às vezes o atendimento é de um lote.
- Exóticos e silvestres: recinto, temperatura, fotoperíodo e dieta pesam muito no Subjetivo.

---

## Como o Ausculta usa esse conhecimento

Separe com rigor o que **já existe no produto** do que está **planejado**. A landing não promete o que não existe.

| Camada | O que o veterinário precisa registrar | O que o Ausculta já faz | Planejado (só com selo "Em breve") |
|---|---|---|---|
| S | Queixa, história, preventivos, manejo | Organiza o relato em frases clínicas, cada uma ligada ao trecho de áudio de onde veio | Roteiro OLDCHARTS explícito no Subjetivo |
| O | Vitais, ECC, dor, exame por sistemas, exames | O peso vira dado e alimenta o cálculo de dose; cada achado ligado ao áudio | Exame organizado por sistemas, com os sistemas não mencionados marcados como "Não mencionado — a preencher"; campos por espécie |
| A | Problemas, diferenciais, diagnóstico de trabalho | Registra as hipóteses **discutidas em consulta**, com a expressão "Hipótese discutida em consulta" | Avaliação e Plano separados por problema (POVMR) |
| P — Dx | Exames e objetivo | Ação "Pedido de exame", que fica pendente até o resultado ser anexado | — |
| P — Tx | Os 6 elementos da prescrição | Alerta de dose acima do limite para espécie e peso; alerta de alergia relatada; ambos bloqueiam a aprovação até o veterinário aceitar ou ajustar; o medicamento entra na lista do paciente ao aprovar | Verificação dos 6 elementos em cada prescrição; carência pela bula oficial |
| P — Cx | O que foi explicado ao responsável | Instruções de alta geradas do Plano, enviadas por WhatsApp ou e-mail | — |
| P — Mx | Retorno e monitoramento | Ação "Agendar retorno"; lembretes calculados no prontuário do paciente | — |
| Documento | Data, assinatura, registro profissional, sem rasuras | Consentimento registrado antes de gravar; aprovação assina com nome, CRMV, data e hora e bloqueia a consulta; correção vira nova consulta; toda edição fica na trilha de auditoria | Templates por espécie; atendimento de lote em bovinos |

### Os limites da IA (é o que desarma a objeção)

A base de conhecimento descreve um scribe que monta diferenciais e diagnóstico de trabalho. **O Ausculta não faz isso**, por decisão de produto e de compliance:
- **não diagnostica nem prescreve**: registra o raciocínio que o veterinário expressou na consulta; não cria diferencial que não foi falado;
- **não inventa dado**: nenhum parâmetro, achado ou exame sem trecho de áudio de origem;
- **não aprova**: só um veterinário com registro profissional aprova, e a IA não altera nada depois disso.

---

## O que construir

Título de trabalho: **"Você conhece o SOAP. O Ausculta escreve o seu."** Ajuste se encontrar formulação melhor, no tom da landing. Posicione depois de "Como funciona", salvo se a leitura do arquivo indicar lugar melhor; justifique.

1. **Abertura** — duas frases: o SOAP completo que se aprende versus o que sai na correria; o que muda com o Ausculta.
2. **As quatro camadas** — um cartão por letra. Na face visível: o nome, uma linha sobre o que a camada exige e uma linha sobre o que o Ausculta faz nela, com um exemplo do caso Buster (Golden Retriever, 6 anos, 32 kg, claudicação no membro pélvico esquerdo), já usado na landing:
   - S: "Responsável relata claudicação no membro pélvico esquerdo há cinco dias."
   - O: "Peso 32 kg, temperatura retal 38,6 °C." — o peso alimenta o cálculo de dose.
   - A: "Hipótese discutida em consulta: processo inflamatório articular no joelho esquerdo."
   - P: "Meloxicam 0,4 mg/kg…" — dispara o alerta (limite 0,2 mg/kg para canino de 32 kg).

   O detalhamento técnico (OLDCHARTS, sistemas do exame, DAMNIT-V, 6 elementos) fica atrás de um "Ver o que entra no S/O/A/P" que expande o cartão. O veterinário que quer checar a profundidade encontra; o que está só passando não é soterrado.
3. **O Plano que vira ação** — destaque para as quatro subdivisões do Plano (Dx, Tx, Cx, Mx), cada uma ligada ao que o Ausculta já faz (pedido de exame, alerta de dose e alergia, instruções de alta, retorno). É a parte mais forte do argumento: o SOAP deixa de ser só registro.
4. **"O que não está registrado, não foi feito"** — o prontuário como documento: consentimento registrado, cada frase ligada ao áudio, assinatura com CRMV, bloqueio após aprovação, trilha de auditoria. Não cite resoluções nem prazos legais (ver regras de conteúdo).
5. **Você continua no comando** — os três limites da IA, visíveis sem interação.
6. **Espécies (Em breve)** — botões segmentados com Pequenos animais, Equinos, Bovinos e Exóticos, mostrando os campos esperados de cada um, com o selo "Em breve" bem visível. Nunca abas com scroll horizontal.
7. **CTA** — reutilize "Começar agora", sem fluxo novo.

## Regras de design (do README — obrigatórias)

- Mobile-first; nada de scroll horizontal em 320 px.
- Alvos de toque ≥ 48 px; ações primárias com 56 px.
- Espaçamento só pela escala 4/8/12/16/24/32/48/64 (não existe `--space-5`).
- Cores só pelos tokens, com contraste WCAG AA nos temas claro e escuro.
- Fraunces 600 para display, Public Sans para interface, IBM Plex Mono para dados e tempos.
- Ícones Lucide v0.460.0, no padrão de máscara CSS do arquivo.
- Menus são listas; ações são botões. Siga o padrão de componente e estado do `index.html`.

## Regras de conteúdo

- Português do Brasil, direto, sem jargão de marketing.
- Terminologia clínica exata. Atenção a erros comuns: é **letargia** (não "letalidade"); **gastroenterite aguda**; **mucosas ictéricas**.
- Siglas novas no glossário da landing: POVMR, OLDCHARTS, DAMNIT-V, ECC, TPC, CMT, AAEP, CRMV.
- **Não use** da base de conhecimento, por falta de fonte verificada ou por risco jurídico:
  - que o POVMR é "reconhecido" por AVMA, CFMV ou faculdades;
  - números de resoluções do CFMV, prazos de guarda do prontuário ou a quem pertence o prontuário;
  - as doses dos exemplos de prontuário da base (gastroenterite canina, DRC felina);
  - qualquer frase que sugira que o Ausculta está "em conformidade com o CFMV" — isso depende de revisão jurídica.
- Nenhum número novo. Só os que já estão na landing, com a mesma indicação de fonte.
- Nenhum depoimento inventado.
- Toda string nova também em `i18n.js`, em EN e ES. Em EN, use os termos consagrados (Subjective, Objective, Assessment, Plan; BCS; CRT).

## Critérios de aceite

- [ ] A seção funciona em PT, EN e ES e nos temas claro e escuro.
- [ ] Sem scroll horizontal em 320 × 540 px; alvos de toque ≥ 48 px.
- [ ] Toda capacidade da coluna "Planejado" aparece com o selo "Em breve", ou não aparece.
- [ ] Os três limites da IA estão visíveis sem interação.
- [ ] O detalhamento técnico de cada letra está disponível, mas recolhido por padrão.
- [ ] A seção não duplica a demo interativa existente.
- [ ] Nada da lista "Não use" aparece no texto.
- [ ] As siglas novas estão no glossário.

## Entrega

Responda com:
1. onde a seção foi inserida e por quê;
2. os arquivos alterados;
3. as strings novas em `i18n.js`;
4. qualquer ponto em que você precisou interpretar este prompt.
