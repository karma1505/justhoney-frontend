import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Correct placement and syntax
  theme: {
    extend: {
      colors: {
        navy: 'rgb(26 20 35)',
        gold: 'rgb(250 184 3)',
        light: '#ffffff',
        dark: 'rgb(23 23 23)'
      },
    },
  },
  plugins: [],
}

export default config