# Backlog de discovery: melhorias do prontuário SOAP (POVMR)

Origem: recomendações feitas a partir da seção SOAP da landing e da base de conhecimento POVMR (30/09/2026).
Já implementadas no protótipo e fora desta lista: lacunas por sistema no Objetivo (#1), os 6 elementos da prescrição (#5) e os casos de exemplo por espécie (#10).

Princípios que valem para todos os itens:
- **Mínimo de toques:** nada acrescenta passo ao fluxo principal.
- **Sem invenção:** a IA não inventa dado nem diagnostica. Toda sugestão só entra no prontuário se o veterinário tocar.
- **Segurança por espécie:** alerta de dose e carência dependem da espécie do paciente, nunca do modelo de exame escolhido.

---

## 2. Lista de problemas (POVMR) no prontuário do paciente

**Problema:** o prontuário é organizado por consulta, não por problema. Um mesmo problema, como a claudicação, fica espalhado em várias consultas, sem estado nem evolução.

**Proposta**
- Cartão ou aba "Problemas" no prontuário do paciente, com os problemas ativos e inativos montados ao longo das consultas.
- Na revisão, a Avaliação e o Plano aparecem agrupados por problema, por exemplo "#1 Claudicação MPE, ativo", cada um com o seu próprio A e P.
- No retorno, a revisão pergunta "Claudicação MPE continua ativo?", com as respostas Resolvido, Melhorou e Igual em um toque.

**Critérios de aceite**
- Cada problema registra quando foi aberto, as consultas em que aparece e o estado atual.
- O veterinário confirma a criação de todo problema novo; a IA só propõe.
- A exportação para o PIMS continua como SOAP em quatro seções, com os problemas incorporados ao texto.

**Dependências:** modelo de dados de problema por paciente; CRDT por campo para a sincronização offline.

---

## 3. Fala leiga convertida em termo clínico, visível no Subjetivo

**Problema:** o veterinário não vê como a fala do responsável virou termo clínico e precisa confiar na conversão.

**Proposta**
- No Subjetivo, um chip discreto mostra a origem de cada termo, por exemplo "comendo mal" → hiporexia.
- Um toque no chip toca o trecho de áudio em que o responsável disse aquilo.
- Reforça a proposta de valor "para quem não pode falar": o registro preserva a voz de quem fala pelo animal.

**Critérios de aceite**
- Toda conversão guarda a expressão original e o trecho de áudio.
- O veterinário pode desfazer a conversão e manter a expressão original.

**Riscos:** uma conversão errada muda o sentido clínico. Isso exige conjunto de teste por espécie e revisão da terminologia.

---

## 4. Roteiro OLDCHARTS vivo durante a gravação

**Problema:** na correria, itens da história da doença ficam de fora, como fatores de piora ou progressão.

**Proposta**
- Na tela de gravação, uma linha compacta com os itens já captados (início, localização, duração ✓) e os que faltam.
- Funciona só como lembrete visual, sem nenhum toque obrigatório: o veterinário olha e pergunta ao responsável.

**Critérios de aceite**
- Cabe na tela de gravação sem empurrar o botão "Encerrar consulta e gerar SOAP" para fora da área visível, inclusive em 320 × 540 px.
- Funciona offline, com a transcrição local.
- Pode ser desligado no perfil.

**Riscos:** desviar a atenção do paciente. O visual precisa ser discreto, sem som nem animação chamativa.

---

## 6. Tendência do paciente como dado objetivo

**Problema:** o peso já vira dado, mas a variação entre consultas não aparece na revisão, onde a decisão é tomada.

**Proposta**
- No Objetivo, mostrar a variação desde a última consulta, por exemplo "32 kg (−1,2 kg em 3 meses)".
- Fazer o mesmo com ECC e escore de dor, com um gráfico pequeno no prontuário do paciente.
- Levar para a revisão o alerta que o prontuário já tem ("Peso caiu X% em N meses").

**Critérios de aceite**
- A variação é calculada só com medidas registradas; sem medida anterior, nada é exibido.
- A unidade e a escala do ECC (1–9 ou 1–5) seguem o que foi registrado.

---

## 7. Checklist por espécie, a partir do modelo de exame

**Problema:** a lista de sistemas é genérica e não cobre o que é típico de cada espécie.

**Proposta**
- Usar o modelo de exame da espécie (Configurações da conta → Espécies e modelos de exame) para avisar só o que é típico dela. Exemplos:
  - Equino, não mencionado: pulso digital, grau AAEP.
  - Bovino: carência obrigatória antes de aprovar; CMT por quarto.
  - Exóticos: recinto, temperatura, fotoperíodo e dieta no Subjetivo.

**Critérios de aceite**
- Campo sem trecho de áudio de origem fica vazio. O critério de aceite vale por campo, não só por frase.
- A carência e o alerta de dose continuam exigidos mesmo com o modelo "Geral".
- Cada modelo tem um conjunto de testes de extração próprio antes de ser liberado.

**Dependências:** templates por família (7 modelos) já definidos no protótipo; validação clínica de cada modelo.

---

## 8. Instruções de alta com sinais de alerta

**Problema:** o animal não reclama; quem precisa saber o que observar é o responsável.

**Proposta**
- Nas instruções de alta geradas a partir do Cx, uma seção fixa "Procure o veterinário se…", montada com o que foi dito na consulta.
- O veterinário revisa e edita antes de enviar por WhatsApp ou e-mail.

**Critérios de aceite**
- Só entram sinais de alerta mencionados na consulta ou incluídos pelo veterinário.
- O texto usa linguagem leiga, legível para o responsável.

---

## 9. Retorno com objetivo

**Problema:** o retorno é agendado sem o motivo, e na consulta seguinte o contexto se perde.

**Proposta**
- O retorno leva o objetivo registrado no Mx, por exemplo "Retorno 7 dias: reavaliar claudicação e ver radiografia".
- Na consulta de retorno, esse objetivo aparece como contexto na tela de consentimento e no topo da revisão.
- Liga-se à Lista de problemas (#2): o retorno reabre o problema correspondente.

**Critérios de aceite**
- O objetivo do retorno aparece no lembrete e na agenda.
- Na revisão do retorno, o sistema pergunta se o objetivo foi cumprido.

---

## Priorização sugerida

1. **#7 Checklist por espécie:** aproveita os modelos de exame que já existem; alto impacto em equinos e produção.
2. **#2 Lista de problemas:** a base do POVMR e o pré-requisito do #9.
3. **#9 Retorno com objetivo:** baixo esforço depois do #2.
4. **#8 Alta com sinais de alerta:** baixo esforço e ganho direto para o responsável.
5. **#6 Tendência do paciente:** usa dados que já existem.
6. **#3 Fala leiga → termo clínico:** exige validação de terminologia.
7. **#4 OLDCHARTS vivo:** exige teste de atenção em consulta real.
