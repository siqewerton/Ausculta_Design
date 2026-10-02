# PRD de Design — Ausculta: configuração da captura e da IA

> Para colar no projeto do Ausculta no Claude Design, sobre o protótipo atual (handoff de 01/10/2026).
> Escopo desta rodada: 11 funcionalidades novas e 4 ajustes, todos ligados a como o áudio é captado, quem falou e qual IA analisa a consulta.
> Segue o template do PRD de Design (9 seções). Arquitetura, provedores e backend ficam fora (seção 9).

---

## 1. Contexto e proposta

**Problema.** O núcleo do Ausculta é o microfone ligado durante toda a consulta, com o celular longe do veterinário, e a IA transformando a fala em SOAP. Três coisas ainda não aparecem para o veterinário no protótipo: se o celular está captando bem a distância; quem falou cada frase (o responsável alimenta o Subjetivo, o veterinário o Objetivo); e se a IA do aparelho está pronta para quando não houver internet. Sem isso, ele não tem como confiar no rascunho nem corrigir rápido.

**Solução.** Telas de configuração que o veterinário usa uma vez (voz, microfone, IA no aparelho) e elementos de revisão que ele usa em toda consulta (falante por frase, transcrição, trechos de áudio ruim). A conta escolhe quais IAs podem analisar as consultas: a IA na nuvem, a IA do aparelho ou as duas (padrão). Assim o Ausculta também atende clínicas que não aceitam enviar dados de consulta para IAs na nuvem. Tudo sem acrescentar passo ao fluxo principal: consentimento → gravação → revisão → aprovação.

## 2. Público e personas

- **Veterinária de clínica de pequenos animais (Dra. Renata Moraes, dona da conta no protótipo).** Grava com o celular na bancada, muitas consultas por dia. Quer revisar em segundos e saber se o áudio ficou bom.
- **Veterinário volante (Dr. Marcelo, equinos).** Atende em campo, quase sempre sem internet. Precisa saber, antes de sair, que a IA do aparelho está instalada. Se não gostar de uma análise feita offline, refaz na nuvem quando a rede voltar, pelo botão "Refazer análise da IA".
- **Dono ou administrador da conta.** Define quais IAs podem analisar as consultas, mantém o vocabulário da clínica e acompanha quem da equipe já cadastrou a voz.

## 3. Fluxos de usuário

1. Como veterinário, quero cadastrar minha voz uma vez, para o Ausculta saber quais frases são minhas e quais são do responsável.
2. Como veterinário, quero excluir ou refazer o cadastro da minha voz quando quiser.
3. Como dono da conta, quero ver quem da equipe já cadastrou a voz.
4. Como veterinário, quero ver quem falou cada frase na revisão e trocar o falante num toque quando estiver errado.
5. Como veterinário, quero ler a transcrição completa separada por falante.
6. Como veterinário volante, quero baixar a IA do aparelho com Wi-Fi e ter certeza de que ela está instalada antes de sair.
7. Como veterinário, quero testar se o celular capta bem a minha voz da distância em que ele fica na consulta.
8. Como dono da conta, quero cadastrar os fármacos e termos que a clínica usa, para melhorar a transcrição.
9. Como veterinário, quero ser avisado dos trechos em que o áudio ficou ruim, para conferir antes de aprovar.
10. Como veterinário, quero saber quem processa o áudio e o texto das consultas, em que região e por quanto tempo.
11. Como dono da conta, quero escolher se as consultas podem ser analisadas pela IA na nuvem, pela IA do aparelho ou pelas duas, para atender a política de dados da clínica.
12. Como veterinário de uma conta sem IA do aparelho, quero ser avisado quando uma consulta feita offline ficar guardada sem análise, e encontrar essas consultas no Painel para analisar quando houver internet.
13. Como veterinário de uma conta sem IA na nuvem, quero saber se a IA do aparelho está instalada e pronta, porque ela é a única que analisa minhas consultas.

