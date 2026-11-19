import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ochi: {
          navy: {
            50: '#EEF3F8',
            100: '#D5DEE8',
            200: '#B8C6D6',
            500: '#3B658E', // 슬레이트 블루
            600: '#2F557A', // 스틸·데님 블루
            800: '#224161', // 딥 네이비
            900: '#182F47',
          },
          amber: {
            50: '#FEF6E7',
            100: '#FCE7C2',
            400: '#F6BC5A',
            500: '#F2A531',
            600: '#D98C17',
            900: '#412402',
          },
          gold: '#C9A45C',
          cream: '#F5F0E6',
        },
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
