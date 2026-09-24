# 04 · Governança — Auditoria, Alertas, Relatórios, Integrações, Equipe

Ref.: `README.md › Telas 11–15`; arquivos `Auditoria v2`, `Regras de Alerta v2`, `Relatorios v2`, `Integracoes v2`, `Equipe v2`.

## Auditoria
- **GOV-AC-01** Trilha imutável; nenhum registro pode ser editado ou apagado por qualquer papel.
- **GOV-AC-02** Filtros principais: busca por ID, hash ou texto da justificativa; período do registro (7, 30, 90 dias, todo o histórico ou personalizado com data de início e fim no Campo Data, com validação de fim antes do início); competência contábil (separada da data do registro, para teste de corte). Filtros secundários em "Mais filtros": categoria PAF, objeto, tipo de ação, usuário, autoria (IA/manual), planta, tipo de fornecedor, fornecedor, cliente, centro de custo, subcategoria PAF (restrita à categoria escolhida), origem do envio (Upload, API REST, MCP), moeda (convertido para a moeda da organização ou já nela) e faixa de valor contabilizado (mínimo e máximo, formato do locale).
- **GOV-AC-02a** Verificações de auditoria (combinam por OU entre si e por E com os demais filtros), cada uma com contagem e descrição da regra: lançamento retroativo (data do evento mais de 45 dias anterior ao envio), alteração de valor, após fechamento, mesmo autor e aprovador, exclusão ou rejeição, correção sobre a IA, cadastro e permissões. Registros que se enquadram mostram as marcas na linha.
- **GOV-AC-02e** A tela abre com período "Últimos 30 dias". A lista é paginada (10, 25 ou 50 por página, padrão 10), com faixa "1–10 de N", anterior/próxima e números com reticências (primeira, última e vizinhas da atual). Qualquer mudança de filtro volta para a página 1; a página nunca fica fora do total.
- **GOV-AC-02d** O detalhe de um registro de evento mostra os dados da contabilização: data do evento, subcategoria, centro de custo, fornecedor e tipo, cliente, origem do envio, valor contabilizado e moeda (com a moeda de origem quando convertido).
- **GOV-AC-02b** Clicar no ID de um registro filtra todas as versões dele em todo o histórico.
- **GOV-AC-02c** Filtros aplicados aparecem como chips removíveis; a exportação grava os critérios de filtro junto com o hash de cada registro.
- **GOV-AC-03** Cada linha expande com antes/depois, justificativa e hash do registro.
- **GOV-AC-04** O diff textual é neutro; cor PAF só no badge da coluna Categoria.

## Alertas
- **GOV-AC-05** Regras de limite por categoria PAF, planta e período, com destinatários e canal.
- **GOV-AC-06** Alerta disparado vive na aba Alertas; não entra na fila do Painel nem aparece em Revisar Evento.

## Relatórios
- **GOV-AC-07** Cinco modelos: apuração mensal PAF, COPQ por planta, falhas por fornecedor, evolução 12 meses, pacote de auditoria ISO.
- **GOV-AC-08** Histórico de gerações e agendamento de envio recorrente.
- **GOV-AC-09** Relatórios respeitam idioma, moeda e escopo de planta do usuário.

## Integrações
- **GOV-AC-10** Gestão de chaves de API e conector MCP.
- **GOV-AC-11** Registro de invocações REST e MCP: endpoint/ferramenta, origem, latência, status, payload.
- **GOV-AC-12** Evento criado por API/MCP entra como rascunho analisado e aguarda aprovação humana.
- **GOV-AC-13** Integrações fica no menu da conta, fora da barra de abas.

## Equipe e permissões
- **GOV-AC-14** Papéis: Analista (registra, corrige, propõe regra), Aprovador (aprova eventos e propostas), Administrador (tudo + cadastro e equipe).
- **GOV-AC-15** Escopo por planta; usuário sem escopo consolidado não vê custo de outras plantas.

## Questões abertas
- Canais de alerta suportados no lançamento (e-mail, WhatsApp, webhook?).
- Rotação e expiração de chaves de API.