## 4. Modos e variações que mudam a tela

| Situação | O que muda |
|---|---|
A configuração "IAs usadas nas análises" (seção 7.10) define o comportamento. As duas vêm marcadas por padrão, e pelo menos uma fica sempre marcada.

| Configuração da conta | Online | Offline |
|---|---|---|
| **Nuvem e aparelho (padrão)** | Usa a IA na nuvem | Usa a IA do aparelho. Quando a internet voltar, o veterinário pode tocar em "Refazer análise da IA" (botão que já existe), no fluxo normal |
| **Só nuvem** (aparelho desmarcado) | Usa a IA na nuvem | Não há IA disponível: a consulta é guardada como **rascunho sem análise**, com o áudio. O Painel avisa e permite analisar quando a internet voltar (seção 7.11) |
| **Só aparelho** (nuvem desmarcada) | Usa a IA do aparelho | Usa a IA do aparelho. Áudio e texto nunca vão para IAs na nuvem. A IA do aparelho precisa estar instalada; sem ela, a consulta fica sem análise até a instalação |

Casos de borda que mudam a tela:
- **Nuvem e aparelho, offline, IA do aparelho não instalada:** a consulta fica sem análise até a internet voltar. Aviso laranja no Consentimento.
- **Só aparelho, IA do aparelho não instalada:** a consulta fica sem análise até a instalação. Faixa laranja no Painel e no Consentimento.
| **Voz não cadastrada** | Tudo funciona; a separação de falantes é genérica e o Ausculta sugere o cadastro uma vez, na revisão |

## 5. O que priorizar nesta entrega

| Prioridade | Funcionalidades | Tratamento visual |
|---|---|---|
| **Essenciais** | 3 Falante por frase · 4 Transcrição · 5 IA no aparelho · 9 Subprocessadores · 10 IAs usadas nas análises · 11 Consultas aguardando análise | Desenhar completas, com todos os estados |
| **Recomendadas** | 1 Minha voz · 6 Microfone e captação | Desenhar completas |
| **Depois** | 2 Voz da equipe · 7 Vocabulário da clínica · 8 Trecho com áudio ruim | Desenhar a tela principal; estados secundários podem ficar simplificados |

**Não alterar** a tela de gravação nem o Consentimento além dos avisos e do diálogo descritos em 7.5, 7.10 e 7.11. São o núcleo do produto e já foram aprovados.

## 6. Critérios de aceite visíveis

- [ ] Nenhuma funcionalidade nova acrescenta toque ao fluxo consentimento → gravação → revisão → aprovação.
- [ ] O cadastro da voz tem consentimento próprio, separado do consentimento da consulta, e não pode ser concluído sem ele.
- [ ] Toda frase da revisão mostra o falante; trocar o falante leva no máximo 2 toques.
- [ ] Quando a troca de falante move a frase de seção, um aviso diz para onde ela foi.
- [ ] A transcrição completa mostra falante, horário e texto, e cada linha toca o trecho de áudio.
- [ ] A tela da IA no aparelho mostra claramente um de quatro estados: não instalada, baixando, instalada, apagada pelo navegador.
- [ ] O teste de microfone dá um resultado legível (boa captação, captação fraca) e uma recomendação.
- [ ] Trechos de áudio ruim aparecem marcados na revisão, com ação para ouvir.
- [ ] A Central de Confiança lista os subprocessadores com região e retenção, mesmo que como "a confirmar".
- [ ] Uma conta nova vem com "IA na nuvem" e "IA do aparelho" marcadas.
- [ ] Não é possível desmarcar as duas IAs: ao tentar desmarcar a última, a tela explica por quê e mantém a marcação.
- [ ] Desmarcar uma IA mostra as consequências e só confirma com uma justificativa; a mudança fica na trilha de auditoria.
- [ ] Numa conta "Só nuvem", encerrar uma consulta offline avisa que ela ficará sem análise, e o Painel mostra a consulta pendente com ação para analisar.
- [ ] Numa conta "Só aparelho", o Painel mostra o estado da IA do aparelho, e "Refazer análise da IA" indica sempre "IA do dispositivo".
- [ ] Todas as telas novas seguem o padrão de design obrigatório e cabem em 320 px de largura sem scroll horizontal.
- [ ] Todas as strings novas existem em PT, EN e ES.

