# Ausculta · pacote web do site

Site estático do protótipo do Ausculta (versão de 04/11/2026, mesma do pacote de handoff v2.10). Abre a landing, a criação de conta e o app, com os dados de demonstração do protótipo.

> **Ausculta é um codinome.** A busca formal de marca (INPI/USPTO/WIPO) e de domínio ainda não foi feita. Por isso o `robots.txt` bloqueia buscadores. Tire esse bloqueio só depois da decisão de marca.

## Páginas

| Arquivo | O que é |
|---|---|
| `index.html` | Landing pública (entrada do site) |
| `Ausculta Conta.dc.html` | Criar conta, entrar, entrar com o Google, recuperar senha |
| `Ausculta App.dc.html` | App (protótipo navegável) e Central de Confiança pública (`#trust`) |

Links diretos: `Ausculta Conta.dc.html#standalone`, `#login`, `#pims`, `#plano-pro`, `#plano-clinic`, `#plano-acad`, `#plano-hospital`; `Ausculta App.dc.html#trust`, `#integrations`.

## Como publicar

Qualquer hospedagem de arquivos estáticos serve (Vercel, Netlify, Cloudflare Pages, S3 + CloudFront, GitHub Pages). Envie a pasta inteira, sem mudar a estrutura, com `index.html` na raiz.

Para abrir no computador, rode um servidor local na pasta (abrir o arquivo direto, com `file://`, não funciona):

```
python3 -m http.server 8080
```

e acesse `http://localhost:8080`.

## O que já vem junto

- React 18.3.1 em `vendor/`, o runtime do protótipo em `support.js` e as páginas com o próprio conteúdo embutido.
- Ícones Lucide 0.460.0 embutidos em `icons.css`.
- Textos em PT, EN e ES (`i18n.js`) e documentos legais em minuta (`legal-docs.js`).

## O que depende de rede

Só as fontes, que vêm do Google Fonts (Fraunces, Public Sans e IBM Plex Mono). Sem rede, o site usa as fontes do sistema.

## Limites (é protótipo)

- Nada é enviado de verdade: contas, login com o Google, SMS, e-mails, pagamentos e integrações são simulados.
- O que o visitante faz fica no `localStorage` do navegador dele.
- O site não coleta dados nem usa analytics.
- Antes de colocar em domínio público, revise os textos marcados "[a confirmar]" e as minutas legais com o jurídico.
