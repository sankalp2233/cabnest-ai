/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: "#FFC107", // Taxi Yellow
                "primary-hover": "#FFB300",
                "primary-dark": "#FFA000",
                secondary: "#2C2C2C", // Charcoal Black
                "secondary-hover": "#1A1A1A",
                accent: "#FFFFFF",
                "accent-gray": "#F5F5F5",
                "bg-dark": "#0f172a",
                "bg-card": "rgba(30, 41, 59, 0.7)",
                "text-light": "#f8fafc",
                "text-gray": "#94a3b8",
                "text-dark": "#1A1A1A",
                glass: "rgba(255, 255, 255, 0.05)",
                "glass-border": "rgba(255, 255, 255, 0.1)",
                "yellow-50": "#FFFDE7",
                "yellow-100": "#FFF9C4",
            },
            backgroundImage: {
                "gradient-primary": "linear-gradient(135deg, #FFC107 0%, #FFD54F 100%)",
                "gradient-secondary": "linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%)",
                "gradient-bg": "radial-gradient(circle at top center, #1e1b4b 0%, #0f172a 100%)",
            },
            boxShadow: {
                'premium': '0 4px 20px rgba(255, 193, 7, 0.15)',
                'premium-lg': '0 8px 30px rgba(255, 193, 7, 0.2)',
                'dark': '0 4px 20px rgba(0, 0, 0, 0.3)',
            },
            transitionDuration: {
                '400': '400ms',
            },
        },
    },
    plugins: [],
};
