import Image from "next/image";
import Link from "next/link";
import { createPageMetadata } from "./site-metadata";
import { Faq, RevealController, SiteHeader } from "./components/site-ui";

export function generateMetadata() {
  return createPageMetadata({
    title: "Assessoria metodológica e estatística",
    description: "Acompanhamento do processo, tratamento de dados, relatório reprodutível e interpretação — para mestrado, doutorado, hospitais e empresas.",
    path: "/",
  });
}

const navItems = [
  ["Para quem é", "#para-quem"],
  ["Como ajudamos", "#como-ajudamos"],
  ["Como funciona", "#como-funciona"],
  ["Quem conduz", "#quem-conduz"],
  ["Dúvidas", "#faq"],
] as const;

const audiences = [
  ["Mestrado e doutorado", "Você precisa defender escolhas metodológicas diante de uma banca e traduzir a análise em um capítulo que se sustente. O prazo é real e a orientação nem sempre alcança a parte estatística."],
  ["Hospitais e serviços de saúde", "Há dados assistenciais acumulados e perguntas clínicas legítimas, mas falta quem estruture o banco, escolha o método adequado e transforme isso em evidência apresentável."],
  ["Empresas", "Você tem uma base própria e quer mais do que um painel descritivo — quer saber se o efeito observado se sustenta, com o rigor que uma decisão de negócio exige."],
] as const;

const problems = [
  "O banco de dados chegou bruto, inconsistente e sem documentação de como foi coletado.",
  "O teste estatístico foi escolhido antes de o desenho do estudo estar claro.",
  "A análise ficou pronta, mas ninguém consegue explicar por que aquele método e não outro.",
  "Os resultados existem, e a discussão não sai do lugar.",
  "A banca ou o revisor pediu uma correção metodológica que exigiria refazer tudo.",
  "O software devolveu um número e não há segurança sobre o que ele significa.",
] as const;

