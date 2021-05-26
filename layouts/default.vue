<template>
  <div class="container">
    <BgGrid />
    
    <header class="header">
      <nav class="nav">
        <nuxt-link class="nav__link" to="/">

          <img
            class="nav__logo"
            :src="`${baseURL}${global.logo.url}`"
            :alt="`${global.logo.alternativeText}`"
          />
        </nuxt-link>
        <nuxt-link class="nav__link" to="/about">ABOUT</nuxt-link>
      </nav>
    </header>
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

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

  

  .nuxt-link-active{
      text-decoration: underline;
  }
  


.header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 70px;
  flex-grow: 0;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 0 var(--site-margin) 0 var(--site-margin);
  &__logo {
    height: 100%;
    width: auto;
  }
  &__link {
    width: fit-content;
  }
}
.footer {
  flex-grow: 0;
}
</style>
