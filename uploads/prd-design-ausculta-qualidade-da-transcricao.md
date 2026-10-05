# PRD de Design — Ausculta: qualidade da transcrição e transcrição no histórico

> Para colar no projeto do Ausculta no Claude Design, sobre o protótipo atual (handoff de 03/10/2026).
> Base: os dois testes reais com o Deepgram (`nova-3`) sobre a consulta simulada do Buster, um com o áudio limpo e outro com ruído de ambiente. Os valores de exemplo deste PRD são ilustrativos, inspirados nesses testes; não são medições exatas.
> Segue o template do PRD de Design (9 seções).

---

## 1. Contexto e proposta

**Problema.** A tela de Transcrição da revisão mostra o texto, mas não diz se dá para confiar nele. Nos testes, o mesmo áudio com ruído trocou "com dor à manipulação" por "Comprou a manipulação" e "V10" por "avidez"; o Deepgram marcou essas palavras com confiança baixa, mas o veterinário não vê isso. Além disso, depois de aprovada, a consulta some da revisão e a transcrição deixa de ser acessível pelo prontuário, justamente quando ela serve para tirar uma dúvida, responder a um responsável ou auditar o registro.

**Solução.**
1. Um **resumo da qualidade da transcrição** no topo da tela de Transcrição, com poucos indicadores que levam a uma ação: conferir trechos, rever o falante, melhorar a captação.
2. Um **acesso discreto à transcrição a partir do histórico**: na consulta aprovada, o mesmo seletor "SOAP · Transcrição" da revisão, em modo leitura.

## 2. Público e personas

- **Veterinária de clínica (Dra. Renata Moraes):** revisa várias consultas por dia e quer saber em segundos se precisa conferir algum trecho antes de aprovar.
- **Veterinário volante (Dr. Marcelo):** grava em ambiente ruidoso; precisa entender por que a transcrição veio pior e o que fazer na próxima consulta.
- **Dono da clínica ou auditor:** volta a uma consulta aprovada meses depois para verificar o que foi dito.

## 3. Fluxos de usuário

1. Como veterinário, quero ver logo no topo da transcrição se a qualidade está boa ou se há trechos para conferir.
2. Como veterinário, quero tocar em "N trechos para conferir" e ir direto a cada um, ouvindo o áudio.
3. Como veterinário, quero ver quem falou e por quanto tempo, para perceber um erro de separação de falantes.
4. Como veterinário, quero ver quais números e termos clínicos foram reconhecidos, porque são eles que alimentam os alertas.
5. Como veterinário, quero uma dica concreta quando a captação estiver ruim (aproximar o celular, usar lapela).
6. Como veterinário, quero abrir a transcrição de uma consulta já aprovada a partir do prontuário do paciente.
7. Como auditor, quero ver a transcrição de uma consulta aprovada mesmo quando o áudio já foi apagado, sabendo por que não posso ouvi-lo.

## 4. Modos e variações

| Situação | Resumo de qualidade | Transcrição no histórico |
|---|---|---|
| Transcrição na nuvem | Todos os indicadores | Disponível |
| Transcrição no aparelho | Sem separação de falantes por voz e com confiança por trecho (se o modelo fornecer); linha "Transcrito no aparelho" | Disponível |
| Consulta sem análise (aguardando) | Não aparece; a tela mostra "Aguardando transcrição" | Item da lista com o selo "Aguardando análise", como hoje |
| Áudio guardado na nuvem | Trechos tocam o áudio | Trechos tocam o áudio |
| Áudio apagado após a aprovação | — | Texto, falantes e tempos visíveis; sem reprodução; selo "Áudio apagado" |
| Áudio só no aparelho, em outro aparelho | — | Texto visível; sem reprodução; selo "Áudio no aparelho que gravou" |
| Consulta com adendo | — | Seletor mostra a transcrição da consulta original e a do adendo, cada uma com sua data |

## 5. Escopo desta rodada

As duas funcionalidades devem ser desenhadas completas, com todos os estados da tabela acima. Não alterar a gravação, o fluxo de aprovação nem o layout do SOAP.

## 6. Critérios de aceite visíveis

