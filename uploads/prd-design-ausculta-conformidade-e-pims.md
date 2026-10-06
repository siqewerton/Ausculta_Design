# PRD de Design — Ausculta: conformidade legal e paridade com PIMS

> Para colar no projeto do Ausculta no Claude Design, sobre o protótipo atual.
> Fonte: `backlog-pesquisa-pims.md` (06/10/2026), conferido contra o handoff de 06/10/2026. Os números de item (1 a 14) são os do backlog. Já existem no protótipo e servem de base: área "Fotos e vídeos" ligada à consulta, envio de foto ou vídeo pelo prontuário, instruções de alta por WhatsApp ou e-mail, "Tempo economizado nesta semana" no Painel, "Exportar meus dados" e as quatro funções da equipe.
> **Decisões de 07/10/2026:** guarda do prontuário por 5 anos após o último atendimento; assinatura ICP-Brasil como recurso opcional do Perfil, mostrada nos documentos e sem passo extra no fluxo principal; faturamento fica como funcionalidade futura; teste grátis único de 20 consultas com todos os recursos, no lugar do plano Essencial gratuito; papéis da equipe como no protótipo (o auxiliar não grava nem aprova).
> As demais normas citadas (Res. 1.138/2016, Portaria MAPA 837/2025) ainda não foram confirmadas pelo jurídico; textos que dependem delas ficam marcados como provisórios.
> Segue o template do PRD de Design (9 seções).

---

## 1. Contexto e proposta

**Problema.** O Ausculta gera um bom SOAP, mas ainda não cumpre tudo o que se espera de um prontuário veterinário oficial: guarda pelo prazo legal, assinatura com validade jurídica, cópia ao responsável, diagnóstico presuntivo separado do conclusivo e local do atendimento. Sem PIMS, o veterinário também precisa emitir receitas, termos e atestados no mesmo lugar. E o valor que leva à assinatura (o tempo economizado) aparece pouco.

**Solução.** Desenhar os 14 itens do backlog sem acrescentar passo ao fluxo principal (gravar, revisar, aprovar). O que é obrigatório por lei vale com ou sem PIMS; quando houver PIMS conectado, o Ausculta não duplica o que ele já faz.

## 2. Público e personas

- **Veterinária de clínica com PIMS (Dra. Renata Moraes):** quer o SOAP certo no PIMS e a segurança jurídica de um prontuário assinado.
- **Veterinário volante ou autônomo sem PIMS (Dr. Marcelo):** usa o Ausculta como prontuário único; precisa de receita, atestado, local do atendimento em campo e cópia ao responsável.
- **Dono da clínica:** define papéis da equipe e responde pela guarda do prontuário.
- **Responsável pelo animal:** recebe cópia do prontuário, orientações e documentos.

## 3. Fluxos de usuário

1. Como dono da clínica, quero saber que meus prontuários ficam guardados pelo prazo legal mesmo se eu cancelar.
2. Como veterinário, quero aprovar com assinatura digital sem acrescentar telas à aprovação.
3. Como veterinário, quero enviar ao responsável o resumo e as orientações logo após aprovar, e uma cópia do prontuário quando pedirem.
4. Como veterinário, quero registrar o diagnóstico presuntivo e, depois, o conclusivo.
5. Como veterinário volante, quero que o local do atendimento seja registrado sem eu digitar nada.
6. Como veterinário, quero ver quanto tempo o Ausculta me economizou.
7. Como veterinário novo, quero experimentar o produto completo em 20 consultas, sem cartão e sem prazo, e depois decidir se assino.
8. Como visitante, quero entender se o Ausculta é para mim, com ou sem sistema de gestão.
9. Como veterinário sem PIMS, quero emitir receita, termo, atestados e carteira de vacinação a partir da consulta.
10. Como veterinário, quero marcar onde no corpo foi tirada a foto e comparar fotos da mesma região.
11. Como veterinário, quero fotografar dentro do app, sem passar pela galeria.
12. Como dono da clínica, quero ver claramente o que cada função da equipe pode fazer e quem abriu cada prontuário.
13. Como veterinário, quero exportar o prontuário de um paciente em PDF.
14. Como veterinário, quero encaminhar um caso a um especialista com um link seguro.

