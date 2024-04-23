const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./src/**/*.js'],
    darkMode: 'media',
    theme: {
        extend: {
            colors: {
                default: {
                    primary: '#4f46e5',
                    primary_dark: '#4338ca',
                    primary_darkest: '#3730a3',
                    primary_light: '#6366f1',
                    primary_lightest: '#818cf8',
                },
            },
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {
        extend: {
            opacity: ['disabled'],
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
