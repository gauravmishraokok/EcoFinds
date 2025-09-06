/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sustainability-themed colors
        sage: {
          50: '#F7F9F5',
          100: '#E8F0E3',
          200: '#D1E0C7',
          300: '#B8C9A8',
          400: '#9CAF88',
          500: '#7A8B6B',
          600: '#5F6B52',
          700: '#4A523F',
          800: '#3A3F32',
          900: '#2D3028',
        },
        terracotta: {
          50: '#FDF9F4',
          100: '#FAF1E6',
          200: '#F4E2CC',
          300: '#E2B890',
          400: '#D4A574',
          500: '#B8935F',
          600: '#9C7A4A',
          700: '#7A5F3A',
          800: '#5C472B',
          900: '#453520',
        },
        moss: {
          50: '#F4F6F0',
          100: '#E8EDD8',
          200: '#D1DAB1',
          300: '#B8C68A',
          400: '#8A9B4F',
          500: '#6B7C32',
          600: '#4F5A25',
          700: '#3D441C',
          800: '#2F3415',
          900: '#24280F',
        },
        clay: {
          50: '#F9F6F3',
          100: '#F2EBE3',
          200: '#E4D5C7',
          300: '#C4996F',
          400: '#A67C52',
          500: '#8B5A3A',
          600: '#6B4429',
          700: '#523420',
          800: '#3F2819',
          900: '#2F1E12',
        },
        stone: {
          50: '#F7F6F5',
          100: '#EDEBE8',
          200: '#DAD7D2',
          300: '#A8A39D',
          400: '#8B8680',
          500: '#6B6660',
          600: '#524E49',
          700: '#3F3C38',
          800: '#312F2B',
          900: '#252320',
        },
        // Neutral earthy colors
        cream: '#F7F5F3',
        'warm-white': '#FEFCFA',
        charcoal: '#3A3A3A',
        'soft-gray': '#E8E6E3',
        'medium-gray': '#B8B5B0',
        'dark-gray': '#6B6660',
        // Keep primary and secondary for compatibility
        primary: {
          50: '#F7F9F5',
          100: '#E8F0E3',
          200: '#D1E0C7',
          300: '#B8C9A8',
          400: '#9CAF88',
          500: '#7A8B6B',
          600: '#5F6B52',
          700: '#4A523F',
          800: '#3A3F32',
          900: '#2D3028',
        },
        secondary: {
          50: '#FDF9F4',
          100: '#FAF1E6',
          200: '#F4E2CC',
          300: '#E2B890',
          400: '#D4A574',
          500: '#B8935F',
          600: '#9C7A4A',
          700: '#7A5F3A',
          800: '#5C472B',
          900: '#453520',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-earth': 'linear-gradient(135deg, #F7F5F3 0%, #FEFCFA 100%)',
        'gradient-sage': 'linear-gradient(135deg, #9CAF88 0%, #7A8B6B 100%)',
        'gradient-terracotta': 'linear-gradient(135deg, #D4A574 0%, #B8935F 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
