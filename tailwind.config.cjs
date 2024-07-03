const defaultTheme = require("tailwindcss/defaultTheme");
const svgToDataUri = require("mini-svg-data-uri");

const colors = require("tailwindcss/colors");
const {
   default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
   daisyui: {
      themes: [
         "light",
         "dark",
         "cupcake",
         "bumblebee",
         "emerald",
         "corporate",
         "synthwave",
         "retro",
         "cyberpunk",
         "valentine",
         "halloween",
         "garden",
         "forest",
         "aqua",
         "lofi",
         "pastel",
         "fantasy",
         "wireframe",
         "black",
         "luxury",
         "dracula",
         "cmyk",
         "autumn",
         "business",
         "acid",
         "lemonade",
         "night",
         "coffee",
         "winter",
         "dim",
         "nord",
         "sunset",
      ],
   },
   theme: {
      extend: {
         fontFamily: {
            YesevaOne: ["Yeseva One", "serif"],
            JosefinSans: ["Josefin Sans", "sans-serif"],
         },
      },
   },
   plugins: [
      require("@tailwindcss/typography"),
      require("daisyui"),
      addVariablesForColors,
      function ({ matchUtilities, theme }) {
         matchUtilities(
            {
               "bg-grid": (value) => ({
                  backgroundImage: `url("${svgToDataUri(
                     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
                  )}")`,
               }),
               "bg-grid-small": (value) => ({
                  backgroundImage: `url("${svgToDataUri(
                     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
                  )}")`,
               }),
               "bg-dot": (value) => ({
                  backgroundImage: `url("${svgToDataUri(
                     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
                  )}")`,
               }),
            },
            {
               values: flattenColorPalette(theme("backgroundColor")),
               type: "color",
            }
         );
      },
   ],
   daisyui: {
      themes: true, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
      darkTheme: "dark", // name of one of the included themes for dark mode
      logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
   },
};

function addVariablesForColors({ addBase, theme }) {
   let allColors = flattenColorPalette(theme("colors"));
   let newVars = Object.fromEntries(
      Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
   );

   addBase({
      ":root": newVars,
   });
}
