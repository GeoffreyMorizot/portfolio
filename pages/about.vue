<template>
  <div v-if="!this.$apollo.queries.about.loading" class="container-about">
    <main>
      <header class="about-header">
        <div class="about-header__text">
          <h1 class="about-header__title title-medium">{{ about.pageTitle }}</h1>
          <p class="paragraph-header">{{ about.headerText }}</p>
        </div>
        <Gimage
          class="about-header__img"
          :alt="about.imageProfil.alternativeText"
          width="1440"
          height="1977"
          baseUrl=""
          loading="lazy"
          :source="about.imageProfil.url"
          :srcSet="about.imageProfil.formats"
          sizes="41.66vw"
        />
      </header>
      <div class="space"></div>
    </main>
  </div>
</template>

<script>
import about from '~/apollo/queries/about'
import Gimage from '~/components/Gimage'

export default {
  components: {
    Gimage,
  },
  apollo: {
    about: {
      prefetch: true,
      query: about,
    },
  },
}
</script>

<style lang="scss">
.container-about {
  flex-grow: 1; 
}

.about-header{
  @include gridX2;
  padding: 160px 0 0 0;
}

.about-header__text{
  grid-column: 3 / span 4;
}
.about-header__title{
  margin-bottom: 96px;
}
.about-header__img{
  grid-column: 8/span 5;
  position: absolute;
  width: calc((100% / 12)*5);
  top: 0;
  right: 0;
  z-index: -1000;
}
.space{
  height: 1000px;
}
</style>