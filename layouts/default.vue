<template>
  <div class="container">
    <header class="header">
      <nav class="nav">
         <img class="nav__logo" :src="`http://localhost:1337${global.logo.url}`" alt="">
         <nuxt-link class="nav__link" to="/about">ABOUT</nuxt-link>
      </nav>

    </header>
    <Nuxt />
    <footer class="footer">{{ global.contactEmail }}</footer>
  </div>
</template>

<script>
import global from '~/apollo/queries/global.gql'
export default {
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

.header{
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
  &__logo{
    
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
