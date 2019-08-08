const config = process.env.API_BASE_URL_CONFIG

// Jest 测试中 config 会以字符串形式传入，因此需要作格式判断处理
const apiConfig = typeof config === 'string' ? JSON.parse(config) : config

export default apiConfig
