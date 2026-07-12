const Arrow = () => <span aria-hidden="true">↗</span>;

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Metropolis Analytics — início">
          <img src="/logo-metropolis.png" alt="" width="42" height="42" />
          <span>Metropolis <strong>Analytics</strong></span>
        </a>
        <nav aria-label="Navegação principal">
          <a href="#servicos">Serviços</a>
          <a href="#processo">Como trabalhamos</a>
          <a href="#trabalhos">Trabalhos</a>
        </nav>
        <a className="header-cta" href="#trabalhos">Conheça nosso trabalho <Arrow /></a>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Consultoria metodológica e estatística</p>
          <h1>Método claro.<br /><em>Evidência sólida.</em></h1>
          <p className="hero-lead">
            Apoiamos pesquisadores de mestrado e doutorado na área da saúde — do desenho do estudo à interpretação dos resultados.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#servicos">Como podemos ajudar <span aria-hidden="true">↓</span></a>
            <a className="text-link" href="#trabalhos">Ver análises publicadas <Arrow /></a>
          </div>
        </div>

        <div className="analysis-card" aria-label="Representação visual de uma análise estatística">
          <div className="analysis-head">
            <div><span className="mono">PROJETO / 01</span><strong>Estratégia analítica</strong></div>
            <span className="status">● Em desenvolvimento</span>
          </div>
          <div className="metric-row">
            <div><span>DESFECHO</span><strong>Definido</strong></div>
            <div><span>AMOSTRA</span><strong>Dimensionada</strong></div>
            <div><span>MÉTODO</span><strong>Justificado</strong></div>
          </div>
          <div className="chart-wrap">
            <div className="chart-label"><span>ESTIMATIVA AJUSTADA</span><span>IC 95%</span></div>
            <div className="chart" aria-hidden="true">
              <i className="grid-line l1" /><i className="grid-line l2" /><i className="grid-line l3" />
              <div className="bar b1"><span /></div>
              <div className="bar b2"><span /></div>
              <div className="bar b3"><span /></div>
              <div className="bar b4"><span /></div>
              <div className="bar b5"><span /></div>
            </div>
          </div>
          <div className="analysis-foot"><span>Decisões documentadas</span><span>Resultados reprodutíveis</span></div>
        </div>
      </section>

      <section className="credibility" aria-label="Áreas de atuação">
        <span>ESTUDOS OBSERVACIONAIS</span><i />
        <span>ENSAIOS CLÍNICOS</span><i />
        <span>CIÊNCIAS DA SAÚDE</span><i />
        <span>PESQUISA ACADÊMICA</span>
      </section>

      <section className="section services" id="servicos">
        <div className="section-intro">
          <p className="section-number">01 / SERVIÇOS</p>
          <h2>Rigor em cada etapa<br />da pesquisa.</h2>
          <p>Escolha o apoio que o seu projeto precisa agora — ou combine as etapas em um acompanhamento completo.</p>
        </div>
        <div className="service-list">
          <article className="service-card">
            <div className="service-index">01</div>
            <div>
              <h3>Planejamento estatístico</h3>
              <p>Transformamos a pergunta de pesquisa em um plano analítico consistente, antes da coleta ou da análise.</p>
              <ul>
                <li>Definição de desfechos e hipóteses</li>
                <li>Cálculo do tamanho amostral</li>
                <li>Plano de análise e métodos</li>
                <li>Estruturação do banco de dados</li>
              </ul>
            </div>
            <a href="https://rpubs.com/caiosainvallio/nicolle-kayse" target="_blank" rel="noreferrer" aria-label="Ver exemplo de planejamento estatístico"><Arrow /></a>
          </article>
          <article className="service-card featured">
            <div className="service-index">02</div>
            <div>
              <h3>Análise completa</h3>
              <p>Conduzimos a análise de ponta a ponta, com resultados claros, rastreáveis e prontos para discussão científica.</p>
              <ul>
                <li>Tratamento e exploração dos dados</li>
                <li>Modelagem estatística</li>
                <li>Tabelas e visualizações</li>
                <li>Interpretação e relatório reprodutível</li>
              </ul>
            </div>
            <a href="https://rpubs.com/caiosainvallio/anamariagrell" target="_blank" rel="noreferrer" aria-label="Ver exemplo de análise completa"><Arrow /></a>
          </article>
        </div>
      </section>

      <section className="section process" id="processo">
        <div className="process-head"><p className="section-number">02 / COMO TRABALHAMOS</p><h2>Estatística começa com uma boa conversa.</h2></div>
        <div className="steps">
          <article><span>01</span><h3>Entender</h3><p>Começamos pela pergunta, pelo contexto clínico e pelo estágio atual da pesquisa.</p></article>
          <article><span>02</span><h3>Planejar</h3><p>Definimos as decisões metodológicas e tornamos explícito o caminho analítico.</p></article>
          <article><span>03</span><h3>Analisar</h3><p>Aplicamos métodos adequados, documentamos escolhas e verificamos os resultados.</p></article>
          <article><span>04</span><h3>Comunicar</h3><p>Entregamos conclusões compreensíveis, tabelas claras e material reprodutível.</p></article>
        </div>
      </section>

      <section className="section work" id="trabalhos">
        <div className="work-copy">
          <p className="section-number">03 / TRABALHOS</p>
          <h2>Veja o rigor<br />na prática.</h2>
          <p>Nossos relatórios deixam visíveis o raciocínio, as escolhas metodológicas e os resultados — não apenas a resposta final.</p>
        </div>
        <div className="work-list">
          <a href="https://rpubs.com/caiosainvallio/nicolle-kayse" target="_blank" rel="noreferrer"><span><small>PLANEJAMENTO ESTATÍSTICO</small>Plano de análise e dimensionamento amostral</span><Arrow /></a>
          <a href="https://rpubs.com/caiosainvallio/anamariagrell" target="_blank" rel="noreferrer"><span><small>ANÁLISE COMPLETA</small>Da exploração dos dados ao relatório final</span><Arrow /></a>
        </div>
      </section>

      <section className="closing">
        <p className="eyebrow"><span /> Metropolis Analytics</p>
        <h2>Sua pesquisa merece<br />uma análise à altura.</h2>
        <p>Conheça nossos trabalhos e converse conosco sobre o próximo passo do seu projeto.</p>
        <a className="button button-light" href="https://rpubs.com/caiosainvallio" target="_blank" rel="noreferrer">Explorar portfólio <Arrow /></a>
      </section>

      <footer><div className="brand"><img src="/logo-metropolis.png" alt="" width="38" height="38" /><span>Metropolis <strong>Analytics</strong></span></div><p>Consultoria metodológica e estatística para pesquisa em saúde.</p><a href="#inicio">Voltar ao topo ↑</a></footer>
    </main>
  );
}
