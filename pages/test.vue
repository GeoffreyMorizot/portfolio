<template>
  <div class="container-test" v-if="!this.$apollo.queries.home.loading">
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <Project2
      v-for="(project, index) in projects"
      :key="project.id"
      :project="project"
      :index="index"
    />
  </div>
</template>

<script>
import Project2 from '~/components/Project2.vue'
import home from '~/apollo/queries/home.gql'

export default {
  components: { Project2 },
  data() {
    return {
      home: null,
    }
  },
  computed: {
    projects() {
      return this.home.projects
    },
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
.container-test {
  flex-grow: 1;
  width: 100%;
}
</style>
