<template>
  <div id="app">
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<script>
import appConfig from '@/app.config'

export default {
  metaInfo: {
    // 所有子组件的如果有 metaInfo.title 都会作为参数传入到这个标题处理模板
    // 返回结果会写入 <title> 内
    titleTemplate(title) {
      const pageTitle = typeof title === 'function' ? title() : title
      return pageTitle ? `${pageTitle} | ${appConfig.title}` : appConfig.title
    }
  }
}
</script>

<style lang="less" src="@/views/style/index.less" />
