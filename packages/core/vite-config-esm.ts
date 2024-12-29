import { defineConfig } from "vite";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";

const COM_NMAE = [
    "Button",
    "ButtonGroup",
    "Icon"
]

export default defineConfig({
  plugins: [vue(), dts({
    tsconfigPath: '../../tsconfig.build.json',
    outDir: 'dist/types'
  })],
  build: {
    outDir: 'dist/esm',
    lib: {
        entry: resolve(__dirname, './index.ts'),
        name: "PlayElement",
        fileName: 'index',
        formats: ['es']
    },
    rollupOptions: {
        external: [
            'vue',
            "@fortawesome/fontawesome-svg-core",
            "@fortawesome/free-solid-svg-icons",
            "@fortawesome/vue-fontawesome",
            "@popperjs/core",
            "async-validator",
        ],
        output: {
            assetFileNames: (assetInfo) => {
                console.log(assetInfo.names, 27)
                if (assetInfo.name === 'style.css') return 'index.css'
                return  assetInfo.name  as string
            },
            manualChunks: (id) => {
                if (id.includes('node_modules')) {
                    return 'vendor'
                }
                if (id.includes('/packages/hook')) {
                    return 'hooks'
                }
                if (id.includes('/packages/utils')) {
                    return 'utils'
                }
                // for (const item of COM_NMAE) {
                //     if (id.includes(`/packages/components/${item}`)) {
                //         return item
                //     }
                // }
            }
        }
    }
  }
});
