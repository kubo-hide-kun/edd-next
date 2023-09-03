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
    screens: screenSizes,
    colors: {
      transparent: 'transparent',
      /* ブランドカラー */
      brand: {
        cyan: {
          DEFAULT: 'var(--brand-cyan)',
          light: 'var(--brand-cyan-light)',
          bright: 'var(--brand-cyan-bright)',
        },
      },
      /* ベースカラー: ブラック */
      black: {
        DEFAULT: 'var(--black-default)',
      },
      /* ベースカラー: グレー */
      gray: {
        dark: 'var(--gray-dark)',
        DEFAULT: 'var(--gray-default)',
        light: 'var(--gray-light)',
      },
      /* ベースカラー: ブルー */
      blue: {
        deep: 'var(--blue-deep)',
        dark: 'var(--blue-dark)',
        DEFAULT: 'var(--blue-default)',
        light: 'var(--blue-light)',
        sky: 'var(--blue-sky)',
      },
      /* ベースカラー: ホワイト */
      white: {
        DEFAULT: 'var(--white-default)',
        cream: 'var(--white-cream)',
        smoke: 'var(--white-smoke)',
        reef: 'var(--white-reef)',
      },
      /* 表現色 */
      expressive: {
        red: 'var(--expressive-red)',
        orange: 'var(--expressive-orange)',
        pink: 'var(--expressive-pink)',
        green: 'var(--expressive-green)',
      },
    },
    extend: {
      backgroundImage: {
        'brand-gradient-cyan': 'linear-gradient(270deg, var(--brand-cyan-bright) 0%, var(--brand-cyan-dark) 100%)',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      },
    },
  },
  plugins: ['tailwindcss', 'postcss-preset-env'],
};
