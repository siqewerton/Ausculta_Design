# PRD de Design — Ausculta: correções clínicas do protótipo

> Para colar no projeto do Ausculta no Claude Design, sobre o protótipo atual (handoff de 02/10/2026).
> Anexar junto: `revisao-clinica-prototipo-ausculta.md`, que traz o texto atual e o texto sugerido de cada item. Os IDs R1–R16 abaixo são os itens dessa revisão.
> Segue o template do PRD de Design (9 seções).

---

## 1. Contexto e proposta

**Problema.** O protótipo é avaliado por médicos-veterinários e contém dados e textos clínicos incorretos: faixas de referência que marcam como anormais valores comuns em consulta, uma reação adversa registrada como alergia, um alerta de dose que contradiz o próprio botão, um termo anatômico inexistente e explicações erradas sobre WSAVA, carência e POVMR. Cada erro desses derruba a credibilidade do produto justamente com o público que ele quer convencer.

**Solução.** Corrigir dados, rótulos e textos no app e na landing, sem mudar layout, componentes nem fluxos. O protótipo passa a falar como um veterinário falaria.

## 2. Público e personas

- **Médico-veterinário de pequenos animais** (Dra. Renata Moraes): percebe na hora uma faixa de FC felina errada ou uma reação adversa chamada de alergia.
- **Veterinário de equinos e de produção** (Dr. Marcelo): espera ver motilidade intestinal e movimentos ruminais entre os sinais vitais e terminologia correta de casco e carência.
- **Visitante da landing com formação veterinária:** lê o glossário e a tabela "O que o Ausculta ouve" procurando imprecisão.

## 3. Fluxos de usuário

1. Como veterinário, quero que um valor normal para a espécie não apareça como alterado, para confiar nos alertas.
2. Como veterinário, quero ver alergia e reação adversa como coisas diferentes.
3. Como veterinário, quero que o alerta de dose explique a diferença entre dose inicial e de manutenção.
4. Como veterinário de equinos e bovinos, quero registrar motilidade intestinal e movimentos ruminais no cartão de sinais vitais.
5. Como visitante, quero ler explicações técnicas corretas na landing.

## 4. Modos e variações

| Situação | O que muda |
|---|---|
| Sinal vital dentro da nova faixa | Chip azul normal, sem selo laranja |
| Sinal vital fora da nova faixa | Selo laranja "fora da faixa de referência", como hoje |
| Alergia relatada | Card com o tipo "alergia" |
| Reação adversa relatada | Mesmo card, com o tipo "reação adversa" e a manifestação; bloqueia a aprovação do mesmo jeito |
| Espécie equina ou bovina | Um chip a mais no cartão "Sinais vitais" |

## 5. Escopo desta rodada

Todas as correções deste documento devem ser aplicadas completas, nos três idiomas. Nenhuma tela muda de layout.

## 6. Critérios de aceite visíveis

- [ ] CA-01 (R1) No caso Felino, FC 210 bpm não gera selo laranja; a temperatura de 39,4 °C continua gerando.
- [ ] CA-02 (seção 2 da revisão) Nenhum valor dentro das faixas sugeridas para canino, felino, equino e bovino gera selo laranja.
- [ ] CA-03 (R2) O caso Buster mostra "Alergia ou reação adversa relatada", com "Dipirona · reação adversa (vômito)"; a aprovação continua bloqueada até a decisão.
- [ ] CA-04 (R3) O alerta de dose mostra "limite 0,2 mg/kg (dose inicial) · 0,1 mg/kg (manutenção)" e o botão "Ajustar para 0,1 mg/kg (manutenção)".
- [ ] CA-05 (R4, R9) O caso Equino diz "casco do membro torácico direito" e "teste de pinça de casco positivo", e o bloco de inflamação do membro torácico direito continua aparecendo.
- [ ] CA-06 (R10) O caso Equino continua sem duração da fenilbutazona e mostra o alerta dos 6 elementos.
- [ ] CA-07 (seção 3 da revisão) O cartão "Sinais vitais" mostra motilidade intestinal nos equinos e movimentos ruminais nos bovinos; no caso Bovino, o chip aparece azul (vindo do áudio).
- [ ] CA-08 (R16) "Rubor não mencionado" aparece como lacuna informativa no cartão, mas não entra no selo "Precisa da sua atenção".
- [ ] CA-09 (R5–R8, R11–R15) Todos os textos da landing citados na revisão estão iguais à coluna "sugerido"; "1.240 termos" não aparece em nenhum lugar.
- [ ] CA-10 Todas as strings alteradas existem em PT, EN e ES.
- [ ] CA-11 Nenhuma tela passa a ter scroll horizontal em 320 px.

