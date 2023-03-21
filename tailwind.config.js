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
                    500: "#1D96F1",
                },
                fuente: {
                    500: "#0A0F2C",
                },
                gris: {
                    500: "#F2F2F2",
                    900: "#9B9B9B",
                },
                rojo: {
                    500: "#d9435e",
                },
                verde: {
                    500: "#00D05A",
                },
                ventas: "#44BFFC",
                pc: "#697FEA",
                pp: "#B66BF5",
                cobrado: "#56D0C1",
            },
            backgroundImage: {
                fondo: 'url("/resources/img/elementos/fondo.jpg")',
            },
            maxWidth: {
                '8xl': '90%'
            }
        },
    },

    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
    ],
};
