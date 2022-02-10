<template>
  <article
    :data-oddeven="index % 2"
    :data-title="project.title"
    class="project"
  >
    <div class="project__img2">
      <div ref="overlay" class="reveal-overlay"></div>
      <div ref="image" class="img__wrapper">
        <nuxt-link :aria-label="project.title" :to="`/project/${project.slug}`">
          <Gimage
            ref="image"
            class="img"
            :alt="project.cover.alternativeText"
            width="720"
            height="480"
            loading="lazy"
            :base-url="baseURL"
            :source="project.cover.url"
            :src-set="project.cover.formats"
            sizes="50vw"
          />
        </nuxt-link>
      </div>
    </div>
    <div :data-title="project.title" class="project__body">
      <nuxt-link :to="`/project/${project.slug}`">
        <h3 ref="title">{{ project.title }}</h3>
      </nuxt-link>
    </div>
  </article>
</template>

<script>
import Gimage from '~/components/common/Gimage'

export default {
  components: {
    Gimage,
  },
  props: {
    project: {
      type: Object,
      required: true,
      default: null,
    },
    index: {
      type: Number,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      baseURL: this.$config.http.imageURL,
    }
  },
  mounted() {
    this.setProperties()
    this.setIntersectionObserver()
  },
  methods: {
    setProperties() {
      if (this.index % 2 === 0) {
        this.$gsap.set(this.$refs.overlay, { x: '-100%' })
        this.$gsap.set(this.$refs.title, { opacity: 0, x: '-20%' })
      } else {
        this.$gsap.set(this.$refs.overlay, { x: '100%' })
        this.$gsap.set(this.$refs.title, { opacity: 0, x: '20%' })
      }
      this.$gsap.set(this.$refs.image, { opacity: 0 })
    },
    startAnimation() {
      const tl = this.$gsap.timeline()
      tl.to(this.$refs.overlay, { duration: 0.7, x: '0%', ease: 'power3.out' })
      tl.to(this.$refs.image, { duration: 0, opacity: 1 })
      tl.to(this.$refs.overlay, {
        duration: 0.7,
        x: this.index % 2 === 0 ? '100%' : '-100%',
        ease: 'power3.out',
      })
      tl.to(this.$refs.title, { opacity: 1, x: 0 }, '-=0.7')
    },
    setIntersectionObserver() {
      if (this.supportIntersectionObserver) {
        const observer = new IntersectionObserver(
          (intersections) => {
            intersections.forEach((entry) => {
              if (entry.isIntersecting) {
                this.startAnimation()
                observer.unobserve(this.$el)
              }
            })
          },
          { threshold: 0.3 }
        )
        observer.observe(this.$el)
      }
    },
    supportIntersectionObserver() {
      return (
        'IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.project {
  display: flex;
  position: relative;
  width: 100%;
  color: var(--clr-cheese);
  overflow: hidden;

  &::after {
    content: attr(data-title);
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    font-family: var(--secondary-ff);
    font-weight: 500;
    font-size: 20vw;
    white-space: nowrap;
    color: transparent;
    -webkit-text-stroke: 0.5px rgb(4, 25, 161);
    -webkit-text-stroke: 1px var(--clr-cheese);
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-transform: uppercase;
    transform: translate(7vw, 0);
    opacity: 0.2;
    z-index: -1;
  }
}

.project:hover {
  .project__img2 {
    .img {
      transform: scale(1.05);
      transition: all 0.7s ease-out;
      filter: grayscale(0%);
    }
  }
}

.project {
  .project__img2 {
    .img {
      transform: scale(1);
      transition: all 0.5s ease-in 0s;
      filter: grayscale(100%);
    }
  }
}

.project:nth-child(even) {
  flex-direction: row-reverse;
  &::after {
    justify-content: flex-start;
    transform: translate(-7vw, 0);
  }
}
.project__img2,
.project__body {
  width: 50%;
  overflow: hidden;
}

.project__img2 {
  position: relative;
  cursor: pointer;
}

.project__body {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  h3 {
    font-family: var(--ff);
    font-size: clamp(32px, 3.5vw, 64px);
    font-weight: 500;
    color: var(--clr-klein-blue);
    cursor: pointer;
  }
}

.reveal-overlay {
  position: absolute;
  inset: 0;
  background: currentColor;
  z-index: 100;
  transform: translate3d(-101%, 0, 0);
  transform-origin: left;
}

//---- MEDIA QUERIES
.project {
  @include mobile {
    flex-direction: column;
    margin-bottom: space(8);
    &:nth-child(even) {
      flex-direction: column;
    }
    &::after {
      display: none;
    }
    .project__img2,
    .project__body {
      width: 100%;
      overflow: hidden;
    }
    .project__body {
      position: relative;
      &::after {
        content: attr(data-title);
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        font-family: var(--secondary-ff);
        font-weight: 500;
        font-size: 20vw;
        white-space: nowrap;
        color: transparent;
        -webkit-text-stroke: 0.5px rgb(4, 25, 161);
        -webkit-text-stroke: 1px var(--clr-cheese);
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        transform: translate(0, 0);
        opacity: 0.2;
        z-index: -1;
      }
      h3 {
        font-size: 9vw;
        line-height: 24vw;
      }
    }
  }
}
</style>