## 4. Modos e variações

| Situação | O que muda |
|---|---|
| Com PIMS conectado | Documentos que o PIMS já emite ficam ocultos (item 9); cópia ao responsável e exportação continuam disponíveis |
| Sem PIMS (standalone) | Área "Documentos" no prontuário; guarda legal e cópia ao responsável em destaque |
| Com certificado digital ativo | A aprovação é igual; a assinatura ICP-Brasil é aplicada em segundo plano e aparece como selo verde nos documentos |
| Com certificado, mas autorização vencida ou offline | A aprovação é igual; documentos ficam com "Assinatura digital pendente" (selo laranja) e são assinados quando a autorização for renovada ou a rede voltar |
| Sem certificado | Nada muda; documentos com "Assinatura eletrônica" (selo cinza) |
| Conta cancelada | App em modo somente leitura para os prontuários dentro do prazo de guarda |
| Paciente em óbito | Paciente encerrado, prontuário somente leitura, atestado de óbito no histórico |
| Teste grátis em uso | Todos os recursos liberados; contador de consultas restantes |
| Teste grátis esgotado | Novas consultas bloqueadas; prontuários continuam legíveis e exportáveis |

## 5. Escopo desta rodada

Desenhar os 14 itens com todos os estados acima. As prioridades do backlog (P0 conformidade, P1 assinatura do plano, P2 diferencial) servem para o design dar mais acabamento aos P0, não para deixar itens de fora. Não alterar a tela de gravação, exceto pela captura de foto do item 11, que precisa caber nela sem rolar.

## 6. Critérios de aceite visíveis

- [ ] CA-01 (1) O fluxo de cancelamento separa "acesso ao app" de "guarda do prontuário" e exige exportação ou aceite da guarda antes de confirmar.
- [ ] CA-02 (1) Nenhum texto diz "12 meses" para prontuários; 12 meses vale só para áudios e anexos fora do prontuário.
- [ ] CA-03 (2) Com ou sem certificado, a aprovação tem exatamente os mesmos passos de hoje: nenhuma tela, biometria ou confirmação a mais.
- [ ] CA-04 (2) A consulta aprovada e os documentos mostram o tipo de assinatura com o selo correspondente; a falta ou o atraso da assinatura digital nunca bloqueia nada.
- [ ] CA-05 (3) Nada vai ao responsável sem o toque do veterinário; o envio nunca inclui notas internas nem a transcrição bruta.
- [ ] CA-06 (4) "Presuntivo" vazio bloqueia a aprovação; "Conclusivo" pode entrar por adendo.
- [ ] CA-07 (5) O local nunca é pedido antes de gravar e pode ser trocado em um toque na revisão.
- [ ] CA-08 (6) O tempo economizado explica o cálculo num toque e nunca aparece na gravação.
- [ ] CA-09 (9) Todo documento sai em duas vias e entra na área "Documentos" do prontuário.
- [ ] CA-10 (10) Marcar a região do corpo é opcional e nunca bloqueia.
- [ ] CA-11 (11) A gravação continua cabendo em 320 × 540 com a captura de foto, sem interromper o áudio.
- [ ] CA-14 (7) Ao fim das 20 consultas, gravar fica bloqueado com as duas saídas (contratar ou exportar e encerrar); nada já registrado fica inacessível.
- [ ] CA-12 (12, 14) Leituras de prontuário por quem não participou da consulta e acessos a links de encaminhamento entram na trilha de auditoria.
- [ ] CA-13 Textos de norma marcados como provisórios; tudo em PT, EN e ES; padrão de design obrigatório; nada com scroll horizontal em 320 px.

## 7. Telas e comportamento

### 7.1 Guarda do prontuário (item 1)

