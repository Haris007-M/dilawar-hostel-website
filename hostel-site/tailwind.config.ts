import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E2F2E",      // deep teal-green
        ink2: "#174744",
        sun: "#F2B134",      // marigold
        sunsoft: "#FCEFCB",
        paper: "#F6F8F5",
        mist: "#E3EAE6",
        wa: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
