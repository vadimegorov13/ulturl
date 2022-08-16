import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg';

const svgPlugin = svg({
  svgoOptions: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      'removeDimensions',
    ],
  },
});

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit(), svgPlugin],
};

export default config;
