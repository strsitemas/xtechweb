# XTechWeb — Arquitetura Técnica

**Documento técnico mestre do projeto**

- Versão documental: 1.0
- Data-base: 13/09/2026
- Projeto: XTechWeb
- Status: MVP comercial em desenvolvimento
- Stack principal: Next.js 16.3.5 / React 19.2.8 / TypeScript / Tailwind CSS 4
- Integração externa atual: Resend 6.28.0

---

## 1. Objetivo deste documento

Este documento registra em detalhe o estado técnico, funcional e arquitetural do projeto XTechWeb.

Ele documenta:

- arquitetura;
- stack;
- estrutura de arquivos;
- decisões técnicas;
- decisões comerciais que afetam o software;
- integrações;
- segurança;
- logging;
- tratamento de erros;
- fluxo de leads;
- classificação XTechWeb/STR;
- configuração;
- build;
- versionamento;
- funcionalidades concluídas;
- funcionalidades planejadas;
- limitações;
- pendências técnicas;
- critérios para evolução do projeto.

O objetivo é permitir que outro desenvolvedor consiga compreender, executar, manter e continuar o projeto sem depender do histórico das conversas utilizadas durante seu desenvolvimento.

Este documento deve ser atualizado sempre que uma alteração relevante de arquitetura, segurança, integração, banco de dados, infraestrutura ou regra de negócio for incorporada ao projeto.

---

## 2. Visão do produto

A XTechWeb é uma operação voltada à criação de presença digital e soluções web para pequenas empresas, profissionais e negócios que precisam entrar ou evoluir na internet.

O público-alvo não precisa possuir conhecimento técnico para compreender ou contratar os serviços.

### 2.1 Princípio comercial

> O cliente explica o que quer fazer. A XTechWeb descobre a tecnologia necessária.

### 2.2 Slogan

> Presença digital que gera resultados.

### 2.3 Diretriz de comunicação

A comunicação pública deve evitar jargão técnico desnecessário.

Conceitos como:

- framework;
- SSR;
- API;
- CMS;
- banco de dados;
- arquitetura;
- infraestrutura;

devem ser traduzidos em benefícios comerciais quando apresentados ao cliente.

### 2.4 Percepção desejada

A experiência da marca deve transmitir:

> Essa empresa entende tecnologia, mas eu consigo conversar e contratar.

---

## 3. Separação XTechWeb / STR Software

XTechWeb e STR Software possuem posicionamentos comerciais distintos.

Essa separação é importante tanto comercialmente quanto para a qualificação interna dos leads.

### 3.1 XTechWeb

A XTechWeb atende principalmente projetos relacionados a:

- Landing Pages;
- Sites Institucionais;
- Sites Profissionais;
- Catálogos Digitais;
- Lojas Virtuais;
- presença online;
- vendas digitais;
- marketing digital;
- automações;
- integrações compatíveis com projetos de menor e média complexidade.

### 3.2 STR Software

A STR Software permanece direcionada principalmente a projetos de maior complexidade, incluindo:

- software sob medida;
- ERP;
- sistemas corporativos;
- plataformas;
- integrações complexas;
- automações de processos empresariais;
- APIs;
- marketplaces complexos;
- sistemas multiusuário;
- áreas autenticadas;
- painéis administrativos;
- projetos com regras de negócio extensas.

### 3.3 Regra de experiência

O visitante da XTechWeb não precisa decidir se sua necessidade pertence à XTechWeb ou à STR Software.

O fluxo correto é:

1. visitante explica a necessidade;
2. formulário coleta os dados;
3. sistema realiza classificação interna;
4. equipe humana analisa;
5. oportunidade recebe o tratamento comercial adequado.

### 3.4 Regra de confidencialidade da classificação

A classificação:

- não deve aparecer na interface;
- não deve alterar a mensagem de sucesso;
- não deve exigir nova ação do visitante;
- não deve tornar o formulário burocrático;
- não deve permitir que o visitante determine a classificação enviada ao servidor.

A decisão final permanece humana.

---

## 4. Arquitetura atual

O projeto utiliza Next.js com App Router.

Arquitetura funcional atual:

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
        +--> validação server-side
        |
        +--> classificação interna
        |       |
        |       +--> XTECHWEB_PADRAO
        |       |
        |       +--> POSSIVEL_STR
        |
        +--> sanitização para e-mail
        |
        +--> preparação da notificação
        |
        +--> Resend
                |
                v
           E-mail interno
                |
                v
         Análise comercial humana

### 4.1 Persistência

Neste checkpoint não existe persistência de leads em banco de dados.

O e-mail é o mecanismo atual de notificação.

### 4.2 WhatsApp

O WhatsApp fornecido pelo visitante é coletado como dado de contato.

Não existe envio automático de WhatsApp neste estágio.

### 4.3 Classificação

A classificação ocorre no cliente por requisito funcional e é recalculada no servidor.

A classificação server-side é a fonte de verdade.

---

## 5. Stack confirmada

### 5.1 Framework e interface

- Next.js 16.3.5
- React 19.2.8
- React DOM 19.2.8
- TypeScript 5
- App Router
- Tailwind CSS 4
- CSS global complementar

### 5.2 Integrações

- Resend 6.28.0

### 5.3 Ferramentas de desenvolvimento

- Node.js
- npm
- ESLint 9
- Turbopack
- Git

### 5.4 Infraestrutura planejada

A arquitetura futura considera:

- Vercel;
- PostgreSQL;
- Neon;
- Prisma.

PostgreSQL, Neon e Prisma ainda não fazem parte da implementação atual.

Não devem ser documentados como funcionalidades concluídas.

---

## 6. Scripts npm

O package.json possui os seguintes scripts:

    npm run dev
    npm run build
    npm run start
    npm run lint

### 6.1 dev

Executa o servidor Next.js em modo de desenvolvimento.

Uso:

    npm run dev

### 6.2 build

Executa o processo de compilação e otimização para produção.

Uso:

    npm run build

O build é uma das evidências utilizadas antes de considerar alterações técnicas concluídas.

### 6.3 start

Executa a aplicação a partir de um build de produção.

Uso:

    npm run start

### 6.4 lint

Executa análise estática com ESLint.

Uso:

    npm run lint

---

## 7. Estrutura atual do projeto

Estrutura relevante confirmada pelo inventário:

    xtechweb/
    |
    |-- docs/
    |   `-- ARQUITETURA-TECNICA.md
    |
    |-- public/
    |   |-- logo-xtechweb.png
    |   |-- file.svg
    |   |-- globe.svg
    |   |-- next.svg
    |   |-- vercel.svg
    |   `-- window.svg
    |
    |-- src/
    |   |
    |   |-- app/
    |   |   |-- api/
    |   |   |   `-- leads/
    |   |   |       `-- route.ts
    |   |   |
    |   |   |-- favicon.ico
    |   |   |-- globals.css
    |   |   |-- layout.tsx
    |   |   `-- page.tsx
    |   |
    |   `-- components/
    |       `-- lead-qualification-form.tsx
    |
    |-- .gitignore
    |-- next.config.ts
    |-- package.json
    `-- package-lock.json

Backups locais utilizam o padrão:

    *.backup-*

e não devem entrar no Git.

---

## 8. Responsabilidade dos arquivos principais

### 8.1 src/app/page.tsx

Responsável pela Home comercial.

Contém as principais seções de:

- apresentação;
- identificação de necessidade;
- soluções;
- preços;
- continuidade;
- qualificação;
- processo comercial.

Também integra o componente LeadQualificationForm.

### 8.2 src/app/globals.css

Responsável pelos estilos globais e pela maior parte da apresentação visual atual.

Inclui:

- layout;
- header;
- hero;
- cards;
- preços;
- formulário;
- responsividade;
- identidade visual;
- estados de interação.

### 8.3 src/app/layout.tsx

Layout raiz da aplicação.

Responsável pela estrutura global e metadados gerais existentes neste estágio.

### 8.4 src/components/lead-qualification-form.tsx

Client Component responsável pelo formulário de qualificação.

Responsabilidades atuais:

- estado do formulário;
- coleta dos campos;
- preparação do payload;
- classificação local;
- chamada para /api/leads;
- estado de envio;
- estado de erro;
- estado de sucesso.

### 8.5 src/app/api/leads/route.ts

Route Handler server-side responsável por:

- receber a requisição;
- interpretar JSON;
- validar dados;
- classificar o lead;
- escapar conteúdo;
- validar configuração;
- enviar e-mail;
- registrar logs;
- tratar erros;
- responder ao frontend.

### 8.6 public/logo-xtechweb.png

Arquivo principal da identidade visual utilizado pela aplicação.

