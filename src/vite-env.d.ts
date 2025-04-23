/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DOCMEE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
