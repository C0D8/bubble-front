import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      
      fontFamily: {
        billabong: ["var(--font-billabong)"],
        cathalia: ["var(--font-cathalia)"],
        hello: ["var(--font-hello)"],
    },

    dropShadow: {
      '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
      '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.8)',
          '0 45px 65px rgba(0, 0, 0, 0.45)'
      ],
     'lg': '0 10px 10px rgba(0, 0, 0, 0.4)',
    }
    

    },
  },
  plugins: [],
};
export default config;
