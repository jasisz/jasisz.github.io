import { defineConfig } from 'astro/config';
import { createRequire } from 'module';
import { readFileSync } from 'fs';

const averGrammar = JSON.parse(
  readFileSync(new URL('./src/aver.tmLanguage.json', import.meta.url), 'utf-8')
);

export default defineConfig({
  site: 'https://jasisz.github.io',
  output: 'static',
  build: {
    format: 'directory'
  },
  trailingSlash: 'never',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      langs: [
        {
          ...averGrammar,
          aliases: ['aver']
        }
      ]
    }
  }
});
