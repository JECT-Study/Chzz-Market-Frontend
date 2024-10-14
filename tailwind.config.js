/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    fontFamily: {
      sans: 'Pretendard, sans-serif',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundColor: {
        error: '#f5f5f5'
      },
      screens: {
        sm: '500px',
        lg: '750px',
      },
      boxShadow: {
        top: '0 0 8px rgba(0, 0, 0, 0.08)',
        bottom: '0 0 8px rgba(0, 0, 0, 0.08)',
      },
      fontSize: {
        heading1: [
          '1.5rem',
          {
            lineHeight: '1.3',
            fontWeight: '700',
          },
        ],
        heading2: [
          '1.25rem',
          {
            lineHeight: '1.3',
            fontWeight: '700',
          },
        ],
        heading3: [
          '1.125rem',
          {
            lineHeight: '1.4',
            fontWeight: '600',
          },
        ],
        body1: [
          '1rem',
          {
            lineHeight: '1.6',
            fontWeight: '500',
          },
        ],
        body2: [
          '.875rem',
          {
            lineHeight: '1.6',
            fontWeight: '500',
          },
        ],
        body1Bold: [
          '1rem',
          {
            lineHeight: '1.6',
            fontWeight: '700',
          },
        ],
        body2Bold: [
          '.875rem',
          {
            lineHeight: '1.6',
            fontWeight: '700',
          },
        ],
        button: [
          '1rem',
          {
            lineHeight: '1.4',
            fontWeight: '600',
          },
        ],
        smallBtn: [
          '.875rem',
          {
            lineHeight: '1.4',
            fontWeight: '600',
          },
        ],
        caption: [
          '.75rem',
          {
            lineHeight: '1.4',
            fontWeight: '500',
          },
        ],
      },
      colors: {
        mainCheeseYellow: '#FFC558',
        cheeseYellow: '#FD6A10',
        gray1: '#454545',
        gray2: '#888888',
        gray3: '#D9D9D9',
        redNotice: '#FF0000',
        timeColor1: '#F07C7B',
        timeColor2: '#01C091',
        timeColor3: '#2253FF',
        notificationBgColor: '#FFEFD1',
        categoryColor: '#FFF7E1',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
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
    },
  },
  plugins: [require('tailwindcss-animate')],
};
