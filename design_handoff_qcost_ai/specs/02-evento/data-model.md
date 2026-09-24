# 02 · Modelo de dados do evento

Modelo conceitual. O plano define tipos, tabelas e contratos de API.

## Hierarquia

```
Envio 1 ── N Contabilização (Evento) 1 ── N Ocorrência
Envio 1 ── N Ocorrência em triagem
```

Uma ocorrência pertence a exatamente uma contabilização **ou** à triagem do seu envio.

## Envio
Gravado pela plataforma. Não editável. Não aprovável.

| Campo | Nota |
| --- | --- |
| ORGANIZATION_ID | isolamento |
| SUBMISSION_ID | |
| EVENT_DATETIME | momento da entrada |
| EVENT_SOURCE | `upload` \| `api` \| `mcp` \| `rule` |
| EVENT_USER | autor (pessoa, sistema ou agente) |
| ATTACHMENTS | lista de arquivos |
| PROMPT_TEXT | orientação em texto, JSON REST ou argumentos MCP |
| SOURCE_CALL_ID | identificador da chamada de origem (API/MCP) |

## Contabilização (evento) — classes de dados

### Classe 1 · Estrutural
`EVENT_ID`, `SUBMISSION_ID`, `EVENT_TYPE`, `STATUS`, `APPROVED_USER`, `APPROVED_DATE`. Não editável.

### Classe 2 · Contrato de contabilização (fixo, ordem fixa)
| Campo | Nulo? | Origem padrão |
| --- | --- | --- |
| EVENT_DATE | não | documento |
| CATEGORY_PAF | não | IA + cadastro |
| SUBCATEGORY_PAF | não | IA + cadastro |
| PLANT | não | documento / sessão |
| CURRENCY | não | organização |
| TOTAL_ACCOUNTED_COST | não | soma das ocorrências (nunca digitado) |
| COST_CENTER | não | cadastro PAF (planta → geral) |
| SUPPLIER_TYPE | não | documento |
| SUPPLIER_NAME | sim | documento |
| CUSTOMER | sim | documento |

**Chave de agrupamento**: competência · categoria · subcategoria · planta · centro de custo · moeda · tipo de fornecedor · fornecedor · cliente.

### Classe 3 · Específico da subcategoria
Dinâmico. Ex.: `BATCH_NUMBER`, `QUANTITIES`, `VALUES_AND_CURRENCIES_FOUND`. Cada campo: valor, origem (trecho do documento), flag `sums_to_total`.

### Moeda
`ORIGINAL_AMOUNT`, `ORIGINAL_CURRENCY`, `FX_RATE`, `FX_DATE`, `FX_EDITED_BY`.

## Metadados por campo
| Atributo | Valores |
| --- | --- |
| provenance | `extracted` \| `suggested` \| `missing` \| `registry` \| `session` \| `revised` |
| required | bool |
| value_number / value_raw / value_locale | para numéricos editados |
| correction_scope | `event` \| `subcategory_rule_proposal` |

## Estados do evento (conjunto fechado)
| Estado | Token | Transições de entrada |
| --- | --- | --- |
| Rascunho | `--warn` | criação |
| Em revisão | `--info` | revisor abre |
| Pendente | `--warn` | submetido |
| Provisório | `--warn` | aprovado com valor estimado |
| Confirmado | `--pos` | aprovado com valor final |
| Ajustado | `--info` | reaberto e corrigido após Confirmado |
| Cancelado | `--neg` | rejeitado ou anulado |

## Ocorrência
`OCCURRENCE_ID`, `SUBMISSION_ID`, `EVENT_ID` (nulo em triagem), `TRIAGE_REASON`, valores lidos, trecho de origem, dimensões da chave.

## Proposta de regra
`RULE_PROPOSAL_ID`, subcategoria, campo, valor/ajuste proposto, evidência (N de M eventos), autor, estado (`pending` \| `approved` \| `rejected`), aprovador. Aprovada, vale só para eventos futuros.

## Trilha de auditoria
Imutável. `actor`, `timestamp`, `action`, `entity`, `before`, `after`, `justification`, `record_hash`.
