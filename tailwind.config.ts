import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
   darkMode: ["class"],
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         screens: {
            "xl-desktop": "1990px",
         },
         colors: {
            "v-grey-200": "hsl(var(--color-grey-200) / <alpha-value>)",
            "v-grey-300": "hsl(var(--color-grey-300) / <alpha-value>)",
            "v-grey-600": "hsl(var(--color-grey-600) / <alpha-value>)",
            "v-grey-800": "hsl(var(--color-grey-800) / <alpha-value>)",
            "v-grey-900": "hsl(var(--color-grey-900) / <alpha-value>)",
            "v-green-500": "hsl(var(--color-green-500) / <alpha-value>)",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            card: {
               DEFAULT: "hsl(var(--card))",
               foreground: "hsl(var(--card-foreground))",
            },
            popover: {
               DEFAULT: "hsl(var(--popover))",
               foreground: "hsl(var(--popover-foreground))",
            },
            primary: {
               DEFAULT: "hsl(var(--primary))",
               foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
               DEFAULT: "hsl(var(--secondary))",
               foreground: "hsl(var(--secondary-foreground))",
            },
            muted: {
               DEFAULT: "hsl(var(--muted))",
               foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
               DEFAULT: "hsl(var(--accent))",
               foreground: "hsl(var(--accent-foreground))",
            },
            destructive: {
               DEFAULT: "hsl(var(--destructive))",
               foreground: "hsl(var(--destructive-foreground))",
            },
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            chart: {
               "1": "hsl(var(--chart-1))",
               "2": "hsl(var(--chart-2))",
               "3": "hsl(var(--chart-3))",
               "4": "hsl(var(--chart-4))",
               "5": "hsl(var(--chart-5))",
            },
            sidebar: {
               DEFAULT: "hsl(var(--sidebar-background))",
               foreground: "hsl(var(--sidebar-foreground))",
               primary: "hsl(var(--sidebar-primary))",
               "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
               accent: "hsl(var(--sidebar-accent))",
               "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
               border: "hsl(var(--sidebar-border))",
               ring: "hsl(var(--sidebar-ring))",
            },
            whisper: "#EDEDED",
            atlantis: "#93C54B",
            "white-smoke": "#F5F5F5",
            cultured: "#F6F6F6",
            "old-silver": "#858585",
            "black-bean": "#121512",
            malachite: "#22FC55",
            "bright-turquoise": "#14E2DC",
            munsell: "#00A771",
            charcoal: "#454545",
         },
         borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
         },
         keyframes: {
            "accordion-down": {
               from: { height: "0" },
               to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
               from: { height: "var(--radix-accordion-content-height)" },
               to: { height: "0" },
            },
            fadeIn: {
               "0%": { opacity: "0", transform: "translateY(5px)" },
               "100%": { opacity: "1", transform: "translateY(0)" },
            },
         },
         animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            "fade-in": "fadeIn 0.3s ease-out forwards",
         },
         fontFamily: {
            sans: ["Neue Montreal", "sans-serif"],
         },
      },
   },
   plugins: [animate, typography],
} satisfies Config;