const services = [
  ["Acompanhamento do processo", "Estamos junto nas decisões, não apenas na entrega. Cada escolha de desenho, variável ou método é discutida, justificada e registrada — para que você saiba defender o que foi feito, e não apenas reproduzi-lo."],
  ["Tratamento e limpeza dos dados", "Organizamos o banco antes de qualquer análise: inconsistências, valores ausentes, duplicidades, categorias e formatos. Essa etapa é documentada, porque é ela que determina se o resultado é confiável."],
  ["Relatório e análise reprodutível", "Você recebe tabelas, figuras e um relatório com o passo a passo da análise. Reprodutível significa que qualquer pessoa — sua banca, um revisor, um colega — pode conferir como se chegou a cada número."],
  ["Redação e interpretação", "Escrevemos o texto técnico que conecta resultado e significado: o que o dado mostra, o que ele não mostra e quais limites precisam ser declarados. Material pronto para entrar em dissertação, tese, manuscrito ou apresentação."],
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

const journeyStages = [
  ["Desenho", "Qual desenho responde à pergunta e o que ele exige em troca."],
  ["Planejamento", "Objetivos, desfechos, variáveis e plano de análise — definidos antes da coleta sempre que possível."],
  ["Banco de dados", "Estruturação, checagem de inconsistências e documentação do que foi feito."],
  ["Análise", "Método justificado pelo desenho, com código reprodutível."],
  ["Interpretação", "O que o dado mostra, o que não mostra e quais limites declarar."],
  ["Comunicação", "Tabelas, figuras e texto técnico prontos para dissertação, tese ou manuscrito."],
] as const;

const process = [
  ["Conversa inicial", "Você apresenta o estágio da pesquisa, a principal dúvida e o que já foi definido ou coletado. Sem custo e sem compromisso."],
  ["Diagnóstico e escopo", "Avaliamos o material e propomos o que faz sentido: as etapas, as entregas, os prazos e os pontos de revisão. Você aprova antes de começar."],
  ["Execução acompanhada", "A execução avança com contato aberto. As decisões são comunicadas conforme acontecem — você não recebe surpresas no final."],
  ["Entrega e alinhamento", "Você recebe o material acordado e passamos por ele em reunião, com espaço para ajustes e para as dúvidas que aparecem depois."],
] as const;

const faqs = [
  ["Em que momento devo procurar a assessoria?", "Em qualquer um. O contato antes da coleta amplia as opções metodológicas e evita retrabalho, mas pesquisas em andamento — ou já finalizadas e com pedido de correção — também são avaliadas."],
  ["Vocês atendem apenas a área da saúde?", "A experiência da equipe é concentrada em pesquisa quantitativa em saúde, e é aí que entregamos mais. Também atendemos empresas e projetos de outras áreas quando a pergunta é quantitativa e os dados permitem. Não oferecemos análise qualitativa."],
  ["Que tipos de estudo vocês cobrem?", "Estudos observacionais, ensaios clínicos, estudos diagnósticos, validação de instrumentos, revisões sistemáticas com meta-análise e avaliações econômicas em saúde."],
  ["O que exatamente eu recebo?", "Depende do escopo acordado. Pode incluir plano de análise, banco tratado e documentado, relatório reprodutível, tabelas e figuras prontas para publicação e o texto técnico de métodos e resultados. Definimos isso juntos antes de começar."],
  ["Meus dados estão seguros?", "Sim. Dados, documentos e informações de projeto são tratados com confidencialidade. Antes de qualquer compartilhamento, alinhamos o que é necessário enviar, quem terá acesso e por qual canal."],
  ["Vocês assumem a autoria da minha pesquisa?", "Não. A pesquisa é sua. Atuamos como apoio metodológico e estatístico — a condução, as decisões finais e a autoria permanecem com você e sua orientação."],
  ["Quanto tempo leva?", "Varia com o estágio do estudo, o estado do banco e a complexidade da análise. O prazo é estimado no diagnóstico inicial, antes de qualquer compromisso."],
] as const;

const whatsappMessage = encodeURIComponent(`Olá, gostaria de conversar sobre assessoria metodológica e estatística.

Tipo de projeto (mestrado, doutorado, institucional ou empresarial):
Etapa atual:
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
        {/* 1 — Hero */}
        <section className="hero section" id="inicio" aria-labelledby="titulo-hero">
          <div className="wrap">
            <div className="hero-copy">
              <p className="kicker">Assessoria metodológica e estatística</p>
              <h1 id="titulo-hero">Sua pesquisa merece um método que se sustenta.</h1>
              <p className="lead">Da definição da pergunta à interpretação dos resultados, acompanhamos cada decisão do seu estudo — com análise reprodutível, relatório claro e conversas que fazem você entender o próprio dado.</p>
              <div className="hero-actions">
                <a className="button button--primary" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  Conversar sobre sua pesquisa
                  <span className="sr-only"> com Caio Sain Vallio no WhatsApp (abre em nova aba)</span>
                </a>
                <a className="text-link" href="#como-funciona">Ver como funciona</a>
              </div>
              <p className="microcopy">A conversa começa no WhatsApp, sem compromisso e sem necessidade de enviar arquivos no primeiro contato.</p>
            </div>
          </div>
        </section>

        {/* 2 — Para quem é */}
        <section className="section" id="para-quem" aria-labelledby="titulo-para-quem">
          <div className="wrap">
            <div className="section-heading" data-reveal>
              <h2 id="titulo-para-quem">Três situações, o mesmo problema de fundo</h2>
              <p>Os contextos mudam, mas a dificuldade é a mesma: existe um dado, existe uma pergunta e falta a ponte metodológica entre os dois.</p>
            </div>
            <div className="block-list" data-reveal>
              {audiences.map(([title, text]) => (
                <article className="block" key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 3 — O que trava */}
        <section className="section surface-subtle" id="o-que-trava" aria-labelledby="titulo-trava">
          <div className="wrap">
            <div className="section-heading" data-reveal>
              <h2 id="titulo-trava">Onde as pesquisas costumam parar</h2>
              <p>Nenhum desses pontos é falta de esforço. São etapas que exigem um tipo específico de experiência.</p>
            </div>
            <ul className="problem-list" data-reveal>
              {problems.map((problem) => <li key={problem}>{problem}</li>)}
            </ul>
          </div>
        </section>

        {/* 4 — Como ajudamos */}
        <section className="section" id="como-ajudamos" aria-labelledby="titulo-ajuda">
          <div className="wrap">
            <div className="section-heading" data-reveal>
              <h2 id="titulo-ajuda">Assessoria que percorre o estudo inteiro</h2>
              <p>Você não precisa chegar com o método definido. Entramos no ponto em que a pesquisa está e seguimos até onde fizer sentido.</p>
            </div>
            <div className="block-list block-list--stack" data-reveal>
              {services.map(([title, text], index) => (
                <article className="block" key={title}>
                  <p className="block-number" aria-hidden="true">{index + 1}</p>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5 — Cobertura */}
        <section className="section surface-subtle" id="cobertura" aria-labelledby="titulo-cobertura">
          <div className="wrap">
            <div className="section-heading" data-reveal>
              <h2 id="titulo-cobertura">O que a assessoria cobre</h2>
              <p>Dois recortes: os desenhos de estudo que atendemos e as etapas em que podemos entrar. Não oferecemos análise qualitativa.</p>
            </div>

            <div className="coverage" data-reveal>
              <div>
                <h3 id="titulo-desenhos">Desenhos atendidos</h3>
                <ul className="problem-list coverage-designs" aria-labelledby="titulo-desenhos">
                  {studyDesigns.map((design) => <li key={design}>{design}</li>)}
                </ul>
              </div>
              <div>
                <h3 id="titulo-etapas">Etapas do estudo</h3>
                <ol className="process-list" aria-labelledby="titulo-etapas">
                  {journeyStages.map(([title, text], index) => (
                    <li key={title}>
                      <span aria-hidden="true">{index + 1}</span>
                      <div><h4>{title}</h4><p>{text}</p></div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <p className="microcopy">Entramos em qualquer uma dessas etapas, inclusive em pesquisa já iniciada.</p>
          </div>
        </section>

        {/* 6 — Reuniões */}
        <section className="section panel-deep" id="reunioes" aria-labelledby="titulo-reunioes">
          <div className="wrap" data-reveal>
            <p className="kicker">O que nos diferencia</p>
            <h2 id="titulo-reunioes">Reuniões até a explicação ser sua.</h2>
            <p className="lead">Toda entrega vem acompanhada de conversa. Reunimos para percorrer a análise junto com você até que a explicação seja sua, e não nossa. É a diferença entre receber um resultado e conseguir sustentá-lo em uma arguição.</p>
          </div>
        </section>

        {/* 7 — Como funciona */}
        <section className="section" id="como-funciona" aria-labelledby="titulo-processo">
          <div className="wrap">
            <div className="section-heading" data-reveal>
              <h2 id="titulo-processo">Um percurso claro, do primeiro contato à entrega</h2>
              <p>Você sabe o que será feito, por quê e o que receberá ao final — antes de começar.</p>
            </div>
            <ol className="process-list" data-reveal>
              {process.map(([title, text], index) => (
                <li key={title}>
                  <span aria-hidden="true">{index + 1}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 8 — Modalidades */}
        <section className="section section--compact panel-tint" id="modalidades" aria-labelledby="titulo-modalidades">
          <div className="wrap" data-reveal>
            <h2 id="titulo-modalidades">Presencial, remoto ou híbrido</h2>
            <p>O acompanhamento funciona à distância com a mesma qualidade — reuniões por vídeo, material compartilhado e contato direto ao longo do processo. Encontros presenciais são possíveis na região de São Paulo, quando a etapa justificar. A escolha é sua e pode mudar durante o projeto.</p>
          </div>
        </section>

        {/* 9 — Quem conduz */}
        <section className="section" id="quem-conduz" aria-labelledby="titulo-equipe">
          <div className="wrap">
            <div className="section-heading" data-reveal>
              <h2 id="titulo-equipe">Quem conduz a análise</h2>
              <p>O contato é direto com quem executa. Não há camada de intermediação entre você e a análise.</p>
            </div>

            <div className="team-list" data-reveal>
              <article className="team-member">
                <Image className="team-avatar" src="/avatar-caio.jpeg" alt="Retrato de Caio Sain Vallio" width={800} height={800} sizes="(max-width: 48rem) 104px, 144px" unoptimized />
                <div>
                  <p className="team-role">Pesquisa, epidemiologia e modelagem</p>
                  <h3>Caio Sain Vallio</h3>
                  <p>Doutor em Fisioterapia, pesquisador e autor ou coautor de publicações em epidemiologia, modelagem e ciência de dados em saúde.</p>
                  <nav className="profile-links" aria-label="Perfis profissionais de Caio Sain Vallio">
                    <a href={professionalProfiles.caioLinkedIn} target="_blank" rel="noopener noreferrer">LinkedIn <span className="sr-only">de Caio Sain Vallio (abre em nova aba)</span></a>
                    <a href={professionalProfiles.caioScholar} target="_blank" rel="noopener noreferrer">Google Acadêmico <span className="sr-only">de Caio Sain Vallio (busca pública, abre em nova aba)</span></a>
                  </nav>
                </div>
              </article>

              <article className="team-member">
                <Image className="team-avatar" src="/avatar-vitor.jpeg" alt="Retrato de Vitor Sain Vallio" width={800} height={800} sizes="(max-width: 48rem) 104px, 144px" unoptimized />
                <div>
                  <p className="team-role">Ciência de dados e análise estatística</p>
                  <h3>Vitor Sain Vallio</h3>
                  <p>Mestre em Ciências da Saúde e cientista de dados, com experiência em análise epidemiológica e modelagem estatística.</p>
                  <nav className="profile-links" aria-label="Perfis profissionais de Vitor Sain Vallio">
                    <a href={professionalProfiles.vitorLinkedIn} target="_blank" rel="noopener noreferrer">LinkedIn <span className="sr-only">de Vitor Sain Vallio (abre em nova aba)</span></a>
                    <a href={professionalProfiles.vitorLattesSearch} target="_blank" rel="noopener noreferrer">Currículo Lattes <span className="sr-only">de Vitor Sain Vallio (busca pública restrita ao Lattes, abre em nova aba)</span></a>
                  </nav>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 10 — FAQ */}
        <section className="section surface-subtle" id="faq" aria-labelledby="titulo-faq">
          <div className="wrap">
            <div className="section-heading" data-reveal>
              <h2 id="titulo-faq">Antes de conversar</h2>
              <p>Respostas diretas para saber se a assessoria faz sentido para a sua pesquisa.</p>
            </div>
            <div data-reveal><Faq items={faqs} /></div>
          </div>
        </section>

        {/* 11 — CTA final */}
        <section className="section panel-deep cta" id="contato" aria-labelledby="titulo-contato">
          <div className="wrap cta-inner" data-reveal>
            <div>
              <p className="kicker">Próximo passo</p>
              <h2 id="titulo-contato">Conte em que ponto está sua pesquisa.</h2>
            </div>
            <div className="cta-action">
              <p className="lead">Uma conversa inicial costuma ser suficiente para saber se conseguimos ajudar e o que faria sentido no seu caso.</p>
              <a className="button button--light" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                Abrir conversa no WhatsApp
                <span className="sr-only"> com Caio Sain Vallio (abre em nova aba)</span>
              </a>
              <p className="microcopy">Nenhuma mensagem é enviada automaticamente. Você revisa antes de mandar.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <Link className="brand" href="#inicio" aria-label="Metropolis Analytics — início">
            <Image src="/logo-metropolis.png" alt="" width={36} height={36} unoptimized />
            <span>Metropolis <strong>Analytics</strong></span>
          </Link>
          <p>Assessoria metodológica e estatística para pesquisa.</p>
          <nav className="footer-links" aria-label="Navegação do rodapé">
            <Link href="/privacidade">Política de Privacidade</Link>
            <a href="#inicio">Voltar ao topo</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
