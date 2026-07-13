import Image from "next/image";
import Link from "next/link";
import { createPageMetadata } from "../site-metadata";
import { ReadingNav, RevealController, SiteHeader } from "../components/site-ui";

const privacyNav = [
  ["Visita ao site", "#visita"],
  ["Serviços externos", "#terceiros"],
  ["Dados técnicos", "#dados-tecnicos"],
  ["Projetos", "#projetos"],
  ["Solicitações", "#solicitacoes"],
] as const;

export function generateMetadata() {
  return createPageMetadata({
    title: "Política de Privacidade",
    description: "Como a Metropolis Analytics trata informações no site, em canais externos e durante conversas sobre projetos de pesquisa.",
    path: "/privacidade",
  });
}

export default function PrivacyPage() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo principal</a>
      <SiteHeader />
      <RevealController />

      <main id="conteudo" className="privacy-page">
        <section className="section section--compact privacy-intro" aria-labelledby="titulo-privacidade" data-reveal>
          <p className="privacy-kicker">Política de Privacidade</p>
          <h1 id="titulo-privacidade">Privacidade no site e nas conversas</h1>
          <p className="lead">Esta página explica, em linguagem direta, quais informações podem circular quando você visita o site ou inicia uma conversa com a Metropolis Analytics.</p>
          <p className="microcopy">Última atualização: 12 de julho de 2026.</p>
        </section>

        <div className="section section--compact privacy-layout">
          <ReadingNav items={privacyNav} />
          <section className="privacy-content" aria-label="Informações sobre privacidade">
          <article id="visita" data-reveal>
            <h2>Sem formulário próprio</h2>
            <p>Este site não possui formulário, área de cadastro, conta de usuário ou envio direto de arquivos. A visita às páginas públicas não exige que você informe nome, e-mail ou dados da pesquisa à Metropolis Analytics.</p>
          </article>

          <article id="terceiros" data-reveal>
            <h2>Links e serviços de terceiros</h2>
            <p>Os botões de contato abrem o WhatsApp, e os perfis profissionais levam a serviços como LinkedIn, Google Acadêmico, Google e Plataforma Lattes. Esses destinos são externos e podem tratar informações conforme seus próprios termos e políticas. Nenhuma mensagem de WhatsApp é enviada automaticamente ao abrir o link.</p>
          </article>

          <article id="dados-tecnicos" data-reveal>
            <h2>Dados técnicos de hospedagem</h2>
            <p>A infraestrutura que entrega o site pode processar dados técnicos necessários para segurança, disponibilidade e funcionamento, como endereço IP, data e horário do acesso, página solicitada, identificadores do navegador e registros de erro. A extensão e a retenção desses registros dependem da operação da hospedagem e de suas configurações.</p>
            <p>O site não inclui, por iniciativa da Metropolis Analytics, formulário próprio ou ferramenta de análise de audiência destinada a criar um perfil individual do visitante.</p>
          </article>

          <article id="projetos" data-reveal>
            <h2>Conversas e confidencialidade dos projetos</h2>
            <p>Quando você decide entrar em contato, as informações compartilhadas passam pelo canal escolhido. Pedimos que, na conversa inicial, seja enviado apenas o necessário para compreender a demanda. Dados, documentos e informações de projetos recebidos no contexto do apoio são tratados de forma confidencial e usados para conduzir a conversa e o escopo acordado, com acesso alinhado conforme a necessidade.</p>
          </article>

          <article id="solicitacoes" data-reveal>
            <h2>Solicitações sobre privacidade</h2>
            <p>Para perguntar sobre informações compartilhadas com a Metropolis Analytics ou solicitar sua correção ou exclusão, entre em contato diretamente com <a href="https://wa.me/5511980158332" target="_blank" rel="noopener noreferrer">Caio</a> ou <a href="https://wa.me/5511957163477" target="_blank" rel="noopener noreferrer">Vitor</a> pelo WhatsApp. A solicitação será analisada considerando o contexto, o canal utilizado e eventuais necessidades legítimas de registro.</p>
          </article>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <Link className="brand" href="/" aria-label="Metropolis Analytics — início"><Image src="/logo-metropolis.png" alt="" width={38} height={38} unoptimized /><span>Metropolis <strong>Analytics</strong></span></Link>
        <p>Apoio metodológico e estatístico para pesquisas em saúde.</p>
        <Link className="footer-link" href="/">Página inicial</Link>
      </footer>
    </>
  );
}
