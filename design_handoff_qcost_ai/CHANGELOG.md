# Changelog de design — Q-Cost AI

Registro das decisões de design para atualizar SDD e discovery. Mais recente no topo.

## 2026-09-24

### Estorno de contabilização
- Lançamento aprovado nunca é apagado nem editado: correção por estorno (Cancelado) ou estorno e relançamento (Ajustado), a partir do modo consulta de Revisar Evento.
- Motivo obrigatório, justificativa, data correta no relançamento e prévia dos lançamentos. Competência fechada não é reaberta: o estorno entra na competência aberta.
- Aprovação exige a permissão exclusiva "Estorno em competência fechada" (Equipe › Permissões especiais), que pode ser do próprio solicitante. Pedido entra na fila do Painel ("Decidir estorno"); aprovar ou recusar gera novas versões no histórico.
- Auditoria: ações Pedido de estorno, Estorno e Relançamento; verificação "Estornos".
- Regras de alerta de exemplo: AR-016 pedido registrado, AR-017 estorno aprovado, AR-018 pedido recusado.

### Relatórios
- Cinco modelos novos: conciliação de fechamento, estornos e relançamentos, precisão da IA por subcategoria, segregação de funções, origem dos eventos.

### Landing — Integrações
- Título e texto cobrem QMS, CRM, ERP, MES, WMS e PLM; novo item "PLM e engenharia".
- Notas de "Sistemas de origem" cobrem as 31 subcategorias do PAF padrão, cada uma em um sistema.
- SIQ Systems — EQM posicionado como plataforma que gerencia o processo de todas as subcategorias dos quatro elementos do PAF. **Pendente**: validar a afirmação de exclusividade com marketing e jurídico.

### Período padrão
- Painel abre em Ano; Custos abre em Mês; Auditoria abre em Últimos 30 dias.

### Auditoria
- Busca por ID, hash ou justificativa; período personalizado com início e fim; competência separada da data do registro.
- Verificações de auditoria com contagem: lançamento retroativo (> 45 dias), alteração de valor, após fechamento, mesmo autor e aprovador, exclusão ou rejeição, correção sobre a IA, cadastro e permissões.
- Mais filtros: objeto, ação, usuário, autoria, planta, categoria e subcategoria PAF, tipo de fornecedor, fornecedor, cliente, centro de custo, origem do envio, moeda convertida, faixa de valor.
- Chips de filtros aplicados, rastreio por ID (todas as versões), detalhe com dados da contabilização, paginação (10/25/50), exportação com critérios de filtro.
- Novos logs de exemplo: receita de referência, moeda da organização, ciclo de apuração e estrutura PAF.
- Abre filtrada quando recebe `?q=<id>`.

### Custos → Revisar Evento (consulta)
- Eventos da árvore PAF ordenados por data de contabilização DESC.
- Código do evento abre Revisar Evento em modo consulta (`?ev=<id>&mode=consulta`): somente leitura, estado Confirmado, histórico de versões, atalhos para Custos e Auditoria.

### Pacote SDD
- Adicionados `CLAUDE.md` e `specs/` (constituição, índice e sete specs com critérios de aceite rastreáveis, mais o modelo de dados do evento).
- `design_files/` sincronizado com a versão atual das telas.

### Contabilizações geradas (Novo Evento)
- Ações acima das linhas; ocorrências recolhidas por padrão; estado em selo do sistema; classificação PAF em régua P · A · FI · FE com categoria em cor e subcategoria em itálico, à direita do total.

### Aviso de pendência (Novo Evento e Revisar Evento)
- O aviso "N campos para revisar" passa a aparecer também em Dados do evento (base da soma) e em Esclarecimentos solicitados ("N perguntas a responder").
- Mais evidente: selo com ícone, peso 500 e borda `--warn`; cabeçalho da seção pendente em `--warnBg`. Resolvido, o selo fica verde com check.

### Campo de data
- Todas as datas digitáveis passam a ter calendário além da digitação manual com máscara: Data do evento (Novo e Revisar Evento), vigência (Editor PAF), período personalizado (Painel e Custos).
- Novo componente `Q-Cost AI Campo Data`; o seletor nativo do navegador foi substituído para manter o visual nos dois temas.

### Design System
- Nova seção "Padrões de interface" em `Q-Cost AI Design System v2.dc.html`: placeholder × valor, controles do cabeçalho, rótulo de estágio, esclarecimento solicitado, barra de abas, menu da conta, sequência de seções do evento e regras de mobile.
- Geometria: removida a exceção circular do seletor de tema.

### Campos de formulário
- Teste de uso: placeholders foram lidos como valores padrão.
- Novo token `--ph` (claro #A2A29F, escuro #5E5E5E). Placeholders em peso 300 e itálico, em todas as telas.
- Mobile: menu da conta cortado na lateral. Agora abre como folha fixa na largura da tela, com rolagem interna e itens de 44 px. Abas passam para uma segunda linha com rolagem horizontal.
- Botão de tema: ícone lua/sol em botão quadrado, igual ao do usuário.

## 2026-09-23

### Eventos
- **Tela "Eventos" (fila de envios) removida.** Duplicava a fila de trabalho do Painel e confundia o usuário. A aba Eventos abre `Novo Evento`.
- A tabela "Eventos que precisam de ação" do Painel é a única fila de trabalho. Alertas não entram nela.

### Revisar Evento
- Seções na ordem real do processo: Envio → Conteúdo recebido → Contabilização do evento → Dados do evento → Ocorrências agrupadas → Esclarecimentos solicitados → Aprovar e contabilizar / Rejeitar evento.
- Removidos: seção de chave de agrupamento e o alerta embutido (alertas pertencem à aba Alertas).
- Centro de custo somente leitura, vindo do cadastro PAF.

### Novo Evento
- Padronizado com Revisar Evento: mesmos nomes, mesma ordem e mesmo tratamento visual (blocos âmbar para esclarecimentos, tabela densa de três colunas na contabilização).

### Navegação
- Barra de abas: Painel · Eventos · Custos · Auditoria · Alertas · Relatórios. Integrações saiu da barra.
- Menu do usuário: dados do usuário → Meu perfil · Organização e plantas · Equipe e permissões → Integrações → Central de Ajuda e Treinamento · Central de Confiança · Assinatura e faturas → Sair.

### Central de Confiança
- Duas profundidades: resumo executivo + ficha técnica por domínio (acesso da equipe, isolamento, anexos, chaves Enterprise, demais domínios).
- Cada item: pergunta do cliente · o que fazemos · como se comprova, com rótulo de estágio (em operação / em implantação / roadmap / não oferecido).
- **Pendente**: quatro itens aguardam validação de engenharia e jurídico; rótulo "rascunho" até a liberação.

### Landing
- Aba "Segurança" no menu, apontando para a nova seção "Seus dados" (três garantias com link para a Central de Confiança).
- Quarto vídeo: modo de dados mínimos.
- Bloco "Leve para o seu TI": documentos empacotados e envio por e-mail em um campo.
- Seção PAF movida para depois de "Para quem é"; "Estrutura PAF" saiu do menu.
- **Pendente**: modo de dados mínimos depende de aprovação de produto. Se reprovado, saem o quarto vídeo e a garantia (b) de "Seus dados".

## 2026-09-22
- Ver "Sincronização anterior" no README.
