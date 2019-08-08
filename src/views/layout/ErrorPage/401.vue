<template>
  <ErrorPage type="401" title="401" desc="请先登录">
    <button slot="actions" class="button" @click="retry">刷新</button>
  </ErrorPage>
</template>

<script>
import ErrorPage from './ErrorPage.vue'

export default {
  name: 'ErrorPage401',

  components: { ErrorPage },

  metaInfo: {
    title: '401'
  },

  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      if (vm.$store.getters['auth/loggedIn']) {
        return vm.$router.replace({ name: 'Home' })
      } else {
        vm.retry()
      }
    })
  },

  methods: {
    async retry() {
      try {
        await this.$store.dispatch('auth/init')
      } catch (e) {}
      if (this.$store.getters['auth/loggedIn']) {
        this.$router.replace({ name: 'Home' })
      }
    }
  }
}
</script>
