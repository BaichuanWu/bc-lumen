import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  const rs = {
    plugins: [react()],
    
  }

  if (command === 'serve') {
    // dev 模式 → example 文件夹
    return {
      ...rs,
      root: 'examples',        // 指定 dev 根目录
      server: { port: 3000 }
    }
  } else {
    // build 模式 → 库打包
    return {
      ...rs,
      build: {
        lib: {
          entry: 'src/index.ts',
          name: 'BcLumen',
          fileName: () => `index.js`
        },
        rollupOptions: {
          external: ['react', 'react-dom']
        }
      }
    }
  }
})