**Conta > Assinatura > Cancelar**, nova etapa antes da confirmação:
- Título "Seus prontuários continuam guardados". Texto: "Cada prontuário fica guardado por 5 anos após o último atendimento do paciente, como exige o CFMV, mesmo com a assinatura cancelada. Você continua podendo lê-los e exportá-los."
- Duas pílulas, uma obrigatória: "Exportar tudo agora (PDF por paciente + trilha de auditoria)" ou "Manter a guarda em modo somente leitura".
- Texto menor: "Áudios e anexos que não fazem parte do prontuário seguem a regra de 12 meses."

**Conta > Dados:** lista de pacientes com "Guardado até [data]" em IBM Plex Mono; busca e regra 12 de listas longas.

**Conta cancelada:** faixa cinza no topo do app: "Assinatura cancelada · prontuários em modo somente leitura até [data]". Ações de gravar e editar desabilitadas.

### 7.2 Assinatura digital ICP-Brasil, opcional (item 2)

Decisão: a assinatura ICP-Brasil é um recurso opcional, configurado uma vez no Perfil e visível nos documentos. **Ela nunca acrescenta passo à aprovação.** Hoje a legislação a exige em telemedicina, laudos e receitas; o prontuário do Ausculta não depende dela.

**Perfil > Assinatura digital** (nova linha no grupo do perfil):
- Estados: "Não configurada" (texto cinza, sem alerta, sem selo de atenção), "Ativa" (selo verde, com o provedor e a validade do certificado) e "Autorização vencida" (selo laranja, com "Renovar autorização").
- Configuração: escolher o certificado (em nuvem, como Vidaas ou BirdID, ou A1 instalado), autorizar no provedor por um período e testar uma assinatura. O texto explica: "Com a assinatura ativa, consultas e documentos são assinados automaticamente, sem passo a mais na aprovação."

**Revisão > aprovação:** nada muda. A assinatura ICP-Brasil, quando ativa, é aplicada em segundo plano depois do "Registrado".

**Consulta aprovada e documentos:** ao lado da assinatura, um selo pequeno:
- verde "Assinado · ICP-Brasil · 06/10/2026 14:32" (carimbo do tempo em IBM Plex Mono);
- laranja "Assinatura digital pendente", quando a autorização venceu ou o aparelho estava offline; some sozinho quando a assinatura for aplicada;
- cinza "Assinatura eletrônica", sem certificado.

**Painel:** só quando houver documentos pendentes de assinatura digital, uma linha de sistema discreta: "3 documentos aguardando assinatura digital · Renovar autorização". Nunca bloqueia nem aparece na gravação ou na revisão.

**Adendos:** assinados à parte, com o mesmo comportamento; a consulta original nunca é reassinada.

**Receita (item 9):** quando a assinatura estiver ativa, a receita gerada também sai assinada digitalmente; sem ela, a receita sai com assinatura eletrônica e o aviso de que receitas digitais podem exigir certificado.

### 7.3 Cópia ao responsável (item 3)

**Confirmação "Registrado"** (após aprovar): carimbo "Enviar ao responsável". Abre uma prévia com o resumo da consulta e as orientações do Plano em linguagem leiga, e a escolha do canal (WhatsApp ou e-mail do cadastro). Botão "Enviar".
- Sem telefone nem e-mail: carimbo desabilitado com "Cadastre um contato do responsável" e link para Dados do responsável.

**Prontuário > Dados do responsável:** ação "Enviar cópia do prontuário", com seleção de período e prévia. O PDF não inclui notas internas nem transcrição.

**Trilha de auditoria:** cada envio registra o quê, para quem, quando e por qual canal.

### 7.4 Diagnóstico presuntivo e conclusivo (item 4)

Dentro do cartão Avaliação da revisão, duas linhas:
- **Presuntivo** (obrigatório): preenchido pela IA só quando o veterinário disse o diagnóstico em voz alta; caso contrário, chip "Obrigatório pendente" (vermelho tracejado, ícone `lock`) e o balão "Falta para aprovar" inclui o item.
- **Conclusivo** (opcional): vazio por padrão; no adendo, a mesma linha aparece para ser preenchida depois dos exames.

A frase "Hipótese discutida em consulta" continua no texto do SOAP como origem da linha presuntiva.

