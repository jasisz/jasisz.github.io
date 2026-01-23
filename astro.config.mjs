import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://jasisz.github.io',
  output: 'static',
  build: {
    format: 'directory'
  },
  trailingSlash: 'never',
  markdown: {
    shikiConfig: {
      theme: 'github-light'
    }
  }
});
