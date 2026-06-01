import { defineConfig } from "vite";

export default defineConfig({
  publicDir: "src/assets", // copied verbatim to dist root; ./glints.webp -> /glints.webp
  server: { port: 9000 }, // preserve the current `npm run dev` port
  build: { outDir: "dist" }, // unchanged -> Netlify/Vercel publish dir stays "dist"
});
