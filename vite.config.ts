import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      // injectRegister: "auto",  //
      strategies: "injectManifest",
      srcDir: "src",
      filename: "sw.js",
      injectManifest: {
        globPatterns: ["**/*.{js,css,html,png,jpg,svg}"],
      },
      manifest: {
        short_name: "SWAI",
        name: "SWAI.AI",
        display: "standalone",
        icons: [
          {
            src: "/SWAILogo192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/SWAILogo512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
        id: "/",
        start_url: "/",
        background_color: "#30D5C8",
        scope: "/",
        theme_color: "#30D5C8",
        description: "Revenue Co-pilot",
        screenshots: [
          {
            src: "/SWAILogo512x512.png",
            type: "image/png",
            sizes: "512x512",
            form_factor: "narrow",
          },
          {
            src: "/SWAILogo320x320.png",
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
