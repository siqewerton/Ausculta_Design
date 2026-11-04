# Revisão clínica do protótipo Ausculta (handoff de 02/10/2026)

> Para colar no projeto do Ausculta no Claude Design. Lista os termos, explicações e dados clínicos do protótipo que precisam de correção, porque o público é médico-veterinário e qualquer erro técnico derruba a credibilidade do produto.
> As faixas sugeridas vêm de referências usuais de livros-texto de clínica veterinária e **devem ser validadas pelo veterinário responsável da plataforma** antes de produção. Revisão feita sem busca na web.

---

## 1. Erros que um veterinário perceberia de imediato

| # | Onde | Texto ou dado atual | Problema | Correção sugerida |
|---|---|---|---|---|
| 1 | App, `VRANGE` Felino + caso Felino | FC 120–180 bpm; o caso com FC 210 bpm aparece como "acima da faixa" | Gatos em consulta costumam ter FC de 140 a 220 bpm; 210 bpm é esperado num gato estressado. O protótipo ensina errado | Faixa felina de FC 140–220 bpm. Se o caso precisa demonstrar valor fora da faixa, usar outro parâmetro (a T de 39,4 °C já está acima de 39,2 °C) |
| 2 | App, alerta de alergia (Buster) | "Dipirona (vômito após a dose)" registrada como **alergia** | Vômito após a dose é reação adversa ou intolerância, não alergia (hipersensibilidade) | Card "Alergia ou reação adversa relatada", com o tipo explícito: "Dipirona: reação adversa (vômito)". Manter o bloqueio da aprovação |
| 3 | App, alerta de dose (Buster) | "Meloxicam · sugerido 0,4 mg/kg · limite 0,2 mg/kg" e botão "Ajustar para 0,1" | O botão contradiz o limite mostrado. Em cães, 0,2 mg/kg é a dose inicial (1º dia) e 0,1 mg/kg a dose de manutenção | "Limite: 0,2 mg/kg (dose inicial) · 0,1 mg/kg (manutenção)". Botão "Ajustar para 0,1 mg/kg (manutenção)" |
| 4 | App, caso Equino (Avaliação) | "abscesso subsolar no casco torácico direito" | Não existe "casco torácico"; o casco é do membro | "abscesso subsolar no casco do membro torácico direito" |
| 5 | Landing, seção SOAP | "O SOAP é a ferramenta de evolução do prontuário orientado a problemas (POVMR), proposto por Lawrence Weed nos anos 1960" | Weed propôs o POMR na medicina humana; o POVMR é a adaptação veterinária posterior | "…do prontuário orientado a problemas, proposto por Lawrence Weed nos anos 1960 e adaptado à veterinária como POVMR" |
| 6 | Landing, glossário | WSAVA: "que define os 5 sinais vitais do exame" | A WSAVA recomenda a avaliação nutricional como 5ª avaliação vital, ao lado de temperatura, pulso, respiração e dor | "World Small Animal Veterinary Association, que recomenda a avaliação nutricional como 5ª avaliação vital, ao lado de temperatura, pulso, respiração e dor" |
| 7 | Landing, tabela "O que o Ausculta ouve" | "Sinais vitais e os 5 sinais da WSAVA" · Por quê: "Temperatura, FC, FR, dor e ECC viram dados" | Os 5 da WSAVA são temperatura, pulso, respiração, dor e avaliação nutricional (que inclui ECC, ECM e histórico alimentar) | Título "Sinais vitais e as 5 avaliações vitais da WSAVA". Por quê: "Temperatura, pulso, respiração, dor e avaliação nutricional (ECC e ECM) viram dados, não só texto" |
| 8 | Landing, tabela | Carência: "Calcula a carência do fármaco do Plano para bovinos" | A carência não é calculada: é definida na bula de cada produto registrado. E o protótipo exige carência também em suínos e aves | "Indica a data de liberação do leite, da carne e dos ovos a partir da carência registrada na bula do produto prescrito (ruminantes, suínos e aves)" |

## 2. Faixas de referência dos sinais vitais (`VRANGE`)

As faixas atuais são estreitas e marcam como anormais valores comuns em consulta. Sugestão, para validação clínica:

