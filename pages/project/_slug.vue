<template>
  <div class="project">
    <div v-if="this.$apollo.queries.project.loading">loading</div>
    <div
      v-if="!this.$apollo.queries.project.loading"
      class="project__container"
    >
      <h1 class="project__title">{{ project.title }}</h1>

      <h2 class="project__categories" v-for="(category, index) in project.categories" :key="index">
        {{ category.title }}</h2
      >
      <p class="project__description">{{ project.description }}</p>
      <div class="project__images">
        <img
        class="project__img"
          loading="lazy"
          v-for="image in project.imagesCollection"
          :key="image.id"
          :src='`${baseURL}${image.url}`' 
          :alt="image.alternativeText" 
          :srcset="`${baseURL}${image.formats.thumbnail.url} ${image.formats.thumbnail.width}w,
                  ${baseURL}${image.formats.small.url} ${image.formats.small.width}w,
                  ${baseURL}${image.formats.medium.url} ${image.formats.medium.width}w,
                  ${baseURL}${image.formats.large.url} ${image.formats.large.width}w`"
          sizes="100vw">
      </div>

    </div>
  </div>
</template>

<script>
import project from '~/apollo/queries/project.gql'
export default {
  data() {
    return {
      project: null,
      baseURL: this.$config.http.imageURL
    }
  },

  apollo: {
    project: {
      prefetch: true,
      query: project,
      update: (project) => project.projectBySlug,
      variables() {
        return {
          slug: this.$route.params.slug,
        }
      },
    },
  },

}
</script>

<style lang="scss" scoped>
.project {
  flex-grow: 1;
}

.project__container {
  @include grid
}

.project__title {
  font-size: 1.5rem;
  grid-column: 4 / span 1;
}
.project__description {
  grid-column: 4 /span 2;
}
.project__categories {
  grid-column: 5 / span 1;
}
.project__images{
  display: flex;
  grid-column: 1 /7;
}

</style>