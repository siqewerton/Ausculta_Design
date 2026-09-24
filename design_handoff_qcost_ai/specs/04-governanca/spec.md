# 04 · Governança — Auditoria, Alertas, Relatórios, Integrações, Equipe

Ref.: `README.md › Telas 11–15`; arquivos `Auditoria v2`, `Regras de Alerta v2`, `Relatorios v2`, `Integracoes v2`, `Equipe v2`.

## Auditoria
- **GOV-AC-01** Trilha imutável; nenhum registro pode ser editado ou apagado por qualquer papel.
- **GOV-AC-02** Filtros: usuário, tipo de ação, categoria PAF, planta, origem (IA/manual), período.
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