### 8.7 next.config.ts

Configuração do Next.js e Turbopack.

---

## 9. Configuração do Next.js

O next.config.ts possui configuração explícita da raiz utilizada pelo Turbopack.

Configuração confirmada:

    import type { NextConfig } from "next";

    const nextConfig: NextConfig = {
      turbopack: {
        root: __dirname,
      },
    };

    export default nextConfig;

Essa configuração faz parte da fundação técnica atual do projeto.

---

## 10. Identidade visual e UX

### 10.1 Paleta conceitual

Direção visual definida:

- preto;
- grafite;
- verde neon profundo;
- branco;
- tons metálicos/silver quando apropriado.

### 10.2 Referência visual

Existe inspiração tecnológica/Matrix, porém de maneira sutil.

### 10.3 Elementos a evitar

A interface não deve adotar:

- estética hacker;
- caveiras;
- chuva de código excessiva;
- circuitos excessivos;
- aparência gamer;
- excesso de elementos futuristas;
- comunicação que intimide clientes não técnicos.

### 10.4 Objetivo visual

A identidade deve permanecer:

- profissional;
- tecnológica;
- corporativa;
- moderna;
- acessível.

### 10.5 Header

O cabeçalho utiliza comportamento sticky.

Conceito implementado:

    position: sticky;
    top: 0;
    z-index: 100;

Isso mantém a navegação disponível durante a rolagem.

### 10.6 Responsividade

A interface foi construída com preocupação responsiva.

A validação visual final em dispositivos/tamanhos mobile permanece parte do checklist anterior à produção.

---

<!-- DOC01-END -->

## 11. Estrutura comercial da Home

A Home foi construída como página comercial orientada à conversão.

A sequência procura conduzir o visitante da identificação do problema até o envio de uma solicitação.

Seções confirmadas no código:

    header
    hero
    #precisa
    #solucoes
    #planos
    #continuidade
    #falar-projeto
    #como-funciona

### 11.1 Hero

Mensagem principal aprovada:

> Seu negócio precisa estar na internet. A gente coloca.

Complemento:

> Sites profissionais, lojas e soluções digitais para quem quer começar, vender e crescer — sem precisar entender de tecnologia.

O Hero não apresenta detalhes técnicos de implementação.

Sua função é comunicar rapidamente:

- o problema atendido;
- o público;
- o tipo de solução;
- a simplicidade da contratação.

### 11.2 Seção "O que você precisa?"

A Home prioriza a necessidade do cliente antes da tecnologia.

A seção utiliza o identificador:

    #precisa

Objetivo:

permitir que o visitante se reconheça pela necessidade comercial, e não pelo conhecimento técnico.

### 11.3 Soluções

A seção:

    #solucoes

organiza a oferta da XTechWeb em pilares compreensíveis para o cliente.

### 11.4 Planos

A seção:

    #planos

apresenta produtos, preços de implantação e continuidade.

### 11.5 Continuidade

A área:

    #continuidade

explica que a contratação mensal é opcional.

### 11.6 Qualificação

A área:

    #falar-projeto

contém o formulário para necessidades que não se encaixem claramente nos produtos apresentados ou que precisem de análise.

### 11.7 Processo

A seção:

    #como-funciona

explica ao visitante as etapas do projeto.

---

## 12. Pilares comerciais

A XTechWeb possui quatro pilares principais.

### 12.1 Presença Online

Voltado a empresas e profissionais que precisam apresentar seus serviços, marca, produtos ou atuação na internet.

### 12.2 Vendas Digitais

Voltado a negócios que precisam apresentar catálogo, receber pedidos ou vender online.

### 12.3 Marketing Digital

Voltado ao fortalecimento da presença digital e aquisição de oportunidades.

### 12.4 Automação e Integrações

Voltado a necessidades em que sistemas, serviços ou processos digitais precisam trabalhar de forma mais integrada.

Projetos que ultrapassem o escopo operacional da XTechWeb podem ser classificados internamente como possível oportunidade STR.

---

## 13. Produtos comerciais

A estrutura comercial atual possui cinco ofertas principais.

### 13.1 Landing Page

Implantação:

    R$ 1.390

Continuidade opcional:

    R$ 129/mês

Prazo indicativo:

    5 a 7 dias úteis

Revisões previstas:

    1

Canal previsto durante o projeto:

- WhatsApp.

Objetivo principal:

criação de página focada em apresentação, campanha, captação ou conversão específica.

---

### 13.2 Site Institucional

Implantação:

    R$ 2.690

Continuidade opcional:

    R$ 199/mês

Prazo indicativo:

    10 a 15 dias úteis

Revisões previstas:

    2

Canais previstos:

- WhatsApp;
- e-mail.

Inclui orientação/treinamento compatível com o projeto entregue.

Objetivo:

apresentar profissionalmente empresa, serviços, diferenciais e canais de contato.

---

### 13.3 Site Profissional

Implantação:

    R$ 4.290

Continuidade opcional:

    R$ 279/mês

Prazo indicativo:

    15 a 20 dias úteis

Revisões previstas:

    3

Canais previstos:

- WhatsApp;
- e-mail;
- uma chamada/reunião quando necessária dentro do processo definido.

Pode incluir orientação relacionada a:

- operação do conteúdo;
- SEO inicial;
- Analytics, quando implementado/configurado no escopo correspondente.

---

### 13.4 Catálogo Digital

Implantação:

    a partir de R$ 4.990

Continuidade opcional:

    R$ 279/mês

Prazo indicativo:

    15 a 25 dias úteis

Revisões previstas:

    3

Canais previstos:

- WhatsApp;
- e-mail;
- alinhamento inicial.

Treinamento previsto:

- gestão básica dos produtos/conteúdo aplicável ao catálogo.

O Catálogo Digital pode possuir:

- produtos;
- categorias;
- busca;
- filtros;
- páginas de produto;
- contato;
- direcionamento comercial;
- WhatsApp para atendimento ou pedido, conforme escopo.

O produto padrão não inclui:

- checkout;
- pagamento online integrado;
- gestão integrada de estoque.

---

### 13.5 Loja Virtual

Implantação:

    a partir de R$ 8.900

Continuidade opcional:

    R$ 449/mês

Prazo indicativo:

    25 a 40 dias úteis

Revisões previstas:

    3

Canais previstos:

- WhatsApp;
- e-mail;
- alinhamento inicial;
- alinhamento final.

Treinamento previsto:

- produtos;
- pedidos;
- operação inicial.

A Loja Virtual pode incluir:

- catálogo;
- carrinho;
- checkout;
- pagamento;
- frete;
- pedidos;
- gestão de estoque compatível com o escopo contratado.

Integrações específicas são avaliadas separadamente.

---

## 14. Catálogo Digital versus Loja Virtual

Essa distinção deve permanecer clara comercial e tecnicamente.

### 14.1 Catálogo Digital

Objetivo:

exibir produtos e gerar contato ou pedido sem operar necessariamente uma transação completa dentro do site.

Fluxo conceitual:

    visitante
        |
        v
    encontra produto
        |
        v
    consulta informações
        |
        v
    entra em contato

Não exige, no escopo padrão:

- checkout;
- gateway de pagamento;
- processamento de pagamento;
- gestão transacional de pedidos;
- estoque integrado.

### 14.2 Loja Virtual

Objetivo:

permitir uma operação de venda online mais completa.

Fluxo conceitual:

    visitante
        |
        v
    encontra produto
        |
        v
    adiciona ao carrinho
        |
        v
    checkout
        |
        v
    pagamento
        |
        v
    pedido
        |
        v
    operação da loja

Pode envolver:

- pagamento;
- frete;
- estoque;
- pedidos;
- integrações.

### 14.3 Fora do escopo padrão

Integrações com:

- ERP;
- marketplaces;
- sistemas fiscais;
- sistemas legados;
- regras comerciais específicas;
- integrações empresariais complexas;

não são presumidas no preço padrão.

Devem passar por análise e orçamento.

---

## 15. Continuidade mensal

A recorrência é opcional.

Título comercial definido:

> Planos de continuidade a partir de R$ 129/mês

Complemento:

> Mantenha seu projeto atualizado, monitorado e com suporte quando precisar.

Regra comercial:

o cliente pode contratar o projeto sem mensalidade.

Mensagem definida:

> Prefere não contratar um plano mensal? Sem problema. Seu projeto pode ser contratado sem recorrência. Serviços futuros de manutenção, alterações e suporte ficam disponíveis sob consulta e orçamento.

### 15.1 Valores atuais

    Landing Page          R$ 129/mês
    Site Institucional    R$ 199/mês
    Site Profissional     R$ 279/mês
    Catálogo Digital      R$ 279/mês
    Loja Virtual          R$ 449/mês

