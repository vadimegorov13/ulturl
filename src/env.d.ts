interface ImportEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_ADMIN_PROJECT_ID: string;
  readonly VITE_ADMIN_CLIENT_EMAIL: string;
  readonly VITE_ADMIN_PRIVATE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportEnv;
}
