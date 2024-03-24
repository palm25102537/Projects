/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        app: "var(--app-height)",
      },
    },
  },
  plugins: [],
};
