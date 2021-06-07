<template>  
     <div class="container" v-if="!this.$apollo.queries.home.loading">
             <Gimage 
               v-for="project in projects" 
               :key="project.id" 
               :alt="project.cover.alternativeText"
               :width="'720'"
               :height="'480'"
               :loading="'lazy'"  
               :baseUrl="baseURL"
               :source="project.cover.url"
               :srcSet="project.cover.formats"
            />
     </div>
</template>

<script>
import home from '~/apollo/queries/home.gql'
import Gimage from '~/components/Gimage'

export default {
    components: {  
        Gimage
    },
    data() {
        return {
            baseURL: this.$config.http.imageURL
        }
    },
    computed: {
        projects(){
            return this.home.projects.map(project => project )
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