## 7. Telas e comportamento

### 7.1 Perfil → "Minha voz" (funcionalidade 1)

Nova linha no menu do Perfil: ícone `audio-waveform`, "Minha voz", subtítulo com o estado ("Não cadastrada" ou "Cadastrada em 01/10/2026"), `chevron-right`.

**Tela inicial (não cadastrada).**
- Título "Minha voz". Texto: "Com a sua voz cadastrada, o Ausculta separa melhor o que você disse do que o responsável contou. Leva cerca de 20 segundos."
- Bloco de consentimento biométrico, com borda de 1px e fundo branco: "Autorizo o Ausculta a criar uma assinatura da minha voz para identificar minhas falas nas consultas. A assinatura é um dado biométrico; posso excluí-la a qualquer momento." Chip de estado pendente → confirmado ao tocar.
- Primário "Gravar minha voz" (56px), desabilitado até o consentimento ser confirmado.

**Gravação (20 s).**
- Texto grande para ler em voz alta (Public Sans 18px, 3 a 4 frases com termos clínicos comuns, como "temperatura retal", "frequência cardíaca", "meloxicam").
- Contador em IBM Plex Mono e ondas do mesmo estilo da gravação da consulta.
- Secundário "Cancelar".

**Resultado.**
- Boa qualidade: selo "Ativo" verde, texto "Voz cadastrada". Primário "Concluir".
- Ruído ou volume baixo: faixa laranja "Muito ruído no ambiente. Grave de novo num lugar mais silencioso." Primário "Gravar de novo".

**Tela com voz cadastrada.**
- Selo "Ativo", data do cadastro, texto "O Ausculta guarda só a assinatura da sua voz, não a gravação."
- Secundário "Refazer cadastro".
- Ação destrutiva "Excluir minha voz" (vermelho), com o diálogo de confirmação do protótipo: "Excluir sua voz? O Ausculta volta a separar os falantes sem a sua assinatura."

### 7.2 Equipe → voz de cada membro (funcionalidade 2)

- Em cada linha da lista de equipe, um selo abaixo do nome: "Voz cadastrada" (verde) ou "Sem voz" (cinza).
- Contador no topo da lista: "3 de 5 veterinários com voz cadastrada".
- Só informativo: ninguém cadastra a voz de outra pessoa.

### 7.3 Revisão SOAP → falante por frase (funcionalidade 3)

- Acima de cada frase, rótulo de 12px cinza com ícone de 14px: `user` "Responsável", `stethoscope` "Veterinário", `users` "Outra pessoa".
- Tocar no rótulo abre uma folha inferior com três pílulas de escolha e o botão primário "Confirmar".
- Se a troca muda a seção da frase (ex.: de Objetivo para Subjetivo), toast "Frase movida para Subjetivo" com carimbo "Desfazer".
- A troca fica registrada na trilha da consulta, como as demais edições.
- Sem voz cadastrada, na primeira revisão aparece uma única vez a linha de sistema "Cadastre sua voz para separar melhor os falantes", com carimbo neutro "Cadastrar".

### 7.4 Revisão SOAP → Transcrição (funcionalidade 4)

- No topo da revisão, duas pílulas de escolha: "SOAP" (padrão) e "Transcrição". Não usar abas com scroll.
- Transcrição: lista de falas em ordem, cada uma com horário em IBM Plex Mono, falante e texto. Tocar na fala toca o trecho de áudio e destaca a linha em azul-claro.

