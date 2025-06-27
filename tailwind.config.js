/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2D5A3D', // Deep forest green - green-800
        'primary-50': '#F0F9F4', // Lightest green tint
        'primary-100': '#DCFCE7', // Light green - green-100
        'primary-200': '#BBF7D0', // Light green - green-200
        'primary-500': '#22C55E', // Medium green - green-500
        'primary-600': '#16A34A', // Medium-dark green - green-600
        'primary-700': '#15803D', // Dark green - green-700
        'primary-900': '#14532D', // Darkest green - green-900

        // Secondary Colors
        'secondary': '#8B4513', // Rich brown - amber-800
        'secondary-50': '#FFFBEB', // Lightest brown tint
        'secondary-100': '#FEF3C7', // Light brown - amber-100
        'secondary-200': '#FDE68A', // Light brown - amber-200
        'secondary-500': '#F59E0B', // Medium brown - amber-500
        'secondary-600': '#D97706', // Medium-dark brown - amber-600
        'secondary-700': '#B45309', // Dark brown - amber-700

        // Accent Colors
        'accent': '#FF6B35', // Warm coral - orange-500
        'accent-50': '#FFF7ED', // Lightest coral tint
        'accent-100': '#FFEDD5', // Light coral - orange-100
        'accent-200': '#FED7AA', // Light coral - orange-200
        'accent-500': '#F97316', // Medium coral - orange-500
        'accent-600': '#EA580C', // Medium-dark coral - orange-600
        'accent-700': '#C2410C', // Dark coral - orange-700

        // Background Colors
        'background': '#FEFEFE', // Pure white with warmth
        'surface': '#F8F9FA', // Light gray - gray-50
        'surface-100': '#F3F4F6', // Light gray - gray-100
        'surface-200': '#E5E7EB', // Medium-light gray - gray-200

        // Text Colors
        'text-primary': '#1A1A1A', // Near-black - gray-900
        'text-secondary': '#6B7280', // Medium gray - gray-500
        'text-tertiary': '#9CA3AF', // Light gray - gray-400

        // Status Colors
        'success': '#10B981', // Fresh green - emerald-500
        'success-50': '#ECFDF5', // Light success tint
        'success-100': '#D1FAE5', // Light success - emerald-100
        'success-600': '#059669', // Dark success - emerald-600

        'warning': '#F59E0B', // Amber warning - amber-500
        'warning-50': '#FFFBEB', // Light warning tint
        'warning-100': '#FEF3C7', // Light warning - amber-100
        'warning-600': '#D97706', // Dark warning - amber-600

        'error': '#EF4444', // Clear red - red-500
        'error-50': '#FEF2F2', // Light error tint
        'error-100': '#FEE2E2', // Light error - red-100
        'error-600': '#DC2626', // Dark error - red-600

        // Border Colors
        'border': '#E5E7EB', // Light gray border - gray-200
        'border-light': '#F3F4F6', // Very light border - gray-100
      },
      fontFamily: {
        'sans': ['Source Sans Pro', 'sans-serif'],
        'heading': ['Inter', 'sans-serif'],
        'caption': ['Roboto', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'lg': '8px',
        'md': '6px',
        'sm': '4px',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'large': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scale-in': 'scaleIn 200ms ease-out',
        'fade-in': 'fadeIn 150ms ease-out',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
        '1000': '1000',
        '1100': '1100',
        '1200': '1200',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}