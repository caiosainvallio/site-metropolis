# Design System — Landing page Metropolis Analytics

Base extraída da identidade de referência (Hydrotec Engenharia de Irrigação),
traduzida para as cores oficiais da Metropolis.

**Princípio condutor:** a pessoa que chega nesta página está avaliando se pode
confiar dados de pesquisa — muitas vezes sensíveis, muitas vezes o trabalho de
anos — a dois desconhecidos. Cada decisão visual abaixo existe para reduzir
risco percebido: legibilidade alta, nenhuma surpresa, nenhum truque de urgência,
sempre dizendo o que acontece antes de acontecer.

---

## O que a referência realmente ensina

Antes de copiar, vale nomear o que faz aquela identidade funcionar:

1. **Campos sólidos e grandes de uma cor escura.** O verde quase preto ocupa
   metade da composição, sem textura e sem sombra. A autoridade vem da área
   sólida, não de ornamento.
2. **Composição em duas metades.** Imagem de um lado, cor sólida com texto do
   outro. Repete-se no outdoor, no cartão e nos slides.
3. **Um tom médio da mesma família como superfície secundária.** O verde-sálvia
   carrega pastas, caixas e capas — nunca é usado só como detalhe.
4. **Ausência quase total de sombra e de arredondamento.** As bordas são retas.
   A profundidade vem de fotografia real de papel, não de `box-shadow`.
5. **Documento técnico como estética.** A planta de irrigação cotada na última
   imagem é tratada como peça de marca. Rigor exposto, não escondido.
6. **Degradê apenas fotográfico e tonal.** Ver seção de Cores.

Os itens 1, 2, 4 e 5 são diretamente transferíveis. O item 5 é o mais valioso
para vocês: mostrar o artefato técnico (tabela, figura, trecho de relatório
reprodutível) é a prova de competência que substitui os depoimentos que o
`conteudo-homepage.md` proíbe.

---

## 1. Cores

### 1.1 Tokens

Mantidas as cores oficiais já em uso. Dois tokens novos, marcados como **novo**,
para cumprir os papéis que a referência exige e que a paleta atual não cobre.

```css
:root {
  /* Ação */
  --color-brand:        #0066cc;  /* azul Metropolis — ação, link, foco */
  --color-brand-hover:  #0058b0;
  --color-brand-active: #004991;

  /* Campos escuros sólidos */
  --color-brand-deep:   #073b6b;  /* painel escuro — papel do verde-quase-preto */
  --color-navy:         #183247;  /* títulos */

  /* Superfícies */
  --color-surface:        #ffffff;
  --color-surface-subtle: #f3f7fa;  /* lavagem quase imperceptível */
  --color-brand-tint:     #a8c6e2;  /* NOVO — painel claro, papel do sálvia */
  --color-brand-soft:     #eaf4ff;  /* realce de estado, não painel */

  /* Texto */
  --color-text:       #243746;
  --color-text-muted: #526674;
  --color-on-brand:   #ffffff;

  /* Bordas */
  --color-border:        #cbd8e1;
  --color-border-strong: #90a7b7;

  /* Semânticos */
  --color-success: #18734c;
  --color-error:   #b3261e;   /* NOVO — validação de formulário */
  --color-focus:   #0066cc;
}
```

**Por que `--color-brand-tint` é novo e necessário.** O sálvia `#A9C1A5` da
referência é um tom médio: sustenta uma pasta inteira, uma caixa, meia página de
outdoor. O `#eaf4ff` atual é claro demais para esse papel — vira um cinza
azulado quando ocupa área grande. `#a8c6e2` é o análogo azul na mesma faixa de
luminosidade.

### 1.2 Proporção de uso

A referência é disciplinada nisso. Alvo por página:

| Cor | Proporção | Onde |
| --- | --- | --- |
| Branco + `surface-subtle` | ~70% | fundo de leitura |
| `brand-deep` | ~15% | 1 ou 2 painéis sólidos (CTA final, faixa de destaque) |
| `brand-tint` | ~10% | 1 painel claro, alternando ritmo |
| `brand` | ~5% | botões, links, foco, numeração |

