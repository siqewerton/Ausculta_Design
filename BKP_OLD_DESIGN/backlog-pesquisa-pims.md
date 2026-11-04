# Backlog: melhorias a partir da pesquisa de PIMS e de conformidade

Origem: comparação com ezyVet, Provet Cloud, Digitail, Covetrus Pulse, ThoroVet e SimplesVet; leitura da Res. CFMV 1.321/2020 (com a redação da Res. 1.653/2025) e de boas práticas de fotografia clínica (06/10/2026).
Já implementado e fora desta lista: área "Fotos e vídeos" separada de Exames, com cada mídia ligada à consulta de origem.

Princípios que valem para todos os itens:
- **Mínimo de toques:** nada acrescenta passo ao fluxo principal (gravar, revisar, aprovar).
- **A IA não decide:** toda sugestão só entra no prontuário se o veterinário tocar.
- **Dois públicos, um produto:** o que é obrigatório por lei vale com ou sem PIMS. Quando houver PIMS conectado, o Ausculta não duplica o que o PIMS já faz (agenda, faturamento, estoque).

Prioridade: **P0** bloqueia o uso como prontuário oficial · **P1** decide a assinatura · **P2** diferencial ou conveniência.

---

## P0 · Conformidade legal

### 1. Guarda do prontuário por 5 anos após o último atendimento
**Problema:** a Res. 1.321 exige guarda mínima de 5 anos depois do último atendimento, inclusive em óbito. Hoje o cancelamento da assinatura deixa os dados exportáveis por apenas 12 meses.

**Proposta**
- No fluxo de cancelamento, separar "acesso ao app" de "guarda do prontuário": os prontuários continuam guardados, somente para leitura, até 5 anos após o último atendimento de cada paciente.
- Antes de confirmar o cancelamento, exigir a exportação completa (PDF por paciente + trilha de auditoria) ou o aceite explícito da guarda em modo somente leitura.
- Em Conta > Dados, mostrar por paciente a data até a qual o prontuário fica guardado.

**Critérios de aceite**
- Nenhum prontuário é eliminado antes do prazo legal, mesmo com a conta cancelada.
- O texto de cancelamento deixa de dizer "12 meses" para prontuários; o prazo de 12 meses vale só para áudios e anexos que não fazem parte do prontuário.
- A política de retenção do plano Hospital nunca é menor que o mínimo legal.

**Telas:** Conta > Assinatura (cancelar), Conta > Dados, Política de privacidade.

---

### 2. Assinatura do prontuário com validade jurídica
**Problema:** a aprovação hoje é um toque autenticado por senha. Não há assinatura ICP-Brasil nem carimbo do tempo, que são o que torna detectável qualquer alteração posterior.

**Proposta**
- O botão "Aprovar e Sincronizar Prontuário" passa a assinar: certificado em nuvem (Vidaas, BirdID e similares) ou A1 instalado, configurado uma única vez no perfil.
- Sem certificado, a aprovação continua possível, com o selo cinza "Assinatura eletrônica simples" e um selo de atenção laranja no perfil: "Cadastre seu certificado digital".
- Consulta aprovada mostra o selo verde "Assinado · ICP-Brasil" com data e hora do carimbo.
- Adendo é assinado separadamente; a consulta original nunca é reassinada.

**Critérios de aceite**
- A assinatura não acrescenta tela ao fluxo de aprovação depois da configuração inicial (no máximo a biometria do aparelho).
- O PDF exportado contém a assinatura verificável.
- Funciona offline: a consulta fica "Aprovada, assinatura pendente" (laranja) e assina ao reconectar.

**Dependências:** parceiro de assinatura em nuvem; confirmação jurídica sobre a exigência de ICP-Brasil pela Res. 1.653/2025 (as fontes divergem).

**Telas:** Revisão (aprovação), Prontuário > consulta aprovada, Perfil > Certificado digital.

---

### 3. Cópia do prontuário para o responsável
**Problema:** a resolução manda emitir os documentos em duas vias, uma entregue ao responsável, e regula o pedido de cópia do prontuário. Não existe essa ação no app.

**Proposta**
- Na confirmação "Registrado", um carimbo "Enviar ao responsável" (WhatsApp ou e-mail do cadastro), com prévia do que será enviado: resumo da consulta e orientações do Plano, em linguagem para leigo.
- Em Dados do responsável, a ação "Enviar cópia do prontuário", com escolha do período.
- Todo envio entra na trilha de auditoria (o quê, para quem, quando, por qual canal).

