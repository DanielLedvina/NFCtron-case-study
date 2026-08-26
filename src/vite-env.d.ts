/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NFCTRON_EMAIL?: string;
  readonly VITE_NFCTRON_PASSWORD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
