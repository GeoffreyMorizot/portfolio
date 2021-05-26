<template>
  <div class="hero">
      <div class="hero__wrapper">
            <h1 class="hero__title">{{ home.title }}</h1>
            <h2 class="hero__job">{{ home.job }}</h2>
            <p class="hero__bio">{{ home.bio }}</p>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    home: {
      type: Object,
      default: '',
    },
  },
}
</script>

<style lang="scss">
.hero {
    width: 100%;
    min-height: 150vh;

  .hero__wrapper {
      @include grid;
      width: 100%;
  }

  .hero__title {
    grid-column: 2 / span 3;
    text-align-last: right;
       margin: 88px 0 64px 0;
    color: var(--clr-cheese);

    @include mobile {
      grid-column: 2 / span 2;
    }
  }
  .hero__job {
    position: relative;
    grid-column: 3 / span 2;
        margin: 0 0 24px 0;
    text-transform: uppercase;
    @include mobile {
      grid-column: 2 / span 2;
    }
    &::after {
      content: '';
      position: absolute;
      width: 75px;
      height: 2px;
      bottom: -8px;
      left: 0;
      background: #0025bb;
    }
  }
  .hero__bio {
    grid-column: 3 / span 3;
    margin: 16px 0 80px 0;
   
    text-align: justify;
    @include mobile {
      grid-column: 2 / span 2;
      text-align: left;
    }
  }
}
</style>