<template>
  <div class="container">
    <BgGrid />
    
    <header class="header">
      <nav class="nav">
        <nuxt-link class="nav__link" to="/">

          <img
            width="49"
            height="37"
            class="nav__logo"
            :src="`${baseURL}${global.logo.url}`"
            :alt="`${global.logo.alternativeText}`"
          />
        </nuxt-link>
      </nav>
    </header>
    <Nuxt />
  </div>
</template>

<script>
import BgGrid from '~/components/BgGrid'
import Footer from '~/components/Footer'
import global from '~/apollo/queries/global.gql'

export default {
  components: {
     BgGrid,
  },
  data() {
    return {
      baseURL: this.$config.http.imageURL
    }
  },
  apollo: {
    global: {
      prefetch: true,
      query: global,
    },
  },
}
</script>