# 01 · Cadastro PAF e organização

## Contexto
A estrutura PAF da organização define subcategorias, base de cálculo, conta contábil e centro de custo. É dela que o evento herda classificação e centro de custo. A organização define país, moeda, código legal, plantas e receita de referência.

Ref.: `README.md › Telas 8, 9, 10`, `› Regras de negócio › Centro de custo`; `design_files/Q-Cost AI Template PAF v2.dc.html`, `Q-Cost AI Editor PAF v2.dc.html`, `Q-Cost AI Organizacao v2.dc.html`.

## Histórias
- Como administrador, quero partir de um template do meu segmento para não montar a estrutura do zero.
- Como administrador, quero definir centro de custo geral e, quando preciso, específico por planta.
- Como administrador, quero trocar a moeda da organização sabendo exatamente o que acontece com o histórico.

## Critérios de aceite

### Template e editor
- **PAF-AC-01** O sistema deve oferecer quatro templates por segmento industrial, cada um com a lista completa de subcategorias.
- **PAF-AC-02** O editor deve mostrar as quatro categorias fixas, uma por cartão, na ordem PAF. Categorias não podem ser criadas nem removidas.
- **PAF-AC-03** Cada subcategoria deve ter: código, nome, base de cálculo, conta contábil, centro de custo geral, centros por planta (opcionais), descrição (instrução para a IA), vigência.
- **PAF-AC-04** Centro por planta em branco deve herdar o geral, e o placeholder deve mostrar o valor herdado.
- **PAF-AC-05** O disclosure de centros por planta deve indicar o estado: "herda o geral" ou "N específico(s)".
- **PAF-AC-06** Toda alteração da estrutura deve gerar nova versão, registrada na trilha de auditoria.

### Organização
- **PAF-AC-07** Todos os dados cadastrais devem ser editáveis, exceto o código legal.
- **PAF-AC-08** País, moeda e código legal vêm de uma lista única que dirige rótulo, máscara e validação do código legal (CNPJ, EIN, RFC, CUIT, NIF, NIPC) e a formatação monetária.
- **PAF-AC-09** A receita de referência deve manter histórico temporal.
- **PAF-AC-10** Quando o usuário troca país-moeda, o sistema não deve aplicar direto; deve abrir confirmação mostrando eventos afetados, custo apurado e desde quando.
- **PAF-AC-11** A confirmação deve obrigar escolher: (a) converter todo o histórico por taxa editável, pré-preenchida pela paridade, com prévia do total convertido ao vivo; ou (b) manter o passado na moeda anterior, com aviso de relatórios em moedas diferentes.
- **PAF-AC-12** Confirmada a troca, deve registrar na auditoria autor, momento, taxa e totais antes e depois.

## Fora de escopo
Classificação de eventos (spec 02).

## Questões abertas
- Vigência de subcategoria: eventos de competência anterior usam a versão vigente na data do evento ou a atual? (Protótipo sugere a vigente na data.)
- Fonte da paridade cambial pré-preenchida.
