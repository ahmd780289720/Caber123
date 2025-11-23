import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // CRITICAL: Base must be './' for relative linking in all environments (Android/Web)
  base: './', 
  define: {
    // وهذا ضروري لمنع الأخطاء عند تشغيل التطبيق على الهاتف لأن process غير موجودة في المتصفح
    'process.env': {}
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsDir: 'assets',
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
});