### 7.5 Local do atendimento (item 5)

- No topo da revisão, linha cinza de 13px com ícone `map-pin`: "Clínica Veterinária Bem-Estar · Campinas, SP". Tocar abre uma folha com três pílulas: "Estabelecimento", "A domicílio", "Propriedade rural"; as duas últimas usam o endereço do responsável.
- **Perfil:** campo "Local padrão do atendimento".
- Sem localização nem endereço do responsável, usa o endereço do perfil e mostra "(endereço do perfil)".
- Consulta aprovada: o local aparece no cabeçalho.

### 7.6 Tempo economizado (item 6)

- **Painel:** a linha atual vira "Esta semana: 18 consultas · cerca de 3h economizadas", com ícone `info`. Tocar abre a explicação: "Tempo médio de escrita manual × consultas − tempo de revisão medido no Ausculta."
- **Conta > Assinatura:** cartão "Desde que você começou: 4.312 min economizados" na renovação e no fim do teste.

### 7.7 Teste grátis (item 7)

Decisão: não há plano gratuito permanente. Toda conta nova começa com um **teste único de 20 consultas, com todos os recursos**, sem cartão e sem prazo. O plano "Essencial" sai da landing, da criação de conta e de Conta > Assinatura.

- **Landing e criação de conta:** "Comece grátis: 20 consultas com todos os recursos, sem cartão e sem prazo." Na tabela de planos, o primeiro cartão vira "Teste grátis".
- **Painel:** contador discreto em linha de sistema, "Teste grátis · 14 de 20 consultas"; com 5 restantes, selo laranja "Faltam 5 consultas grátis" e carimbo "Ver planos".
- **Teste esgotado:**
  - "Nova consulta" fica desabilitado e o Painel abre um cartão "Seu teste grátis terminou" com o resumo do que foi feito ("20 consultas · cerca de 3h economizadas", ligado ao item 6).
  - Duas ações: primário "Escolher um plano" (leva a Conta > Assinatura) e secundário "Exportar meus dados e encerrar a conta" (leva ao fluxo de cancelamento do item 1).
  - Prontuários, transcrições e documentos continuam legíveis e exportáveis; só novas consultas ficam bloqueadas.
  - Rascunhos que estavam em revisão quando o teste acabou podem ser aprovados (já foram contados).
- **Encerrar a conta depois do teste:** segue a guarda legal do item 1: os prontuários ficam guardados por 5 anos após o último atendimento, em modo somente leitura, salvo a exportação.

### 7.8 Dois caminhos (item 8)

- **Landing:** dois blocos lado a lado (empilhados no celular): "Já tem sistema? O Ausculta escreve por você." e "Ainda no papel? O Ausculta é o seu prontuário." Substituem ou complementam "Por onde você começa?", sem repetir a mesma mensagem.
- **Criação de conta:** etapa "Você usa um sistema de gestão?" com "Sim, quero conectar" (leva a Integrações), "Não, o Ausculta será meu prontuário" e "Responder depois".

### 7.9 Documentos no modo standalone (item 9)

- **Prontuário:** nova área "Documentos" no seletor de área, listando receitas, termos, atestados e a carteira de vacinação.
- **Confirmação "Registrado":** carimbos "Gerar receita" (pré-preenchida com os 6 elementos do Plano aprovado) e, quando houver vacina aprovada, "Atualizar carteira de vacinação".
- **Termo de consentimento:** a partir do prontuário, escolher o procedimento (anestesia, cirurgia, eutanásia); o responsável assina na tela do aparelho com o dedo.
- **Atestado de saúde** e **atestado de óbito:** o de óbito leva ao estado "Paciente em óbito" (selo cinza no cabeçalho, prontuário somente leitura).
- Cada documento: prévia, "2 vias" (uma para o responsável, enviada pelo item 3), e entrada na área Documentos.
- Receita de controlado: fora desta rodada; a opção aparece desabilitada com "Em breve".

### 7.10 Mapa corporal (item 10)

