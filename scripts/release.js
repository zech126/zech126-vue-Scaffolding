const execa = require('execa')
const semver = require('semver')
const inquirer = require('inquirer')

const curVersion = require('../package.json').version

const release = async () => {
  console.log(`当前版本: ${curVersion}`)

  const envs = ['prod', 'dev', 'release']
  const envsMap = {
    prod: '正式环境',
    dev: '开发环境',
    release: '测试环境'
  }
  const envChoices = envs.map((env) => ({
    name: `${envsMap[env]}: ${env}`,
    value: env
  }))

  const bumps = ['patch', 'minor', 'major', 'prerelease']
  const versions = {}
  bumps.forEach((b) => {
    versions[b] = semver.inc(curVersion, b)
  })
  const bumpChoices = bumps.map((b) => ({
    name: `${b} (${versions[b]})`,
    value: b
  }))

  const { env, newVersion, bump } = await inquirer.prompt([
    {
      name: 'env',
      message: '请选择需要构建的生成环境:',
      type: 'list',
      default: 'prod',
      choices: envChoices
    },
    {
      name: 'newVersion',
      message: '发布正式环境是否需要更新 package.json 内版本号?',
      type: 'confirm',
      when: (answers) => answers.env === 'prod',
      default: true
    },
    {
      name: 'bump',
      message:
        '版本语义化解释请参考: https://semver.org/lang/zh-CN/\n请选择发布版本类型:',
      type: 'list',
      choices: bumpChoices,
      when: (answers) => answers.newVersion
    }
  ])

  const version = versions[bump] || curVersion
  process.env.VERSION = version

  const { yes } = await inquirer.prompt([
    {
      name: 'yes',
      message: `确认构建 [${envsMap[env]}: ${env}] [版本 ${version}] ?`,
      type: 'confirm'
    }
  ])

  if (yes) {
    await execa('npm', ['run', `build:${env}`], { stdio: 'inherit' })
    await execa('git', ['add', 'dist'], { stdio: 'inherit' })
    await execa('git', ['commit', '-m', `build: build ${env} ${version}`], {
      stdio: 'inherit'
    })
    if (newVersion) {
      await execa(
        'npm',
        ['version', version, '-m', `build: release ${env} ${version}`],
        {
          stdio: 'inherit'
        }
      )
    }
  }
}

release().catch((err) => {
  console.error(err)
  process.exit(1)
})
