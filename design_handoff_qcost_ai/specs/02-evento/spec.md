# 02 · Evento — Novo Evento e Revisar Evento

## Contexto
Núcleo do produto. Um **envio** (documento, texto, chamada de API ou ferramenta MCP) é lido pela IA, que gera N **contabilizações** (eventos), cada uma agrupando N **ocorrências**. Uma pessoa revisa, responde esclarecimentos e aprova. Só então o evento entra na apuração.

Novo Evento é o registro manual (destino da aba Eventos). Revisar Evento é a ação sobre um envio já recebido (destino da fila do Painel). As duas telas compartilham sequência, nomes e tratamento visual.

Ref.: `README.md › Telas 5 e 6`, `› Sequência de seções do evento`, `› Modelo de dados do evento`, `› Agrupamento de ocorrências`, `› Regras de negócio`; `design_files/Q-Cost AI Novo Evento v2.dc.html`, `Q-Cost AI Revisar Evento v2.dc.html`. Modelo: [data-model.md](data-model.md).

## Histórias
- Como analista, quero enviar documentos e uma orientação em texto e ver o que a IA extraiu, com a origem de cada valor.
- Como analista, quero corrigir um valor e decidir se a correção vale só aqui ou deve virar proposta de regra da subcategoria.
- Como aprovador, quero ver em que seções há pendência antes de aprovar.
- Como aprovador, quero entender como o total foi formado, ocorrência por ocorrência.

## Critérios de aceite

### Fluxo (Novo Evento)
- **EVT-AC-01** Fases: `idle` (upload + orientação) → `busy` (progresso em 4 etapas) → `result` → `saved`.
- **EVT-AC-02** Upload aceita PDF, XLSX, CSV, DOCX, PNG até 25 MB por arraste ou seleção.
- **EVT-AC-03** O progresso em 4 etapas não é estado do evento e não usa forma de badge de status.
- **EVT-AC-04** Em `result`, deve mostrar o resumo de consolidação: ocorrências lidas, contabilizações geradas, ocorrências em triagem, revisões evitadas; e a lista de contabilizações geradas e o bloco de triagem agrupado por motivo.

### Lista de contabilizações geradas
- **EVT-AC-05** Ações da lista ficam acima das linhas.
- **EVT-AC-06** Cada linha mostra total, classificação PAF (régua P · A · FI · FE, categoria na cor PAF em tamanho maior, subcategoria em itálico) à direita do total, e o estado em selo do sistema de estados.
- **EVT-AC-07** Ocorrências de cada contabilização começam recolhidas e expandem sob demanda.
- **EVT-AC-08** Cada linha leva a Revisar Evento daquela contabilização.

### Sequência de seções (as duas telas)
- **EVT-AC-09** Ordem e nomes fixos: Envio → Conteúdo recebido → Contabilização do evento → Dados do evento → Ocorrências agrupadas → Esclarecimentos solicitados → barra de decisão.
- **EVT-AC-10** **Envio**: grade somente leitura com origem, momento, autor, chamada de origem. Nenhum campo de entrada.
- **EVT-AC-11** **Conteúdo recebido**: conteúdo bruto (JSON REST, argumentos MCP ou texto livre) e anexos.
- **EVT-AC-12** **Contabilização do evento**: tabela densa de três colunas com o contrato fixo de campos; campo nulo aparece como "não se aplica"; centro de custo somente leitura, vindo do cadastro PAF.
- **EVT-AC-13** **Dados do evento**: campos específicos da subcategoria; coluna "Efeito" marca "→ soma no total" nas linhas de custo (Revisar Evento). Em Novo Evento, cartões com o mecanismo de escopo.
- **EVT-AC-14** **Esclarecimentos solicitados**: blocos em `--warn`/`--warnBg` com as perguntas da IA. Em Revisar Evento, nota de que sistemas e agentes não respondem.

### Aviso de pendência
- **EVT-AC-15** Contabilização do evento, Dados do evento e Esclarecimentos solicitados mostram no cabeçalho um selo com ícone, contagem e texto em `--warn` peso 500, borda `--warn`, cabeçalho da seção em `--warnBg`: "N campos para revisar" / "N perguntas a responder".
- **EVT-AC-16** Quando a contagem zera, o selo passa a "TUDO CONFIRMADO" / "TODAS RESPONDIDAS" em `--pos` com check, e o cabeçalho volta ao neutro.

