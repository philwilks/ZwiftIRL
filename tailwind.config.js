const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./src/**/*.{js,jsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            'sans': ['Cairo', 'sans-serif']
        },
        extend: {
            colors: {
                orange: '#fc6719',   // Zwift orange
                green: colors.lime,
            }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}