**Critérios de aceite**
- Nada é enviado sem o toque do veterinário.
- O que vai ao responsável nunca inclui as notas internas nem a transcrição bruta.
- Um responsável sem telefone ou e-mail mostra o carimbo desabilitado com a explicação.

**Telas:** Revisão (pós-aprovação), Prontuário > Dados do responsável, Trilha de auditoria.

---

### 4. Diagnóstico presuntivo e diagnóstico conclusivo separados na Avaliação
**Problema:** o art. 9º pede o diagnóstico presuntivo e, quando houver, o conclusivo. O campo A do SOAP mistura os dois.

**Proposta**
- Dentro da Avaliação, duas linhas: "Presuntivo" (obrigatório) e "Conclusivo" (opcional, pode vir num adendo após exame).
- A IA só preenche o presuntivo se o veterinário tiver dito o diagnóstico em voz alta; nunca propõe um diagnóstico por conta própria.
- O presuntivo vazio vira chip "Obrigatório pendente" (vermelho tracejado, ícone `lock`) e bloqueia a aprovação.

**Critérios de aceite**
- A exportação para o PIMS continua em quatro seções, com as duas linhas dentro do A.
- Um adendo pode acrescentar o conclusivo sem alterar a consulta original.

**Telas:** Revisão (SOAP), Prontuário > consulta aprovada, Adendo.

---

### 5. Local do atendimento em cada consulta
**Problema:** o art. 9º exige data, horário e **local**. No atendimento a campo ou a domicílio, o local não é o endereço da clínica.

**Proposta**
- Local preenchido automaticamente: estabelecimento do perfil por padrão; "A domicílio" ou "Propriedade rural" puxam o endereço do responsável.
- Uma linha cinza de 13px no topo da revisão mostra o local e permite trocar em um toque.

**Critérios de aceite**
- Nunca pede o local antes de gravar.
- Sem localização disponível, usa o endereço do perfil e indica isso.

**Telas:** Revisão, Prontuário > consulta aprovada, Perfil.

---

## P1 · Decide a assinatura

### 6. Tempo economizado, visível
**Problema:** o principal motivo para assinar é deixar de escrever o prontuário à noite, mas o app não mostra esse ganho.

**Proposta**
- No Painel, uma linha discreta: "Esta semana: 18 consultas · cerca de 3h economizadas".
- Na renovação e no fim do teste grátis, o total acumulado.

**Critérios de aceite**
- O cálculo é explicado num toque (tempo médio de escrita manual × consultas − tempo de revisão medido).
- Nunca aparece na tela de gravação.

**Telas:** Painel, Conta > Assinatura.

---

### 7. Teste grátis por número de consultas
**Problema:** o valor aparece consulta a consulta. Um teste por dias vence antes de o veterinário de agenda leve perceber o ganho.

**Proposta**
- Teste de 20 consultas, sem prazo e sem cartão.
- Selo de atenção laranja quando faltarem 5: "Faltam 5 consultas grátis".

**Telas:** Conta (criação e plano), Painel, Landing (planos).

---

### 8. Dois caminhos na landing e na criação de conta
**Problema:** quem já tem PIMS e quem usa papel compram coisas diferentes, e a landing fala com os dois ao mesmo tempo.

**Proposta**
- Na landing: "Já tem sistema? O Ausculta escreve por você." e "Ainda no papel? O Ausculta é o seu prontuário."
- Na criação de conta, a pergunta "Você usa um sistema de gestão?" define o modo: com PIMS (sincroniza) ou standalone (o Ausculta guarda e emite os documentos).

**Critérios de aceite**
- A pergunta pode ser respondida depois, em Conta > Integrações.
- O modo standalone libera os itens 1, 3 e 9.

**Telas:** Landing, Conta (criação), Conta > Integrações.

---

### 9. Documentos obrigatórios no modo standalone
**Problema:** sem PIMS, o veterinário precisa emitir no mesmo lugar o que a Res. 1.321 exige. Hoje o Ausculta só gera o SOAP.

