import svgr from '@svgr/rollup';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import { babel } from '@rollup/plugin-babel';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm',
    exports: 'named',
  },
  plugins: [
    typescript(),
    commonjs(),
    resolve(),
    image(),
    svgr({
      exportType: 'named',
      svgProps: {},
    }),
    postcss(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'],
    }),
  ],
  external: ['react', 'react-dom'],
};
