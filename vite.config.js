import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    base: "/movie-poster/",
    build: {
      outDir: "build",
    },
    plugins: [react()],
  };
});
