# Specs — índice

| # | Spec | Telas | Arquivos de design |
| --- | --- | --- | --- |
| 00 | [Fundação](00-fundacao/spec.md) | Chrome, tokens, i18n, tema, campo de data | Design System v2, Fundacoes v2, Campo Data |
| 01 | [Cadastro PAF e organização](01-cadastro-paf/spec.md) | Template PAF, Editor PAF, Organização | Template PAF v2, Editor PAF v2, Organizacao v2 |
| 02 | [Evento](02-evento/spec.md) + [modelo de dados](02-evento/data-model.md) | Novo Evento, Revisar Evento | Novo Evento v2, Revisar Evento v2 |
| 03 | [Painel e Custos](03-painel-custos/spec.md) | Painel, Custos | Dashboard v2, Custos v2 |
| 04 | [Governança](04-governanca/spec.md) | Auditoria, Alertas, Relatórios, Integrações, Equipe | Auditoria v2, Regras de Alerta v2, Relatorios v2, Integracoes v2, Equipe v2 |
| 05 | [Público e entrada](05-publico/spec.md) | Landing, Login, Onboarding, Confiança, Políticas, Status | Landing v2, Login v2, Onboarding v2, Confianca v2, Politicas v2, Status v2 |
| 06 | [Conta e suporte](06-conta/spec.md) | Perfil, Assinatura, Cancelamento, Ajuda | Perfil v2, Assinatura v2, Cancelamento v2, Ajuda v2 |

## Ordem de implementação

00 → 01 → 02 → 03 → 04 → 05 → 06. O cadastro PAF (01) é pré-requisito de dados do evento (centro de custo, subcategorias). O evento (02) é pré-requisito do painel (03).

## Convenções

- IDs de critério: `<PREFIXO>-AC-NN`. Prefixos: FND, PAF, EVT, PNL, GOV, PUB, CTA.
- Critérios no formato: **Quando** ‹gatilho›, **o sistema deve** ‹resultado›.
- "Ref." aponta seção do `README.md` do pacote ou arquivo em `design_files/`.

## Pendências de produto e jurídico (bloqueiam o que dependem)

- Central de Confiança: quatro itens aguardam engenharia e jurídico; rótulo "rascunho" até liberação.
- Modo de dados mínimos (Landing): se reprovado, saem o quarto vídeo e a garantia (b) de "Seus dados".
- Vídeos de Landing, Onboarding e Ajuda: placeholders; conteúdo a produzir.
- Prefixo "Ex.:" nos placeholders ainda não aplicado a todos os campos.
- Responsivo ainda não testado em aparelho físico.
