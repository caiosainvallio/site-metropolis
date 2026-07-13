import Image from "next/image";
import Link from "next/link";
import { createPageMetadata } from "./site-metadata";
import { Faq, ResearchJourney, RevealController, SiteHeader } from "./components/site-ui";

export function generateMetadata() {
  return createPageMetadata({
    title: "Parceria metodológica e estatística para pesquisas em saúde",
    description: "Acompanhamento do planejamento à comunicação dos resultados, com decisões metodológicas claras e análises reprodutíveis.",
    path: "/",
  });
}

const navItems = [
  ["Como ajudamos", "#como-ajudamos"],
  ["Como funciona", "#como-funciona"],
  ["Quem somos", "#quem-somos"],
] as const;

const services = [
  ["Planejar o estudo", "Transformamos a pergunta de pesquisa em objetivos, desfechos, variáveis e um plano de análise coerente."],
  ["Analisar os dados", "Organizamos o banco, selecionamos os métodos e documentamos as decisões para que a análise possa ser conferida."],
  ["Comunicar os resultados", "Apoiamos a interpretação e preparamos tabelas, figuras e texto técnico para manuscritos e apresentações."],
] as const;

const process = [
  ["Entendemos a pesquisa", "Você apresenta a etapa atual, a principal dúvida e o que já foi definido ou coletado."],
  ["Definimos o escopo", "Alinhamos prioridades, responsabilidades, entregas e pontos de revisão antes de começar."],
  ["Trabalhamos em parceria", "As decisões são discutidas e registradas, com acompanhamento até a entrega combinada."],
] as const;

const faqs = [
  ["Em que momento devo entrar em contato?", "Desde a formulação da pergunta até a preparação dos resultados. Quando possível, conversar antes da coleta amplia as opções; pesquisas em andamento também podem ser avaliadas."],
  ["Que tipo de pesquisa vocês atendem?", "Trabalhamos com pesquisas quantitativas em saúde, incluindo estudos observacionais, ensaios, estudos diagnósticos, validação de instrumentos, revisões sistemáticas e avaliações econômicas. Não oferecemos análise qualitativa."],
  ["O que pode fazer parte da entrega?", "O escopo pode combinar acompanhamento consultivo, relatório reprodutível e tabelas e figuras prontas para publicação. O formato depende da pergunta e do estágio do estudo."],
  ["Como os dados da pesquisa são tratados?", "Documentos, dados e informações do projeto são tratados de forma confidencial. Antes do compartilhamento, alinhamos o que é necessário, quem terá acesso e qual canal será usado."],
] as const;

const whatsappMessage = encodeURIComponent(`Olá, gostaria de conversar sobre apoio metodológico e estatístico para uma pesquisa em saúde.

Etapa atual da pesquisa:
Principal dúvida ou necessidade:
Prazo relevante, se houver:`);

const whatsappHref = `https://wa.me/5511980158332?text=${whatsappMessage}`;