A Home não deve apresentar uma tabela extensa de serviços avulsos de manutenção.

---

## 16. Processo comercial

Título:

> Como funciona, do início ao ar.

Subtítulo:

> Sem surpresas: veja o que esperar em cada etapa, independente do plano escolhido.

Fluxo geral:

1. Briefing rápido
2. Produção
3. Revisão e ajustes
4. Entrega e continuidade

### 16.1 Briefing rápido

Objetivo:

entender negócio, objetivo, público, conteúdo e necessidade principal sem transformar a entrada do cliente em processo excessivamente técnico.

### 16.2 Produção

A XTechWeb executa o projeto utilizando a tecnologia considerada adequada ao escopo contratado.

### 16.3 Revisão e ajustes

O cliente analisa a entrega conforme o número de revisões previsto para o produto.

### 16.4 Entrega e continuidade

Após aprovação, ocorre a entrega/publicação conforme o projeto.

O cliente pode:

- contratar continuidade;
- ou utilizar serviços futuros sob orçamento.

### 16.5 CTA de processo

Após os preços, a navegação pode utilizar:

> Entenda como funciona o processo →

com destino:

    #como-funciona

---

## 17. Estratégia de conversão

O MVP foi desenhado como máquina comercial simples de aquisição e qualificação.

Fluxo:

    Google / redes sociais / indicação
                  |
                  v
               XTechWeb
                  |
                  v
        identificação da necessidade
                  |
                  v
          solução / preço / processo
                  |
                  v
       formulário de qualificação
                  |
                  v
            lead qualificado
                  |
                  v
          contato comercial humano
                  |
                  v
              fechamento

A prioridade inicial é validar aquisição e gerar receita antes de adicionar complexidade operacional desnecessária.

---

## 18. Formulário de qualificação

Componente:

    src/components/lead-qualification-form.tsx

O formulário substitui um CTA genérico na área destinada a necessidades que não se encaixem claramente nos produtos apresentados.

O objetivo não é fazer um discovery completo.

O objetivo é coletar informação suficiente para:

- identificar o visitante;
- entender resumidamente a necessidade;
- obter canais de contato;
- identificar sinais de projeto mais complexo;
- permitir análise comercial humana.

---

## 19. Campos do formulário

O contrato atual possui os seguintes dados.

### 19.1 Nome

Campo:

    nome

Finalidade:

identificar a pessoa que realizou a solicitação.

### 19.2 Necessidade

Campo:

    necessidade

É um campo de texto livre.

Placeholder definido:

> Ex: um site pra apresentar minha empresa, ou algo mais específico que você não encontrou nos planos acima

Esse campo é utilizado também pela classificação textual.

### 19.3 Sistema atual

Campo:

    sistemaAtual

Pergunta apresentada:

> Sua empresa já usa algum sistema hoje?

Valores internos previstos:

    nenhum
    planilhas
    erp_mudar
    sistema_evoluir

Os valores internos não precisam ser apresentados literalmente ao visitante.

### 19.4 Objetivo

Campo:

    objetivo

Pergunta apresentada:

> O que você está buscando, no fundo?

Valores internos previstos:

    presenca_online
    vender_online
    automatizar_processo
    substituir_integrar

### 19.5 WhatsApp

Campo:

    whatsapp

Finalidade:

permitir contato comercial posterior.

O preenchimento do formulário não abre automaticamente o WhatsApp.

### 19.6 E-mail

Campo:

    email

Utilizado como segundo canal de contato.

O frontend utiliza input compatível com e-mail e o backend executa validação adicional.

### 19.7 Consentimento

Campo:

    consentimento

Tipo lógico:

    boolean

Para uma solicitação válida:

    consentimento = true

---

## 20. Consentimento e privacidade

Texto atual:

> Concordo que a XTechWeb utilize meus dados para entrar em contato sobre esta solicitação, conforme a Política de Privacidade.

O consentimento é obrigatório para envio válido.

### 20.1 Estado atual

O formulário coleta e transmite o consentimento.

O e-mail interno registra que houve consentimento.

### 20.2 Limitação atual

Ainda não existe persistência em banco de dados.

Portanto, neste estágio não existe registro estruturado em banco de:

- timestamp de consentimento;
- versão da política;
- origem persistida;
- histórico de alterações.

### 20.3 Requisito antes de produção

A Política de Privacidade deve ser criada/publicada e vinculada ao texto correspondente.

Quando houver banco de dados, recomenda-se registrar:

- data/hora;
- versão da política;
- origem;
- lead relacionado.

---

## 21. Payload conceitual do formulário

O frontend prepara um objeto contendo conceitualmente:

    {
      nome,
      necessidade,
      sistemaAtual,
      objetivo,
      whatsapp,
      email,
      consentimento
    }

Esse payload é enviado através de:

    POST /api/leads

com conteúdo JSON.

A classificação interna calculada no navegador não deve ser tratada pelo servidor como fonte confiável.

O servidor recalcula a classificação.

---

## 22. Estados do formulário

O componente mantém estados relacionados a:

    enviando
    mensagem
    sucesso

### 22.1 enviando

Evita comportamento inadequado durante a requisição e permite informar visualmente que o envio está em andamento.

### 22.2 mensagem

Armazena feedback apresentado ao visitante.

### 22.3 sucesso

Permite diferenciar visualmente resultado positivo de falha.

---

## 23. Fluxo de envio no frontend

Fluxo conceitual:

    submit
      |
      v
    impedir comportamento padrão
      |
      v
    coletar FormData
      |
      v
    construir payload
      |
      v
    calcular classificação local
      |
      v
    POST /api/leads
      |
      +--> sucesso
      |      |
      |      v
      |   feedback positivo
      |
      +--> erro
             |
             v
          feedback controlado

A API permanece responsável pela validação definitiva e pela classificação autoritativa.

---

## 24. Mensagem oficial de sucesso

A mensagem definida para o visitante é:

> Recebemos sua mensagem! Nosso time vai analisar e te chamar no WhatsApp/e-mail em breve para entender melhor e sugerir o plano ideal.

Essa mensagem deve permanecer igual para:

- lead XTechWeb;
- possível lead STR.

A classificação interna não deve alterar o feedback do visitante.

---

## 25. Decisão sobre WhatsApp direto

Durante o desenvolvimento foi considerada a utilização de link direto `wa.me`.

A abordagem foi implementada temporariamente e depois removida.

### 25.1 Motivo da remoção

O `wa.me`:

- abre WhatsApp ou WhatsApp Web;
- transfere o visitante para outro aplicativo/contexto;
- exige que ele envie a mensagem manualmente;
- cria um segundo fluxo de conversão.

### 25.2 Decisão atual

Manter um único fluxo:

    formulário
        |
        v
    Enviar solicitação
        |
        v
    /api/leads
        |
        v
    classificação interna
        |
        v
    e-mail interno

O WhatsApp permanece apenas como dado de contato.

### 25.3 Futuro

Envio automático por WhatsApp exigiria integração específica com API oficial/compatível de WhatsApp Business.

Isso não faz parte do MVP atual.

---

## 26. Regra de simplicidade do formulário

Embora o formulário possua informações suficientes para qualificação inicial, ele não deve assumir o papel de um discovery completo.

Princípios:

- linguagem simples;
- poucas decisões;
- perguntas compreensíveis;
- sem jargão;
- sem exigir conhecimento técnico;
- sem pedir ao visitante para decidir entre XTechWeb e STR;
- sem expor classificação interna.

O formulário é uma porta de entrada comercial.

---

## 27. Pendências específicas da camada comercial/frontend

### 27.1 Log da classificação local

O componente atualmente possui classificação client-side e há referência ao valor `classificacaoLocal` no log do navegador.

Como a classificação é interna, esse valor deve ser removido dos logs acessíveis ao visitante antes da produção.

A classificação local pode permanecer se houver necessidade funcional, mas não deve ser exposta no console.

### 27.2 Mensagem fallback de erro

O código atual ainda contém mensagem semelhante a:

> Não foi possível enviar sua mensagem agora. Tente novamente ou fale com a gente pelo WhatsApp.

Como o fluxo direto por WhatsApp foi removido, essa mensagem deve ser corrigida.

### 27.3 Mensagem fallback de sucesso

O fallback do componente deve ser conferido e alinhado exatamente à mensagem oficial de sucesso.

### 27.4 Política de Privacidade

O consentimento menciona Política de Privacidade.

A política real ainda precisa ser publicada e vinculada antes da produção.

### 27.5 Validação mobile final

