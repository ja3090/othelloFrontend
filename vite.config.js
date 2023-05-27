import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";
import svgr from "vite-plugin-svgr";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
});
