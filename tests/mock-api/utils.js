module.exports = {
  resSuccess(data) {
    return {
      is_success: true,
      result: data
    }
  },

  resError(msg, code) {
    return {
      error_info: {
        code: code || 500,
        msg
      },
      is_success: false
    }
  }
}
