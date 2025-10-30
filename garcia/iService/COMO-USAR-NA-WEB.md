# iService - Como usar na web

## ⚠️ PROBLEMA: Tela branca

**Este projeto precisa ser buildado, não funciona abrindo o index.html diretamente!**

Se você está vendo tela branca é porque:
- Está abrindo `index.html` diretamente no navegador (file://)
- Não fez o build do projeto (`npm run build`)
- Não instalou as dependências (`npm install`)

## ✅ SOLUÇÕES

### 1. Para desenvolvimento local:
```bash
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev
```
Abra http://localhost:8080

### 2. Para publicar na web:
```bash
# Instalar dependências  
npm install
          
# Fazer build para produção
npm run build
```
Isso cria uma pasta `dist/` com arquivos prontos para web.

> Importante:
- Foi adicionado `base: './'` em `vite.config.ts` para gerar caminhos relativos no build.
- Removemos `<base href="/">` do `index.html` para não forçar caminhos absolutos.
- Assim, o site funciona mesmo quando hospedado em subpastas (ex.: GitHub Pages).

## 🌐 Como hospedar na web

### Netlify (Mais fácil)
1. Vá em [netlify.com](https://netlify.com)
2. Arraste a pasta **do projeto inteiro** (não só o index.html)
3. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Vercel
1. Conecte seu GitHub ao [vercel.com](https://vercel.com)
2. Import o repositório
3. Deploy automático (detecta Vite)

### GitHub Pages
1. Faça `npm run build` localmente
2. Suba o conteúdo da pasta `dist/` para a branch `gh-pages`
3. Ative o GitHub Pages apontando para a branch `gh-pages` (pasta root)

### Outros hosts (Surge, etc.)
1. Faça `npm run build` localmente
2. Faça upload da pasta `dist/` (não a raiz do projeto)

## 🔧 Arquivos alterados

- `src/App.tsx`: Mudou de BrowserRouter para HashRouter (URLs ficam /#/market, /#/profile)
- `public/_redirects`: Arquivo para Netlify redirecionar rotas SPA
- `public/404.html`: Fallback para outros hosts

## ⚡ Teste rápido

Para testar se está funcionando:
```bash
npm install && npm run build && npm run preview
```

Se funcionar no preview, funcionará na web após upload da pasta `dist/`.