| Espécie | Parâmetro | Atual | Sugerido |
|---|---|---|---|
| Canino | FC | 70–120 bpm | 60–160 bpm (varia com o porte; raças pequenas e filhotes chegam a 180) |
| Canino | FR | 18–34 mpm | 10–30 mpm |
| Felino | FC | 120–180 bpm | 140–220 bpm |
| Felino | FR | 16–40 mpm | 20–30 mpm em repouso (aceitar até 40 em consulta) |
| Equino | FC | 28–40 bpm | 28–44 bpm |
| Equino | FR | 10–14 mpm | 8–16 mpm |
| Bovino (adulto) | FC | 40–70 bpm | 40–80 bpm (vacas leiteiras chegam a 84) |
| Bovino | T | 38–39,5 °C | Manter; bezerros têm faixa mais alta |

Recomendação de produto: mostrar no selo a fonte da faixa ("faixa de referência do Ausculta, revisada em [data]") e permitir que a clínica ajuste por idade e porte no futuro.

## 3. Sinais vitais que faltam por espécie

| Espécie | Falta no cartão "Sinais vitais" | Por quê |
|---|---|---|
| Equino | Motilidade intestinal (borborigmos por quadrante) | Faz parte do exame vital do equino, junto de T, FC e FR, sobretudo na triagem de cólica. Hoje só aparece no modelo de exame |
| Bovino | Movimentos ruminais (número em 2 ou 5 minutos) | É parâmetro vital do ruminante. Hoje só aparece no modelo de exame |

## 4. Ajustes de precisão menores

| # | Onde | Atual | Sugerido |
|---|---|---|---|
| 9 | Caso Equino (Objetivo) | "pinça de casco positiva" | "teste de pinça de casco positivo" |
| 10 | Caso Equino (Plano) | "Fenilbutazona 2,2 mg/kg por via intravenosa, a cada 12 horas" (sem duração) | Se for proposital, para demonstrar o alerta dos 6 elementos, manter e garantir que o alerta apareça. Se não, acrescentar a duração ("por 5 dias") |
| 11 | Landing, hero | "Prontuário SOAP em tempo real" | O SOAP é gerado ao encerrar a consulta. "Prontuário SOAP ao fim da consulta" |
| 12 | Landing, tabela | "O roteiro da anamnese: acompanha o roteiro OLDCHARTS durante a gravação" | O roteiro aparece com a gravação pausada, e o OLDCHARTS foi adaptado (o "R" de irradiação, da medicina humana, virou progressão). "Mostra o roteiro OLDCHARTS, adaptado à veterinária, quando você pausa a gravação" |
| 13 | Landing, tabela "Próximas fases" | "Mastite, casco e ruminação têm termos próprios" | "Mastite, laminite e atonia ruminal têm termos próprios" |
| 14 | Landing, tabela | "Termos e fármacos veterinários: usa a lista da plataforma com 1.240 termos" | O número é ilustrativo (veio de um PRD de design) e não existe lista. "Usa a lista de termos da plataforma e os termos que a sua clínica cadastrar" |
| 15 | Landing, glossário | CMT: "teste de mastite no leite" | "California Mastitis Test: teste rápido que estima as células somáticas do leite, usado para detectar mastite subclínica" |
| 16 | App, sinais de inflamação | "Rubor não mencionado" entra no selo "Precisa da sua atenção" | Em pele pigmentada ou com pelagem densa, o rubor muitas vezes não é avaliável. Manter a lacuna como informação, mas não como pendência que pede ação |

## 5. O que está correto e pode ficar

- Escala AAEP 0–5 e "claudicação grau 3 de 5 ao trote em linha reta".
- Escala de Glasgow (forma reduzida) "6 de 24" para dor em cães.
- ECC em 9 pontos; ECM em normal, leve, moderada e grave perda (WSAVA).
- Sinais cardinais de inflamação: calor, rubor, aumento de volume, dor e perda de função.
- CMT "fortemente positivo" por quarto mamário e "mastite clínica" com grumos, febre e quarto quente e aumentado.
- Flunixina meglumina 1,1 mg/kg IV a cada 24 h por 3 dias, com descarte do leite e carência da bula.
- Vacinação "V10 e antirrábica"; "TPC menor que 2 segundos"; "desidratação estimada em 5%"; "mucosas róseas".
- "Hipótese discutida em consulta" em todas as Avaliações.

## 6. Critérios de aceite

- [ ] Nenhuma faixa de referência marca como anormal um valor comum em consulta para a espécie.
- [ ] Reação adversa e alergia aparecem como tipos diferentes.
- [ ] O alerta de dose do meloxicam é coerente com o botão de ajuste.
- [ ] Os textos da landing sobre WSAVA, carência, POVMR e OLDCHARTS estão corrigidos em PT, EN e ES.
- [ ] Nenhum número sem fonte (como "1.240 termos") aparece como fato.
