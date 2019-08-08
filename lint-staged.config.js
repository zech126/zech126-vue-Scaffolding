module.exports = {
  ignore: ['dist'],
  linters: {
    '*.js': [
      'vue-cli-service lint --fix',
      'prettier --write',
      'git add'
      // 'yarn test:unit --bail --findRelatedTests'
    ],
    '*.json': ['prettier --write', 'git add'],
    '*.vue': [
      'vue-cli-service lint --fix',
      'stylelint --fix',
      'prettier --write',
      'git add'
      // 'yarn test:unit --bail --findRelatedTests'
    ],
    '*.less': ['prettier --write', 'git add'],
    '*.md': ['markdownlint', 'prettier --write', 'git add'],
    '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged', 'git add']
  }
}
