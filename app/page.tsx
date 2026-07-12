import Image from "next/image";
import Link from "next/link";
import { createPageMetadata } from "./site-metadata";

export function generateMetadata() {
  return createPageMetadata({
    title: "Apoio metodológico e estatístico para pesquisas em saúde",
    description: "Apoio a pesquisadores e equipes de saúde no desenho, planejamento, análise, interpretação e comunicação de estudos.",
    path: "/",
  });
}

const navItems = [
  ["Quando ajudamos", "#quando-ajudamos"],
  ["Jornada", "#jornada"],
  ["Métodos", "#mapa-metodologico"],
  ["Processo", "#processo"],
  ["Quem somos", "#responsaveis"],
  ["Perguntas", "#faq"],
] as const;

const journey = [
  ["Desenho", "Traduzimos a pergunta em objetivos, desfechos e um desenho de estudo coerente."],
  ["Planejamento", "Definimos variáveis, instrumentos, amostragem e um plano de análise antes de olhar para os resultados."],
  ["Banco de dados", "Orientamos a estrutura, a documentação, a verificação e o preparo dos dados para análise."],
  ["Análise", "Selecionamos e aplicamos métodos de acordo com a pergunta, o desenho, as características dos dados e as premissas envolvidas."],
  ["Interpretação", "Contextualizamos estimativas, incertezas, limitações e a diferença entre associação, predição e causalidade."],
  ["Comunicação", "Organizamos tabelas, figuras e texto técnico para que métodos e achados possam ser compreendidos e verificados."],
] as const;

const questionGroups = [
  ["Frequência e prevalência", "Estimativas de ocorrência em uma população, com atenção à amostragem, ao período de referência e à incerteza."],
  ["Comparação entre grupos", "Diferenças entre grupos ou condições, considerando o desenho, a distribuição dos dados e fatores que podem influenciar a comparação."],
  ["Associação e efeito", "Relações entre exposições e desfechos, com medidas adequadas à pergunta e interpretação compatível com o desenho do estudo."],
  ["Dados longitudinais e repetidos", "Mudanças ao longo do tempo e observações correlacionadas dentro da mesma pessoa, serviço ou grupo."],
  ["Tempo até evento", "Tempo até a ocorrência de um desfecho, incluindo seguimento incompleto e diferenças de risco ao longo do período observado."],
  ["Diagnóstico e propriedades de medida", "Desempenho de testes, concordância, confiabilidade, validade e capacidade de detectar mudanças de instrumentos."],
  ["Predição e machine learning", "Desenvolvimento e avaliação de modelos preditivos, com separação clara entre desempenho aparente, validação e uso pretendido."],
  ["Síntese de evidências e meta-análise", "Combinação criteriosa de evidências, considerando comparabilidade, heterogeneidade e incerteza entre estudos."],
  ["Avaliação econômica em saúde", "Comparação de custos e consequências entre alternativas, conforme a perspectiva, o horizonte de tempo e as fontes de evidência."],
] as const;

const researchPaths = [
  {
    title: "Estudo diagnóstico",
    question: "O teste distingue ou mede o que a pesquisa precisa?",
    context: "O desenho, a população, o padrão de referência e a forma de coleta delimitam o que pode ser avaliado.",
    strategy: "A estratégia é definida depois desse enquadramento e pode abordar desempenho, concordância, confiabilidade ou validade, conforme o objetivo.",
  },
  {
    title: "Coorte longitudinal",
    question: "Como um desfecho muda ou ocorre durante o seguimento?",
    context: "Número e momento das medições, perdas de seguimento e relações entre exposições e desfechos orientam a leitura do desenho.",
    strategy: "Só então são discutidas formas de representar mudança, dependência entre observações, tempo até evento e incerteza.",
  },
  {
    title: "Revisão sistemática",
    question: "O que o conjunto de estudos permite concluir sobre uma pergunta delimitada?",
    context: "Critérios de elegibilidade, comparabilidade dos estudos, risco de viés e disponibilidade de resultados vêm antes da combinação numérica.",
    strategy: "A meta-análise é considerada quando a síntese quantitativa for justificável; em outros contextos, o percurso é registrado sem forçar uma combinação.",
  },
] as const;

