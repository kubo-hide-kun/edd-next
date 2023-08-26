/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const range = require('lodash/range');

const screenSizes = {
  'smartphone-lg': '428px',
  tablet: '640px',
  laptop: '1024px',
  desktop: '1280px',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  // eslint-disable-next-line no-undef
  content: [path.join(__dirname, 'src/**/!(*.d).{ts,js,jsx,tsx}')],
  theme: {
    spacing: {
      px: '1px',
      ...range(0, screenSizes.laptop).reduce((acc, i) => {
        acc[i] = `${i}px`;
        return acc;
      }, {}),
    },
    maxWidth: {
      px: '1px',
      ...range(1, screenSizes.laptop).reduce((acc, i) => {
        acc[i] = `${i}px`;
        return acc;
      }, {}),
    },
    minWidth: {
      px: '1px',
      ...range(1, screenSizes.laptop).reduce((acc, i) => {
        acc[i] = `${i}px`;
        return acc;
      }, {}),
    },
    fontSize: {
      xxs: '10px',
      xs: '12px',
      'sm-mini': '13px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '64px',
      '7xl': '72px',
      '8xl': '80px',
      '9xl': '96px',
    },
    screens: screenSizes,
    extend: {
      colors: {
        line: {
          green: {
            DEFAULT: 'var(--line-green)',
            dark: 'var(--line-green-dark)',
          },
        },
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
  plugins: ['tailwindcss', 'postcss-preset-env'],
};
