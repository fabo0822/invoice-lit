import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // Usar rutas relativas para evitar problemas de carga de recursos
  build: {
    outDir: "dist", // Carpeta de salida que Netlify usará
    sourcemap: true, // Opcional, útil para depurar
  },

    server: {
        host: env.VITE_HOST,
        port: env.VITE_PORT,
    },
  });