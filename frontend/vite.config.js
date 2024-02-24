import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    plugins: [react()],
    server: {
        // this ensures that the browser opens upon server start
        open: true,
        // this sets a default port to 8000
        port: 8000,
    },
});
