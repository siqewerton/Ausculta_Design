# Changelog de design — Q-Cost AI

Registro das decisões de design para atualizar SDD e discovery. Mais recente no topo.

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
