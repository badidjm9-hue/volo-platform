import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: '#32B8C6',
          50: '#E8F8FA',
          100: '#D1F1F5',
          200: '#A3E3EB',
          300: '#75D5E1',
          400: '#47C7D7',
          500: '#32B8C6',
          600: '#28939E',
          700: '#1E6E77',
          800: '#14494F',
          900: '#0A2428',
          foreground: '#FFFFFF',
        },
        navy: {
          DEFAULT: '#1A3B5D',
          50: '#E8ECF1',
          100: '#D1D9E3',
          200: '#A3B3C7',
          300: '#758DAB',
          400: '#47678F',
          500: '#1A3B5D',
          600: '#152F4A',
          700: '#102338',
          800: '#0B1825',
          900: '#050C13',
        },
        orange: {
          DEFAULT: '#FF6B35',
          50: '#FFE8E0',
          100: '#FFD1C1',
          200: '#FFA383',
          300: '#FF7545',
          400: '#FF6B35',
          500: '#FF5315',
          600: '#CC4211',
          700: '#99320D',
          800: '#662109',
          900: '#331105',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        arabic: ['Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config