### 7.5 Perfil → "IA no aparelho" (funcionalidade 5)

Nova linha no menu do Perfil: ícone `cpu`, "IA no aparelho", subtítulo com o estado.

| Estado | O que aparece |
|---|---|
| Não instalada | Texto "Para transcrever sem internet, baixe a IA uma vez." Tamanho em Plex Mono ("~250 MB"). Primário "Baixar agora" |
| Baixando | Barra de progresso com MB baixados em Plex Mono. Secundário "Pausar" |
| Instalada | Selo "Ativo", tamanho, data. Secundário "Remover do aparelho" (diálogo de confirmação) |
| Apagada pelo navegador | Faixa laranja "O navegador apagou a IA do aparelho para liberar espaço." Primário "Baixar de novo" |

- Opção "Baixar só no Wi-Fi" (chip de estado), ligada por padrão.
- **Conta "Só nuvem":** a linha do menu mostra "Desativada na conta" e a tela traz só esse aviso, com link para Configurações da conta (visível para dono e administrador).
- **Conta "Só aparelho":** a IA do aparelho é obrigatória.
  - Texto no topo: "Esta conta analisa as consultas só no aparelho. Mantenha a IA instalada."
  - "Remover do aparelho" some.
  - Download e atualização do modelo não enviam nenhum dado de consulta; o texto diz isso.
  - Quando houver versão nova do modelo, linha de sistema "Nova versão da IA do aparelho" com carimbo "Atualizar".
  - Ao abrir o app, o Ausculta confere se o modelo continua instalado (o navegador pode apagá-lo). Se foi apagado e houver Wi-Fi, baixa de novo sozinho e avisa na linha de sistema.
  - Se faltar espaço no aparelho para instalar, faixa laranja com o espaço necessário em Plex Mono.
- **Consentimento, offline e sem a IA instalada:** faixa laranja acima das duas opções de consentimento: "Sem internet e sem a IA do aparelho: a gravação funciona, e a análise sai quando houver internet." Não bloqueia nada.

### 7.6 Perfil → "Microfone e captação" (funcionalidade 6)

Nova linha no menu do Perfil: ícone `mic`, "Microfone e captação".
- "Microfone em uso": nome do dispositivo (ex.: "Microfone do iPhone", "Lapela USB-C").
- Se for Bluetooth: faixa laranja "Microfone Bluetooth reduz a qualidade do áudio. Prefira o microfone do aparelho ou uma lapela com fio."
- **Teste de captação:** texto "Coloque o celular onde ele fica durante a consulta e fale normalmente por 5 segundos." Primário "Testar captação". Contador e ondas durante o teste.
- Resultado: selo verde "Boa captação" ou faixa laranja "Captação fraca: aproxime o celular ou use um microfone de lapela". Carimbo "Ouvir o teste".
- Preferência "Manter a tela ligada durante a gravação" (chip de estado), ligada por padrão.

### 7.7 Configurações da conta → "Vocabulário da clínica" (funcionalidade 7)

- Texto: "Fármacos e termos que a clínica usa. Ajudam a IA a transcrever corretamente."
- Linha de sistema: "Lista da plataforma: 1.240 termos para as espécies atendidas".
- Lista dos termos da clínica (linhas com o termo e ícone `x` para remover) e campo "Adicionar termo" com botão secundário.

### 7.8 Revisão SOAP → trecho com áudio ruim (funcionalidade 8)

- Frase cujo trecho de origem tem ruído ou fala inaudível: selo laranja "Confira este trecho" ao lado do falante, e carimbo "Ouvir".
- Na Transcrição, a linha correspondente mostra o mesmo selo.

### 7.9 Central de Confiança → "Quem processa seus dados" (funcionalidade 9)

Novo cartão na Central de Confiança, lista com uma linha por subprocessador:

