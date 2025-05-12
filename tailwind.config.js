/** @type {import('tailwindcss').Config} */

module.exports = {
    mode: 'jit',
    content: [
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./templates/**/*.{js,ts,jsx,tsx,mdx}",
      "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    ],
    theme: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'sora': ['Sora', 'sans-serif'],
      },
      listStyleType: {
        none: 'none',
        disc: 'disc',
        decimal: 'decimal',
        square: 'square',
        roman: 'upper-roman',
      },
      extend: {
        borderRadius: {
          'sm': '0.250rem',
        },
        colors: {
          primary: '#0f9960',
          secondary: '#0a6657',
          tertiary: '#63686e',
          interactive: '#DDE2EB',
          heroPrimaryColor: '#30F2A2',
          heroSecondaryColor: '#f0fcf7',
          'body-text': '#39383D',
          'interactive-neutral': '#0D3330',
          'interactive-disabled': '#73777D',
          'gray-dark': '#383A3D',
          'gray-light': '#EDEFF2',
          'black': '#242526',
          'caption-text': '#63686E',
          'caption': '#63686E',
          'surface-soft': '#F5F7FA',
          'surface-warning': '#FFF1EB',
          'warning-text': '#682F12',
          'interactive-hover': '#0A6657',
          'danger-feedback': '#FB3748',
        },
        container: {
          screens: {
            sm: '100%',
            md: '100%',
            lg: '1024px',
            xl: '1312px',
            '2xl': '1312px',
          },
          padding: '1rem',
        },
      },
    },
    plugins: [],
  };
  