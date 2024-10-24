import svgr from '@svgr/rollup';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import url from 'rollup-plugin-url';
import copy from 'rollup-plugin-copy';
import postcssUrl from 'postcss-url';
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
    url({
      limit: 10 * 1024,
      include: ['**/*.png', '**/*.jpg'],
    }),
    svgr({
      exportType: 'named',
      svgProps: {},
    }),
    postcss({
      extract: true,
      minimize: true,
      plugins: [
        postcssUrl({
          url: (asset) => {
            if (asset.url.includes('background/background_login_mobile.png')) {
              return '/assets/background/background_login_mobile.png';
            }
            if (asset.url.includes('background/background_login.png')) {
              return '/assets/background/background_login.png';
            }
          },
        }),
      ],
    }),
    copy({
      targets: [
        {
          src: 'src/ressources/background/*.png',
          dest: 'dist',
        },
      ],
      flatten: false,
    }),
    babel({
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'],
    }),
  ],
  external: ['react', 'react-dom'],
};
