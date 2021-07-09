<template>
  <div class="container">
    <BgGrid />
    <Nuxt />
    <Footer :info="global" />
  </div>
</template>

<script>
import global from '~/apollo/queries/global.gql'

import BgGrid from '~/components/common/BgGrid.vue'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    BgGrid,
    Footer,
  },
  apollo: {
    global: {
      prefetch: true,
      query: global,
    },
  },
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.footer {
  flex-grow: 0;
}
</style>
