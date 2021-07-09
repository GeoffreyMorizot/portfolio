<template>
  <article class="project-container">
    <div class="project__wrapper">
      <nuxt-link :to="`/project/${project.slug}`" class="project__img">
        <img
          width="720"
          height="480"
          loading="lazy"
          :src="`${baseURL}${cover.url}`"
          :alt="`${cover.alternativeText}`"
          :srcset="`${baseURL}${formats.thumbnail.url} ${formats.thumbnail.width}w,
                  ${baseURL}${formats.small.url} ${formats.small.width}w,
                  ${baseURL}${formats.medium.url} ${formats.medium.width}w,
                  ${baseURL}${formats.large.url} ${formats.large.width}w`"
          sizes="50vw"
        />
      </nuxt-link>
    </div>
    <nuxt-link :to="`/project/${project.slug}`">
      <h3 class="project__title">{{ project.title }}</h3>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: null,
    },
  },
  data() {
    const {
      cover,
      cover: { formats },
    } = this.project
    return {
      cover,
      formats,
      baseURL: this.$config.http.imageURL,
    }
  },
}
</script>

<style lang="scss">
:host {
  display: inline;
}

.project-container {
  width: 100%;
  display: flex;
  position: relative;

  .project__title {
    transform: translate3d(-50%, -50%, 0);
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: 30%;
  }

  &:nth-child(odd) {
    flex-direction: row;
    .project__title {
      text-align: left;
    }
  }

  &:nth-child(even) {
    flex-direction: row-reverse;
    .project__title {
      text-align: right;
    }
  }
}

.project__img {
  width: 50%;
  height: 100%;

  img {
    filter: grayscale(100%);
  }
}
</style>
