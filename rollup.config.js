import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

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
    ],
    external: ['react', 'react-dom']
};
