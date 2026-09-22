/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm paper base
        paper: {
          DEFAULT: '#F7F0E5',
          warm: '#FFF9F2',
          sheet: '#FDF8F0',
          subtle: '#EFE6D6',
          muted: '#E6DAC9',
          aged: '#DDD0BD',
        },
        // Deep ink
        ink: {
          DEFAULT: '#181716',
          deep: '#0F0E0D',
          soft: '#3A3835',
          muted: '#6B6560',
          faint: '#9C948A',
        },
        // Coral / terracotta accent (primary CTA)
        coral: {
          DEFAULT: '#E65332',
          hover: '#CC431F',
          dark: '#A8331A',
          light: '#FDF1EE',
          border: '#F3C4B8',
          muted: '#F29A70',
        },
        // Peach (gradient partner)
        peach: {
          DEFAULT: '#F29A70',
          light: '#FDF3EE',
          muted: '#F7C4A5',
        },
        // Soft pink
        blush: {
          DEFAULT: '#E9B8B8',
          light: '#FDF5F5',
          dark: '#C88888',
        },
        // Lavender
        lavender: {
          DEFAULT: '#B8A8D8',
          light: '#F4F1FA',
          dark: '#8870B8',
          border: '#D6CEF0',
        },
        // Powder blue
        powder: {
          DEFAULT: '#9DBBD0',
          light: '#EEF5FA',
          dark: '#6E9AB8',
        },
        // Deep cobalt (research agent)
        cobalt: {
          DEFAULT: '#294B78',
          dark: '#1C3557',
          light: '#EBF1F9',
          border: '#BCCFE6',
        },
        // Sage (experiment agent)
        sage: {
          DEFAULT: '#789681',
          dark: '#557060',
          light: '#EDF4EF',
          border: '#C0D4C6',
        },
        // Mustard (resource agent)
        mustard: {
          DEFAULT: '#C59A3A',
          dark: '#9A7828',
          light: '#FBF5E8',
          border: '#E8D4A8',
        },
        // Terracotta (experiment run agent)
        terracotta: {
          DEFAULT: '#B85A43',
          dark: '#8F4433',
          light: '#FAF0EE',
          border: '#E5C0B8',
        },
        // Rule / border lines
        rule: {
          DEFAULT: '#DDD5C8',
          light: '#EDE7DC',
          dark: '#C4B9AA',
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'paper-sm': '0 1px 3px rgba(24, 23, 22, 0.06)',
        'paper': '0 2px 8px rgba(24, 23, 22, 0.07), 0 1px 2px rgba(24, 23, 22, 0.04)',
        'paper-lg': '0 8px 32px rgba(24, 23, 22, 0.09), 0 2px 8px rgba(24, 23, 22, 0.04)',
        'warm': '0 4px 16px rgba(230, 83, 50, 0.12)',
        'cobalt': '0 4px 16px rgba(41, 75, 120, 0.15)',
      },
      borderRadius: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-coral-peach': 'linear-gradient(135deg, #E65332 0%, #F29A70 100%)',
        'gradient-peach-lavender': 'linear-gradient(135deg, #F29A70 0%, #B8A8D8 100%)',
        'gradient-lavender-powder': 'linear-gradient(135deg, #B8A8D8 0%, #9DBBD0 100%)',
        'gradient-sage-cream': 'linear-gradient(135deg, #789681 0%, #F7F0E5 100%)',
        'gradient-coral-blush': 'linear-gradient(135deg, #E65332 0%, #E9B8B8 100%)',
        'gradient-mustard-peach': 'linear-gradient(135deg, #C59A3A 0%, #F29A70 100%)',
      },
    },
  },
  plugins: [],
}
