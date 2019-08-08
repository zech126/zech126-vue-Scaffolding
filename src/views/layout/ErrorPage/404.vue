<template>
  <ErrorPage type="404">
    <button slot="actions" class="button" @click="$router.go(-1)">返回</button>
  </ErrorPage>
</template>

<script>
import ErrorPage from './ErrorPage.vue'

export default {
  name: 'ErrorPage404',

  components: {
    ErrorPage
  },

  metaInfo: {
    title: '404'
  }
}
</script>
