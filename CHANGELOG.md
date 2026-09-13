# Changelog

Todas as mudanças relevantes da XTechWeb serão registradas neste arquivo.

O formato segue uma organização simplificada baseada em versões e categorias de alteração.

## [Unreleased]

### Pendente antes da produção

- hardening final do formulário;
- remoção da classificação interna dos logs do navegador;
- correção das mensagens fallback;
- criação e vínculo da Política de Privacidade;
- proteção antispam;
- rotação da credencial Resend anteriormente exposta;
- configuração do remetente definitivo;
- configuração do destinatário operacional definitivo;
- teste real do fluxo de e-mail em configuração de produção;
- validação mobile;
- revisão de acessibilidade;
- revisão final de segurança;
- revisão explícita do staging;
- deploy e teste pós-deploy.

## [0.1.0] - 2026-09-13

Primeira estrutura comercial e técnica funcional da XTechWeb.

### Adicionado

- projeto Next.js 16;
- React 19;
- TypeScript;
- Tailwind CSS 4;
- App Router;
- configuração do Turbopack;
- identidade visual XTechWeb;
- logotipo XTechWeb;
- Hero comercial;
- seção de necessidades;
- quatro pilares comerciais;
- seção de soluções;
- estrutura de preços;
- planos de continuidade;
- processo de contratação;
- formulário de qualificação de leads;
- campos de WhatsApp e e-mail;
- consentimento para contato;
- classificação auxiliar no cliente;
- classificação autoritativa no servidor;
- endpoint POST /api/leads;
- integração com Resend;
- identificação de requisição por requestId;
- logs de estágios da API;
- escape de HTML no conteúdo enviado por e-mail;
- tratamento de JSON inválido;
- tratamento de validação;
- tratamento de configuração ausente;
- tratamento de falha no envio de e-mail;
- fluxo único de conversão;
- header sticky;
- documentação técnica detalhada;
- README operacional.

### Comercial

Definidos os produtos iniciais:

- Landing Page;
- Site Institucional;
- Site Profissional;
- Catálogo Digital;
- Loja Virtual.

Definidos preços iniciais de implantação e continuidade.

Definida a separação comercial entre:

- XTechWeb para presença digital e projetos de menor complexidade;
- STR Software para oportunidades de software de maior complexidade.

### Qualificação

O formulário passou a avaliar:

- necessidade descrita pelo visitante;
- sistema atualmente utilizado;
- objetivo principal;
- WhatsApp;
- e-mail;
- consentimento.

Foram definidas regras internas para identificar possíveis oportunidades de maior complexidade.

A classificação apresentada ao servidor é recalculada independentemente da classificação auxiliar do navegador.

### Integração de e-mail

Adicionada integração com Resend.

Foram testados:

- lead padrão XTechWeb;
- possível lead STR Software;
- falha de autorização do remetente/destinatário;
- envio após inclusão dos campos de contato e consentimento.

Falhas relevantes possuem logs explícitos.

### Segurança

- arquivos .env* permanecem ignorados pelo Git;
- backups locais *.backup-* permanecem ignorados;
- segredos não devem ser registrados em logs;
- classificação interna não deve ser apresentada ao visitante;
- credencial Resend exposta durante desenvolvimento foi identificada como comprometida e deverá ser rotacionada antes da produção;
- arquivo local contendo padrão de credencial foi removido antes do commit deste checkpoint.

### Decisões arquiteturais

Neste estágio:

- não existe banco de dados;
- não existe persistência de leads;
- não existe área administrativa;
- não existe autenticação administrativa;
- não existe envio automático de WhatsApp;
- notificação operacional ocorre por e-mail.

Planejado para evolução futura:

- PostgreSQL;
- Neon;
- Prisma;
- persistência de leads;
- histórico;
- consentimento persistido;
- dashboard administrativo;
- autenticação;
- portfólio dinâmico;
- blog;
- SEO;
- Analytics.

### Documentação

Criado:

    docs/ARQUITETURA-TECNICA.md

O documento técnico v1 registra 126 capítulos cobrindo arquitetura, produto, fluxo comercial, segurança, API, integração, roadmap, testes e critérios de produção.

O README padrão do create-next-app foi substituído por documentação operacional específica da XTechWeb.

### Observações

A versão 0.1.0 representa o estado funcional anterior ao hardening final de produção.

Build aprovado não deve ser interpretado isoladamente como aprovação para produção.

<!-- CHANGELOG-XTECHWEB-V1-END -->