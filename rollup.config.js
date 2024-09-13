import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';



export default {
    input: 'src/index.ts',
    output: {
        file: 'dist/index.js',
        format: 'esm',
    },
    plugins: [
        resolve(),
        commonjs(),
        typescript(),
        postcss(),
        svgr({icon : true}),
        url({
            include: ['**/*.svg'],
            limit: 0,
            fileName: 'assets/[name][extname]',
          }),
    ],
    external: ['react', 'react-dom']
};