### Procedência e correção
- **EVT-AC-17** Todo campo mostra etiqueta de procedência: EXTRAÍDO, SUGERIDO, FALTANDO, DO CADASTRO, SESSÃO, REVISADO, com borda/fundo conforme `README.md › Etiquetas de confiança`.
- **EVT-AC-18** Quando o usuário edita um campo, a etiqueta passa a REVISADO.
- **EVT-AC-19** (Novo Evento) Ao corrigir campo sugerido pela IA, o usuário escolhe "só neste evento" (padrão) ou "sempre que for esta subcategoria". A segunda cria proposta de regra para aprovador; nada muda imediatamente e eventos existentes não são reclassificados.
- **EVT-AC-20** Quando há padrão no histórico, deve mostrar a evidência (ex.: "Em 7 dos últimos 15 eventos desta subcategoria o custo foi corrigido para cima").
- **EVT-AC-21** Edição manual do centro de custo marca REVISADO, vale só para o evento, não conta como pendência nem entra em proposta de regra.
- **EVT-AC-22** Trocar a planta troca o centro de custo herdado.

### Moeda
- **EVT-AC-23** Documento em moeda diferente da organização: bloco com valor no documento · taxa aplicada · valor contabilizado. Taxa editável antes de aprovar. Taxa e valor original registrados no evento e na auditoria.

### Ocorrências (Revisar Evento)
- **EVT-AC-24** Composição do total por componente de custo e tabela de ocorrências com busca, ordenação, paginação e seleção.
- **EVT-AC-25** Editar uma dimensão da chave na contabilização inteira move; funde quando já existe irmã com a mesma chave no envio. Editar em parte das ocorrências divide. Os efeitos aparecem antes de confirmar, com contagem e valor.
- **EVT-AC-26** Excluir ocorrências as envia à triagem do envio de origem, com motivo.
- **EVT-AC-27** Deve exibir e manter verdadeiro: lidas = agrupadas + triagem.

### Navegação (Revisar Evento)
- **EVT-AC-28** Recebe `?ev=<id>` e abre o evento. Chips navegam entre eventos da fila, ordenados por recência.
- **EVT-AC-29** Link de rastreio: upload → Auditoria; API/MCP → Integrações.
- **EVT-AC-30** Não exibe alertas nem a chave de agrupamento como seção própria.

### Decisão
- **EVT-AC-31** Barra com "Aprovar e contabilizar" (primária) e "Rejeitar evento" (destrutiva).
- **EVT-AC-32** Aprovação bloqueada enquanto houver campo obrigatório vazio.
- **EVT-AC-33** Analista não vê "Aprovar"; pode salvar e propor regra.
- **EVT-AC-34** Aprovar muda o estado (Confirmado, ou Provisório se houver valor estimado); rejeitar leva a Cancelado. Ambos geram registro de auditoria.

### Estorno de evento contabilizado
- **EVT-AC-35** Lançamento aprovado nunca é apagado nem editado. A correção é feita por estorno a partir do modo consulta ("Solicitar estorno").
- **EVT-AC-36** Duas formas: Estornar (lançamento contrário −X; evento vai para Cancelado) e Estornar e relançar (−X e novo lançamento +Y com os dados corretos; evento vai para Ajustado).
- **EVT-AC-37** Motivo obrigatório (data de contabilização, classificação PAF, valor, centro de custo, duplicidade, outro) e justificativa com no mínimo 10 caracteres. Em relançamento, informar a data de contabilização correta (Campo Data); a competência deriva dela.
- **EVT-AC-38** Prévia mostra os lançamentos (original, estorno, relançamento) com competência e valor antes de enviar.
- **EVT-AC-39** Competência fechada nunca é reaberta: o estorno entra na competência aberta atual, referenciando a original.
- **EVT-AC-40** O pedido fica pendente e o lançamento original continua valendo até a decisão. Estorno de competência fechada só pode ser aprovado ou recusado por usuário com a permissão exclusiva "Estorno em competência fechada" (GOV-AC-16), que pode ser o próprio solicitante; a decisão registra o nome e a permissão usada.
- **EVT-AC-40a** O pedido entra na fila do Painel ("Decidir estorno") e abre Revisar Evento em consulta com o bloco de decisão (`&rev=repost|reverse`). Aprovado: novas versões Estorno (e Relançamento) no histórico; estado Cancelado (estorno) ou Ajustado (relançamento). Recusado: versão "Pedido recusado", lançamento original inalterado.
- **EVT-AC-41** Pedido, estorno e relançamento viram novas versões ligadas à original, com autor, momento, motivo e hash; aparecem no histórico do evento e na Auditoria.

## Fora de escopo
Motor de extração da IA (contrato de saída em data-model.md). Regras de alerta (spec 04).

## Questões abertas
- Critério exato para Provisório × Confirmado na aprovação (qualquer campo SUGERIDO não revisado? só o custo?).
- Limite de tamanho do envio total com múltiplos anexos.
- Prazo de retenção das ocorrências em triagem não resolvidas.