A interface possui tratamento responsivo, mas a validação visual final em mobile deve fazer parte do hardening anterior ao deploy definitivo.

---

<!-- DOC02-END -->

## 28. API de leads

Endpoint atual:

    POST /api/leads

Arquivo:

    src/app/api/leads/route.ts

A rota utiliza Route Handler do App Router do Next.js.

Responsabilidades:

1. receber a requisição;
2. gerar identificador da operação;
3. interpretar JSON;
4. validar o payload;
5. normalizar dados necessários à classificação;
6. recalcular a classificação no servidor;
7. preparar conteúdo seguro para e-mail;
8. verificar configuração do ambiente;
9. chamar o Resend;
10. registrar resultado;
11. retornar resposta controlada ao frontend.

A rota não persiste o lead em banco de dados neste checkpoint.

---

## 29. Contrato server-side do lead

A implementação utiliza uma estrutura conceitual LeadPayload.

Campos relevantes:

    nome
    necessidade
    sistemaAtual
    objetivo
    whatsapp
    email
    consentimento

O backend não deve presumir que dados enviados pelo navegador são confiáveis.

Todos os campos relevantes passam por validação antes da integração externa.

---

## 30. Tipos de sistema atual

Tipo conceitual:

    SistemaAtual

Valores aceitos:

    nenhum
    planilhas
    erp_mudar
    sistema_evoluir

Existe uma coleção de valores válidos utilizada para impedir valores arbitrários.

Conceitualmente:

    SISTEMAS_VALIDOS

O servidor deve rejeitar valores fora desse contrato.

---

## 31. Tipos de objetivo

Tipo conceitual:

    Objetivo

Valores aceitos:

    presenca_online
    vender_online
    automatizar_processo
    substituir_integrar

Existe uma coleção de objetivos válidos.

Conceitualmente:

    OBJETIVOS_VALIDOS

O servidor deve rejeitar valores desconhecidos.

---

## 32. Validação server-side

A validação server-side é obrigatória mesmo existindo validação no navegador.

Isso ocorre porque dados client-side podem ser:

- alterados;
- removidos;
- enviados manualmente;
- manipulados fora da interface oficial.

A API valida:

- presença dos campos necessários;
- formato/tamanho dos textos;
- enum de sistema atual;
- enum de objetivo;
- WhatsApp;
- e-mail;
- consentimento.

### 32.1 Validação textual

A implementação possui função equivalente a:

    textoValido

Ela é utilizada para verificar condições mínimas dos valores textuais.

### 32.2 E-mail

O backend executa validação básica do formato do endereço de e-mail.

Essa validação não representa confirmação de propriedade do endereço.

### 32.3 Consentimento

Para a solicitação ser considerada válida:

    consentimento === true

### 32.4 JSON inválido

Se o corpo da requisição não puder ser interpretado como JSON válido, a API interrompe o fluxo antes da classificação e do envio de e-mail.

---

## 33. Normalização textual

A classificação textual não deve depender de diferenças triviais de escrita.

Existe função de normalização equivalente a:

    normalizarTexto

Objetivos:

- converter para formato comparável;
- reduzir diferenças de maiúsculas/minúsculas;
- reduzir impacto de acentuação;
- permitir identificação case-insensitive dos termos configurados.

Exemplo conceitual:

    "Automação"
        |
        v
    normalização
        |
        v
    "automacao"

A normalização é usada para classificação.

Ela não deve modificar silenciosamente o conteúdo original apresentado à equipe comercial.

---

## 34. Classificação de leads

Existem duas classificações internas:

    XTECHWEB_PADRAO
    POSSIVEL_STR

### 34.1 XTECHWEB_PADRAO

Indica que os sinais coletados são compatíveis com o fluxo comercial padrão da XTechWeb.

### 34.2 POSSIVEL_STR

Indica presença de sinais de projeto potencialmente mais complexo.

Essa classificação é uma indicação.

Não representa decisão automática de transferência para a STR Software.

---

## 35. Regras estruturadas para possível STR

O lead é considerado possível STR quando pelo menos uma das condições configuradas for verdadeira.

### 35.1 Sistema atual

Classificar como possível STR se:

    sistemaAtual = erp_mudar

ou:

    sistemaAtual = sistema_evoluir

### 35.2 Objetivo

Classificar como possível STR se:

    objetivo = automatizar_processo

ou:

    objetivo = substituir_integrar

Essas regras refletem maior probabilidade de necessidade relacionada a sistema empresarial, integração ou automação.

---

## 36. Classificação por texto livre

Além dos campos estruturados, a necessidade informada pelo visitante é analisada.

Termos indicativos definidos:

    ERP
    sistema próprio
    integração
    automação
    área de login
    login de cliente
    multiusuário
    painel administrativo
    API
    marketplace

A busca deve funcionar após normalização e sem depender de diferenças de maiúsculas/minúsculas.

Correspondência parcial pode disparar a classificação.

### 36.1 Regra OR

A lógica é inclusiva.

Basta uma condição válida para:

    POSSIVEL_STR

Caso nenhuma condição seja encontrada:

    XTECHWEB_PADRAO

---

## 37. Dupla classificação: navegador e servidor

Existe classificação no frontend e no backend.

Essa duplicação possui responsabilidades diferentes.

### 37.1 Frontend

O componente possui função local equivalente a:

    classificarLead

Ela atende ao requisito de classificação client-side.

### 37.2 Backend

A API possui sua própria:

    classificarLead

O backend recalcula a classificação usando os dados recebidos.

### 37.3 Fonte de verdade

A classificação do servidor é autoritativa.

O servidor não deve aceitar uma classificação enviada pelo navegador como decisão final.

Isso reduz a possibilidade de manipulação client-side.

---

## 38. Confidencialidade da classificação

O visitante não deve receber:

- XTECHWEB_PADRAO;
- POSSIVEL_STR;
- mensagem diferenciada;
- redirecionamento indicando STR;
- informação de roteamento interno.

O feedback externo permanece genérico e uniforme.

### 38.1 Hardening pendente

O frontend ainda possui log que inclui:

    classificacaoLocal

Esse valor deve ser removido do console do navegador antes da produção.

É aceitável manter um log de estágio sem o valor da classificação.

Exemplo conceitual permitido:

    [XTECHWEB][FORM][ENVIO_INICIO]

Exemplo a evitar:

    classificacaoLocal: "POSSIVEL_STR"

---

## 39. Identificador de requisição

Cada processamento da API utiliza um:

    requestId

Objetivo:

correlacionar eventos do mesmo envio nos logs.

Exemplo conceitual:

    INICIO requestId=A
    CLASSIFICADO requestId=A
    EMAIL_INICIO requestId=A
    EMAIL_OK requestId=A

Isso permite diagnosticar uma requisição sem registrar dados pessoais do visitante.

---

## 40. Estratégia de logging da API

Logs são obrigatórios em pontos com possibilidade de falha silenciosa.

Eventos atualmente previstos/implementados:

    INICIO
    JSON_INVALIDO
    VALIDACAO_FALHOU
    CLASSIFICADO
    CONFIG_AUSENTE
    EMAIL_INICIO
    EMAIL_FALHOU
    EMAIL_OK
    ERRO_NAO_TRATADO

---

## 41. Log INICIO

Evento:

    INICIO

Indica que a API iniciou o processamento de uma nova requisição.

Deve possuir informação técnica suficiente para correlação sem expor dados pessoais desnecessários.

---

## 42. Log JSON_INVALIDO

Evento:

    JSON_INVALIDO

Indica que o corpo recebido não pôde ser interpretado corretamente como JSON.

Nesse cenário:

- classificação não deve prosseguir;
- Resend não deve ser chamado;
- resposta controlada deve ser retornada.

---

## 43. Log VALIDACAO_FALHOU

Evento:

    VALIDACAO_FALHOU

Indica que o JSON foi interpretado, mas não atende ao contrato esperado.

Pode envolver:

- campo ausente;
- texto inválido;
- enum inválido;
- WhatsApp inválido;
- e-mail inválido;
- ausência de consentimento.

Não registrar desnecessariamente os valores pessoais que causaram a falha.

---

## 44. Log CLASSIFICADO

Evento:

    CLASSIFICADO

Indica que a API concluiu a classificação server-side.

Pode registrar a classificação interna no ambiente de servidor.

Essa informação é operacional e não deve ser devolvida ao visitante.

---

## 45. Log CONFIG_AUSENTE

Evento:

    CONFIG_AUSENTE

Indica ausência de configuração necessária para executar a integração de e-mail.

Variáveis relevantes:

    RESEND_API_KEY
    LEADS_TO_EMAIL

A ausência de configuração deve interromper o envio.