## 7. Telas e comportamento

### 7.1 Revisão SOAP — cartão "Sinais vitais"

- Trocar as faixas de referência pelas da seção 2 da revisão. No selo de fora da faixa, manter o formato atual ("FC 250 bpm · acima da faixa de referência (Felino 140–220 bpm)").
- Equinos: novo chip "Motilidade intestinal", com valores "presente", "diminuída" ou "ausente", ditos em voz alta ou registrados com um toque.
- Bovinos: novo chip "Movimentos ruminais", com o número em 2 minutos ou os valores "presentes", "diminuídos" ou "ausentes".
- Os dois chips seguem os quatro estados do padrão (do áudio, do veterinário, não mencionado, obrigatório) e entram no contador "N de M registrados". Não são obrigatórios.
- Logo abaixo do título do cartão, linha de 12px cinza: "Faixas de referência provisórias, em validação pela equipe clínica."

### 7.2 Revisão SOAP — cartão "Sinais de inflamação"

- Lacunas de rubor continuam no cartão, como texto cinza, mas deixam de entrar no selo "Precisa da sua atenção". As demais lacunas de inflamação permanecem como hoje.

### 7.3 Revisão SOAP — alertas do caso Buster

- **Alergia ou reação adversa:** título do card "Alergia ou reação adversa relatada". Linha do item: "Dipirona · reação adversa (vômito)". A ação sugerida passa a "Registrar reação adversa". No prontuário, a lista mostra o tipo ao lado do fármaco.
- **Dose:** linha do alerta "Meloxicam · sugerido 0,4 mg/kg · limite 0,2 mg/kg (dose inicial) · 0,1 mg/kg (manutenção)". Botões "Aceitar" e "Ajustar para 0,1 mg/kg (manutenção)".

### 7.4 Casos de exemplo

- **Equino:** "pinça de casco positiva" → "teste de pinça de casco positivo"; "abscesso subsolar no casco torácico direito" → "abscesso subsolar no casco do membro torácico direito". Fenilbutazona continua sem duração, para demonstrar o alerta dos 6 elementos.
- **Felino:** sem mudança de texto; só deixa de mostrar a FC como fora da faixa.

### 7.5 Landing

Aplicar os textos sugeridos da revisão nos itens:
- R5 seção SOAP (POVMR e Lawrence Weed);
- R6 glossário WSAVA;
- R7 linha "Sinais vitais e as 5 avaliações vitais da WSAVA";
- R8 linha de carência;
- R11 hero ("Prontuário SOAP ao fim da consulta");
- R12 linha do roteiro OLDCHARTS;
- R13 vocabulário por espécie em "Próximas fases";
- R14 linha de termos e fármacos, sem número;
- R15 glossário CMT.

## 8. Design system

Nenhum componente novo. Usar os chips de 44px e os quatro estados já definidos, o selo laranja de fora da faixa e o card de alerta existente. Seguir o padrão de design obrigatório (`padrao-de-design.md`) e atualizar `i18n.js` em PT, EN e ES. Vocabulário: "responsável", nunca "tutor".

## 9. Fora deste documento

- Validação clínica definitiva das faixas: veterinário responsável da plataforma.
- Faixas por idade, porte ou raça.
- Tabela real de limites de dose e base de carência por produto.
- Novos casos de exemplo ou novas espécies.
- Regerar o bundle offline `Ausculta App.html`.
