module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:testing-library/react',
    'plugin:vitest/recommended',
    'plugin:jest-dom/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'tailwind.config.js'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true, // This is important to resolve types
        project: [
          './tsconfig.json',
          './tsconfig.app.json',
          './tsconfig.node.json',
          './tsconfig.base.json',
        ],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': 'off',
    // 함수형 컴포넌트 정의 규칙 수정
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    // Button 간의 Type구분 꺼두기
    'react/button-has-type': 'off',
    // import/extensions 규칙 수정
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        json: 'never',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        assert: 'either',
        depth: 3,
        controlComponents: ['Input', 'Select'], // 커스텀 컴포넌트를 여기에 추가
      },
    ],
  },
  parserOptions: {
    tsconfigRootDir: './',
    project: [
      './tsconfig.json',
      './tsconfig.app.json',
      './tsconfig.node.json',
      './tsconfig.base.json',
    ],
  },
};
