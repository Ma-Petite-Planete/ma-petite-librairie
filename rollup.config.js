import svgr from '@svgr/rollup';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
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
    svgr({ exportType: 'named', jsxRuntime: 'automatic' }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
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
