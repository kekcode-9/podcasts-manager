/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './main-components/**/*.{js,ts,jsx,tsx,mdx}',
    './common-components/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'tropical-indigo': '#B892FF',
      'chefchaouen-blue': '#3c8eef',
      'rich-black': '#05031C',
      'snow': '#FFFBFE',
      'claret': '#9C0D38'
    }
  },
  plugins: [],
}
