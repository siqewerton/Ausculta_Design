# 00 · Fundação

## Contexto
Base compartilhada por todas as telas: tokens, tipografia, chrome autenticado, idioma, tema e o campo de data. Nada mais bate sem isto.

Ref.: `README.md › Sistema visual`, `› Arquitetura de navegação`, `› Internacionalização`; `design_files/Q-Cost AI Design System v2.dc.html`, `Q-Cost AI Fundacoes v2.dc.html`, `Q-Cost AI Campo Data.dc.html`.

## Histórias
- Como usuário, quero a mesma barra de navegação em toda tela autenticada para não me perder.
- Como usuário, quero escolher idioma e tema uma vez e vê-los respeitados em todas as telas.
- Como usuário, quero digitar uma data ou escolhê-la num calendário, no formato do meu idioma.

## Critérios de aceite

### Tokens e tipografia
- **FND-AC-01** O sistema deve expor todos os tokens de cor dos temas claro e escuro como variáveis, e nenhum componente deve usar hex direto.
- **FND-AC-02** Quando o tema muda, todas as cores devem trocar sem recarregar a página, incluindo SVGs (que usam `currentColor`).
- **FND-AC-03** Dados (moeda, número, data, ID, código) devem usar DM Mono com `tabular-nums`; colunas numéricas alinhadas à direita.
- **FND-AC-04** Placeholder deve usar `--ph`, peso 300, itálico; valor digitado `--ink`, peso 400, sem itálico.

### Chrome autenticado
- **FND-AC-05** A barra de abas deve ser, em toda tela autenticada: Painel · Eventos · Custos · Auditoria · Alertas · Relatórios. A aba ativa tem sublinhado 1px `--ink`.
- **FND-AC-06** A aba Eventos deve abrir Novo Evento.
- **FND-AC-07** O menu da conta deve listar: organização/nome/e-mail/papel → Meu perfil · Organização e plantas · Equipe e permissões → Integrações → Central de Ajuda e Treinamento · Central de Confiança · Assinatura e faturas → Sair.
- **FND-AC-08** O menu deve fechar com clique fora e Esc.

### Mobile (≤ 680px)
- **FND-AC-09** Header em duas linhas: marca + controles na primeira; abas em faixa única com rolagem horizontal na segunda.
- **FND-AC-10** Menu da conta abre como folha fixa com 8px de margem lateral, altura máxima da viewport, rolagem interna e itens de 44px.
- **FND-AC-11** A página nunca rola na horizontal; tabelas largas rolam dentro do próprio contêiner.

### Idioma e tema
- **FND-AC-12** Idioma (pt-BR, en, es) e tema (claro, escuro) devem persistir por usuário e valer em todas as telas, inclusive públicas antes do login.
- **FND-AC-13** Número, moeda e data devem ser formatados por `Intl.*` do locale ativo.
- **FND-AC-14** Quando o idioma muda, valores editados devem ser reformatados a partir do número guardado, sem perda (ex.: "100.000" em pt-BR permanece 100000).

### Campo de data
- **FND-AC-15** Máscara `dd/mm/aaaa` em pt-BR e es; `mm/dd/yyyy` em en; barras inseridas automaticamente; teclado numérico no mobile.
- **FND-AC-16** Botão de calendário abre popover com navegação mensal, semana iniciando na segunda, hoje contornado, selecionado em `--acc`, rodapé Hoje · Limpar.
- **FND-AC-17** O popover fecha com clique fora, Esc, rolagem ou seleção; abre para cima quando falta espaço.
- **FND-AC-18** Quando a data completa é impossível (31/02), o campo deve mostrar borda `--neg` e "Data inválida".
- **FND-AC-19** O componente deve aceitar saída em ISO (`aaaa-mm-dd`) para filtros de período.

### Acessibilidade
- **FND-AC-20** Foco visível em todo controle: `outline 1px --sig`, offset 3px.
- **FND-AC-21** Todo botão só com ícone tem `aria-label`.
- **FND-AC-22** Contraste de texto ≥ 4.5:1 nos dois temas.

## Fora de escopo
Autenticação (spec 05). Conteúdo das telas.

## Questões abertas
- Persistência de idioma/tema: o protótipo usa `localStorage` (`qcost-lang-v2`, `qcost-theme-v2`). Definir se o produto também grava no perfil do usuário no servidor.
