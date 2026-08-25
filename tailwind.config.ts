import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Semantic tokens only. Both themes resolve through the same class,
      // so components never need a `dark:` colour variant.
      colors: {
        bg: "var(--bg)",
        surface: {
          1: "var(--surface-1)",
          2: "var(--surface-2)",
          3: "var(--surface-3)",
        },
        line: {
          DEFAULT: "var(--border)",
          control: "var(--border-control)",
        },
        t1: "var(--text-1)",
        t2: "var(--text-2)",
        t3: "var(--text-3)",
        accent: {
          DEFAULT: "var(--accent)",
          solid: "var(--accent-solid)",
          on: "var(--on-accent)",
          wash: "var(--accent-wash)",
          hover: "var(--accent-hover)",
          washHover: "var(--accent-wash-hover)",
        },
        danger: { DEFAULT: "var(--danger)", wash: "var(--danger-wash)", on: "var(--on-semantic)" },
        warn:   { DEFAULT: "var(--warn)",   wash: "var(--warn-wash)",   on: "var(--on-semantic)" },
        info:   { DEFAULT: "var(--info)",   wash: "var(--info-wash)",   on: "var(--on-semantic)" },
        hero: {
          DEFAULT: "var(--on-hero)",
          2: "var(--on-hero-2)",
          ink: "var(--hero-ink)",
          chip: "var(--hero-chip)",
          glass: "var(--hero-glass)",
          line: "var(--hero-line)",
        },
        stage1: { DEFAULT: "var(--stage-1)", wash: "var(--stage-1-wash)" },
        stage2: { DEFAULT: "var(--stage-2)", wash: "var(--stage-2-wash)" },
        stage3: { DEFAULT: "var(--stage-3)", wash: "var(--stage-3-wash)" },
        stage4: { DEFAULT: "var(--stage-4)", wash: "var(--stage-4-wash)" },
        ring: "var(--ring)",
        // Kept so `background`/`foreground` consumers keep resolving.
        background: "var(--bg)",
        foreground: "var(--text-1)",
      },
      boxShadow: {
        token: "var(--shadow)",
        "token-lg": "var(--shadow-lg)",
      },
      fontFamily: {
        'sans': ['var(--font-inter)', 'var(--font-noto-sans-sc)', 'system-ui', 'sans-serif'],
        'inter': ['var(--font-inter)', 'sans-serif'],
        'noto-sc': ['var(--font-noto-sans-sc)', 'sans-serif'],
      },
      keyframes: {
        'scale-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'scale-in': 'scale-in 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
