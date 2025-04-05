import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}", // Adjusted path
  ],
  darkMode: 'class',
  theme: {
    extend: {
      transitionDuration: {
        'theme': '300ms'
      },
      transitionProperty: {
        'theme': 'color, background-color, border-color, fill, stroke' // Added more properties
      },
      colors: {
        navy: 'rgb(26 20 35)',
        gold: 'rgb(250 184 3)',
        light: '#ffffff',
        dark: 'rgb(23 23 23)'
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui'], // Set as default sans
        montserrat: ['var(--font-montserrat)'] // Optional explicit class
      },
    },
  },
  plugins: [],
}

export default config