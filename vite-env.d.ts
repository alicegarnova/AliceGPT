/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GPT_KEY: string
  // добавьте другие переменные окружения здесь...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}