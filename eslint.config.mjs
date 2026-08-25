// eslint-config-next 16 ships native flat configs. The previous setup wrapped
// them in FlatCompat, which serialises configs to JSON and therefore threw
// "Converting circular structure to JSON" on the plugin's self-referencing
// `plugins` object. Importing the flat configs directly is the supported path.
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';

const eslintConfig = [
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    // Node build scripts are plain CommonJS; require() is correct there.
    files: ['scripts/**/*.js'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
];

export default eslintConfig;
