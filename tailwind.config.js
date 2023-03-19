const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./vendor/laravel/jetstream/**/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.vue",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                blue: {
                    500: "#6675E6",
                },
                nav: {
                    500: "#C6C6C6",
                },
                aqua: {
                    500: "#58BFB9",
                },
                fuente: {
                    500: "#0A0F2C",
                },
                gris: {
                    500: "#F2F2F2",
                },
                rojo: {
                    500: "#d9435e",
                },
            },
        },
    },

    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
    ],
};
