// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // 箭头函数用小括号括起来
    'arrow-parens': 0,
    // 生成器函数*的前后空格
    'generator-star-spacing': [2, { 'before': true, 'after': true }],
    // 函数定义时括号前面要不要有空格
    'space-before-function-paren': [0, 'always'],
    // 缩进风格
    'indent': [2, 2, { 'SwitchCase': 1 }],
    // 不强制驼峰法命名
    'camelcase': 0,
    // 允许混用tab和空格
    'no-mixed-spaces-and-tabs': 2,
    // 禁止使用debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  }
}