Nunca substituir configuração ausente por valor secreto hardcoded.

---

## 46. Log EMAIL_INICIO

Evento:

    EMAIL_INICIO

Registrado imediatamente antes da chamada externa ao Resend.

Sua presença permite distinguir:

- falha anterior à integração;
- falha durante a integração.

---

## 47. Log EMAIL_FALHOU

Evento:

    EMAIL_FALHOU

Indica que a integração externa não concluiu o envio como esperado.

O erro deve ser observável no servidor.

O visitante recebe resposta genérica adequada, sem detalhes internos do provedor.

---

## 48. Log EMAIL_OK

Evento:

    EMAIL_OK

Indica que o Resend aceitou o envio.

Quando disponível, pode registrar identificador técnico retornado pelo provedor.

Esse evento não significa necessariamente que uma pessoa leu o e-mail.

Significa que a chamada ao provedor foi aceita conforme resposta recebida.

---

## 49. Log ERRO_NAO_TRATADO

Evento:

    ERRO_NAO_TRATADO

Protege a observabilidade contra exceções não previstas.

O objetivo é impedir falha silenciosa.

A resposta ao navegador continua controlada.

Detalhes internos não devem ser expostos ao visitante.

---

## 50. Regra de proteção dos logs

Nunca registrar em logs:

- senha;
- token;
- cookie de sessão;
- chave de API;
- RESEND_API_KEY;
- segredos de ambiente.

Também deve ser evitado registrar desnecessariamente:

- nome completo;
- e-mail;
- WhatsApp;
- conteúdo integral da necessidade.

O requestId deve ser preferido para correlação operacional.

---

## 51. Escape de HTML

O backend prepara conteúdo fornecido pelo visitante para inserção no corpo HTML do e-mail.

Existe função equivalente a:

    escaparHtml

Objetivo:

impedir que conteúdo arbitrário informado no formulário seja interpretado diretamente como HTML confiável.

Caracteres especiais devem ser convertidos para representação segura antes de compor o HTML.

Essa proteção é aplicada no contexto do e-mail.

---

## 52. Descrições internas dos enums

A API possui funções equivalentes a:

    descricaoSistema
    descricaoObjetivo

Objetivo:

converter valores internos como:

    erp_mudar

em descrições compreensíveis no e-mail recebido pela equipe.

Isso permite manter:

- contrato técnico estável;
- apresentação interna legível.

---

## 53. Integração Resend

Biblioteca:

    resend

Versão instalada no checkpoint:

    6.28.0

Uso atual:

notificação interna de novos leads.

A integração ocorre exclusivamente no servidor.

A chave não deve ser enviada ao navegador.

---

## 54. Variáveis de ambiente

Variáveis atualmente necessárias:

    RESEND_API_KEY
    LEADS_TO_EMAIL

Arquivo local utilizado:

    .env.local

### 54.1 RESEND_API_KEY

Contém credencial utilizada pelo servidor para autenticação no Resend.

Nunca deve:

- ser commitada;
- aparecer em documentação;
- aparecer em logs;
- aparecer em screenshots públicas;
- ser enviada ao frontend.

### 54.2 LEADS_TO_EMAIL

Define o destinatário interno da notificação.

Isso evita hardcode do destinatário no código da API.

---

## 55. Proteção do .env.local

O .gitignore possui regra:

    .env*

Consequentemente, arquivos de ambiente compatíveis com esse padrão não devem ser versionados.

Antes de qualquer commit relevante, deve-se verificar:

    git status
    git check-ignore

para confirmar que segredos não estão entrando no versionamento.

---

## 56. Remetente atual do Resend

Durante o desenvolvimento foi utilizado:

    XTechWeb <onboarding@resend.dev>

Esse remetente é adequado apenas às limitações do ambiente de teste do Resend.

Ele não representa a configuração definitiva de produção.

Antes da produção deve ser utilizado domínio/remetente devidamente verificado.

---

## 57. Destinatário de teste e destinatário pretendido

Durante testes do Resend foi necessário utilizar temporariamente o endereço autorizado pela conta de teste.

O destinatário operacional pretendido para a XTechWeb é configurado por:

    LEADS_TO_EMAIL

A documentação não deve armazenar credenciais.

Mudanças de destinatário devem ser realizadas por configuração de ambiente, não por alteração da regra de negócio da API.

---

## 58. Assuntos dos e-mails

Para lead padrão:

> Novo lead XTechWeb

Para possível oportunidade STR:

> ⚠️ Possível lead STR Software

O assunto permite triagem rápida pela equipe.

O visitante não vê essa classificação.

---

## 59. Conteúdo da notificação interna

O e-mail interno inclui os dados relevantes coletados:

- Nome;
- O que precisa;
- Sistema atual;
- Objetivo principal;
- WhatsApp;
- E-mail;
- Consentimento para contato.

A mensagem interna também deixa claro que a classificação é indicativa e deve ser validada por uma pessoa antes de qualquer encaminhamento para a STR.

---

## 60. Regra de encaminhamento STR

A aplicação não deve transferir automaticamente um lead para outro sistema apenas porque foi classificado como POSSIVEL_STR.

