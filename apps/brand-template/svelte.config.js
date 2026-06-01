import adapter from '@astrojs/svelte';

export default {
  kit: { adapter: adapter() },
  compilerOptions: {
    runes: true,
  },
};