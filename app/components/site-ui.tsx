"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavItem = readonly [label: string, href: string];

export function SiteHeader({ items = [], home = false, ctaHref = "#contato" }: { items?: readonly NavItem[]; home?: boolean; ctaHref?: string }) {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

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

  // Escape e clique fora: só escutam enquanto o menu está aberto.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      headerRef.current?.querySelector<HTMLButtonElement>(".nav-toggle")?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const external = ctaHref.startsWith("http");
  const ctaProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <header className="site-header">
      <div className="wrap site-header-inner" ref={headerRef}>
        <Link className="brand" href={home ? "#inicio" : "/"} aria-label="Metropolis Analytics — início" onClick={() => setOpen(false)}>
          <Image src="/logo-metropolis.png" alt="" width={40} height={40} priority unoptimized />
          <span>Metropolis <strong>Analytics</strong></span>
        </Link>

        {items.length ? (
          <>
            <nav className="nav-desktop" aria-label="Navegação principal">
              {items.map(([label, href]) => (
                <a href={href} key={href} aria-current={active === href ? "location" : undefined}>{label}</a>
              ))}
              <a className="nav-cta" href={ctaHref} {...ctaProps}>
                Conversar sobre sua pesquisa
                <span className="sr-only"> com Caio Sain Vallio no WhatsApp (abre em nova aba)</span>
              </a>
            </nav>

            <button className="nav-toggle" type="button" aria-expanded={open} aria-controls="menu-mobile" onClick={() => setOpen((value) => !value)}>
              Menu <span className="nav-toggle-icon" aria-hidden="true" />
            </button>

            <nav className="nav-mobile" id="menu-mobile" data-open={open ? "true" : "false"} aria-label="Navegação principal">
              {items.map(([label, href]) => (
                <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>
              ))}
              <a className="nav-cta" href={ctaHref} {...ctaProps} onClick={() => setOpen(false)}>
                Conversar sobre sua pesquisa
                <span className="sr-only"> com Caio Sain Vallio no WhatsApp (abre em nova aba)</span>
              </a>
            </nav>
          </>
        ) : (
          <Link className="header-back" href="/">Voltar à página inicial</Link>
        )}
      </div>
    </header>
  );
}

export function Faq({ items }: { items: readonly (readonly [string, string])[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {items.map(([question, answer], index) => (
        <article className="faq-item" key={question}>
          <h3>
            <button className="faq-trigger" type="button" aria-expanded={open === index} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(open === index ? -1 : index)}>
              {question}
              <span className="faq-sign" aria-hidden="true">{open === index ? "−" : "+"}</span>
            </button>
          </h3>
          <div className="faq-answer" id={`faq-answer-${index}`} hidden={open !== index}>
            <p>{answer}</p>
          </div>
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
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("[data-reveal]").forEach((element) => element.classList.add("is-revealed"));
      return;
    }
    const elements = [...document.querySelectorAll("[data-reveal]")];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-revealed"); observer.unobserve(entry.target); } });
    }, { rootMargin: "0px 0px -10%", threshold: 0.08 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
