<template>
  <main v-if="!$apollo.queries.home.loading" class="main">
    <Hero :home="home" />
    <div class="home__title-section">
      <h4 class="title-3">{{ home.nameSection }}</h4>
    </div>
    <Project2
      v-for="(project, index) in home.projects"
      :key="project.id"
      :project="project"
      :index="index"
    />
    <div class="contact-container">
      <h5 class="contact__title title-6 hyphen">Pour me contacter</h5>
      <a class="contact__email title-3" href="mailto:gffr.mrzt@gmail.com"
        >gffr.mrzt@gmail.com</a
      >
    </div>
  </main>
</template>

<script>
import home from '~/apollo/queries/home.gql'

import Hero from '~/components/Hero'
import Project2 from '~/components/Project2'

export default {
  components: {
    Project2,
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

.home__title-section {
  @include grid;
  margin-bottom: space(18);

  h4 {
    grid-column: 2 / span 2;
    position: relative;
    text-transform: capitalize;
    color: var(--clr-cheese);
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: -0.026em;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(-95%, -81%);

      width: 34vw;
      height: 30vw;
      background: center / contain no-repeat url('~assets/images/arrow.svg');
    }
  }
}
.contact-container {
  height: space(80);
  padding: 0 calc(100vw / 6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  .contact__title {
    font-size: clamp(0.7rem, 2vw, 1.3rem);
  }

  .contact__email {
    align-self: center;
    font-size: clamp(24px, 5vw, 72px);
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(48%, -35%);
      width: 9vw;
      height: 22vw;
      background: center / contain no-repeat url('~assets/images/dashes.svg');
    }
  }
}
// MOBILE

@include mobile {
  .home__title-section {
    h4 {
      grid-column: 1 / span 2;
      text-align: center;
      &::before {
        transform: translate(-45%, -94%);

        width: 60vw;
        height: 40vw;
      }
    }
  }
  .contact-container {
    padding: 0 calc(100vw / 4);
  }
  .contact__email {
    margin-top: space(3);
  }
}
</style>