- [ ] CA-01 A tela de Transcrição abre com o cartão "Qualidade da transcrição" acima da lista de falas, recolhível.
- [ ] CA-02 O cartão mostra um nível geral (Boa, Confira alguns trechos, Áudio difícil) com a regra explicada em uma linha, nunca uma nota numérica solta.
- [ ] CA-03 "N trechos para conferir" leva ao primeiro trecho e permite avançar entre eles; cada um toca o áudio.
- [ ] CA-04 O cartão mostra os falantes com o tempo de fala de cada um e permite ir a "Trocar falante".
- [ ] CA-05 O cartão mostra os números e os termos clínicos reconhecidos, e cada um leva à frase de origem.
- [ ] CA-06 Com nível "Áudio difícil", aparece uma dica com link para "Microfone e captação".
- [ ] CA-07 Na consulta aprovada do prontuário, o seletor "SOAP · Transcrição" aparece no topo, em modo leitura, com o mesmo cartão de qualidade.
- [ ] CA-08 A lista de consultas do prontuário não ganha botões novos; só um ícone discreto indica que há transcrição.
- [ ] CA-09 Com áudio apagado ou só no aparelho, a transcrição continua legível e o motivo de não poder ouvir fica explícito.
- [ ] CA-10 Tudo segue o padrão de design obrigatório, cabe em 320 px sem scroll horizontal e existe em PT, EN e ES.

## 7. Telas e comportamento

### 7.1 Revisão → Transcrição → cartão "Qualidade da transcrição"

Posição: logo abaixo do seletor "SOAP · Transcrição", acima da lista de falas. Recolhível; aberto por padrão quando o nível não é "Boa".

**Cabeçalho do cartão**
- Título "Qualidade da transcrição" e, à direita, o selo do nível:
  - **Boa** (selo verde): nenhum trecho com confiança baixa em número, dose ou termo clínico.
  - **Confira alguns trechos** (selo laranja): até 5 trechos com confiança baixa, ou qualquer um que contenha número, dose ou termo clínico.
  - **Áudio difícil** (selo laranja, ícone `volume-x`): mais de 5 trechos com confiança baixa, ou trechos longos ininteligíveis.
- Linha de 13px cinza com a regra: "Calculado a partir da confiança do reconhecimento de cada palavra."
- Linha de sistema com a origem: "Transcrito na nuvem · Deepgram · 3min09s" ou "Transcrito no aparelho · 3min09s".

**Indicadores** (lista vertical no celular; grade de 2 colunas a partir de 600px). Cada um é uma linha tocável com ícone de 24px, valor em IBM Plex Mono e frase curta.

| Indicador | Exemplo (teste com ruído) | Exemplo (teste limpo) | Ao tocar |
|---|---|---|---|
| `alert-triangle` Trechos para conferir | **8 trechos** · 3 com termo clínico | **6 trechos** · 1 com termo clínico | Abre o modo "Conferir trechos" (7.2) |
| `users` Quem falou | Veterinária 78% · Responsável 22% | Mesmos valores | Rola até a primeira fala de cada falante; atalho para "Trocar falante" |
| `hash` Números reconhecidos | **11 números** · sinais vitais e prescrição | **11 números** | Lista de números com a frase de origem (7.3) |
| `stethoscope` Termos clínicos | **14 reconhecidos** · 4 com dúvida | **17 reconhecidos** · 2 com dúvida | Lista de termos com a frase de origem (7.3) |
| `mic-off` Lacunas de áudio | Nenhuma interrupção | Nenhuma interrupção | Rola até a lacuna, quando houver |

**Dica de captação** (só no nível "Áudio difícil" ou com 3 ou mais termos clínicos com dúvida): faixa laranja no fim do cartão: "Parte do áudio veio com ruído. Na próxima consulta, aproxime o celular ou use um microfone de lapela." Carimbo "Testar a captação", que leva a Perfil → Microfone e captação.

### 7.2 Modo "Conferir trechos"

