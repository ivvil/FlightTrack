/// <reference types="astro/client" />
interface ImportMetaEnv {
  readonly AIRPORT_DATA_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
