import { defineConfig } from 'vite'
import { resolve } from 'path'
export default defineConfig({
  base: '',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        dashboard: resolve(__dirname, 'dashboard/index.html'),
        movimientos: resolve(__dirname, 'movimientos/index.html'),
        crearCuenta: resolve(__dirname, 'crearCuenta/index.html'),
        transferir: resolve(__dirname, 'transferir/index.html')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '/'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@components': resolve(__dirname, 'src/components')
    }
  }
})