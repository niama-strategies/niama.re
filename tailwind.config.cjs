const config = {
  mode: 'jit',
  purge: {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    safelist: [
      ...['bg-purple-300', 'hover:bg-purple-400', 'bg-red-300', 'hover:bg-red-400', 'bg-yellow-300', 'hover:bg-yellow-400'],
      ...['text-purple-300', 'text-purple-400', 'text-red-300', 'text-red-400', 'text-yellow-300', 'text-yellow-400'],
    ],
  },
  theme: {
    extend: {
      colors: {
        purple: {300: '#ba93dc', 400: '#9c78bf'},
        red: {300: '#f04e69', 400: '#bc1142'},
        yellow: {300: '#fedf00', 400: '#e2c500'},
      },
      fontFamily: {title: 'TexGyreAdventor'},
    },
  },
};

module.exports = config;
