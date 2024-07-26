import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'i3v5jg',
  e2e: {
    baseUrl: "http://localhost:8080",
  },

  chromeWebSecurity: false,

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