O azul de ação nunca vira fundo decorativo. Se ele aparece, é porque há algo
para clicar. Essa é a regra que faz o usuário confiar no que é interativo.

### 1.3 Contraste verificado

Calculado sobre os tokens acima:

| Combinação | Razão | Status |
| --- | --- | --- |
| `text` #243746 sobre branco | 12,3:1 | AAA |
| `text-muted` #526674 sobre branco | 6,0:1 | AA |
| `brand` #0066cc sobre branco | 5,6:1 | AA |
| branco sobre `brand` #0066cc | 5,6:1 | AA (botão primário) |
| branco sobre `brand-deep` #073b6b | 10,9:1 | AAA (painel escuro) |
| `text` sobre `brand-tint` #a8c6e2 | 6,9:1 | AA |
| `brand-deep` sobre `brand-tint` | 6,1:1 | AA |

**Regra dura:** nunca texto branco sobre `brand-tint` (1,8:1 — ilegível). O
painel claro é sempre escrito em `navy` ou `brand-deep`.

### 1.4 Degradês — como a referência usa

Levantamento honesto do que existe nas imagens:

- **Hero:** fotografia de campo ao entardecer com *motion blur* horizontal
  pesado. O resultado é uma faixa de luz em bege, verde e azul acinzentado, sem
  nenhum contorno reconhecível. Não é um gradiente CSS — é uma imagem.
- **Capa do catálogo:** lavagem tonal sutil, do sálvia claro para um sálvia
  levemente mais fechado, com textura de linhas horizontais finas por cima.
- **Todo o resto:** cor chapada. Sem exceção.

Regras derivadas:

1. **Tonal, uma família só.** Do azul claro ao azul; nunca azul para verde,
   nunca dois matizes.
2. **Amplitude baixa.** Diferença de luminosidade pequena entre as pontas. O
   degradê deve ser percebido como "luz", não como "efeito".
3. **Nunca atrás de texto corrido.** Só atrás de logotipo, de um título curto ou
   de nada.
4. **Direção horizontal ou diagonal suave**, acompanhando o arraste da luz.
5. **Proibido:** degradê em texto, em botão, em ícone, em borda ou em card.

```css
/* Lavagem de hero — sutil, sem competir com o texto */
--gradient-wash: linear-gradient(105deg, #ffffff 0%, #eaf4ff 45%, #dbe9f7 100%);

/* Painel escuro com profundidade mínima */
--gradient-deep: linear-gradient(160deg, #073b6b 0%, #05304f 100%);
```

### 1.5 A assinatura de listras

O blur do hero produz **linhas horizontais finas** — e é exatamente a
"linha de raciocínio" que o `sistema-visual.md` já define como assinatura da
Metropolis. Vale explorar como textura própria, sobre a lavagem clara:

```css
--texture-rule: repeating-linear-gradient(
  180deg,
  transparent 0 7px,
  color-mix(in srgb, var(--color-brand) 6%, transparent) 7px 8px
);
```

Aplicar com opacidade baixa e **apenas** em faixas sem texto corrido.

---

## 2. Tipografia

### 2.1 A escolha da fonte

A referência usa **Inter** (Light / Regular / Semibold / Bold). O site hoje usa
**Source Sans 3**, mandada pelo `sistema-visual.md`.

**Recomendação: manter Source Sans 3.** O raciocínio do próprio documento de
vocês continua válido — é humanista, foi escolhida por legibilidade em texto
técnico, e trocar por Inter renderia uma diferença marginal ao custo de
retrabalho. Inter é excelente e mais neutra/geométrica; Source Sans 3 é
levemente mais calorosa, o que ajuda numa página cujo objetivo é gerar
confiança pessoal.

Se ainda assim quiserem a crispidez da referência, na ordem de proximidade:
**Inter** → **Instrument Sans** → **Public Sans** → **Geist**. Todas no Google
Fonts ou com licença livre, todas com o mesmo conjunto de pesos.

> **Pendência:** o [docs/_brand.yml](docs/_brand.yml) ainda especifica Open Sans.
> Está desatualizado em relação ao `sistema-visual.md`. Precisa ser corrigido
> para que os relatórios Quarto e o site não divirjam.

