<template>
  <div class="container">
    <BgGrid />
    <Nuxt />
    <Footer :info="global" />
  </div>
</template>

<script>
import BgGrid from '~/components/BgGrid'
import Footer from '~/components/Footer'
import global from '~/apollo/queries/global.gql'

export default {
  components: {
     BgGrid,
     Footer
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
