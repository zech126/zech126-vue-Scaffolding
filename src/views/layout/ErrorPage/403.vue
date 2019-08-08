<template>
  <ErrorPage type="403">
    <button slot="actions" class="button" @click="$router.go(-1)">返回</button>
  </ErrorPage>
</template>

<script>
import ErrorPage from './ErrorPage.vue'

export default {
  name: 'ErrorPage403',

  components: {
    ErrorPage
  },

  metaInfo: {
    title: '403'
  }
}
</script>
