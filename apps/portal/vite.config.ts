import vinext from "vinext";
import { defineConfig } from "vite";

// Portal placeholder (Etapa 2). Sem bindings de banco/arquivo: a autenticação e
// o Supabase entram na Etapa 3. Mantém o mesmo runtime (vinext sobre Workers)
// que o site, para provar a estrutura do monorepo com dois apps reais.

// macOS Seatbelt bloqueia FSEvents, então previews em sandbox precisam de polling.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";

const localBindingConfig = {
  main: "./worker/index.ts",
  compatibility_flags: ["nodejs_compat"],
  d1_databases: [],
  r2_buckets: [],
};

export default defineConfig(async () => {
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  const { cloudflare } = await import("@cloudflare/vite-plugin");

  return {
    // Porta própria para poder rodar site (3000) e portal ao mesmo tempo.
    server: {
      port: 3001,
      ...(isCodexSeatbeltSandbox
        ? { watch: { useFsEvents: false, usePolling: true } }
        : {}),
    },
    plugins: [
      vinext(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: localBindingConfig,
      }),
    ],
  };
});
