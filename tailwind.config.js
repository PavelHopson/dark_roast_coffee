module.exports = {
  content: ["./pages/*.{html,js}", "./index.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#1A1A1A", // sophisticated-charcoal
        secondary: "#2F2F2F", // elevated-charcoal
        accent: "#D4AF37", // precious-gold
        background: "#FAFAF9", // warm-canvas
        surface: "#F5F4F2", // gentle-depth
        text: {
          primary: "#1A1A1A", // sophisticated-charcoal
          secondary: "#666666", // clear-hierarchy
        },
        success: "#2D5A27", // natural-confidence
        warning: "#B8860B", // thoughtful-caution
        error: "#8B4513", // helpful-concern
        border: "#E5E5E5", // minimal-hairline
      },
      fontFamily: {
        sans: ['Source Sans Pro', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        accent: ['Crimson Text', 'serif'],
        cta: ['Montserrat', 'sans-serif'],
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'headline': ['2.25rem', { lineHeight: '1.3' }],
        'subheading': ['1.5rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'caption': ['0.875rem', { lineHeight: '1.5' }],
        'micro': ['0.75rem', { lineHeight: '1.4' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      boxShadow: {
        'subtle': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 2px 12px rgba(0, 0, 0, 0.06)',
        'modal': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      transitionDuration: {
        '300': '300ms',
        '400': '400ms',
      },
      transitionTimingFunction: {
        'out': 'ease-out',
      },
      backdropBlur: {
        'xs': '2px',
      },
      maxWidth: {
        'prose': '65ch',
        'content': '1200px',
        'narrow': '800px',
      },
      zIndex: {
        'modal': '1000',
        'overlay': '999',
        'dropdown': '100',
        'sticky': '50',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-balance': {
          'text-wrap': 'balance',
        },
        '.transition-fast': {
          'transition': 'all 300ms ease-out',
        },
        '.transition-modal': {
          'transition': 'all 400ms ease-out',
        },
        '.gallery-grid': {
          'display': 'grid',
          'grid-template-columns': 'repeat(auto-fit, minmax(300px, 1fr))',
          'gap': '2rem',
        },
        '.editorial-spacing': {
          'margin-bottom': '2rem',
        },
        '.editorial-spacing-lg': {
          'margin-bottom': '3rem',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}