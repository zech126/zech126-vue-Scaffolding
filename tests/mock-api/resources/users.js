module.exports = {
  findBy(propertyName, value) {
    return this.all.find((item) => item[propertyName] === value)
  },
  all: [
    {
      account: 'admin',
      password: 'admin',
      token: 'token-00000',
      user_id: '00000',
      user_name: '王小明 (mock)',
      department_name: '前端组 (mock)',
      job_name: '前端开发工程师 (mock)'
    }
  ]
}
