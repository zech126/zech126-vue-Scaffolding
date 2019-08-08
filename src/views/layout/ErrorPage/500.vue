<template>
  <ErrorPage type="500">
    <button slot="actions" class="button" @click="$router.go(-1)">返回</button>
  </ErrorPage>
</template>

<script>
import ErrorPage from './ErrorPage.vue'

export default {
  name: 'ErrorPage500',

  components: {
    ErrorPage
  },

  metaInfo: {
    title: '500'
  }
}
</script>
