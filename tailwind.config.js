module.exports = {
    theme: {
        extend: {
            keyframes: {
                'fade-slide-left': {
                    '0%': { opacity: '1', transform: 'translateX(0)' },
                    '100%': { opacity: '0', transform: 'translateX(-40px)' },
                },
            },
            animation: {
                'fade-slide-left': 'fade-slide-left 0.5s ease-in forwards',
            },
        },
    },
    safelist: [
        { pattern: /animate-.*/ },
        { pattern: /delay-.*/ }
    ]
};