Fluxo correto:

    classificação
        |
        v
    sinalização interna
        |
        v
    análise humana
        |
        +--> permanece XTechWeb
        |
        `--> oportunidade STR

Essa decisão evita falsos positivos e mantém controle comercial.

---

## 61. Teste funcional do Resend

Durante o desenvolvimento houve uma primeira tentativa que recebeu resposta 403 do Resend.

Causa:

o remetente de teste `onboarding@resend.dev` possui restrições de destinatário enquanto não existe domínio verificado.

A API:

- detectou a falha;
- registrou a falha;
- não declarou sucesso;
- retornou erro ao frontend.

Esse comportamento confirmou a observabilidade do fluxo externo.

---

## 62. Teste POSSIVEL_STR

Após utilizar destinatário permitido no ambiente de teste, foi realizado envio compatível com classificação STR.

Resultado confirmado durante desenvolvimento:

- classificação POSSIVEL_STR;
- assunto "⚠️ Possível lead STR Software";
- dados recebidos;
- e-mail entregue no ambiente de teste.

---

## 63. Teste XTECHWEB_PADRAO

Também foi realizado teste com dados compatíveis com o fluxo padrão XTechWeb.

Resultado confirmado durante desenvolvimento:

- classificação XTECHWEB_PADRAO;
- assunto "Novo lead XTechWeb";
- dados recebidos;
- e-mail entregue no ambiente de teste.

---

## 64. Teste após inclusão de WhatsApp, e-mail e consentimento

Após expansão do formulário, nova submissão foi executada.

O servidor registrou sequência equivalente a:

    INICIO
    CLASSIFICADO
    EMAIL_INICIO
    EMAIL_OK
    POST /api/leads 200

O Resend retornou identificador de e-mail.

Isso confirma que a API aceitou o novo payload e que o provedor aceitou a solicitação de envio.

Não se deve confundir `EMAIL_OK` com confirmação de leitura humana.

---

## 65. Tratamento de erros para o visitante

Erros internos não devem revelar:

- stack trace;
- chave;
- configuração;
- classificação;
- detalhes do Resend;
- arquitetura interna.

O frontend deve receber mensagem adequada à experiência do usuário.

O servidor mantém detalhes técnicos nos logs permitidos.

---

## 66. Falhas silenciosas

Pelo padrão de desenvolvimento do projeto, pontos que possam falhar silenciosamente devem possuir instrumentação.

Aplicado atualmente principalmente a:

- parsing da requisição;
- validação;
- classificação;
- configuração;
- integração de e-mail;
- exceções não tratadas.

Esse princípio deverá ser mantido quando forem adicionados:

- banco de dados;
- autenticação;
- admin;
- upload;
- pagamentos;
- integrações;
- webhooks.

---

## 67. Incidente de segurança durante desenvolvimento

Durante preparação do versionamento foi localizado:

    docs/x.txt

O arquivo continha conteúdo com aparência de chave Resend.

A chave não deve ser reproduzida nesta documentação.

### 67.1 Ações executadas

Foi verificado que o arquivo não fazia parte do índice Git atual.

Depois:

- o arquivo foi removido;
- a pasta vazia correspondente foi removida naquele momento;
- o status do Git foi novamente inspecionado.

### 67.2 Regra de segurança

Uma credencial exposta em arquivo de trabalho deve ser considerada comprometida.

A credencial deve ser revogada/rotacionada antes da produção.

A nova credencial deve existir apenas em ambiente seguro.

### 67.3 Proibição

Nunca documentar o valor real de:

    RESEND_API_KEY

---

## 68. Backups locais

Durante alterações relevantes são criados backups locais.

Padrão:

    *.backup-*

O .gitignore foi atualizado para ignorar esse padrão.

Os backups:

- auxiliam rollback local;
- não fazem parte do código-fonte oficial;
- não devem entrar no commit.

---

## 69. Política de alteração técnica

Alterações relevantes devem seguir fluxo controlado:

    inspeção
        |
        v
    identificação do estado atual
        |
        v
    backup quando aplicável
        |
        v
    alteração
        |
        v
    validação
        |
        v
    build/teste
        |
        v
    evidência
        |
        v
    checkpoint

Não declarar sucesso sem evidência.

---

## 70. Regra de encoding

Arquivos textuais criados ou modificados por scripts PowerShell devem utilizar:

    UTF-8 sem BOM

Padrão utilizado:

    [System.Text.UTF8Encoding]::new($false)

Quando relevante, o resultado deve ser validado após a gravação.

---

## 71. Regra PowerShell

Para cmdlets internos do PowerShell, como:

    Copy-Item
    Move-Item
    Remove-Item

não utilizar `$LASTEXITCODE` como critério de sucesso.

Utilizar:

    try/catch
    -ErrorAction Stop
    validação posterior

`$LASTEXITCODE` é apropriado para executáveis externos, como:

    npm
    git
    npx

---

## 72. Critério de checkpoint

Um checkpoint técnico somente deve ser chamado de:

    CONCLUIDO E CONFIRMADO

quando existir evidência suficiente.

Exemplos:

- arquivo existe;
- conteúdo foi relido;
- validação passou;
- build passou;
- integração respondeu corretamente;
- Git mostra estado esperado.

Mensagens `[OK]` não devem ser impressas antes da comprovação correspondente.

---

## 73. Pendências técnicas relacionadas à API

Antes da produção definitiva:

1. remover exposição de `classificacaoLocal` no console do navegador;
2. corrigir fallback de erro que ainda menciona contato direto por WhatsApp;
3. alinhar fallback de sucesso à mensagem oficial;
4. criar e vincular Política de Privacidade;
5. rotacionar a chave Resend que esteve exposta;
6. configurar remetente/domínio verificado no Resend;
7. configurar destinatário operacional correto;
8. executar novo teste real após configuração de produção;
9. realizar validação mobile final;
10. adicionar estratégia antispam adequada.

---

<!-- DOC03-END -->

## 74. Estado técnico atual

Este capítulo registra o estado efetivamente implementado no checkpoint atual.

A aplicação possui:

- projeto Next.js funcional;
- TypeScript;
- React;
- Tailwind CSS;
- identidade visual XTechWeb;
- Home comercial;
- estrutura responsiva;
- navegação por seções;
- tabela comercial;
- processo de contratação;
- formulário de qualificação;
- API de leads;
- classificação interna XTechWeb/possível STR;
- integração de e-mail via Resend;
- logs de etapas críticas;
- tratamento de erros da API;
- proteção básica contra HTML arbitrário no e-mail;
- variáveis de ambiente para segredos e destinatário.

Não devem ser considerados implementados recursos descritos apenas como planejamento.

---

## 75. Estrutura de arquivos confirmada

Estrutura principal observada no checkpoint:

    xtechweb/
    |
    +-- public/
    |   |
    |   `-- logo-xtechweb.png
    |
    +-- src/
    |   |
    |   +-- app/
    |   |   |
    |   |   +-- api/
    |   |   |   |
    |   |   |   `-- leads/
    |   |   |       |
    |   |   |       `-- route.ts
    |   |   |
    |   |   +-- globals.css
    |   |   +-- layout.tsx
    |   |   `-- page.tsx
    |   |
    |   `-- components/
    |       |
    |       `-- lead-qualification-form.tsx
    |
    +-- docs/
    |   |
    |   `-- ARQUITETURA-TECNICA.md
    |
    +-- next.config.ts
    +-- package.json
    +-- package-lock.json
    `-- .gitignore

Arquivos de backup local podem existir fisicamente, mas são ignorados pelo Git através do padrão `*.backup-*`.

---

## 76. Responsabilidade de page.tsx

Arquivo:

    src/app/page.tsx

Responsabilidade atual:

compor a Home comercial da XTechWeb.

Ela organiza as principais áreas comerciais e integra o formulário de qualificação.

Seções confirmadas:

    header
    hero
    #precisa
    #solucoes
    #planos
    #continuidade
    #falar-projeto
    #como-funciona

O componente de formulário é importado para essa página.

---

## 77. Responsabilidade de globals.css

Arquivo:

    src/app/globals.css

Responsabilidades:

- identidade visual;
- layout;
- tipografia;
- espaçamentos;
- componentes visuais da Home;
- cards;
- preços;
- formulário;
- responsividade;
- comportamento visual do header.

O header utiliza comportamento sticky.

Conceitualmente:

    position: sticky
    top: 0
    z-index: 100

O objetivo é manter a navegação acessível durante a rolagem.

---

## 78. Responsabilidade de layout.tsx

Arquivo:

    src/app/layout.tsx

Responsabilidades principais:

- layout raiz do App Router;
- configuração global da página;
- metadados básicos;
- definição de idioma compatível com português do Brasil.

SEO avançado ainda faz parte das etapas posteriores.

---

## 79. Responsabilidade do formulário

Arquivo:

    src/components/lead-qualification-form.tsx

É um Client Component.

Responsabilidades:

- renderizar campos;
- coletar dados;
- controlar estado de envio;
- preparar payload;
- executar classificação local;
- chamar `/api/leads`;
- interpretar resposta;
- apresentar feedback.

A classificação local não substitui a classificação server-side.

---

## 80. Responsabilidade da API

Arquivo:

    src/app/api/leads/route.ts

Responsabilidades:

- receber POST;
- validar JSON;
- validar contrato;
- recalcular classificação;
- verificar configuração;
- preparar notificação;
- chamar Resend;
- registrar eventos;
- responder ao frontend.

A API é a fronteira confiável do fluxo atual.

---

## 81. Arquitetura do MVP atual

Fluxo técnico:

    navegador
        |
        v
    Home XTechWeb
        |
        v
    LeadQualificationForm
        |
        | POST JSON
        v
    /api/leads
        |
        +--> validação
        |
        +--> classificação server-side
        |
        +--> preparação segura do e-mail
        |
        v
    Resend
        |
        v
    caixa de e-mail interna
        |
        v
    análise comercial humana

Não existe banco de dados no caminho atual.

---

## 82. Persistência atual

No checkpoint atual:

    persistência de lead em banco = NÃO IMPLEMENTADA

O lead depende da integração de e-mail para chegar à operação comercial.

Consequências:

- não existe histórico interno persistido na aplicação;
- não existe consulta de leads pelo site;
- não existe status comercial persistido;
- não existe trilha de alterações;
- não existe recuperação do lead pela aplicação caso a notificação externa não seja concluída.

A futura implementação de banco deve eliminar essa dependência exclusiva.

---

## 83. Banco de dados planejado

Tecnologia planejada:

    PostgreSQL

Provedor considerado:

    Neon

ORM planejado:

    Prisma

O banco ainda não deve ser descrito como implementado.

Modelos conceituais considerados:

    Usuario
    Lead
    LeadHistorico
    ProjetoPortfolio
    PostBlog
    Configuracao

A modelagem definitiva deverá ser revisada antes da criação das migrations.

---

## 84. Regras futuras para banco

Quando a persistência for implementada:

- schema deve ser versionado;
- migrations devem ser revisáveis;
- dados existentes devem ser preservados;
- mudanças destrutivas exigem confirmação;
- migrations aplicadas não devem ser alteradas retroativamente;
- produção não deve utilizar `db push` como substituto de migration controlada;
- falhas de persistência devem possuir logs;
- a resposta de sucesso ao visitante não deve ocorrer se a regra de negócio exigir persistência e ela falhar.

---

## 85. Lead futuro em banco

O modelo definitivo ainda será desenhado.

Entretanto, conceitualmente deverá ser possível registrar:

- identificador;
- nome;
- necessidade;
- sistema atual;
- objetivo;
- WhatsApp;
- e-mail;
- classificação;
- consentimento;
- data/hora;
- origem;
- status;
- histórico.

A política de privacidade e os requisitos de proteção de dados deverão orientar os campos efetivamente persistidos.

---

## 86. Consentimento futuro persistido

Quando houver banco, recomenda-se que o consentimento não seja representado apenas por um boolean isolado.

Também deverão ser avaliados:

- data/hora do consentimento;
- versão da Política de Privacidade;
- origem do envio;
- identificação do lead;
- eventual base legal aplicável ao tratamento.

A implementação definitiva deverá ser compatível com a política publicada.

---

## 87. Área administrativa planejada

A área administrativa não faz parte do estado implementado atual.

MVP administrativo planejado:

- autenticação;
- dashboard;
- lista de leads;
- detalhes do lead;
- status;
- observações;
- histórico;
- portfólio;
- blog;
- configurações.

Não confundir planejamento com funcionalidade existente.

---

## 88. Autenticação futura

A autenticação administrativa ainda não foi implementada.

Quando for criada, deverá considerar:

- hash seguro de senha;
- sessão segura;
- cookies adequados;
- expiração;
- controle de acesso;
- proteção de rotas;
- logs de eventos críticos;
- nenhuma senha em texto puro;
- nenhuma credencial em log.

Papéis/permissões deverão ser definidos conforme necessidade real da operação.

---

## 89. Portfólio planejado

O site deverá possuir área de portfólio.

A implementação futura poderá permitir:

- título;
- descrição;
- categoria;
- imagens;
- tecnologias quando comercialmente apropriado;
- status de publicação;
- ordem;
- slug;
- metadados.

A linguagem pública deve priorizar resultado e solução, não jargão técnico.

---

## 90. Blog planejado

O blog faz parte da arquitetura comercial futura.

Objetivos:

- SEO;
- autoridade;
- educação do cliente;
- geração de tráfego;
- geração de oportunidades.

Administração futura poderá contemplar:

- título;
- slug;
- resumo;
- conteúdo;
- imagem;
- status;
- data;
- metadados SEO.

---

## 91. SEO planejado

SEO avançado ainda não está concluído.

Etapas previstas:

- metadata por página;
- canonical;
- Open Graph;
- sitemap;
- robots;
- Schema.org quando aplicável;
- títulos e descrições;
- URLs consistentes;
- conteúdo semântico;
- performance;
- indexação.

Nenhum desses itens deve ser considerado concluído apenas por constar neste documento.

---

## 92. Analytics e conversão

Analytics faz parte da evolução planejada.

Eventos que poderão ser medidos:

- visualização da Home;
- navegação para planos;
- acesso ao processo;
- início do formulário;
- tentativa de envio;
- envio concluído;
- falha de envio.

Métricas devem evitar exposição indevida de dados pessoais.

---

## 93. Antispam

O formulário ainda necessita estratégia de proteção contra abuso antes de exposição definitiva em produção.

Possibilidades deverão ser avaliadas conforme necessidade:

- honeypot;
- rate limiting;
- challenge;
- análise de comportamento;
- serviço especializado.

A solução deve equilibrar segurança e conversão.

---

## 94. Deploy

Plataforma planejada:

    Vercel

O deploy de produção deverá utilizar variáveis de ambiente configuradas fora do repositório.

Variáveis sensíveis não devem ser inseridas no código-fonte.

Antes do deploy definitivo deverão ser executados:

- hardening;
- build;
- validação de variáveis;
- validação do formulário;
- teste de e-mail;
- teste responsivo;
- inspeção do Git.

---

## 95. Build

Script:

    npm run build

Um build aprovado confirma que o Next.js conseguiu produzir a aplicação dentro das verificações executadas pelo processo de build.

Build aprovado não substitui:

- teste funcional;
- teste de integração;
- teste visual;
- teste de produção;
- validação de segurança.

---

## 96. Desenvolvimento local

Comando:

    npm run dev

Esse comando inicia o ambiente de desenvolvimento.

Mudanças estruturais, cache do Next.js ou artefatos antigos podem exigir reinicialização do servidor de desenvolvimento.

Durante o desenvolvimento do formulário houve situação em que a interface antiga permaneceu visível até a limpeza do cache `.next` e reinicialização.

Isso deve ser considerado em diagnósticos futuros.

---

## 97. Git

Branch observada no inventário anterior:

    master

Commit existente antes deste checkpoint:

    Initial commit from Create Next App

O conjunto comercial da XTechWeb ainda não havia sido commitado no momento da elaboração desta documentação.

O commit somente deve ocorrer após:

- documentação;
- hardening definido para o checkpoint;
- inspeção do staging;
- confirmação de ausência de segredos.

---

## 98. Estratégia de staging

Evitar:

    git add .

Preferir staging explícito dos arquivos conhecidos.

Motivo:

reduzir risco de adicionar:

- arquivos temporários;
- backups;
- segredos;
- artefatos não revisados.

Antes do commit devem ser inspecionados:

    git status --short
    git diff --cached --stat
    git diff --cached --name-only

---

## 99. Limites do MVP

O MVP atual é uma operação comercial de aquisição e qualificação.

Não é:

- ERP;
- CRM completo;
- sistema financeiro;
- plataforma de atendimento;
- automação de WhatsApp;
- sistema de propostas;
- sistema de assinatura eletrônica;
- gateway de pagamento;
- painel administrativo pronto.

A prioridade é converter visitantes em oportunidades comerciais com o mínimo de complexidade operacional necessária.

---

## 100. Princípio de evolução

A arquitetura deve crescer conforme necessidade validada.

Ordem conceitual:

    aquisição
        |
        v
    conversão
        |
        v
    qualificação
        |
        v
    operação comercial
        |
        v
    automação

Evitar construir infraestrutura complexa antes de existir necessidade operacional comprovada.

---

<!-- DOC04A-END -->

## 101. Ordem de implementação

A evolução planejada do projeto segue esta ordem macro:

    1. Fundação
    2. Home
    3. Páginas comerciais
    4. Orçamento e qualificação
    5. Banco de dados e leads
    6. Área administrativa
    7. Portfólio
    8. Blog
    9. SEO
    10. Segurança e hardening
    11. Testes
    12. Produção

Essa ordem pode ser ajustada quando existir justificativa técnica ou comercial, mas mudanças devem ser registradas.

---

## 102. Fundação

A fundação atual contempla:

- Next.js;
- React;
- TypeScript;
- Tailwind CSS;
- estrutura App Router;
- configuração do Turbopack;
- identidade visual inicial;
- Git.

Essa etapa foi utilizada como base para a Home e para o fluxo de leads.

---

## 103. Home comercial

A Home atual já possui os principais elementos necessários à apresentação comercial inicial:

- Hero;
- identificação da necessidade;
- pilares;
- soluções;
- preços;
- continuidade;
- formulário;
- processo de contratação.

Evoluções futuras não devem comprometer a simplicidade da jornada.

---

## 104. Páginas comerciais futuras

Áreas previstas para expansão:

- Soluções;
- Sites;
- Lojas e Catálogos;
- Automação;
- Planos;
- Portfólio;
- Sobre;
- Blog;
- Orçamento;
- Contato.

Cada página deverá possuir finalidade comercial clara.

Não criar páginas apenas para aumentar volume de conteúdo.

---

## 105. Hardening do formulário atual

Antes do checkpoint destinado à produção, o formulário atual precisa passar por hardening.

Itens conhecidos:

1. remover o valor de `classificacaoLocal` do console do navegador;
2. manter apenas logs client-side que não revelem roteamento interno;
3. corrigir mensagem de erro que ainda menciona fluxo direto de WhatsApp;
4. garantir que o fallback de sucesso corresponda à mensagem oficial;
5. revisar validações client-side;
6. revisar validações server-side;
7. validar estados de loading;
8. impedir múltiplos envios acidentais quando aplicável;
9. revisar acessibilidade;
10. testar comportamento mobile.

---

## 106. Hardening da API

A API `/api/leads` deverá ser revisada antes da produção.

Checklist mínimo:

- contrato do payload;
- limites de tamanho;
- enums;
- validação de e-mail;
- validação de consentimento;
- classificação server-side;
- escape de HTML;
- tratamento de JSON inválido;
- tratamento de configuração ausente;
- tratamento de falha do Resend;
- resposta genérica ao visitante;
- logs sem segredos;
- logs sem PII desnecessária;
- requestId;
- antispam.

A revisão deve ser realizada sobre o código efetivamente existente.

---

## 107. Hardening do Resend

Antes da produção:

- revogar/rotacionar a credencial anteriormente exposta;
- criar ou utilizar credencial válida;
- manter a nova chave somente em ambiente seguro;
- configurar domínio/remetente verificado;
- revisar destinatário operacional;
- testar envio real;
- testar cenário de falha;
- confirmar logs;
- confirmar que nenhuma credencial entrou no Git.

O valor da chave nunca deve ser documentado.

---

## 108. Política de Privacidade

O formulário já referencia uma Política de Privacidade.

Antes da publicação definitiva:

- criar o documento;
- disponibilizar rota/página acessível;
- transformar a referência do formulário em link;
- revisar texto de consentimento;
- alinhar o tratamento de dados ao fluxo real.

Quando a persistência for adicionada, a política deverá ser revista novamente.

---

## 109. Proteção antispam

A rota pública de leads poderá ser alvo de:

- bots;
- spam;
- automação;
- envio repetitivo;
- abuso da integração de e-mail.

A solução antispam deverá ser implementada antes de exposição definitiva quando o risco justificar.

A proteção não deve criar atrito comercial desnecessário.

Possíveis mecanismos:

- honeypot;
- rate limiting;
- challenge;
- combinação de sinais;
- serviço externo especializado.

A escolha deverá ser documentada quando implementada.

---

## 110. Segurança de segredos

Segredos devem existir somente em locais apropriados.

Nunca armazenar em:

- código-fonte;
- documentação;
- arquivos destinados ao Git;
- logs;
- comentários;
- mensagens públicas de erro.

Antes de commits relevantes, verificar o staging e procurar indícios de credenciais.

Arquivos `.env*` permanecem ignorados pelo Git conforme configuração atual.

---

## 111. Observabilidade futura

A instrumentação deverá acompanhar o crescimento da aplicação.

Pontos futuros que exigirão observabilidade incluem:

- persistência de leads;
- autenticação;
- recuperação de senha;
- alterações administrativas;
- uploads;
- publicação de conteúdo;
- integrações;
- webhooks;
- pagamentos, caso existam;
- falhas de banco;
- operações críticas.

Princípio:

> Uma falha relevante não deve desaparecer silenciosamente.

Logs devem explicar estágio e categoria do problema sem revelar segredos.

---

## 112. Estratégia de testes

O projeto deverá combinar diferentes níveis de validação.

### Build

Confirma capacidade de compilação.

### Teste funcional

Confirma que o fluxo executa a ação esperada.

### Teste de integração

Confirma comunicação com serviços externos ou banco.

### Teste visual

Confirma apresentação e responsividade.

### Teste de falha

Confirma comportamento quando dependências falham.

### Teste de segurança

Confirma que controles relevantes não podem ser facilmente contornados.

Nenhum tipo isolado de teste comprova toda a qualidade do sistema.

---

<!-- DOC04B1-END -->

## 113. Checklist antes da produção

Antes de considerar a aplicação pronta para produção, executar uma revisão final.

Checklist mínimo:

- build aprovado;
- formulário testado;
- API testada;
- mensagens revisadas;
- classificação interna não exposta;
- Política de Privacidade publicada;
- consentimento revisado;
- proteção antispam definida;
- chave Resend rotacionada;
- domínio/remetente Resend verificado;
- destinatário operacional correto;
- variáveis de ambiente configuradas;
- nenhum segredo no Git;
- interface desktop revisada;
- interface mobile revisada;
- links revisados;
- metadados revisados;
- logs críticos revisados;
- tratamento de falhas testado.

Produção não deve ser declarada pronta apenas porque o build passou.

---

## 114. Critério para configuração de produção

Configurações específicas de produção devem permanecer fora do código quando forem sensíveis ou dependentes de ambiente.

Exemplos:

    RESEND_API_KEY
    LEADS_TO_EMAIL

Ao adicionar banco futuramente, URLs e credenciais também deverão utilizar variáveis de ambiente.

O código deve detectar configuração obrigatória ausente e produzir falha observável.

---

## 115. Critério para deploy

Antes de um deploy relevante:

    1. revisar alterações
    2. executar validações
    3. executar build
    4. revisar Git
    5. confirmar variáveis
    6. realizar deploy
    7. executar teste pós-deploy

O teste pós-deploy é obrigatório porque build local e ambiente remoto não são equivalentes.

---

## 116. Teste pós-deploy

Após publicação, validar pelo menos:

- carregamento da Home;
- navegação;
- responsividade;
- formulário;
- validação;
- consentimento;
- POST da API;
- integração de e-mail;
- mensagem de sucesso;
- cenário de erro controlado;
- logs do ambiente;
- ausência de exposição da classificação.

Quando novos módulos forem adicionados, o checklist deverá crescer.

---

## 117. Roadmap funcional

Evolução prevista após consolidação do fluxo comercial:

### Fase 1 — Conversão

- Home;
- soluções;
- preços;
- processo;
- qualificação;
- contato.

### Fase 2 — Persistência

- PostgreSQL;
- Prisma;
- Lead;
- consentimento persistido;
- histórico inicial.

### Fase 3 — Operação comercial

- autenticação;
- dashboard;
- leads;
- status;
- observações;
- histórico.

### Fase 4 — Conteúdo

- portfólio;
- blog;
- configurações comerciais.

### Fase 5 — Aquisição

- SEO;
- Schema;
- sitemap;
- Open Graph;
- Analytics;
- eventos de conversão.

### Fase 6 — Evoluções

Conforme demanda validada:

- propostas;
- pagamentos;
- assinatura eletrônica;
- onboarding;
- integrações.

Essas evoluções não fazem parte automaticamente do MVP atual.

---

## 118. Separação de responsabilidades futuras

A aplicação deve manter separação clara entre:

    interface pública
    lógica comercial
    API
    persistência
    autenticação
    administração
    integrações externas

Essa separação reduz acoplamento e facilita manutenção.

Não significa criar abstrações desnecessárias antes de existir complexidade real.

---

## 119. Regra para novas integrações

Toda integração externa futura deverá possuir:

- configuração por ambiente;
- tratamento de erro;
- timeout quando aplicável;
- logs;
- identificação da operação;
- resposta controlada;
- proteção de credenciais;
- estratégia para falha.

Quando uma integração afetar estado persistido, deverá ser avaliada também idempotência.

---

## 120. Regra para documentação futura

Mudanças arquiteturais relevantes devem atualizar este documento.

Exemplos:

- introdução do Prisma;
- primeira migration;
- criação do admin;
- autenticação;
- alteração da classificação;
- nova integração;
- mudança no fluxo de leads;
- mudança relevante de infraestrutura;
- nova política de segurança.

Este documento não deve se tornar uma descrição histórica incorreta do sistema.

---

## 121. README

Além deste documento mestre, o projeto deverá possuir README operacional.

O README deverá ser mais curto e voltado a:

- identificação do projeto;
- stack;
- requisitos;
- instalação;
- desenvolvimento local;
- build;
- variáveis necessárias sem valores secretos;
- estrutura básica;
- referência para documentação detalhada.

Detalhes arquiteturais extensos permanecem neste documento.

---

## 122. CHANGELOG

O projeto deverá possuir CHANGELOG.

Finalidade:

registrar mudanças relevantes por versão/checkpoint.

O CHANGELOG não substitui:

- histórico Git;
- documentação técnica;
- mensagens de commit.

Ele fornece visão resumida da evolução funcional.

---

## 123. Estado documental deste checkpoint

Ao término deste bloco, o documento mestre cobre:

- produto;
- posicionamento;
- arquitetura;
- stack;
- estrutura;
- identidade;
- produtos;
- preços;
- processo;
- formulário;
- consentimento;
- classificação;
- API;
- Resend;
- logs;
- segurança;
- incidente de credencial;
- Git;
- banco planejado;
- admin planejado;
- SEO;
- antispam;
- hardening;
- testes;
- deploy;
- roadmap;
- produção.

O documento representa o conhecimento técnico consolidado até este checkpoint.

---

## 124. Próximos passos imediatos

Após conclusão documental:

    1. criar README.md
    2. criar CHANGELOG.md
    3. executar hardening conhecido
    4. executar build
    5. validar fluxo funcional
    6. revisar segredos
    7. revisar staging
    8. criar commit

Não realizar commit antes da inspeção explícita do staging.

---

## 125. Critério de continuidade por outro desenvolvedor

Um desenvolvedor que assuma o projeto deverá começar por:

    docs/ARQUITETURA-TECNICA.md

Depois deverá consultar:

    README.md
    CHANGELOG.md
    código-fonte
    histórico Git

O estado efetivo do código sempre prevalece quando houver divergência documental.

Nesse caso, a documentação deve ser corrigida.

---

## 126. Encerramento do documento mestre

A XTechWeb foi estruturada inicialmente como uma operação digital de aquisição, apresentação e qualificação comercial.

A arquitetura atual privilegia:

- simplicidade;
- clareza;
- conversão;
- segurança;
- observabilidade;
- evolução incremental.

O princípio central permanece:

> O cliente explica o que quer fazer. A XTechWeb descobre a tecnologia necessária.

Este documento deverá evoluir junto com o sistema.

---

<!-- DOC04B2-END -->
<!-- ARQUITETURA-TECNICA-V1-END -->