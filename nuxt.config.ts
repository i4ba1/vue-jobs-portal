// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt'
  ],
  
  css: [
    'vuestic-ui/css',
    '@/assets/styles/main.scss'  // Make sure this path is correct
  ],

  build: {
    transpile: ['vuestic-ui']
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/_variables.scss" as *;
          `
        }
      }
    },
    optimizeDeps: {
      exclude: ['vuestic-ui']
    }
  },

  plugins: [
    'plugins/vuestic-ui.ts'
  ]
});