**Proposta, em ordem**
1. **Receita** (Res. 1.138/2016) gerada a partir do Plano aprovado, com os 6 elementos da prescrição já existentes. Receita de controlado fora do escopo inicial (Portaria MAPA 837/2025).
2. **Termo de consentimento** para procedimento (anestesia, cirurgia, eutanásia), assinado pelo responsável na tela do aparelho.
3. **Atestado de saúde** e **atestado de óbito**; o óbito encerra o paciente e registra as informações do art. 8º.
4. **Carteira de vacinação** única e permanente, alimentada pelas vacinas aprovadas no Plano.

**Critérios de aceite**
- Todo documento sai em duas vias (item 3) e entra no prontuário do paciente.
- Nenhum documento é gerado sem o toque do veterinário.
- Com PIMS conectado, esses documentos ficam ocultos se o PIMS já os emitir.

**Telas:** Revisão (pós-aprovação), Prontuário (nova área "Documentos" no seletor de área), Paciente (estado de óbito).

---

### 10. Mapa corporal em Fotos e vídeos
**Problema:** a foto de uma lesão sem a localização no corpo perde valor na comparação entre consultas. A Digitail já oferece mapas corporais no Objetivo.

**Proposta**
- Ao registrar uma foto, um toque na silhueta da espécie marca a região. Opcional, nunca bloqueia.
- Em Fotos e vídeos, um filtro por região do corpo e a comparação lado a lado de duas fotos da mesma região.

**Critérios de aceite**
- Silhuetas para cão, gato, equino e bovino.
- A região aparece no Objetivo do SOAP como referência, não como texto gerado.

**Telas:** Gravação (captura de foto), Revisão (Objetivo), Prontuário > Fotos e vídeos.

---

## P2 · Diferencial e conveniência

### 11. Foto direto do app para o prontuário
**Problema:** as boas práticas de fotografia clínica pedem que a imagem não fique na galeria do celular.

**Proposta**
- Captura de foto e vídeo dentro do app durante a consulta, sem passar pela galeria.
- O arquivo é cifrado no aparelho e vinculado à consulta em andamento.

**Critérios de aceite**
- A captura não tira o veterinário da tela de gravação nem interrompe o áudio.
- A tela de gravação continua cabendo em 320 × 540 sem rolar.

**Telas:** Gravação, Prontuário > Fotos e vídeos.

---

### 12. Permissões por papel
**Problema:** a LGPD e as boas práticas pedem acesso restrito por perfil. A tela de Equipe já fala em permissões, mas não as define.

**Proposta**
- Três papéis prontos: Veterinário (aprova e assina), Auxiliar (grava, anexa e cadastra, não aprova) e Recepção (só cadastro e dados do responsável).
- Toda leitura de prontuário por alguém de fora da consulta entra na trilha de auditoria.

**Telas:** Conta > Equipe e permissões, Trilha de auditoria.

---

### 13. Exportação completa do prontuário em PDF
**Problema:** fiscalização, encaminhamento e pedido de cópia exigem um documento único e cronológico. O Provet e o ezyVet geram o histórico em PDF com filtros.

**Proposta**
- Em Prontuário, a ação "Exportar prontuário": período, seções (consultas, exames, fotos, medicação) e inclusão ou não da trilha de auditoria.
- Cabeçalho com os dados do art. 3º: nome, CRMV, endereço, telefone, e-mail e estabelecimento.

**Telas:** Prontuário (menu do paciente), Conta > Dados.

---

### 14. Encaminhamento para especialista
**Problema:** o Provet tem um portal de referência para compartilhar notas, imagens e resultados. Para o volante e o autônomo, encaminhar é rotina.

**Proposta**
- A partir de uma consulta aprovada, "Encaminhar", que monta um resumo com as consultas, exames e fotos selecionados e envia um link com validade.

**Critérios de aceite**
- O link expira e cada acesso entra na trilha de auditoria.

**Telas:** Prontuário > consulta aprovada.

---

## Fora do escopo (fica com o PIMS)
Agenda, faturamento, estoque, internação, portal do responsável e imagem DICOM. No modo standalone, reavaliar depois de validar os itens 1 a 9 com veterinários.

## Validação antes de construir
- Confirmar com o jurídico a exigência de ICP-Brasil e o prazo de guarda após a Res. 1.653/2025 (itens 1 e 2).
- Entrevistar de 5 a 8 veterinários, metade com PIMS e metade sem, para ordenar os itens 6 a 10.
