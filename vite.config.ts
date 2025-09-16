import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,png,jpg,svg}"],
      },
      manifest: {
        short_name: "Note App",
        name: "Note App",
        display: "standalone",
        icons: [
          {
            src: "/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
        id: "/",
        start_url: "/",
        background_color: "#3367D6",
        scope: "/",
        theme_color: "#3367D6",
        description: "Note App Information",
        screenshots: [
          {
            src: "/web-app-manifest-512x512.png",
            type: "image/png",
            sizes: "512x512",
            form_factor: "narrow",
          },
          {
            src: "/320.png",
            type: "image/png",
            sizes: "320x320",
            form_factor: "wide",
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
});
