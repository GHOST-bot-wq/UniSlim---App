/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        flame: {
          1: '#FF6B35',
          2: '#FF3CAC',
          3: '#FFE66D',
        },
        teal: '#2EC4B6',
        deep: '#0D0D1A',
        success: '#34C759',
        warning: '#FF9500',
        danger: '#FF3B30',
        blue: '#007AFF',
        purple: '#AF52DE',
        surface: {
          DEFAULT: '#FFFFFF',
          2: '#F2F2F7',
        },
        txt: {
          1: '#1C1C1E',
          2: '#3C3C43',
          3: '#8E8E93',
          4: '#C7C7CC',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      borderRadius: {
        'xs': '8px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
      },
      boxShadow: {
        'ios-sm': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'ios-md': '0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'ios-lg': '0 8px 32px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06)',
        'brand': '0 8px 24px rgba(255,107,53,0.25)',
      },
    },
  },
  plugins: [],
}
