# Task 05 — Hero e figura científica autoral

## Objetivo

Criar um hero institucional forte, com proposta de valor imediata, CTA para conversa e uma figura científica abstrata baseada em estimativas e intervalos de incerteza.

## Dependências

- Task 03 — Sistema visual.
- Task 04 — Estrutura e navegação.

## Escopo

- Implementar título, apoio e CTA “Solicitar conversa”.
- Criar uma visualização autoral que comunique rigor e incerteza sem representar dados reais, pacientes, clientes ou resultados.
- Se houver animação, isolá-la em um Client Component pequeno, sem dependências pesadas.
- Restringir animações a `transform` e `opacity`.
- Fornecer alternativa estática para `prefers-reduced-motion`.
- Evitar mudanças de layout durante carregamento.
- Garantir que a figura seja decorativa ou tenha uma descrição acessível adequada à sua função.

## Entregáveis

- Hero final responsivo.
- Figura científica autoral e comportamento de movimento reduzido.
- CTA principal ligado ao fluxo de contato.

## Critérios de aceite

- A proposta de valor e o próximo passo são compreendidos acima da dobra nos principais tamanhos.
- A figura não pode ser interpretada como evidência ou dado real.
- Com redução de movimento ativada, não ocorre animação não essencial.
- O componente interativo, se existir, não exige biblioteca adicional nem amplia desnecessariamente o bundle.
- Não há layout shift perceptível na carga.

## Validação final da task

1. Verificar o hero em 375, 768, 1024 e 1440px, incluindo orientação horizontal.
2. Ativar `prefers-reduced-motion: reduce` e confirmar a versão estática.
3. Inspecionar o JavaScript entregue e confirmar que somente o comportamento da figura foi hidratado, se necessário.
4. Rodar uma auditoria de performance e verificar ausência de CLS relevante causado pelo hero.
5. A task está concluída quando conteúdo, figura, acessibilidade e comportamento responsivo passam por essas verificações.

