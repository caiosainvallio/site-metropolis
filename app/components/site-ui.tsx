"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavItem = readonly [label: string, href: string];

export function SiteHeader({ items = [], home = false, ctaHref = "#contato" }: { items?: readonly NavItem[]; home?: boolean; ctaHref?: string }) {
  const [active, setActive] = useState("");
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const ids = items.map(([, href]) => href).filter((href) => href.startsWith("#"));
    const elements = ids.map((id) => document.querySelector(id)).filter(Boolean) as Element[];
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-18% 0px -62%", threshold: [0, 0.2, 0.5] },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [items]);

  const closeMenu = () => menuRef.current?.removeAttribute("open");

  return (
    <header className="site-header">
      <Link className="brand" href={home ? "#inicio" : "/"} aria-label="Metropolis Analytics — início" onClick={closeMenu}>
        <Image src="/logo-metropolis.png" alt="" width={42} height={42} priority unoptimized />
        <span>Metropolis <strong>Analytics</strong></span>
      </Link>
      {items.length ? (
        <>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {items.map(([label, href]) => <a href={href} key={href} aria-current={active === href ? "location" : undefined}>{label}</a>)}
            <a className="nav-cta" href={ctaHref} target={ctaHref.startsWith("http") ? "_blank" : undefined} rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}>Conversar sobre sua pesquisa</a>
          </nav>
          <details className="mobile-nav" ref={menuRef}>
            <summary>Menu <span aria-hidden="true">+</span></summary>
            <nav aria-label="Navegação principal para dispositivos móveis">
              {items.map(([label, href]) => <a href={href} key={href} onClick={closeMenu}>{label}</a>)}
              <a className="nav-cta" href={ctaHref} target={ctaHref.startsWith("http") ? "_blank" : undefined} rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined} onClick={closeMenu}>Conversar sobre sua pesquisa</a>
            </nav>
          </details>
        </>
      ) : <Link className="header-back" href="/">Voltar à página inicial</Link>}
    </header>
  );
}

const journey = [
  { title: "Pergunta", text: "Começamos pelo que a pesquisa precisa responder e pelo que já está definido." },
  { title: "Decisões", text: "Conectamos desenho, variáveis e métodos para tornar cada escolha explícita e verificável." },
  { title: "Resultados", text: "Interpretamos e comunicamos os achados sem separar a análise das decisões que a sustentam." },
] as const;

export function ResearchJourney() {
  const [current, setCurrent] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (paused || reducedMotion.matches) return;
    const interval = window.setInterval(() => {
      setCurrent((step) => (step + 1) % journey.length);
    }, 2000);
    return () => window.clearInterval(interval);
  }, [paused]);

  const selectWithKeyboard = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!(["ArrowLeft", "ArrowRight", "Home", "End"] as string[]).includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? journey.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + journey.length) % journey.length;
    setCurrent(next);
    document.getElementById(`journey-tab-${next}`)?.focus();
  };
  return (
    <div
      className="journey"
      aria-label="Etapas do acompanhamento da pesquisa"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="journey-track" role="tablist" aria-label="Linha de raciocínio da pesquisa">
        {journey.map((step, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={current === index}
            tabIndex={current === index ? 0 : -1}
            aria-controls={`journey-panel-${index}`}
            id={`journey-tab-${index}`}
            className={current === index ? "is-active" : ""}
            onClick={() => setCurrent(index)}
            onKeyDown={(event) => selectWithKeyboard(event, index)}
            key={step.title}
          >
            <span aria-hidden="true">{index + 1}</span>{step.title}
          </button>
        ))}
      </div>
      <div className="journey-panel" role="tabpanel" id={`journey-panel-${current}`} aria-labelledby={`journey-tab-${current}`}>
        <p>{journey[current].text}</p>
        <span>{current + 1} de {journey.length}</span>
      </div>
    </div>
  );
}

export function Faq({ items }: { items: readonly (readonly [string, string])[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {items.map(([question, answer], index) => (
        <article className={open === index ? "is-open" : ""} key={question}>
          <h3>
            <button type="button" aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? -1 : index)}>
              {question}<span aria-hidden="true">{open === index ? "−" : "+"}</span>
            </button>
          </h3>
          <div className="faq-answer" id={`faq-answer-${index}`} hidden={open !== index}><p>{answer}</p></div>
        </article>
      ))}
    </div>
  );
}

export function ReadingNav({ items }: { items: readonly NavItem[] }) {
  const [active, setActive] = useState(items[0]?.[1] ?? "");
  useEffect(() => {
    const elements = items.map(([, href]) => document.querySelector(href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver((entries) => {
      const current = entries.find((entry) => entry.isIntersecting);
      if (current) setActive(`#${current.target.id}`);
    }, { rootMargin: "-22% 0px -68%" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [items]);
  return <nav className="reading-nav" aria-label="Nesta página">{items.map(([label, href]) => <a href={href} key={href} aria-current={active === href ? "location" : undefined}>{label}</a>)}</nav>;
}

export function RevealController() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const elements = [...document.querySelectorAll("[data-reveal]")];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-revealed"); observer.unobserve(entry.target); } });
    }, { rootMargin: "0px 0px -10%", threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
