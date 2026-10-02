# Ausculta: padrão de design obrigatório

Cada estilo tem um único significado. Um estilo novo só entra se não houver um equivalente abaixo. Toda tela nova ou alterada segue este padrão.

## Cores com significado
- **Azul (brand):** ação principal, navegação, item selecionado, dado vindo do áudio.
- **Verde (success):** concluído ou confirmado pelo veterinário (normal ao exame, aprovado, completo, sincronizado).
- **Laranja (accent-warm):** atenção; precisa de decisão, mas não é risco (problema ativo, elemento faltando, rascunho da IA, offline).
- **Vermelho (danger):** risco ao paciente ou perda de dados (alergia, gravação, interrupção de áudio, item obrigatório que bloqueia a aprovação, apagar).
- **Cinza:** neutro, pendente, não mencionado, informação de apoio.

## Componentes e quando usar
1. **Botão primário:** preenchido azul, 56px (64px na aprovação). Um por tela, para a ação principal.
2. **Botão secundário:** contorno de 2px, fundo branco, 48px.
3. **Ação em linha (carimbo):** pílula com ícone e borda de 2px, 44px. Serve para ações dentro de uma faixa ou cartão (Marcar resolvido, Reativar, Rever, Aceitar). Nunca texto sublinhado como ação.
4. **Chip de estado (toque alterna):** pílula de 44px com ícone de estado.
   - Pendente: borda cinza tracejada, fundo branco, ícone `circle-dashed`.
   - Confirmado: borda verde sólida, fundo verde-claro, ícone `check`.
   - Vindo do áudio: borda azul sólida, fundo azul-claro, ícone `audio-lines`.
   - Obrigatório pendente: borda vermelha tracejada, ícone `lock`.
5. **Pílula de escolha (rádio):** borda de 2px; selecionada em azul-claro com borda azul.
6. **Faixa de alerta clínico:** fundo danger-subtle, ícone de 18px e texto 600 de 14px. Só vermelha, para alergia e risco ao paciente. Fica no cabeçalho do paciente, abaixo da identificação.
7. **Selo de atenção (laranja):** reúne tudo o que precisa da atenção do usuário naquela tela (fila pronta para revisão, alterações não sincronizadas, sem internet, IA a instalar ou atualizar, voz a cadastrar) num único selo discreto no topo, para não competir com a função da tela: retângulo de 6px de raio, fundo accent-warm-subtle, borda de 1px laranja, ícone `bell-dot` de 14px, "Precisa da sua atenção · N" em 12px 600 (total em Plex Mono) e chevron, com alvo de toque de 44px. Ao tocar, abre logo abaixo a lista em painel laranja (raio grande): uma linha de 48px por item, com ícone de 18px (laranja; azul se em andamento), texto 14px 600 e carimbo laranja opcional à direita. Some quando não há itens. Família de balões: vermelho = bloqueio ou risco (ex.: "Falta para aprovar", com bico apontando para o botão), laranja = atenção, verde = concluído ("Registrado"). Status concluído que não pede ação (com internet, IA pronta, tudo sincronizado, transcrito e analisado, áudio cifrado) vira selo verde no topo (regra 8, com ícone de 14px). Configuração descritiva (como a consulta será tratada, política da conta) continua como linha cinza de 13px. Não entra na tela de gravação.
8. **Selo de status:** retângulo de 6px de raio, 12px, 600 (Ativo, Completa, Em breve). Verde (fundo success-subtle, borda de 1px) para status concluído no topo da tela.
9. **Link de texto (azul ou cinza, sem sublinhado):** só para navegar a outra tela ou expandir e recolher ("Ver N…", "Já tem conta? Entrar").
10. **Seletor de área (no lugar de abas):** para trocar de área dentro da mesma tela (Pacientes/Responsáveis, seções do prontuário, SOAP/Transcrição). Botão de 48px, borda de 2px cinza, fundo branco, com ícone azul de 20px, nome da área (15px 600), posição "N de M" em Plex Mono 12px cinza e chevron. Ao tocar, abre um menu em lista abaixo dele (ícone, nome, contagem e marca de seleção; a área atual fica em azul-claro). Nunca abas, controle segmentado ou pílulas para navegar entre áreas.
11. **Menus:** lista com linhas de ícone, texto e chevron. Nunca grade de botões nem abas com scroll horizontal.
12. **Listas longas:** cada lista mostra uma prévia curta (Painel/fila: 5; Consultas: rascunhos e mais 5; Medicação: todos os em uso e mais 3; Exames: 6; Notas: 3) e termina com o link "Ver todas… (N)", que abre a lista completa. Padrão único: o título da lista tem o total à direita (Plex Mono 13px cinza), e o link fica no fim da lista, ocupando a largura, sem sublinhado, em 15px 600 azul e sempre com o total entre parênteses. Nunca "Ver todos" ao lado do título. A lista completa tem a seta ← no topo, título e paciente, busca, pílulas de filtro com contagem, grupos por mês e "Mostrar mais 20", com "Mostrando X de Y". Nunca páginas numeradas nem rolagem infinita. Rascunhos, medicação em uso, alergia e pendências nunca entram na paginação.
13. **Voltar:** só a seta ← no topo esquerdo; o título aparece no header ao rolar.

## Regras gerais
- Espaçamento só pela escala 4/8/12/16/24/32/48/64.
- Alvo de toque mínimo de 44px em chips e de 48px em botões.
- Tipografia: Fraunces 600 em títulos e identidade do paciente; Public Sans na interface; IBM Plex Mono em dados, tempos e doses.
- Ícones Lucide v0.460.0, com máscara CSS.
- Toda sugestão da IA só entra no prontuário se o veterinário tocar.
- A tela de gravação precisa caber sem rolar em 320 × 540.
- Vocabulário: "responsável" para quem acompanha o paciente; nunca "tutor" (ES: "responsable"; EN: "owner").
- Toda string nova entra em `i18n.js` (PT, EN e ES).
