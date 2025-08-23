// API base URL config
// Use import.meta.env for Vite projects, fallback to localhost
// Vite global type for import.meta.env
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_BASE_URL?: string;
    [key: string]: any;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
// Usage:
// Set VITE_ENV=PRODUCTION, LOCAL, or STAGING in your .env files
// Set VITE_API_BASE_PRODUCTION_URL, VITE_API_BASE_LOCAL_URL,
// VITE_API_BASE_STAGING_URL accordingly
const env = import.meta.env.VITE_ENV;
let API_BASE_URL = "";
if (env === "PRODUCTION") {
  API_BASE_URL = import.meta.env.VITE_API_BASE_PRODUCTION_URL;
} else if (env === "STAGING") {
  API_BASE_URL = import.meta.env.VITE_API_BASE_STAGING_URL;
} else if (env === "LOCAL") {
  API_BASE_URL = import.meta.env.VITE_API_BASE_LOCAL_URL;
}
export default API_BASE_URL;
