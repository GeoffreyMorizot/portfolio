<template>
  <div class="container-test" v-if="!this.$apollo.queries.about.loading">
    <Experience
      v-for="experience in experienceData"
      :key="experience.id"
      :experience="experience"
    />
    <OpenIcon duration="0.1s" color="#0025bb" />
  </div>
</template>

<script>
import about from '~/apollo/queries/about.gql'

import Experience from '~/components/about/Experience'
import OpenIcon from '~/components/about/OpenIcon'

export default {
  components: {
    Experience,
    OpenIcon,
  },

  computed: {
    experienceData() {
      return this.about.experiencesList
    },
  },
  apollo: {
    about: {
      prefetch: true,
      query: about,
    },
  },
}
</script>


<style lang="scss" scoped>
.container-test {
  flex-grow: 1;
  width: calc((100vw / 6) * 4);
}
</style>