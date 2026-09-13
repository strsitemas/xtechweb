import Image from "next/image";
import { LeadQualificationForm } from "@/components/lead-qualification-form";

const necessidades = [
  {
    numero: "01",
    titulo: "Quero apresentar minha empresa",
    descricao:
      "Tenha um site profissional para mostrar quem você é, seus serviços e facilitar o contato com novos clientes.",
    solucao: "Site institucional",
  },
  {
    numero: "02",
    titulo: "Quero divulgar um produto ou serviço",
    descricao:
      "Uma página objetiva para apresentar sua oferta e transformar visitantes em contatos e oportunidades.",
    solucao: "Landing page",
  },
  {
    numero: "03",
    titulo: "Quero mostrar ou vender meus produtos",
    descricao:
      "Organize seus produtos em um catálogo profissional ou dê o próximo passo com uma loja virtual.",
    solucao: "Catálogo ou loja",
  },
  {
    numero: "04",
    titulo: "Ainda não sei o que preciso",
    descricao:
      "Conte um pouco sobre seu negócio. Nós ajudamos a identificar a solução certa sem complicar com termos técnicos.",
    solucao: "A gente ajuda você",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <header className="header">
        <div className="container header-inner">
          <a className="brand" href="#" aria-label="XTechWeb - início">
            <Image
              src="/logo-xtechweb.png"
              alt="XTechWeb"
              width={220}
              height={100}
              priority
              className="brand-logo"
            />
          </a>

          <nav className="nav" aria-label="Navegação principal">
            <a href="#precisa">O que você precisa?</a>
            <a href="#solucoes">Soluções</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#planos">Planos</a>
          </nav>

          <a className="button button-small" href="#precisa">
            Quero começar
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="grid-overlay" />

        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow">
              Tecnologia simples para negócios reais
            </span>

            <h1>
              Seu negócio precisa estar
              <span> na internet.</span>
              <br />
              A gente coloca.
            </h1>

            <p className="hero-description">
              Sites profissionais, lojas e soluções digitais para quem quer
              começar, vender e crescer — sem precisar entender de tecnologia.
            </p>

            <div className="hero-actions">
              <a className="button" href="#precisa">
                Descobrir o que eu preciso
              </a>

              <a className="button button-secondary" href="#como-funciona">
                Como funciona
              </a>
            </div>

            <div className="trust-row">
              <span>
                <strong>✓</strong> Conversa simples
              </span>
              <span>
                <strong>✓</strong> Preço claro
              </span>
              <span>
                <strong>✓</strong> Feito para seu negócio
              </span>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="visual-card">
              <span className="visual-label">XTechWeb</span>

              <div className="visual-message">
                <span>Você traz</span>
                <strong>a idéia.</strong>
              </div>

              <div className="visual-divider" />

              <div className="visual-message visual-message-right">
                <span>Nós transformamos em</span>
                <strong>presença digital.</strong>
              </div>

              <div className="visual-status">
                <span className="status-dot" />
                simples • profissional • funcional
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="needs-section" id="precisa">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Comece por aqui</span>

            <h2>O que você precisa?</h2>

            <p>
              Você não precisa saber o nome técnico da solução. Escolha a
              situação que mais se parece com o que você quer fazer.
            </p>
          </div>

          <div className="needs-grid">
            {necessidades.map((item) => (
              <article className="need-card" key={item.numero}>
                <div className="need-top">
                  <span className="need-number">{item.numero}</span>
                  <span className="need-arrow">↗</span>
                </div>

                <h3>{item.titulo}</h3>

                <p>{item.descricao}</p>

                <span className="need-solution">{item.solucao}</span>
              </article>
            ))}
          </div>
        </div>

      <section className="pillars-section" id="solucoes">
        <div className="container">
          <div className="pillars-intro">
            <div>
              <span className="eyebrow">Soluções XTechWeb</span>
              <h2>Da presença online ao negócio funcionando melhor.</h2>
            </div>

            <p>
              Você explica onde quer chegar. Nós combinamos as soluções
              necessárias para colocar sua empresa no caminho certo.
            </p>
          </div>

          <div className="pillars-grid">
            <article className="pillar-card">
              <div className="pillar-symbol" aria-hidden="true">01</div>

              <span className="pillar-category">Presença Online</span>

              <h3>Coloque sua empresa na internet.</h3>

              <p>
                Tenha um espaço profissional para apresentar sua marca,
                serviços, diferenciais e formas de contato.
              </p>

              <div className="pillar-tags">
                <span>Sites</span>
                <span>Landing pages</span>
              </div>
            </article>

            <article className="pillar-card">
              <div className="pillar-symbol" aria-hidden="true">02</div>

              <span className="pillar-category">Vendas Digitais</span>

              <h3>Mostre seus produtos e venda mais.</h3>

              <p>
                Organize o que você vende e facilite para seus clientes
                encontrarem produtos, informações e formas de comprar.
              </p>

              <div className="pillar-tags">
                <span>Catálogos</span>
                <span>Lojas virtuais</span>
              </div>
            </article>

            <article className="pillar-card">
              <div className="pillar-symbol" aria-hidden="true">03</div>

              <span className="pillar-category">Marketing Digital</span>

              <h3>Ajude novos clientes a encontrar você.</h3>

              <p>
                Estruture sua presença digital para ganhar visibilidade,
                aparecer nas buscas e transformar acessos em oportunidades.
              </p>

              <div className="pillar-tags">
                <span>SEO</span>
                <span>Visibilidade</span>
              </div>
            </article>

            <article className="pillar-card">
              <div className="pillar-symbol" aria-hidden="true">04</div>

              <span className="pillar-category">
                Automação e Integrações
              </span>

              <h3>Facilite o contato e economize trabalho.</h3>

              <p>
                Conecte seu site a ferramentas do dia a dia e automatize
                pequenas tarefas que hoje consomem seu tempo.
              </p>

              <div className="pillar-tags">
                <span>WhatsApp</span>
                <span>Formulários</span>
                <span>Integrações</span>
              </div>
            </article>
          </div>

          <div className="pillars-closing">
            <span>Não sabe quais dessas soluções precisa?</span>

            <a href="#precisa">
              A gente ajuda você a descobrir
              <span aria-hidden="true"> →</span>
            </a>
          </div>
        </div>
      </section>
      </section>



      <section className="pricing-section" id="planos">
        <div className="container">

          <div className="pricing-heading">
            <div>
              <span className="eyebrow">Soluções e investimento</span>

              <h2>
                Comece com o que seu
                <span> negócio precisa agora.</span>
              </h2>
            </div>

            <p>
              Projetos com escopo claro, investimento transparente
              e espaço para crescer conforme sua empresa evolui.
            </p>
          </div>

          <div className="pricing-grid pricing-grid-five">

            <article className="price-card">
              <div className="price-card-top">
                <span className="price-type">Para começar</span>
                <h3>Landing Page</h3>

                <p>
                  Uma página focada em apresentar uma oferta,
                  serviço, produto ou campanha.
                </p>
              </div>

              <div className="price-value">
                <span>R$</span>
                <strong>1.390</strong>
              </div>

              <span className="price-note">investimento inicial</span>

              <ul>
                <li>1 página profissional</li>
                <li>Formulário de contato</li>
                <li>Integração com WhatsApp</li>
                <li>SEO básico</li>
                <li>Layout responsivo</li>
              </ul>

              <div className="price-delivery">
                Prazo estimado: <strong>5 a 7 dias úteis</strong>
              </div>

              <a href="#precisa" className="price-link">
                Quero uma Landing Page
                <span aria-hidden="true"> →</span>
              </a>
            </article>

            <article className="price-card price-card-featured">
              <div className="price-badge">Mais procurado</div>

              <div className="price-card-top">
                <span className="price-type">Para sua empresa</span>
                <h3>Site Institucional</h3>

                <p>
                  Uma presença profissional para apresentar
                  sua empresa, serviços e diferenciais.
                </p>
              </div>

              <div className="price-value">
                <span>R$</span>
                <strong>2.690</strong>
              </div>

              <span className="price-note">investimento inicial</span>

              <ul>
                <li>Até 5 páginas</li>
                <li>Formulário de contato</li>
                <li>Integração com WhatsApp</li>
                <li>SEO básico</li>
                <li>Analytics</li>
              </ul>

              <div className="price-delivery">
                Prazo estimado: <strong>10 a 15 dias úteis</strong>
              </div>

              <a href="#precisa" className="price-link">
                Quero meu site
                <span aria-hidden="true"> →</span>
              </a>
            </article>

            <article className="price-card">
              <div className="price-card-top">
                <span className="price-type">Para crescer</span>
                <h3>Site Profissional</h3>

                <p>
                  Mais conteúdo, autonomia e estrutura para
                  empresas que precisam ir além do básico.
                </p>
              </div>

              <div className="price-value">
                <span>R$</span>
                <strong>4.290</strong>
              </div>

              <span className="price-note">investimento inicial</span>

              <ul>
                <li>Até 10 páginas</li>
                <li>Blog ou área de conteúdo</li>
                <li>Gerenciamento de conteúdo</li>
                <li>SEO e Analytics</li>
                <li>Recursos adicionais</li>
              </ul>

              <div className="price-delivery">
                Prazo estimado: <strong>15 a 20 dias úteis</strong>
              </div>

              <a href="#precisa" className="price-link">
                Quero um site profissional
                <span aria-hidden="true"> →</span>
              </a>
            </article>

            <article className="price-card">
              <div className="price-card-top">
                <span className="price-type">Para apresentar produtos</span>
                <h3>Catálogo Digital</h3>

                <p>
                  Organize seus produtos para consulta e receba
                  pedidos ou contatos diretamente pelo WhatsApp.
                </p>
              </div>

              <div className="price-value price-value-from">
                <small>a partir de</small>
                <div>
                  <span>R$</span>
                  <strong>4.990</strong>
                </div>
              </div>

              <span className="price-note">
                conforme volume e necessidade
              </span>

              <ul>
                <li>Produtos e categorias</li>
                <li>Busca e filtros</li>
                <li>Páginas de produtos</li>
                <li>Contato pelo WhatsApp</li>
                <li>Sem checkout online</li>
              </ul>

              <div className="price-delivery">
                Prazo estimado: <strong>15 a 25 dias úteis*</strong>
              </div>

              <a href="#precisa" className="price-link">
                Quero um catálogo digital
                <span aria-hidden="true"> →</span>
              </a>
            </article>

            <article className="price-card">
              <div className="price-card-top">
                <span className="price-type">Para vender online</span>
                <h3>Loja Virtual</h3>

                <p>
                  Uma estrutura completa para apresentar produtos,
                  receber pagamentos e administrar pedidos.
                </p>
              </div>

              <div className="price-value price-value-from">
                <small>a partir de</small>
                <div>
                  <span>R$</span>
                  <strong>8.900</strong>
                </div>
              </div>

              <span className="price-note">
                conforme escopo da operação
              </span>

              <ul>
                <li>Produtos e categorias</li>
                <li>Checkout e pagamento</li>
                <li>Configuração de frete</li>
                <li>Gestão de pedidos</li>
                <li>Gestão de estoque</li>
              </ul>

              <div className="price-delivery">
                Prazo estimado: <strong>25 a 40 dias úteis*</strong>
              </div>

              <a href="#precisa" className="price-link">
                Quero vender online
                <span aria-hidden="true"> →</span>
              </a>
            </article>

          </div>

          <p className="pricing-scope-note">
            * Prazos de Catálogo Digital e Loja Virtual podem variar
            conforme volume e complexidade. Integrações adicionais,
            como sistemas de gestão, marketplaces, emissão fiscal ou
            regras comerciais específicas, são avaliadas separadamente.
          </p>

          <div className="continuity-box" id="continuidade">
            <div className="continuity-copy">
              <span className="eyebrow">Continuidade opcional</span>

              <h3>
                Planos de continuidade
                <span> a partir de R$ 129/mês</span>
              </h3>

              <p>
                Mantenha seu projeto atualizado, monitorado e com
                suporte quando precisar.
              </p>
            </div>

            <div className="continuity-prices">
              <div>
                <span>Landing Page</span>
                <strong>R$ 129/mês</strong>
              </div>

              <div>
                <span>Site Institucional</span>
                <strong>R$ 199/mês</strong>
              </div>

              <div>
                <span>Site Profissional</span>
                <strong>R$ 279/mês</strong>
              </div>

              <div>
                <span>Catálogo Digital</span>
                <strong>R$ 279/mês</strong>
              </div>

              <div>
                <span>Loja Virtual</span>
                <strong>R$ 449/mês</strong>
              </div>
            </div>

            <div className="continuity-optional">
              <strong>Prefere não contratar um plano mensal?</strong>

              <p>
                Sem problema. Seu projeto pode ser contratado sem
                recorrência. Serviços futuros de manutenção,
                alterações e suporte ficam disponíveis sob consulta
                e orçamento.
              </p>
            </div>
          </div>

          <div className="pricing-process-link">
            <span>
              Quer saber o que acontece depois que você escolhe?
            </span>

            <a href="#como-funciona">
              Entenda como funciona o processo
              <span aria-hidden="true"> →</span>
            </a>
          </div>

          <div id="falar-projeto" className="pricing-lead-form">
            <LeadQualificationForm />
          </div>

        </div>
      </section>

      <section className="process-section" id="como-funciona">
        <div className="container">

          <div className="process-heading">
            <div>
              <span className="eyebrow">Como funciona</span>

              <h2>
                Como funciona,
                <span> do início ao ar.</span>
              </h2>
            </div>

            <p>
              Sem surpresas: veja o que esperar em cada etapa,
              independente do plano escolhido.
            </p>
          </div>

          <div className="process-grid">

            <article className="process-step">
              <div className="process-number">01</div>

              <div className="process-content">
                <span>Primeiro passo</span>
                <h3>Briefing rápido</h3>

                <p>
                  Entendemos seu negócio, seu objetivo e suas
                  referências visuais em uma conversa de até
                  30 minutos — sem burocracia.
                </p>
              </div>
            </article>

            <article className="process-step">
              <div className="process-number">02</div>

              <div className="process-content">
                <span>Nossa parte</span>
                <h3>Produção</h3>

                <p>
                  Nossa equipe cuida do design e desenvolvimento.
                  Você acompanha o andamento e recebe atualizações
                  pelo WhatsApp.
                </p>
              </div>
            </article>

            <article className="process-step">
              <div className="process-number">03</div>

              <div className="process-content">
                <span>Sua avaliação</span>
                <h3>Revisão e ajustes</h3>

                <p>
                  Você recebe o site para avaliação e solicita
                  os ajustes necessários, dentro do número de
                  rodadas incluído no seu plano.
                </p>
              </div>
            </article>

            <article className="process-step">
              <div className="process-number">04</div>

              <div className="process-content">
                <span>Publicação</span>
                <h3>Entrega e continuidade</h3>

                <p>
                  Site no ar, com treinamento rápido de uso.
                  Depois, você decide se quer seguir com um plano
                  de manutenção para manter tudo atualizado e seguro.
                </p>
              </div>
            </article>

          </div>

          <div className="process-plan-heading">
            <span className="eyebrow">O que muda em cada opção</span>

            <h3>
              Prazos, revisões e acompanhamento
              <span> de acordo com seu projeto.</span>
            </h3>
          </div>

          <div className="plan-detail-grid">

            <article className="plan-detail-card">
              <div className="plan-detail-top">
                <span>Landing Page</span>
                <strong>R$ 1.390</strong>
              </div>

              <dl>
                <div>
                  <dt>Prazo estimado</dt>
                  <dd>5 a 7 dias úteis</dd>
                </div>

                <div>
                  <dt>Revisões inclusas</dt>
                  <dd>1 rodada</dd>
                </div>

                <div>
                  <dt>Comunicação</dt>
                  <dd>WhatsApp</dd>
                </div>

                <div>
                  <dt>Pós-entrega</dt>
                  <dd>
                    Site publicado e funcional. Continuidade
                    opcional por R$ 129/mês.
                  </dd>
                </div>
              </dl>
            </article>

            <article className="plan-detail-card">
              <div className="plan-detail-top">
                <span>Site Institucional</span>
                <strong>R$ 2.690</strong>
              </div>

              <dl>
                <div>
                  <dt>Prazo estimado</dt>
                  <dd>10 a 15 dias úteis</dd>
                </div>

                <div>
                  <dt>Revisões inclusas</dt>
                  <dd>2 rodadas</dd>
                </div>

                <div>
                  <dt>Comunicação</dt>
                  <dd>WhatsApp + atualizações por e-mail</dd>
                </div>

                <div>
                  <dt>Pós-entrega</dt>
                  <dd>
                    Treinamento básico de edição de conteúdo.
                    Continuidade opcional por R$ 199/mês.
                  </dd>
                </div>
              </dl>
            </article>

            <article className="plan-detail-card">
              <div className="plan-detail-top">
                <span>Site Profissional</span>
                <strong>R$ 4.290</strong>
              </div>

              <dl>
                <div>
                  <dt>Prazo estimado</dt>
                  <dd>15 a 20 dias úteis</dd>
                </div>

                <div>
                  <dt>Revisões inclusas</dt>
                  <dd>3 rodadas</dd>
                </div>

                <div>
                  <dt>Comunicação</dt>
                  <dd>
                    WhatsApp + e-mail + 1 call de alinhamento
                  </dd>
                </div>

                <div>
                  <dt>Pós-entrega</dt>
                  <dd>
                    Treinamento de conteúdo e configuração de
                    SEO/Analytics. Continuidade opcional por
                    R$ 279/mês.
                  </dd>
                </div>
              </dl>
            </article>

            <article className="plan-detail-card">
              <div className="plan-detail-top">
                <span>Catálogo Digital</span>
                <strong>A partir de R$ 4.990</strong>
              </div>

              <dl>
                <div>
                  <dt>Prazo estimado</dt>
                  <dd>15 a 25 dias úteis*</dd>
                </div>

                <div>
                  <dt>Revisões inclusas</dt>
                  <dd>3 rodadas</dd>
                </div>

                <div>
                  <dt>Comunicação</dt>
                  <dd>
                    WhatsApp + e-mail + alinhamento inicial
                  </dd>
                </div>

                <div>
                  <dt>Pós-entrega</dt>
                  <dd>
                    Treinamento de gestão de produtos.
                    Continuidade opcional por R$ 279/mês.
                  </dd>
                </div>
              </dl>
            </article>

            <article className="plan-detail-card">
              <div className="plan-detail-top">
                <span>Loja Virtual</span>
                <strong>A partir de R$ 8.900</strong>
              </div>

              <dl>
                <div>
                  <dt>Prazo estimado</dt>
                  <dd>25 a 40 dias úteis*</dd>
                </div>

                <div>
                  <dt>Revisões inclusas</dt>
                  <dd>3 rodadas</dd>
                </div>

                <div>
                  <dt>Comunicação</dt>
                  <dd>
                    WhatsApp + e-mail + alinhamento inicial e final
                  </dd>
                </div>

                <div>
                  <dt>Pós-entrega</dt>
                  <dd>
                    Treinamento de produtos, pedidos e operação
                    inicial. Continuidade opcional por R$ 449/mês.
                  </dd>
                </div>
              </dl>
            </article>

          </div>

          <p className="process-disclaimer">
            * Prazos podem variar conforme volume e complexidade.
            Integrações adicionais com sistemas de gestão,
            marketplaces, emissão fiscal ou regras comerciais
            específicas são avaliadas e orçadas separadamente.
          </p>

        </div>
      </section>
    </main>
  );
}