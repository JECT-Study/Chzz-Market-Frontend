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
    'no-nested-ternary': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'testing-library/no-node-access': 'off',
    'testing-library/no-container': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'react-refresh/only-export-components': 'off',
    'react/jsx-no-useless-fragment': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'no-return-assign': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-underscore-dangle': [
      'error',
      {
        allow: ['_retry'],
      },
    ],
    'react/react-in-jsx-scope': 'off',
    // import React from 'react' 꺼두기
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'off',
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
    // button 컴포넌트 만들 때 key-events 꺼두기
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',

    'testing-library/no-node-access': 'warn',

    // 의존성 문제 해결
    'no-param-reassign': 'off',
    'import/no-cycle': 'off',
    'import/no-named-as-default': 'off',

    'react/prop-types': 'off', // TypeScript를 사용하여 prop-type 규칙을 사용하지 않도록 설정합니다
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 모듈 경계에 대한 명시적 반환 유형 규칙 사용 안 함
    '@typescript-eslint/no-unused-vars': 'off', //사용되지 않은 변수 무시 _
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
    'react/require-default-props': [
      'off', // 기본 매개변수 사용을 허용
      {
        forbidDefaultForRequired: true,
        ignoreFunctionalComponents: true,
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