### 2.2 Pesos

Quatro pesos, com papéis fixos — a referência é rígida nisso:

| Peso | Uso |
| --- | --- |
| 400 Regular | corpo, parágrafos, respostas de FAQ |
| 600 Semibold | H1, H2, H3 |
| 700 Bold | botões, chapéus, rótulos de destaque |

Light (300) fica **de fora**: fica frágil em corpo pequeno e prejudica quem lê
em tela ruim ou com baixa visão.

### 2.3 Escala

```css
:root {
  --font-size-micro:   0.8125rem;                              /* 13px — legendas */
  --font-size-sm:      0.875rem;                               /* 14px — rótulos, botões */
  --font-size-body:    1.0625rem;                              /* 17px — corpo */
  --font-size-lead:    clamp(1.125rem, 1.04rem + 0.35vw, 1.35rem);
  --font-size-h3:      clamp(1.25rem,  1.15rem + 0.45vw, 1.55rem);
  --font-size-h2:      clamp(2rem,     1.55rem + 1.9vw,  3.25rem);
  --font-size-display: clamp(2.6rem,   1.9rem  + 3.2vw,  4.75rem);
}
```

| Nível | Tamanho | Peso | Entrelinha | Tracking | Medida |
| --- | --- | --- | --- | --- | --- |
| H1 / display | `--font-size-display` | 600 | 1.02 | −0.035em | 14ch |
| H2 | `--font-size-h2` | 600 | 1.1 | −0.025em | 20ch |
| H3 | `--font-size-h3` | 600 | 1.25 | −0.012em | 30ch |
| Lead | `--font-size-lead` | 400 | 1.5 | 0 | 55ch |
| Corpo | `--font-size-body` | 400 | 1.7 | 0 | 70ch |
| Rótulo / botão | `--font-size-sm` | 700 | 1.2 | 0.01em | — |
| Legenda | `--font-size-micro` | 400 | 1.5 | 0 | 60ch |

Duas mudanças em relação ao CSS atual: corpo sobe de 16px para **17px** e a
entrelinha de 1.65 para **1.7** (o `sistema-visual.md` já pedia 1.7). Em página
de venda de serviço técnico, o texto é lido inteiro — 17px reduz esforço sem
parecer ampliado.

### 2.4 Caixa alta — o ponto de atrito

A referência é fortemente caixa-alta: títulos, chapéus e rótulos, tudo. O
`sistema-visual.md` de vocês **rejeita explicitamente** "microetiquetas em caixa
alta" e "etiquetas repetidas em caixa alta".

**Reconciliação proposta:** caixa alta permitida apenas em **títulos de display
grandes** (H1/H2 de painel escuro), onde é escolha de composição e a leitura não
sofre. Proibida em rótulos pequenos, chapéus, botões e navegação — que é onde ela
de fato atrapalha a leitura e onde o documento de vocês estava certo em barrar.

Se a decisão for não usar caixa alta em lugar nenhum, a página não perde nada
essencial. Prefiro isso a abrir exceção.

---

## 3. Componentes

### 3.1 Botões

Retangulares, sem arredondamento, peso 700, alvo mínimo de 48px de altura.

| Variante | Fundo | Texto | Onde |
| --- | --- | --- | --- |
| Primário | `--color-brand` | branco | CTA principal (WhatsApp) |
| Claro | branco | `--color-brand-deep` | CTA dentro de painel escuro |
| Secundário | transparente, borda 1px `--color-border-strong` | `--color-navy` | ação alternativa |
| Texto | — | `--color-brand`, sublinhado | terciário |

```css
.button {
  min-height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.5rem;
  border: 0;
  border-radius: 0;
  font-size: var(--font-size-sm);
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 160ms var(--ease-out),
              color 160ms var(--ease-out);
}
.button:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
}
```

**Regras de confiança**, mais importantes que a aparência:

- Um único CTA primário por seção. Dois botões azuis competindo já lê como
  pressão de venda.
- O rótulo diz o que acontece: "Abrir conversa no WhatsApp", nunca "Enviar" ou
  "Começar agora".
