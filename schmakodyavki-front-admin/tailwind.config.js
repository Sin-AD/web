/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': { 'max': '480px' },
        'sm': { 'max': '640px' },
        'md': { 'max': '768px' },
        'pr': { 'max': '864px'},
        'lg': { 'max': '1024px' },
        'xl': { 'max': '1280px' },
        'xlz': { 'max': '1380px' },
      },
      container: {
        center: true,
      },
      colors: {
        BridalHealth: "#fffbf4",
        AzureishWhite: "#d7e7f2",
        DarkTeaGreen: "#b3d3a6",
        BlackOlive: "#3d3d3d",
        Manhattan: "#f6c391",
        GrayTeaGreen: "#cae0c1",
        TuftBush: "#fcd3cd",
        PaleTaupe: "#bd9a84",
        LightPaleTaupe: "#f3d8c8",
        Diesel: "#1c0000",
        WildSand: "#f4f4f4",
      },
    },
  },
  plugins: [],
}
