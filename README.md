# XTechWeb

Presença digital que gera resultados.

XTechWeb é uma aplicação web comercial voltada à apresentação, aquisição e qualificação de clientes que precisam colocar ou expandir seus negócios na internet.

Princípio central:

> O cliente explica o que quer fazer. A XTechWeb descobre a tecnologia necessária.

## Objetivo atual

O MVP atual funciona como uma estrutura comercial para:

- apresentar serviços;
- apresentar soluções e preços;
- explicar o processo de contratação;
- qualificar oportunidades;
- capturar dados de contato;
- classificar leads internamente;
- enviar notificações operacionais por e-mail.

A classificação interna pode identificar uma oportunidade padrão da XTechWeb ou uma possível demanda de maior complexidade para avaliação humana.

Essa classificação não deve ser apresentada ao visitante.

## Stack atual

- Next.js 16.3.5
- React 19.2.8
- TypeScript
- Tailwind CSS 4
- App Router
- Resend 6.28.0
- Vercel como destino planejado de deploy

PostgreSQL, Neon, Prisma e área administrativa estão planejados para fases posteriores e não fazem parte da implementação atual.

## Scripts

Desenvolvimento:

    npm run dev

Build:

    npm run build

Produção local após build:

    npm run start

Lint:

    npm run lint

## Instalação

Na raiz do projeto:

    npm install

## Variáveis de ambiente

O fluxo atual de leads utiliza:

    RESEND_API_KEY
    LEADS_TO_EMAIL

Nunca registrar os valores reais dessas variáveis:

- no código;
- no README;
- na documentação;
- nos logs;
- no Git.

Arquivos .env* permanecem ignorados pelo Git.

## Estrutura principal

    xtechweb/
    |
    |-- docs/
    |   `-- ARQUITETURA-TECNICA.md
    |
    |-- public/
    |   `-- logo-xtechweb.png
    |
    |-- src/
    |   |-- app/
    |   |   |-- api/
    |   |   |   `-- leads/
    |   |   |       `-- route.ts
    |   |   |-- globals.css
    |   |   |-- layout.tsx
    |   |   `-- page.tsx
    |   |
    |   `-- components/
    |       `-- lead-qualification-form.tsx
    |
    |-- next.config.ts
    |-- package.json
    |-- README.md
    `-- CHANGELOG.md

O CHANGELOG.md será criado no checkpoint documental seguinte.

## Fluxo atual de leads

Fluxo operacional:

    Visitante
        |
        v
    Home XTechWeb
        |
        v
    Formulário de qualificação
        |
        v
    POST /api/leads
        |
        v
    Validação server-side
        |
        v
    Classificação interna
        |
        v
    Resend
        |
        v
    E-mail operacional

O visitante utiliza um único fluxo de conversão.

O WhatsApp é coletado como dado de contato.

O envio do formulário não abre o WhatsApp e não envia automaticamente mensagens pelo dispositivo do visitante.

## API de leads

Endpoint atual:

    POST /api/leads

Responsabilidades atuais:

- receber o payload;
- validar os dados;
- validar consentimento;
- normalizar dados necessários;
- recalcular a classificação no servidor;
- escapar conteúdo utilizado no e-mail;
- verificar configurações necessárias;
- enviar notificação pelo Resend;
- registrar estágios relevantes;
- retornar respostas controladas.

A classificação realizada no servidor é autoritativa.

## Observabilidade

Uma falha relevante não deve desaparecer silenciosamente.

A API utiliza requestId e logs para identificar estágios importantes da operação.

Nunca registrar:

- senhas;
- tokens;
- cookies;
- API keys;
- segredos;
- dados pessoais desnecessários.

## Persistência atual

O MVP atual não possui persistência de leads em banco de dados.

A notificação operacional atual ocorre por e-mail.

Planejado para fase futura:

- PostgreSQL;
- Neon;
- Prisma;
- modelo Lead;
- histórico;
- consentimento persistido;
- área administrativa.

## Segurança

Antes da produção definitiva, revisar:

- credencial Resend;
- domínio e remetente;
- destinatário operacional;
- Política de Privacidade;
- consentimento;
- antispam;
- informações expostas no navegador;
- logs;
- staging do Git;
- tratamento de falhas.

Nenhum segredo deve ser commitado.

## Hardening pendente

Itens conhecidos:

- remover classificacaoLocal do console do navegador;
- manter somente logs client-side seguros;
- alinhar o fallback da mensagem de sucesso;
- remover referência obsoleta ao WhatsApp da mensagem de erro;
- criar e vincular Política de Privacidade;
- implementar proteção antispam adequada;
- rotacionar a credencial Resend anteriormente exposta;
- configurar remetente de produção;
- configurar destinatário operacional definitivo;
- executar teste real de e-mail;
- validar experiência mobile;
- revisar acessibilidade.

## Deploy

Destino planejado:

Vercel.

Antes de um deploy relevante:

1. revisar alterações;
2. executar validações;
3. executar build;
4. revisar Git;
5. confirmar variáveis de ambiente;
6. realizar deploy;
7. executar teste pós-deploy.

Build aprovado não significa, isoladamente, produção aprovada.

## Git

Não utilizar git add . automaticamente no checkpoint atual.

O staging deve ser explícito e revisado antes do commit.

Backups locais com padrão *.backup-* permanecem fora do versionamento.

## Documentação técnica

A documentação arquitetural detalhada está em:

    docs/ARQUITETURA-TECNICA.md

Ela contém o estado técnico, decisões, arquitetura, fluxo comercial, API, segurança, roadmap, hardening e critérios de produção.

Mudanças arquiteturais relevantes devem atualizar essa documentação.

## Método de desenvolvimento

Fluxo de trabalho:

1. inspecionar;
2. compreender;
3. criar backup quando aplicável;
4. alterar;
5. validar;
6. testar;
7. registrar evidência;
8. somente então declarar o checkpoint concluído.

Erros silenciosos devem ser evitados.

## Estado atual

Implementado:

- fundação Next.js;
- identidade visual inicial;
- Home comercial;
- pilares;
- preços;
- planos de continuidade;
- processo de contratação;
- formulário de qualificação;
- classificação client-side auxiliar;
- classificação server-side autoritativa;
- API de leads;
- consentimento no formulário;
- integração Resend;
- logs da API;
- fluxo único de conversão;
- documentação arquitetural v1.

Ainda não implementado:

- banco de dados;
- persistência de leads;
- área administrativa;
- autenticação administrativa;
- portfólio dinâmico;
- blog dinâmico;
- SEO completo;
- Analytics;
- antispam definitivo;
- hardening final de produção.

## Continuidade

Antes de modificar arquitetura, segurança, persistência, autenticação ou integrações, consultar:

    docs/ARQUITETURA-TECNICA.md

Quando houver divergência entre documentação e código, o código deve ser investigado e a documentação corrigida.

<!-- README-XTECHWEB-V1-END -->