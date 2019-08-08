const path = require('path')
const fs = require('fs')
const _ = require('lodash')

// 非 server 与 local 则认为是执行在单元测试环境下
const serverEnv = process.env.VUE_APP_CLIENT || 'test'
const confEnv = process.env.VUE_APP_ENV || 'dev'
const configFile = {
  client: `./${serverEnv}.js`,
  env: `./${confEnv}.js`,
  exact: `./${serverEnv}.${confEnv}.js`
}
const configFileExist = Object.values(configFile).some((file) =>
  fs.existsSync(path.resolve(__dirname, file))
)
if (!configFileExist) {
  throw Error(
    // prettier-ignore
    `Api config files ${Object.values(configFile).join(', ')} need at least one.`
  )
}

const clientConfig = fs.existsSync(path.resolve(__dirname, configFile.client))
  ? require(configFile.client)
  : {}
const envConfig = fs.existsSync(path.resolve(__dirname, configFile.env))
  ? require(configFile.env)
  : {}
const exactConfig = fs.existsSync(path.resolve(__dirname, configFile.exact))
  ? require(configFile.exact)
  : {}
const apiConfig = _.merge(clientConfig, envConfig, exactConfig)

function formatApiConfig(originConfig) {
  const finalConfig = {}
  const invalidConfig = []
  Object.keys(originConfig).forEach((key) => {
    const config = originConfig[key]
    if (_.isPlainObject(config)) {
      if (!config.url) {
        return
      }
      finalConfig[key] = { url: config.url }
      if (_.isPlainObject(config.requestConfig)) {
        finalConfig[key].requestConfig = config.requestConfig
      }
    } else if (typeof config === 'string') {
      finalConfig[key] = { url: config }
    } else {
      invalidConfig.push(key)
    }
  })

  if (invalidConfig.length > 0) {
    throw Error(
      `Invalid api config (${serverEnv} | ${confEnv}):
      ${invalidConfig.join(', ')}`
    )
  }

  return finalConfig
}

module.exports = formatApiConfig(apiConfig)