| Finalidade | Fornecedor | Região | Retenção |
|---|---|---|---|
| Transcrição do áudio na nuvem | [a confirmar com a SIQ] | [a confirmar] | [a confirmar] |
| Análise do texto da consulta | Anthropic (Claude) | [a confirmar] | [a confirmar] |
| Hospedagem e armazenamento | [a confirmar com a SIQ] | [a confirmar] | Conforme "O que guardamos" |

Texto de apoio, conforme a configuração da conta:
- Nuvem e aparelho: "Com internet, o áudio e o texto das consultas são processados por estes fornecedores. Sem internet, a análise é feita no próprio aparelho."
- Só nuvem: "O áudio e o texto das consultas são processados por estes fornecedores."
- Só aparelho: "Esta conta não envia áudio nem texto de consultas a fornecedores de IA. A análise é feita no próprio aparelho." As duas primeiras linhas da tabela ganham o selo "Não usado nesta conta".

### 7.10 Configurações da conta → "IAs usadas nas análises" (funcionalidade 10)

Novo cartão em Configurações da conta. Editável só por dono e administrador; os demais veem em modo leitura, com o texto "Definido pelo dono da conta".

**Conteúdo.**
- Título "IAs usadas nas análises". Texto: "Escolha quais IAs podem analisar as consultas. Com as duas, o Ausculta usa a nuvem quando há internet e o aparelho quando não há."
- Dois chips de estado, marcados por padrão:
  - "IA na nuvem" (`cloud`): "Análise mais completa. Envia o áudio e o texto da consulta para processamento."
  - "IA do aparelho" (`cpu`): "Funciona sem internet. O áudio e o texto não saem do aparelho."
- Linha de sistema abaixo, resumindo o comportamento atual: "Online: IA na nuvem · Offline: IA do aparelho" (muda conforme a combinação).

**Desmarcar uma IA.** Tocar num chip marcado abre o diálogo de confirmação do protótipo, na variante laranja (atenção), com:
- Título: "Desativar a IA na nuvem?" ou "Desativar a IA do aparelho?".
- Consequências, em lista curta:
  - Desativar a nuvem: "As consultas passam a ser analisadas só no aparelho, mesmo com internet." · "A análise do aparelho é mais limitada que a da nuvem." · "Cada aparelho da equipe precisa ter a IA instalada."
  - Desativar o aparelho: "Consultas feitas sem internet ficam guardadas sem análise até a internet voltar." · "O veterinário precisa voltar a elas pelo Painel para analisar."
- **Justificativa obrigatória:** pílulas de escolha com os motivos "Política de dados da clínica", "Exigência de cliente ou contrato", "Orientação jurídica", "Qualidade da análise" e "Outro". "Outro" abre um campo de texto obrigatório.
- Primário "Desativar" (habilitado só com a justificativa) e secundário "Cancelar". Ao cancelar, o chip volta a marcado.
- A mudança, com autor, data e motivo, vai para a trilha de auditoria.

**Tentar desmarcar a última.** Se só uma IA está marcada, tocar nela não abre o diálogo: o chip continua marcado e aparece, logo abaixo, a faixa laranja "Mantenha pelo menos uma IA ativa. Sem IA, o Ausculta não consegue gerar o SOAP."

**Marcar de volta.** Não exige justificativa; mostra o toast "IA na nuvem ativada" e registra na trilha.

### 7.11 Consultas aguardando análise (funcionalidade 11)

**Ao encerrar uma consulta offline numa conta "Só nuvem".** O botão continua "Encerrar consulta e gerar SOAP". Ao tocar, abre o diálogo de confirmação do protótipo, na variante laranja:
- Título "Sem internet para analisar".
- Texto: "A IA do aparelho está desativada nesta conta. A consulta e o áudio ficam guardados como rascunho, sem análise da IA. Quando a internet voltar, analise pelo Painel."
- Primário "Guardar sem análise" e secundário "Continuar gravando".
- Antes de gravar, o Consentimento já avisa com faixa laranja: "Sem internet: esta consulta será gravada e analisada quando a internet voltar."

