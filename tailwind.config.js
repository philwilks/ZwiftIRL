module.exports = {
    purge: [],
    // purge: ['./src/**/*.{js,jsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            'sans': ['Cairo', 'sans-serif']
        },
        extend: {
            width: {
                '800': '800px'
            },
            colors: {
                orange: '#fc6719',   // Zwift orange
            }
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}