const studyDesigns = [
  "Estudos transversais",
  "Coortes",
  "Estudos caso-controle",
  "Ensaios clínicos",
  "Estudos diagnósticos",
  "Validação de instrumentos",
  "Revisões sistemáticas e meta-análises",
  "Avaliações econômicas em saúde",
] as const;

const deliverables = [
  ["Acompanhamento consultivo", "Conversas de alinhamento e revisão para apoiar decisões metodológicas, estatísticas e de interpretação ao longo do projeto."],
  ["Relatório reprodutível", "Registro organizado do fluxo analítico, com métodos, decisões, resultados e elementos necessários para conferência e atualização."],
  ["Tabelas e figuras prontas para publicação", "Materiais claros e consistentes, preparados para integrar manuscritos ou apresentações e acompanhados da orientação necessária para sua leitura."],
] as const;

const faqs = [
  ["Que tipo de apoio vocês oferecem?", "Apoio metodológico e estatístico para pesquisas em saúde, do desenho à comunicação. O escopo pode incluir planejamento, organização do banco, análise, interpretação, relatório reprodutível e tabelas e figuras prontas para publicação. Não oferecemos análise qualitativa."],
  ["Em que momento devo entrar em contato?", "Você pode entrar em contato desde a formulação da pergunta até a preparação dos resultados. Quando possível, envolver o apoio antes da coleta ajuda a alinhar desenho, variáveis e plano de análise; pesquisas em andamento também podem ser avaliadas a partir do que já foi definido e coletado."],
  ["O que recebo ao final do apoio?", "As entregas combinam acompanhamento consultivo, relatório reprodutível e tabelas e figuras prontas para publicação. O conteúdo e o formato são definidos conforme a pergunta, o estágio da pesquisa e o escopo acordado."],
  ["Como as informações da pesquisa são tratadas?", "Dados, documentos e informações compartilhados são tratados de forma confidencial. Antes de qualquer troca de material, alinhamos o que é necessário, quem terá acesso e qual canal será usado."],
  ["Como funciona o apoio à distância?", "O acompanhamento pode ocorrer por reuniões remotas e canais acordados para comunicação e compartilhamento seguro de materiais. Etapas, responsabilidades e pontos de revisão são definidos no início e ajustados quando o projeto exigir."],
  ["Vocês garantem um achado significativo ou a publicação do estudo?", "Não. A atuação busca adequação metodológica, transparência e interpretação responsável. Resultados dependem da pergunta, do desenho, dos dados e de outros fatores da pesquisa; decisões editoriais pertencem aos periódicos."],
] as const;

const whatsappMessage = encodeURIComponent("Olá, gostaria de conversar sobre apoio metodológico e estatístico para uma pesquisa em saúde.");
const professionalProfiles = {
  caioLinkedIn: "https://www.linkedin.com/in/caiosainvallio/",
  caioScholar: "https://scholar.google.com/scholar?q=%22Caio+Sain+Vallio%22",
  vitorLinkedIn: "https://www.linkedin.com/in/vitor-vallio/",
  vitorLattesSearch: "https://www.google.com/search?q=site%3Alattes.cnpq.br+%22Vitor+Sain+Vallio%22",
} as const;

