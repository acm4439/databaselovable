import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    open: false,
    // Custom startup message
    setupMiddlewares(middlewares, devServer) {
      devServer.httpServer?.once('listening', () => {
        const address = devServer.httpServer.address();
        let local = 'http://localhost:8080';
        let network = '';
        if (typeof address === 'object' && address) {
          const ip = Object.values(require('os').networkInterfaces())
            .flat()
            .find((details) => details && details.family === 'IPv4' && !details.internal)?.address;
          if (ip) network = `http://${ip}:8080`;
        }
        console.log('\n\x1b[36mRun the website locally using:\x1b[0m', local);
        if (network) console.log('\x1b[36mRun the website through the network using:\x1b[0m', network);
        console.log('\x1b[36mTo stop the server, press Ctrl+C.\x1b[0m\n');
      });
      return middlewares;
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

