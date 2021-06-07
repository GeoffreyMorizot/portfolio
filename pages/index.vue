<template>
  <main v-if="!this.$apollo.queries.home.loading" class="main">
    <Hero :home="home" /> 
      <div class="home__title-section">
        <h4>{{ home.nameSection}}</h4>
      </div>
    <Project v-for="project in home.projects" :key="project.id" :project="project" />
  </main>
</template>

<script>
import home from '~/apollo/queries/home.gql'

import Hero from '~/components/Hero'
import Project from '~/components/Project'

export default {
  components: {
    Project,
    Hero,
  },
  data() {
    return {
      home,
    }
  },
  apollo: {
    home: {
      prefetch: true,
      query: home,
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  flex-grow: 1;
}

.home__title-section{
  @include grid;
  margin-bottom: 64px ;

  h4 {
    grid-column: 2 / span 2;
    text-transform: capitalize;
     border-top: 1px solid var(--clr-cheese);
     border-bottom: 1px solid var(--clr-cheese);
  }
}
</style>
