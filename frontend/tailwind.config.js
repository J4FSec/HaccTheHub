module.exports = {
    mode: 'jit',
    purge: {
        enabled: true,
        content: [
            "./pages/**/*.{js,jsx,ts,tsx}",
            "./components/**/*.{js,jsx,ts,tsx}",
        ],
    },
};