const professionalProfiles = {
  caioLinkedIn: "https://www.linkedin.com/in/caiosainvallio/",
  caioScholar: "https://scholar.google.com/scholar?q=%22Caio+Sain+Vallio%22",
  vitorLinkedIn: "https://www.linkedin.com/in/vitor-vallio/",
  vitorLattesSearch: "https://www.google.com/search?q=site%3Alattes.cnpq.br+%22Vitor+Sain+Vallio%22",
} as const;

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo principal</a>
      <SiteHeader items={navItems} home ctaHref={whatsappHref} />
      <RevealController />

      <main id="conteudo">
        <section className="hero section" id="inicio" aria-labelledby="titulo-inicio" data-reveal>
          <div className="hero-copy">
            <p className="hero-context">Para pesquisadores e equipes de pesquisa em saúde</p>
            <h1 id="titulo-inicio">Sua pesquisa precisa de método, análise e direção.</h1>
            <p className="lead">Acompanhamos seu estudo do planejamento à comunicação dos resultados, com decisões claras, análises reprodutíveis e contato direto com quem conduz o apoio.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                Conversar sobre sua pesquisa
                <span className="sr-only"> com Caio Sain Vallio no WhatsApp (abre em nova aba)</span>
              </a>
              <a className="text-link" href="#como-ajudamos">Ver como podemos ajudar</a>
            </div>
            <p className="microcopy">A mensagem abre no WhatsApp com três campos para você completar. Nenhum arquivo precisa ser enviado no primeiro contato.</p>
          </div>
          <div className="hero-journey"><ResearchJourney /><p>Uma parceria contínua evita que decisões isoladas comprometam as etapas seguintes.</p></div>
        </section>

        <section className="section" id="como-ajudamos" aria-labelledby="titulo-ajuda" data-reveal>
          <div className="section-heading">
            <h2 id="titulo-ajuda">Apoio para a decisão que vem agora</h2>
            <p>Você não precisa chegar com o método definido. Começamos pela pergunta, pelo desenho do estudo e pelo que a equipe precisa decidir.</p>
          </div>
          <div className="service-list">
            {services.map(([title, text], index) => (
              <article key={title}>
                <span aria-hidden="true">{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section process-section" id="como-funciona" aria-labelledby="titulo-processo" data-reveal>
          <div className="section-heading">
            <h2 id="titulo-processo">Um processo claro, sem pacote genérico</h2>
            <p>O apoio é ajustado ao estágio da pesquisa. Você sabe o que será feito, por quê e o que receberá ao final.</p>
          </div>
          <ol className="process-list">
            {process.map(([title, text], index) => (
              <li key={title}>
                <span aria-hidden="true">{index + 1}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section" id="quem-somos" aria-labelledby="titulo-equipe" data-reveal>
          <div className="section-heading credentials-heading">
            <h2 id="titulo-equipe">Quem orienta e conduz o apoio</h2>
            <p>O contato é direto com os profissionais responsáveis pelo apoio — da conversa inicial às entregas.</p>
          </div>
          <div className="bio-list">
            <article>
              <p className="role">Pesquisa, epidemiologia e modelagem</p>
              <h3>Caio Sain Vallio</h3>
              <p>Doutor em Fisioterapia, pesquisador e autor ou coautor de publicações em epidemiologia, modelagem e ciência de dados em saúde.</p>
              <nav className="profile-links" aria-label="Perfis profissionais de Caio Sain Vallio">
                <a href={professionalProfiles.caioLinkedIn} target="_blank" rel="noopener noreferrer">LinkedIn <span className="sr-only">de Caio Sain Vallio (abre em nova aba)</span></a>
                <a href={professionalProfiles.caioScholar} target="_blank" rel="noopener noreferrer">Google Acadêmico <span className="sr-only">de Caio Sain Vallio (busca pública, abre em nova aba)</span></a>
              </nav>
            </article>
            <article>
              <p className="role">Ciência de dados e análise estatística</p>
              <h3>Vitor Sain Vallio</h3>
              <p>Mestre em Ciências da Saúde e cientista de dados com experiência em análise epidemiológica e modelagem estatística.</p>
              <nav className="profile-links" aria-label="Perfis profissionais de Vitor Sain Vallio">
                <a href={professionalProfiles.vitorLinkedIn} target="_blank" rel="noopener noreferrer">LinkedIn <span className="sr-only">de Vitor Sain Vallio (abre em nova aba)</span></a>
                <a href={professionalProfiles.vitorLattesSearch} target="_blank" rel="noopener noreferrer">Currículo Lattes <span className="sr-only">de Vitor Sain Vallio (busca pública restrita ao Lattes, abre em nova aba)</span></a>
              </nav>
            </article>
          </div>
        </section>

        <section className="section faq-section" id="faq" aria-labelledby="titulo-faq" data-reveal>
          <div className="section-heading"><h2 id="titulo-faq">Antes de conversar</h2><p>Respostas diretas para saber se o apoio faz sentido para a sua pesquisa.</p></div>
          <Faq items={faqs} />
        </section>

        <section className="section contact" id="contato" aria-labelledby="titulo-contato" data-reveal>
          <div>
            <p className="contact-context">Próximo passo</p>
            <h2 id="titulo-contato">Conte em que ponto está sua pesquisa.</h2>
          </div>
          <div className="contact-action">
            <p>Caio recebe o primeiro contato e avalia com você a demanda, o estágio do estudo e o escopo possível.</p>
            <a className="button button-light" href={whatsappHref} target="_blank" rel="noopener noreferrer">
              Abrir conversa no WhatsApp
              <span className="sr-only"> com Caio Sain Vallio (abre em nova aba)</span>
            </a>
            <small>Nenhuma mensagem é enviada automaticamente.</small>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Link className="brand" href="/" aria-label="Metropolis Analytics — início"><Image src="/logo-metropolis.png" alt="" width={38} height={38} unoptimized /><span>Metropolis <strong>Analytics</strong></span></Link>
        <p>Parceria metodológica e estatística para pesquisas em saúde.</p>
        <nav className="footer-links" aria-label="Navegação do rodapé">
          <Link className="footer-link" href="/privacidade">Política de Privacidade</Link>
          <a className="footer-link" href="#inicio">Voltar ao topo ↑</a>
        </nav>
      </footer>
    </>
  );
}