function NavigationLinks() {
  return (
    <>
      {navItems.map(([label, href]) => <a href={href} key={href}>{label}</a>)}
      <a className="nav-cta" href="#contato">Solicitar conversa</a>
    </>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo principal</a>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Metropolis Analytics — início">
          <Image src="/logo-metropolis.png" alt="" width={42} height={42} priority />
          <span>Metropolis <strong>Analytics</strong></span>
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal"><NavigationLinks /></nav>
        <details className="mobile-nav">
          <summary>Menu <span aria-hidden="true">+</span></summary>
          <nav aria-label="Navegação principal para dispositivos móveis"><NavigationLinks /></nav>
        </details>
      </header>

      <main id="conteudo">
        <section className="hero section section--wide" id="inicio" aria-labelledby="titulo-inicio">
          <div className="hero-copy">
            <h1 id="titulo-inicio">Apoio metodológico e estatístico para pesquisas em saúde</h1>
            <p className="lead">Da pergunta científica à comunicação dos achados, ajudamos pesquisadores e equipes a tomar decisões coerentes, documentadas e compreensíveis em cada etapa do estudo.</p>
            <a className="button button-primary" href="#contato">Solicitar conversa</a>
            <p className="microcopy">Conte brevemente em que etapa está sua pesquisa. A conversa começa no WhatsApp, sem formulário neste site.</p>
          </div>
          <figure className="hero-figure" aria-labelledby="hero-figure-caption">
            <div className="uncertainty-figure" aria-hidden="true">
              <span className="uncertainty-reference" />
              <span className="uncertainty-row uncertainty-row--a"><i /></span>
              <span className="uncertainty-row uncertainty-row--b"><i /></span>
              <span className="uncertainty-row uncertainty-row--c"><i /></span>
              <span className="uncertainty-row uncertainty-row--d"><i /></span>
              <span className="uncertainty-row uncertainty-row--e"><i /></span>
            </div>
            <figcaption id="hero-figure-caption">
              <strong>Estimativas existem com incerteza.</strong>
              <span>Composição conceitual, sem dados reais: pontos e intervalos abstratos representam a importância de explicitar limites.</span>
            </figcaption>
          </figure>
        </section>

        <section className="section" id="quando-ajudamos" aria-labelledby="titulo-quando">
          <div className="section-heading"><h2 id="titulo-quando">Quando vale procurar apoio</h2><p>O melhor momento depende da decisão que está diante de você. Podemos contribuir antes da coleta, durante a organização do estudo ou quando os dados e resultados já precisam ser analisados e comunicados.</p></div>
          <div className="three-column-list">
            <article><h3>Ao transformar uma ideia em estudo</h3><p>Para delimitar a pergunta, alinhar objetivos, desfechos e desenho e antecipar o que será necessário para responder à pesquisa.</p></article>
            <article><h3>Antes ou durante a coleta</h3><p>Para planejar variáveis, instrumentos, tamanho da amostra, estrutura do banco e rotinas de controle de qualidade.</p></article>
            <article><h3>Na análise e na comunicação</h3><p>Para definir uma estratégia compatível com os dados, interpretar estimativas e incertezas e preparar resultados claros para manuscritos, apresentações ou decisões da equipe.</p></article>
          </div>
          <p className="microcopy">Se uma decisão metodológica pode afetar as próximas etapas, conversar cedo costuma ampliar as opções disponíveis.</p>
        </section>

        <section className="section surface-section" id="jornada" aria-labelledby="titulo-jornada">
          <div className="section-heading"><h2 id="titulo-jornada">Apoio ao longo de toda a jornada da pesquisa</h2><p>As etapas se conectam: uma escolha feita no início influencia o banco, a análise e o que poderá ser concluído ao final. O acompanhamento mantém essas decisões alinhadas ao longo do estudo.</p></div>
          <ol className="journey-list">{journey.map(([title, text], index) => <li key={title}><span aria-hidden="true">{index + 1}</span><article><h3>{title}</h3><p>{text}</p></article></li>)}</ol>
        </section>

        <section className="section" id="mapa-metodologico" aria-labelledby="titulo-mapa">
          <div className="section-heading"><h2 id="titulo-mapa">O método começa pela pergunta</h2><p>Não existe uma técnica certa isolada do contexto. Primeiro esclarecemos o que a pesquisa quer responder; depois consideramos o desenho, os dados disponíveis e as premissas para definir a estratégia de análise.</p></div>
          <div className="method-intro" aria-label="Relação entre pergunta, desenho e método">
            <p><strong>Pergunta</strong><span>define o que precisa ser compreendido</span></p>
            <p><strong>Desenho e dados</strong><span>delimitam o que pode ser concluído</span></p>
            <p><strong>Estratégia</strong><span>é escolhida com premissas e limites explícitos</span></p>
          </div>
          <div className="method-list">{questionGroups.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
          <aside className="bayesian-note" aria-labelledby="titulo-bayes">
            <h3 id="titulo-bayes">Métodos bayesianos atravessam o mapa</h3>
            <p>São uma abordagem que pode ser considerada em diferentes perguntas quando suas premissas e sua forma de expressar incerteza forem adequadas ao estudo — não uma solução automática.</p>
          </aside>
          <div className="pathways" aria-labelledby="titulo-percursos">
            <div className="pathways-heading"><h3 id="titulo-percursos">Três percursos, decisões diferentes</h3><p>Os exemplos mostram como o contexto muda a conversa. Eles não prescrevem uma técnica.</p></div>
            {researchPaths.map((path) => (
              <article key={path.title}>
                <h3>{path.title}</h3>
                <dl>
                  <div><dt>Pergunta</dt><dd>{path.question}</dd></div>
                  <div><dt>Desenho e contexto</dt><dd>{path.context}</dd></div>
                  <div><dt>Como ajudamos</dt><dd>{path.strategy}</dd></div>
                </dl>
              </article>
            ))}
          </div>
          <p className="microcopy">Os exemplos orientam a conversa; a escolha final depende do contexto e não é automática.</p>
        </section>

        <section className="section section--compact surface-section" id="desenhos" aria-labelledby="titulo-desenhos">
          <div className="section-heading"><h2 id="titulo-desenhos">Desenhos de estudo com os quais trabalhamos</h2><div><p>O desenho organiza como a pergunta será respondida; ele não determina sozinho a análise. Trabalhamos com oito famílias de estudos, sempre considerando o estágio e as decisões já tomadas.</p><p>Em cada desenho, o escopo é definido a partir da pergunta e do estágio da pesquisa. <strong>Não oferecemos análise qualitativa.</strong></p></div></div>
          <ul className="design-list">{studyDesigns.map((design) => <li key={design}>{design}</li>)}</ul>
        </section>

        <section className="section" id="processo" aria-labelledby="titulo-processo">
          <div className="section-heading"><h2 id="titulo-processo">Um processo próximo, com decisões que podem ser revisitadas</h2><p>Começamos entendendo a pergunta, o desenho e o estágio atual da pesquisa. Em seguida, combinamos prioridades, responsabilidades e pontos de revisão. As escolhas são discutidas e registradas durante o processo, e as entregas são apresentadas com seus pressupostos e limites.</p></div>
          <div className="deliverables" aria-label="Três entregas complementares">{deliverables.map(([title, text], index) => <article key={title}><span aria-hidden="true">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
          <p className="microcopy">As três entregas se complementam e são ajustadas ao escopo combinado para a pesquisa.</p>
          <a className="button button-primary" href="#contato">Solicitar conversa</a>
        </section>

        <section className="section surface-section" id="principios" aria-labelledby="titulo-principios">
          <div className="section-heading"><h2 id="titulo-principios">Rigor que aparece no modo de trabalhar</h2><p>A confiança é construída por práticas verificáveis, não por exposição de projetos. O conteúdo compartilhado na conversa inicial e durante a consultoria é tratado de forma confidencial e usado apenas para conduzir o escopo acordado.</p></div>
          <div className="principles-list">
            <article><h3>Decisões documentadas</h3><p>Registramos escolhas, mudanças e justificativas relevantes ao percurso analítico.</p></article>
            <article><h3>Reprodutibilidade</h3><p>Estruturamos o fluxo para que procedimentos e resultados possam ser conferidos e, quando necessário, atualizados.</p></article>
            <article><h3>Adequação metodológica</h3><p>Escolhemos métodos em função da pergunta, do desenho e dos dados, explicitando premissas e limitações.</p></article>
            <article><h3>Comunicação compreensível</h3><p>Explicamos conceitos e resultados em linguagem compatível com a equipe, sem ocultar a complexidade que importa.</p></article>
            <article><h3>Confidencialidade</h3><p>Preservamos dados, documentos e informações do projeto e alinhamos formas seguras de compartilhamento conforme a necessidade.</p></article>
          </div>
          <p className="microcopy">Saiba como o site e os canais externos tratam informações na <Link href="/privacidade">Política de Privacidade</Link>.</p>
        </section>

        <section className="section" id="responsaveis" aria-labelledby="titulo-responsaveis">
          <div className="section-heading"><h2 id="titulo-responsaveis">Quem conduz o apoio</h2><p>O contato é direto com os profissionais responsáveis pelo apoio metodológico e estatístico.</p></div>
          <div className="bio-list">
            <article>
              <h3>Caio Sain Vallio</h3>
              <p>Doutor em Fisioterapia, pesquisador e autor ou coautor de publicações sobre epidemiologia, modelagem e ciência de dados em saúde.</p>
              <nav className="profile-links" aria-label="Perfis profissionais de Caio Sain Vallio">
                <a href={professionalProfiles.caioLinkedIn} target="_blank" rel="noopener noreferrer">LinkedIn de Caio Sain Vallio <span className="sr-only">(abre em nova aba)</span></a>
                <a href={professionalProfiles.caioScholar} target="_blank" rel="noopener noreferrer">Publicações de Caio Sain Vallio no Google Acadêmico <span className="sr-only">(busca pública, abre em nova aba)</span></a>
              </nav>
            </article>
            <article>
              <h3>Vitor Sain Vallio</h3>
              <p>Mestre em Ciências da Saúde e cientista de dados com experiência em análise epidemiológica e modelagem estatística.</p>
              <nav className="profile-links" aria-label="Perfis profissionais de Vitor Sain Vallio">
                <a href={professionalProfiles.vitorLinkedIn} target="_blank" rel="noopener noreferrer">LinkedIn de Vitor Sain Vallio <span className="sr-only">(abre em nova aba)</span></a>
                <a href={professionalProfiles.vitorLattesSearch} target="_blank" rel="noopener noreferrer">Buscar Currículo Lattes de Vitor Sain Vallio <span className="sr-only">(busca pública restrita ao Lattes, abre em nova aba)</span></a>
              </nav>
            </article>
          </div>
        </section>

        <section className="section surface-section" id="faq" aria-labelledby="titulo-faq">
          <h2 id="titulo-faq">Perguntas frequentes</h2>
          <div className="faq-list">{faqs.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}</div>
        </section>

        <section className="section contact" id="contato" aria-labelledby="titulo-contato">
          <div className="section-heading"><h2 id="titulo-contato">Vamos conversar sobre sua pesquisa</h2><p>Escolha com quem deseja iniciar a conversa. A mensagem do WhatsApp já estará preenchida; acrescente, se quiser, a etapa atual do estudo e a principal dúvida da equipe.</p></div>
          <div className="contact-list">
            <article><h3>Conversar com Caio</h3><a className="button button-primary" href={`https://wa.me/5511980158332?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">Solicitar conversa <span className="sr-only">com Caio Sain Vallio no WhatsApp (abre em nova aba)</span></a></article>
            <article><h3>Conversar com Vitor</h3><a className="button button-primary" href={`https://wa.me/5511957163477?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">Solicitar conversa <span className="sr-only">com Vitor Sain Vallio no WhatsApp (abre em nova aba)</span></a></article>
          </div>
          <p className="microcopy">O link abre o WhatsApp em um serviço externo. Nenhuma mensagem é enviada automaticamente.</p>
          <p className="microcopy">Respondemos assim que possível para entender a pesquisa e avaliar se o apoio está dentro do nosso escopo.</p>
        </section>
      </main>

      <footer className="site-footer">
        <Link className="brand" href="/" aria-label="Metropolis Analytics — início"><Image src="/logo-metropolis.png" alt="" width={38} height={38} /><span>Metropolis <strong>Analytics</strong></span></Link>
        <p>Apoio metodológico e estatístico para pesquisas em saúde.</p>
        <nav className="footer-links" aria-label="Navegação do rodapé">
          <Link className="footer-link" href="/privacidade">Privacidade</Link>
          <a className="footer-link" href="#inicio">Voltar ao topo ↑</a>
        </nav>
      </footer>
    </>
  );
}
