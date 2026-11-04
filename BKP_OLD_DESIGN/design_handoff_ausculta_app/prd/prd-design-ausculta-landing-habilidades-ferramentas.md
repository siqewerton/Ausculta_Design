# PRD de Design — Ausculta: landing com Habilidades, Ferramentas e Fundamentos

> Para colar no projeto do Ausculta no Claude Design, sobre a landing atual (`index.html`, handoff de 02/10/2026).
> Este PRD já traz todos os itens das três seções; não é preciso anexar o inventário completo. Aplicar junto com o `prd-design-ausculta-correcoes-clinicas.md`, cujos textos corrigidos valem para as linhas da seção Habilidades.
> Segue o template do PRD de Design (9 seções).

---

## 1. Contexto e proposta

**Problema.** A landing mistura numa mesma lista o que o Ausculta faz sozinho ao ouvir a consulta, o que o veterinário faz no app e as garantias do produto. A tabela "Tudo o que o Ausculta ouve por você" cobre só a primeira parte; cadastro, prontuário, integrações e receita ficam espalhados ou ausentes; segurança e confiança aparecem em blocos separados. O veterinário não forma uma imagem simples do que está comprando.

**Solução.** Organizar a oferta em três categorias, com a mesma pergunta por trás de cada uma, quem age:
- **Habilidades:** o que o Ausculta faz com o áudio, de forma automática, sempre como sugestão revisável.
- **Ferramentas:** o que o veterinário faz no Ausculta.
- **Fundamentos:** as garantias que valem para tudo.

## 2. Público e personas

- **Veterinário de clínica de pequenos animais:** quer saber, em segundos, o que o Ausculta faz sozinho e o que ele mesmo continua fazendo.
- **Veterinário volante (equinos e produção):** procura funcionar sem internet, carência e registro em campo.
- **Dono de clínica ou responsável jurídico:** procura os fundamentos (aprovação humana, LGPD, onde ficam os dados).

## 3. Fluxos de usuário

1. Como veterinário, quero ver as habilidades agrupadas pelo que fazem por mim (ouvir, organizar, proteger, agir, acompanhar).
2. Como veterinário, quero ver as ferramentas que vou usar no dia a dia e as que chegam em breve, como receita e nota ao responsável.
3. Como dono de clínica, quero ler os fundamentos num só lugar antes de confiar o prontuário ao Ausculta.
4. Como visitante, quero navegar direto para Habilidades, Ferramentas ou Fundamentos pelo menu.
5. Como visitante, quero distinguir o que já existe do que está em breve.

## 4. Modos e variações

| Variação | O que muda |
|---|---|
| Item disponível | Selo verde "No Ausculta" |
| Item futuro | Selo cinza "Em breve" (nunca o mesmo selo dos disponíveis) |
| Lista longa (Habilidades, Ferramentas) | Destaques visíveis e "Ver todas (N)", conforme a regra 12 do padrão de design |
| Celular (320 px) | Grupos empilhados; nada de tabela com scroll horizontal: cada item vira linha com título e uma frase |
| Idiomas | PT "Habilidades, Ferramentas, Fundamentos" · EN "Abilities, Tools, Foundations" · ES "Habilidades, Herramientas, Fundamentos" |

## 5. Escopo desta rodada

Reorganizar a landing completa nas três categorias, com todos os itens do inventário. Hero, ensaio do nome ("O que a consulta revela", "O que merece ficar registrado", "Ouvir é cuidar duas vezes"), "Por onde você começa?", "Como funciona", seção SOAP, "Para quem", vídeos, integrações e CTA final permanecem, só ajustados onde indicado. Nenhum componente novo além do necessário para o selo "Em breve".

## 6. Critérios de aceite visíveis

- [ ] CA-01 A landing tem três seções com âncora própria: `#habilidades`, `#ferramentas` e `#fundamentos`, nesta ordem, depois da seção SOAP.
- [ ] CA-02 O menu (desktop e hambúrguer) traz Como funciona, Habilidades, Ferramentas, Fundamentos, Para quem e Integrações; "O que a IA ouve" e "Segurança" saem.
- [ ] CA-03 Habilidades mostra 23 itens "No Ausculta" e 10 "Em breve", nos cinco grupos.
- [ ] CA-04 Ferramentas mostra os itens disponíveis por área e, como "Em breve", ao menos receita digital, nota ou fatura ao responsável, bulário e calculadora farmacêutica.
- [ ] CA-05 Fundamentos mostra os 14 fundamentos, com "A IA ouve. Você decide." em primeiro.
- [ ] CA-06 Cada seção abre com uma frase que diz quem age ("O Ausculta faz", "Você faz", "Vale para tudo").
- [ ] CA-07 Nenhum item "Em breve" aparece com o selo de disponível; nenhum item aparece em duas categorias.
- [ ] CA-08 Os textos das habilidades seguem as correções clínicas (WSAVA, carência, termos, sem "1.240 termos").
- [ ] CA-09 Tudo existe em PT, EN e ES; nada tem scroll horizontal em 320 px.

## 7. Telas e comportamento

### 7.1 Seção "Habilidades" (substitui "Tudo o que o Ausculta ouve por você", âncora `#ouve` → `#habilidades`)