A área "Fotos e vídeos" já existe; o item acrescenta a região do corpo e a comparação, sem mudar a grade atual.

- Ao anexar ou capturar uma foto: folha com a silhueta da espécie (cão, gato, equino, bovino); um toque marca a região. Botão "Pular".
- **Prontuário > Fotos e vídeos:** filtro "Região do corpo" e ação "Comparar" que mostra duas fotos da mesma região lado a lado com as datas.
- No Objetivo do SOAP, a região aparece como referência ("Foto: região do joelho esquerdo"), não como texto gerado.

### 7.11 Foto direto do app (item 11)

O envio "Foto ou vídeo do paciente" pelo prontuário continua; o item acrescenta a captura durante a gravação.

- **Gravação:** botão secundário `camera` de 44px, ao lado dos controles, sem tirar o veterinário da tela; a câmera abre em sobreposição e o áudio continua gravando (indicador vermelho visível).
- A foto vai direto para a consulta em andamento, cifrada, sem passar pela galeria; um contador discreto "2 fotos" aparece na tela de gravação.

### 7.12 Permissões por papel (item 12)

Decisão: seguir o protótipo. As funções continuam dono, administrador, veterinário e "auxiliar ou recepção"; **o auxiliar cadastra pacientes, anexa exames e consulta o prontuário, sem gravar nem aprovar.**

- **Conta > Equipe e permissões:** a tabela de funções ganha uma coluna por ação (gravar, aprovar, cadastrar, anexar, ver prontuário, gerir equipe, pagamento), com marcação clara, para não haver dúvida sobre o que cada função pode.
- **Para o auxiliar:** "Nova consulta" e "Gravar" não aparecem (não ficam só desabilitados), e o Painel dele abre na lista de pacientes.
- **Trilha de auditoria:** filtro "Leituras de prontuário", mostrando quem abriu prontuários de consultas das quais não participou, inclusive auxiliares.

### 7.13 Exportação do prontuário (item 13)

- **Prontuário > menu do paciente:** "Exportar prontuário". Folha com período, seções (consultas, exames, fotos, medicação, documentos) e "Incluir trilha de auditoria".
- Prévia do PDF com cabeçalho: nome do veterinário, CRMV, endereço, telefone, e-mail e estabelecimento.

### 7.14 Encaminhamento (item 14)

- **Consulta aprovada:** carimbo "Encaminhar". Folha para selecionar consultas, exames e fotos, escrever uma nota ao especialista e escolher a validade do link (7, 30 dias).
- O link aparece com "Copiar" e "Enviar por WhatsApp ou e-mail". Cada acesso entra na trilha de auditoria; o veterinário pode revogar o link.

## 8. Design system

Padrão de design obrigatório (`padrao-de-design.md`):
- verde para assinado, ativo e concluído; laranja para assinatura digital pendente, autorização vencida e teste grátis acabando (certificado não configurado não gera alerta); vermelho tracejado só para obrigatório pendente (presuntivo); cinza para somente leitura, óbito e assinatura simples;
- área "Documentos" e "Fotos e vídeos" no seletor de área em lista (regra 10); listas longas pela regra 12;
- diálogo de confirmação próprio para cancelar, enviar ao responsável e revogar link;
- IBM Plex Mono em datas, prazos e carimbo do tempo; Lucide v0.460.0;
- PT, EN e ES em `i18n.js`; "responsável", nunca "tutor".

## 9. Fora deste documento

- **Validação jurídica restante:** regras de receita (inclusive se a receita digital exige ICP-Brasil) e de documentos. Textos que dependem delas ficam marcados como provisórios.
- **Parceiro de assinatura em nuvem** e verificação da assinatura no PDF: engenharia.
- **Faturamento:** decidido em 07/10/2026 como funcionalidade futura (backlog de discovery, "Orçamento e nota ao responsável"); não entra nesta rodada.
- **Receita de controlado** (Portaria MAPA 837/2025, a confirmar): rodada própria.
- Agenda, estoque, internação, portal do responsável e imagem DICOM: fora do escopo, ficam com o PIMS.
