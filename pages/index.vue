<template>
  <main class="main">
    {{ global.siteName }}
    {{ global.contactEmail }}
    {{ projects[0].Title }}
  </main>
</template>

<script>
import global from '~/apollo/queries/global.gql'
import projects from '~/apollo/queries/projects.gql'
import Project from '~/components/Project'
export default {
  components: {
        Project
  },
  apollo: {
    global: {
      prefetch: true,
      query: global,
    },
    projects: {
      prefetch: true,
      query: projects,
    },
  },  
}
</script>

<style lang="scss" scoped>
.main {
  margin: 0 auto;
  
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-grow: 1;

  background: var(--clr-cheese);
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
