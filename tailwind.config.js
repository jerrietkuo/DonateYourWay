// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//     'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
//   ],
//     theme: {
//       container: {
//         padding: {
//           DEFAULT: '1rem',
//           sm: '2rem',
//           lg: '4rem',
//           xl: '5rem',
//           '2xl': '6rem',
//         },
//       },
//       extend: {},
//   },
//   plugins: [
//     require('flowbite/plugin')
//   ],
// }


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        softGreen: '#86efac', // Custom soft green color
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
