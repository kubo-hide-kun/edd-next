/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const range = require('lodash/range');

const screenSizes = {
  'smartphone-lg': 428,
  tablet: 640,
  laptop: 1024,
  desktop: 1280,
};

const screenSizesStr = Object.keys(screenSizes).reduce((acc, key) => {
  acc[key] = `${screenSizes[key]}px`;
  return acc;
}, {});

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
      none: '0px',
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
    screens: screenSizesStr,
    colors: {
      /* アクセントカラー */
      accent: {
        primary: {
          DEFAULT: 'var(--accent-primary)',
          sub: 'var(--accent-primary-sub)',
        },
        secondary: {
          DEFAULT: 'var(--accent-secondary)',
        },
      },
      /* サーフェスカラー */
      surface: {
        accent: {
          1: 'var(--surface-accent-1)',
          2: 'var(--surface-accent-2)',
          sub: 'var(--surface-accent-sub)',
        },
        base: {
          1: 'var(--surface-base-1)',
          2: 'var(--surface-base-2)',
          3: 'var(--surface-base-3)',
        },
        disabled: 'var(--surface-disabled)',
      },
      /* ベースカラー: ブラック */
      black: {
        DEFAULT: 'var(--black-default)',
      },
      /* ベースカラー: グレー */
      gray: {
        light: 'var(--gray-light)',
      },
      /* ベースカラー: ホワイト */
      white: {
        DEFAULT: 'var(--white-default)',
      },
      transparent: 'transparent',
    },
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
  plugins: ['tailwindcss', 'postcss-preset-env'],
};
