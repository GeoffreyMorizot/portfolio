<template>  
     <div class="container-test" v-if="!this.$apollo.queries.about.loading">

            <Experience v-for="experience in experienceData" :key="experience.id" :experience="experience"/>

     </div>
</template>

<script>
import about from '~/apollo/queries/about.gql'
import Gimage from '~/components/Gimage'
import BackBtn from '~/components/BackBtn'
import Experience from '~/components/Experience'

export default {
    components: {  
        Gimage,
        BackBtn,
        Experience
    },
    computed:{
        experienceData(){
            return this.about.experiencesList
        }
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
.container-test{
    flex-grow: 1;
    width: calc((100vw / 6) * 4);
}
</style>