- Ao tocar em "Trechos para conferir", a lista de falas passa a destacar só os trechos com confiança baixa, em ordem.
- Barra fixa no rodapé, acima do botão de aprovar: "Trecho 2 de 8" com os carimbos "Anterior", "Ouvir" e "Próximo".
- No trecho, a palavra com dúvida fica sublinhada em laranja tracejado. Tocar nela mostra: "O reconhecimento ficou em dúvida aqui. Ouça o trecho e, se precisar, corrija na frase do SOAP."
- Trecho com número, dose ou termo clínico ganha o selo "Afeta o SOAP" e o link "Ver no SOAP", que abre a frase correspondente.
- Sair do modo: carimbo "Ver tudo" ou fechar a barra.

### 7.3 Listas de números e de termos

- Folha inferior com título ("Números reconhecidos" ou "Termos clínicos"), um item por linha:
  - Números: valor e unidade em IBM Plex Mono ("38,6 °C", "0,4 mg/kg", "96 bpm"), a habilidade que usa o número ("Sinais vitais", "Dose") e o horário do trecho.
  - Termos: termo, horário, e selo laranja "Com dúvida" quando a confiança foi baixa.
- Tocar no item fecha a folha e leva à fala, já tocando o trecho.
- Números aparecem já normalizados para o padrão brasileiro (vírgula decimal), mesmo quando o reconhecimento os entregou com ponto.

### 7.4 Prontuário → consulta aprovada → Transcrição

**Na lista de consultas** (nada muda no layout):
- Cada consulta com transcrição ganha, ao lado da data, um ícone `audio-lines` de 14px em cinza, com rótulo acessível "Com transcrição". Sem botão novo, sem menu novo.

**Ao abrir a consulta aprovada:**
- Logo abaixo do cabeçalho (paciente, data, assinatura), o mesmo seletor da revisão: pílulas "SOAP" (padrão) e "Transcrição".
- "Transcrição" mostra, em modo leitura:
  - o cartão "Qualidade da transcrição" (recolhido por padrão);
  - a lista de falas com falante, horário e texto, e a reprodução de cada trecho quando o áudio estiver disponível;
  - nenhum controle de edição: a consulta aprovada é imutável. Se o veterinário precisar corrigir algo, o carimbo existente "Adicionar adendo" continua sendo o caminho.
- Linha de sistema no topo da transcrição: "Transcrição da consulta aprovada em 02/10/2026 por Dra. Renata Moraes · somente leitura".

**Estados do áudio** (seção 4):
- Áudio apagado: selo cinza "Áudio apagado" ao lado do título; o botão de ouvir de cada fala dá lugar ao horário em IBM Plex Mono, e um toque explica: "O áudio foi apagado após a aprovação, conforme a configuração da conta. O texto continua disponível."
- Áudio só no aparelho: selo cinza "Áudio no aparelho que gravou", com a mesma lógica.

**Consulta com adendo:** acima das falas, duas pílulas com as datas: "Consulta de 02/10" e "Adendo de 05/10".

## 8. Design system

Usar o design system e o padrão de design obrigatório (`padrao-de-design.md`):
- selo verde para "Boa"; laranja para "Confira alguns trechos", "Áudio difícil" e "Com dúvida"; cinza para "Áudio apagado". Nenhum vermelho: transcrição com dúvida não é perda de dado nem risco ao paciente, e o veterinário sempre revisa;
- pílulas de escolha para "SOAP · Transcrição", idênticas na revisão e no histórico;
- IBM Plex Mono em números, horários e durações; ícones Lucide v0.460.0; alvos de toque de 48px;
- nada de gráficos decorativos: os indicadores são linhas com valor e ação;
- PT, EN e ES em `i18n.js`. Vocabulário: "responsável", nunca "tutor".

## 9. Fora deste documento

- **Limites exatos dos níveis de qualidade** (confiança abaixo de quanto conta como "com dúvida", quantos trechos definem "Áudio difícil"): a calibrar com consultas reais no conjunto de avaliação. Os limites deste PRD são de partida.
- **Medição de ruído do ambiente:** o Deepgram não informa o nível de ruído; uma medição própria no aparelho pode entrar depois.
- **Por quanto tempo a transcrição fica guardada após a aprovação, e quem da equipe pode vê-la:** decisão de retenção e de permissões, a confirmar.
- **Correção da transcrição em si:** o veterinário corrige a frase do SOAP, não o texto transcrito.
