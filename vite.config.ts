import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'
import globby from 'globby'

const resolve = (dir: string) => path.join(__dirname, dir)

const multipleEntryPaths = globby
    .sync([path.join('src', 'pages', '*', 'index.html')], {
        cwd: process.cwd(),
    })
    .reduce((result, pathStr) => {
        const entryName = path.parse(pathStr).dir.split('/').pop()
        return {
            ...result,
            [entryName]: path.resolve(__dirname, pathStr),
        }
    }, {})

export default {
    plugins: [createVuePlugin()],
    resolve: {
        alias: {
            '@': resolve('src'),
        },
    },
    base: process.env.NODE_ENV === 'production' ? './' : '',
    build: {
        rollupOptions: {
            input: multipleEntryPaths,
        },
    },

    server: {
        proxy: {
            // 字符串简写写法
            '^/proxyMockApi': {
                target: 'http://localhost:1024',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/proxyMockApi/, ''),
            },
        },
    },
}