O mesmo vale para uma conta "Só aparelho" com a IA do aparelho não instalada, trocando o texto por "A IA do aparelho não está instalada…" e o destino por "Instale a IA do aparelho para analisar".

**No Painel.** Novo cartão logo abaixo de "Nova consulta", só quando houver pendências:
- Faixa laranja "3 consultas aguardando análise da IA".
- Lista com uma linha por consulta: paciente (Fraunces), data e duração (Plex Mono) e carimbo "Analisar".
- Sem internet (conta "Só nuvem"): o carimbo fica desabilitado, com o texto "Disponível quando a internet voltar".
- Com internet: tocar em "Analisar" leva a Processando e depois à Revisão, no fluxo normal. Carimbo "Analisar todas" no topo do cartão quando houver mais de uma.
- Quando a internet volta com consultas pendentes, toast "Internet de volta · 3 consultas aguardando análise" com carimbo "Ver".

**No prontuário do paciente.** A consulta aparece com selo laranja "Aguardando análise" e o mesmo carimbo "Analisar".

**No Painel, conta "Só aparelho".** Linha de sistema no topo com o estado da IA do aparelho ("IA do aparelho pronta", ícone verde). Se não estiver instalada, faixa laranja "Instale a IA do aparelho para analisar as consultas" com carimbo "Instalar".

### 7.12 Ajustes em telas existentes

- **"Refazer análise da IA":** o subtítulo segue a configuração. "Só aparelho": sempre "Mesmo áudio · IA do dispositivo". "Só nuvem": sempre "Mesmo áudio · IA na nuvem", desabilitado sem internet. Nuvem e aparelho: como hoje.
- **Sincronização "Só no Wi-Fi":** o texto da preferência passa a cobrir também o download da IA do aparelho.
- **Processando:** a linha "IA do dispositivo" ou "IA na nuvem" segue a configuração da conta.
- **Menu do Perfil:** as três linhas novas (Minha voz, IA no aparelho, Microfone e captação) ficam juntas num grupo "Captura e IA".

## 8. Design system

Usar o design system do protótipo e o **padrão de design obrigatório** do handoff (`padrao-de-design.md`). Em especial:
- cores com significado único: azul ação e dado do áudio; verde confirmado; laranja atenção; vermelho risco ou perda de dados; cinza neutro;
- chip de estado (pendente, confirmado, vindo do áudio, obrigatório pendente), carimbo de 44px, faixa de alerta, linha de sistema, selo de status e diálogo de confirmação próprio;
- Fraunces 600 nos títulos, Public Sans na interface, IBM Plex Mono em tempos, tamanhos e dados;
- ícones Lucide v0.460.0; espaçamento pela escala 4/8/12/16/24/32/48/64; nenhum scroll horizontal em 320 px.

Fallback, se o design system não estiver anexado: `ausculta-design-system.md`.

## 9. Fora deste documento

- **Qual serviço de transcrição (ASR) será usado e em que região:** decisão de stack, ainda aberta (Discovery, B.10). As telas usam "[a confirmar]".
- **Como a assinatura de voz é calculada e guardada:** arquitetura. A tela só promete que o áudio do cadastro não é guardado.
- **Texto legal final do consentimento biométrico:** depende do jurídico. O texto da seção 7.1 é provisório.
- **Tamanho real do modelo da IA do aparelho:** "~250 MB" é ilustrativo; o número depende do modelo escolhido.
- **Retaguarda da plataforma** (lista padrão de vocabulário, limites de dose, modelos de exame): não é tela do veterinário.
- **Onde a justificativa e a configuração ficam guardadas e como chegam a cada aparelho:** backend e sincronização.
- **Lista final de motivos para desativar uma IA:** os motivos da seção 7.10 são uma proposta.
- Detalhes de backend, fila, sincronização e chaves de API: ver Discovery (B.2, B.9) e PRD oficial.
