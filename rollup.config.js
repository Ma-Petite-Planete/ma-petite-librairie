import svgr from '@svgr/rollup';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
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
    svgr({
      exportType: 'named', // Exporte les composants SVG avec un nom
      svgProps: {
        // Ici tu peux définir des propriétés par défaut pour les SVG
      },
    }),
    resolve(),
    postcss(),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'],
    }),
  ],
  external: ['react', 'react-dom'],
};
