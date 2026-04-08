/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './pages/**/*.html', './js/**/*.js'],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#080808',
          900: '#0D0D0D',
          800: '#141414',
          700: '#1A1A1A',
          600: '#222222',
          500: '#2A2A2A',
          400: '#333333',
          300: '#444444',
        },
        copper: {
          50: '#FFF8F0',
          100: '#FFECD4',
          200: '#FFD9AA',
          300: '#E8B882',
          400: '#D4956B',
          500: '#C17A50',
          600: '#A66038',
          700: '#8B4A28',
        },
        cream: {
          50: '#FFFCF9',
          100: '#FFF7F0',
          200: '#F5E6D3',
          300: '#E8D5C0',
          400: '#D4C0A8',
          500: '#B8A68E',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Source Sans Pro', 'system-ui', 'sans-serif'],
        accent: ['Crimson Text', 'Georgia', 'serif'],
        cta: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'hero-sm': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['2.5rem', { lineHeight: '1.15' }],
        'headline': ['2rem', { lineHeight: '1.2' }],
        'subhead': ['1.25rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
      },
      maxWidth: {
        content: '1280px',
        narrow: '900px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        glow: '0 0 40px rgba(212, 149, 107, 0.15)',
        'glow-lg': '0 0 60px rgba(212, 149, 107, 0.25)',
        card: '0 4px 24px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 16px 48px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'gradient-mesh': 'radial-gradient(at 40% 20%, rgba(212,149,107,0.08) 0, transparent 50%), radial-gradient(at 80% 80%, rgba(193,122,80,0.06) 0, transparent 50%)',
        'gradient-hero': 'linear-gradient(180deg, rgba(8,8,8,0.3) 0%, rgba(8,8,8,0.7) 50%, rgba(8,8,8,0.95) 100%)',
      },
    },
  },
  plugins: [],
};