- Título: "Habilidades: o que o Ausculta faz ao ouvir a consulta". Linha de apoio: "Tudo chega como sugestão. Você aceita, ajusta ou ignora."
- Cinco grupos, cada um com título e os itens (título + o que faz + por quê, como hoje):
  - **Ouvir:** quem está falando; termos e fármacos veterinários; trechos com áudio ruim; a origem de cada frase.
  - **Organizar:** o SOAP da consulta; o roteiro da anamnese; o exame por sistemas; sinais vitais e as 5 avaliações vitais da WSAVA; sinais de inflamação; o problema discutido.
  - **Proteger:** dose fora do limite; prescrição completa (os 6 elementos) — **item novo**; alergia ou reação adversa relatada; carência em animais de produção; valores fora da faixa.
  - **Agir:** medicamentos citados; vacinas aplicadas; dados do responsável; retorno combinado; exames pedidos; instruções de alta.
  - **Acompanhar:** a evolução entre consultas; o que ficou sem exame.
- **Em breve** (10): fala leiga em termo clínico; perguntas sem resposta; incoerências no registro; retorno com objetivo; sinais de alerta na alta; tendência do ECC e da região inflamada; itens da escala de dor; histórico alimentar; vocabulário por espécie; orçamento a partir da fala.
- Destaques visíveis (um por grupo) e "Ver todas as habilidades (33)".

### 7.2 Seção "Ferramentas" (nova, âncora `#ferramentas`)

- Título: "Ferramentas: o que você faz no Ausculta". Linha de apoio: "O dia a dia da consulta, do paciente e da clínica, num só lugar."
- Quatro áreas:
  - **Consulta:** iniciar com consentimento em um toque; gravar, pausar e ouvir o trecho; enviar um áudio já gravado; revisar, editar e aprovar com assinatura; fila de revisão no Painel.
  - **Pacientes e prontuário:** cadastrar pacientes e responsáveis; manter o prontuário (consultas, medicação, exames, notas, linha do tempo); anexar fotos, vídeos e PDFs; acompanhar a lista de problemas; enviar instruções de alta por WhatsApp ou e-mail.
  - **Conta e equipe:** equipe e permissões; escolher a IA e onde os dados ficam; espécies e modelos de exame; vocabulário da clínica; exportar os dados.
  - **Integração:** Long Life Pet; o PIMS da clínica; MCP e API para outros sistemas (link para a seção Integrações).
- **Em breve:** emitir receita digital; emitir nota ou fatura ao responsável; bulário; calculadora farmacêutica; app instalado com gravação em segundo plano; uso em vários aparelhos; lembretes automáticos ao responsável.
- Componente: o mesmo da seção Habilidades, para as duas lerem como irmãs.

### 7.3 Seção "Fundamentos" (substitui "Quem assina o prontuário é você", âncora `#seguranca` → `#fundamentos`)

- O bloco editorial "A IA ouve. Você decide." passa a abrir a seção.
- Título: "Fundamentos: o que vale para tudo no Ausculta".
- Lista com ícone de 24px e uma frase cada, na ordem:
  1. A IA ouve, você decide.
  2. Aprovação humana com assinatura.
  3. Consentimento antes de gravar.
  4. Funciona sem internet.
  5. Nenhum áudio perdido sem aviso.
  6. Você escolhe onde os dados ficam.
  7. Transparência sobre fornecedores e regiões (link para a Central de Confiança).
  8. Trilha de auditoria.
  9. Seus dados são seus (exportação a qualquer momento).
  10. Integrado ou sozinho.
  11. Em qualquer aparelho e idioma.
  12. Áudio cifrado.
  13. Dados isolados por conta.
  14. Regras clínicas validadas por veterinário.
- Os itens "Funciona sem internet" e "Você escolhe onde os dados ficam" mantêm os textos com condição definidos no PRD da Central de Confiança (nada de "tudo no aparelho" sem condição).

### 7.4 Ajustes em seções existentes

- **Hero:** abaixo do subtítulo, linha opcional: "Habilidades que ouvem por você. Ferramentas que você usa. Fundamentos em que você confia."
- **Glossário:** sem mudança de siglas; acrescentar a entrada "Habilidades, Ferramentas e Fundamentos" só se houver espaço, sem criar seção nova.
- **CTA final:** sem mudança.

## 8. Design system

Usar o design system e o padrão de design obrigatório (`padrao-de-design.md`):
- selo verde de status para "No Ausculta" e selo cinza para "Em breve"; nenhuma cor nova;
- listas longas pela regra 12 (destaques + "Ver todas (N)"); nada de abas com scroll horizontal (regra 10);
- Fraunces 600 nos títulos de seção, Public Sans no corpo, ícones Lucide v0.460.0;
- PT, EN e ES em `i18n.js`. Vocabulário: "responsável", nunca "tutor".

## 9. Fora deste documento

- Reescrever o ensaio do nome, a seção SOAP ou "Como funciona".
- Mudanças no app; a taxonomia vale primeiro para a landing.
- Antes de publicar a landing: os três fundamentos ainda a construir (áudio cifrado, dados isolados por conta, regras clínicas validadas) precisam estar implementados, e os itens "No Ausculta" devem refletir o que existir no lançamento, não só no protótipo.