- Toda ação que abre canal externo leva microcopy abaixo dizendo o que será
  aberto e que nada é enviado automaticamente.
- Nenhum estado depende só de cor: hover muda o fundo, foco adiciona anel,
  active escurece.
- Sem contadores regressivos, sem "últimas vagas", sem badge de urgência.

### 3.2 Inputs de formulário

> **Atenção — conflito documental.** A [política de privacidade atual](app/privacidade/page.tsx#L41-L42)
> afirma que "este site não possui formulário, área de cadastro, conta de
> usuário ou envio direto de arquivos". Se a landing passar a ter formulário,
> **essa página precisa ser reescrita antes do lançamento**, incluindo o que é
> coletado, para onde vai e por quanto tempo fica. Publicar formulário com essa
> política no ar é uma contradição que o visitante pode ler como descuido — o
> oposto exato do efeito desejado.

```css
.field { display: grid; gap: 0.5rem; }

.field label {
  color: var(--color-navy);
  font-size: var(--font-size-sm);
  font-weight: 600;
}

.field input,
.field textarea,
.field select {
  min-height: 3rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border-strong);
  border-radius: 0;
  color: var(--color-text);
  background: var(--color-surface);
  font: inherit;
  font-size: var(--font-size-body);
}

.field input:hover { border-color: var(--color-text-muted); }

.field input:focus-visible {
  border-color: var(--color-brand);
  outline: 3px solid var(--color-focus);
  outline-offset: 2px;
}

.field .hint  { color: var(--color-text-muted); font-size: var(--font-size-micro); }
.field .error { color: var(--color-error);      font-size: var(--font-size-micro); font-weight: 600; }

.field input[aria-invalid="true"] { border-color: var(--color-error); border-width: 2px; }
```

Regras:

- **Rótulo sempre visível acima do campo.** Nunca placeholder no lugar de
  rótulo — ele some quando a pessoa digita e quebra quem usa leitor de tela.
- Placeholder só para exemplo de formato, nunca para instrução essencial.
- Erro comunicado por **texto + borda + `aria-invalid`**, nunca só por cor
  vermelha.
- Campo opcional é marcado como "(opcional)"; não marcar os obrigatórios com
  asterisco.
- Peça o mínimo. Cada campo a mais é uma razão a mais para desistir, e num
  contexto de dados de pesquisa, uma pergunta a mais soa como coleta.
- Abaixo do botão de envio, uma linha dizendo o que acontece depois e em quanto
  tempo há resposta.

### 3.3 Cards

A referência quase não usa cards — usa **divisões por linha**. O
`sistema-visual.md` de vocês diz a mesma coisa: "cards só quando forem uma
unidade interativa real".

**Padrão preferencial — bloco separado por régua:**

```css
.block {
  padding-block: var(--space-6);
  border-top: 1px solid var(--color-border);
}
.block:first-child { border-top-color: var(--color-border-strong); }
```

**Card real** (só quando o bloco inteiro é clicável ou expansível):

```css
.card {
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: 0;
  background: var(--color-surface);
  box-shadow: none;
  transition: border-color 160ms var(--ease-out),
              background-color 160ms var(--ease-out);
}
.card:hover {
  border-color: var(--color-brand);
  background: var(--color-surface-subtle);
}
```

Variantes: `--tint` (fundo `--color-brand-tint`, texto `navy`) e `--deep`
(fundo `--color-brand-deep`, texto branco), para reproduzir o contraste de
painéis da referência.

Não usar: grade repetitiva de seis cards iguais, borda lateral colorida de
destaque, ícone decorativo dentro de círculo colorido.

---

## 4. Estética

### 4.1 Arredondamento

A referência é reta em tudo. Só existe curva no papel real.

```css
--radius-none:  0;      /* padrão: botões, inputs, cards, painéis, imagens */
--radius-pill:  999px;  /* apenas numeração circular e avatares */
```

Regra: **zero por padrão.** A única curva do sistema é o círculo completo dos
números de etapa e das fotos de perfil — já presente no CSS atual e coerente com
a referência, que usa o losango do símbolo como único elemento geométrico.

### 4.2 Sombras

Praticamente inexistentes. Profundidade vem de **cor sólida e de régua**, não de
`box-shadow`. O `sistema-visual.md` já proíbe "sombra ampla com borda".

```css
--shadow-none: none;                              /* padrão de tudo */
--shadow-menu: 0 6px 16px rgb(24 50 71 / 0.10);   /* só menu mobile e popover */
```

Elevação se expressa assim, nesta ordem: mudança de cor de fundo → régua de 1px
→ régua de 2px em `--color-brand` → painel sólido escuro. Sombra é o último
recurso e só para camadas que flutuam de verdade sobre o conteúdo.

### 4.3 Espaçamento

Escala de base 4px, com ritmo de seção fluido.

```css
--space-1: 0.25rem;   --space-2: 0.5rem;
--space-3: 0.75rem;   --space-4: 1rem;
--space-5: 1.5rem;    --space-6: 2rem;
--space-7: 3rem;      --space-8: 4rem;
--space-9: 6rem;

--section-compact: clamp(3rem,   2rem + 3vw, 4.5rem);
--section-normal:  clamp(4.5rem, 3rem + 5vw, 8rem);
--section-wide:    clamp(6rem,   4rem + 7vw, 11rem);

--gutter:    clamp(1.25rem, 0.75rem + 2.5vw, 3.75rem);
--container: 80rem;
```

As três cadências (`compact` / `normal` / `wide`) são as que o
`sistema-visual.md` já previa e que o CSS atual nunca implementou — daí a classe
`section--compact` usada em `/privacidade` sem nenhuma regra correspondente.

Ritmo interno:

- Título → texto de apoio: `--space-4`
- Cabeçalho de seção → conteúdo: `--space-8`
- Entre itens de lista: `--space-5`
- Padding interno de painel escuro: `--space-8` vertical, `--gutter` horizontal

Alternar cadências entre seções é o que evita que "minimalista" vire "genérico"
— foi o risco que o próprio `sistema-visual.md` assumiu por escrito.

### 4.4 Movimento

```css
--duration-fast:   160ms;
--duration-medium: 240ms;
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
```

- Só cor, opacidade e transform. Nunca layout.
- Nada se move sozinho na tela sem controle do usuário. Carrossel automático é,
  em página de confiança, um passivo: rouba o controle da leitura.
- `prefers-reduced-motion: reduce` desliga tudo. Já implementado, manter.

### 4.5 Foco e alvos

- Anel de foco: `3px solid var(--color-focus)` com `outline-offset: 3px`, em
  **todos** os elementos interativos. Nunca `outline: none` sem substituto.
- Alvo mínimo 44×44px; 48px nos CTAs principais.
- Espaçamento mínimo de 8px entre alvos adjacentes.
- Ordem de tabulação segue a ordem visual.

---

## 5. Checklist de confiança

Antes de publicar, a página precisa responder sim a todas:

- [ ] Existe um nome, um rosto e uma credencial verificável de quem vai executar.
- [ ] Está dito o que acontece depois do clique, antes do clique.
- [ ] Está dito como os dados de pesquisa serão tratados, sem precisar abrir a política.
- [ ] Nenhum número, prazo ou resultado é afirmado sem poder ser sustentado.
- [ ] Nenhum elemento cria urgência artificial.
- [ ] A página é legível e navegável inteira por teclado.
- [ ] A página é legível com zoom de 200%.
- [ ] Todo estado interativo é perceptível sem depender de cor.
- [ ] A política de privacidade descreve com precisão o que a página faz.

---

## 6. Pendências abertas

1. `_brand.yml` diz Open Sans; `sistema-visual.md` diz Source Sans 3. Reconciliar.
2. `sistema-visual.md` cita marinho `#2c3e50` e superfície `#f4f8fb`; o CSS usa
   `#183247` e `#f3f7fa`. Definir a fonte da verdade.
3. Verde de confirmação `#18734c` está especificado e nunca foi usado. Definir
   se entra (estados de sucesso de formulário) ou sai do sistema.
4. Decidir sobre caixa alta em display — ver 2.4.
5. Decidir se haverá formulário — ver 3.2, com impacto direto na política de privacidade.
