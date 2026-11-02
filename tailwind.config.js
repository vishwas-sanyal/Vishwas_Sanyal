/** @type {import('tailwindcss').Config} */
//module.exports = {
//  darkMode: ["class"],
//  content: [
//    "./src/**/*.{js,jsx,ts,tsx}",
//    "./public/index.html"
//  ],
//  theme: {
//    extend: {},
//  },
//  plugins: [],
//};

/** @type {import('tailwindcss').Config} */
module.exports = {
blocklist: ["overline"],
darkMode: ["class"],
content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
theme: {
extend: {
fontFamily: {
sans: ['"Plus Jakarta Sans"', 'sans-serif'],
mono: ['"JetBrains Mono"', 'monospace'],
},
borderRadius: {
lg: 'var(--radius)',
md: 'calc(var(--radius) - 2px)',
sm: 'calc(var(--radius) - 4px)'
},
colors: {
background: 'hsl(var(--background))',
foreground: 'hsl(var(--foreground))',
card: {
DEFAULT: 'hsl(var(--card))',
foreground: 'hsl(var(--card-foreground))'
},
popover: {
DEFAULT: 'hsl(var(--popover))',
foreground: 'hsl(var(--popover-foreground))'
},
primary: {
DEFAULT: 'hsl(var(--primary))',
foreground: 'hsl(var(--primary-foreground))'
},
secondary: {
DEFAULT: 'hsl(var(--secondary))',
foreground: 'hsl(var(--secondary-foreground))'
},
muted: {
DEFAULT: 'hsl(var(--muted))',
foreground: 'hsl(var(--muted-foreground))'
},
accent: {
DEFAULT: 'hsl(var(--accent))',
foreground: 'hsl(var(--accent-foreground))',
cyan: '#38bdf8',
indigo: '#6366f1',
violet: '#8b5cf6'
},
destructive: {
DEFAULT: 'hsl(var(--destructive))',
foreground: 'hsl(var(--destructive-foreground))'
},
border: 'hsl(var(--border))',
input: 'hsl(var(--input))',
ring: 'hsl(var(--ring))',
surface: {
base: '#0a0a0d',
card: '#121319',
raised: '#181a24',
border: '#2a2d3d'
}
},
boxShadow: {
'glow-cyan': '0 0 25px -5px rgba(56, 189, 248, 0.35)',
'glow-indigo': '0 0 25px -5px rgba(99, 102, 241, 0.4)'
},
keyframes: {
'accordion-down': {
from: { height: '0' },
to: { height: 'var(--radix-accordion-content-height)' }
},
'accordion-up': {
from: { height: 'var(--radix-accordion-content-height)' },
to: { height: '0' }
},
pulseGrid: {
'0%, 100%': { opacity: '0.15' },
'50%': { opacity: '0.28' }
}
},
animation: {
'accordion-down': 'accordion-down 0.2s ease-out',
'accordion-up': 'accordion-up 0.2s ease-out',
'grid-pulse': 'pulseGrid 8s ease-in-out infinite'
}
}
},
plugins: [require("tailwindcss-animate")],
};


