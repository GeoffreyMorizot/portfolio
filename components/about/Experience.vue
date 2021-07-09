<template>
  <article v-if="experience !== null" class="experience">
    <div ref="topLine" class="experience__top-line"></div>
    <section class="experience__period">
      <div ref="period">
        <time :datetime="experience.period.startDate">{{
          experience.period.startDate | formatDate() | changeSeparator()
        }}</time>
        <span>→</span>
        <time
          :datetime="
            experience.period.endDate === null
              ? new Date()
              : experience.period.endDate
          "
          >{{
            experience.period.endDate | formatDate() | changeSeparator()
          }}</time
        >
      </div>
    </section>
    <section
      class="experience__content"
      @click.prevent="collapse()"
      @keyup.enter="collapse()"
    >
      <header tabindex="0" class="content__top">
        <h4 ref="title" class="title-5">{{ experience.title }}</h4>
        <div ref="btn" class="btn-wrapper">
          <OpenIcon :opened="isOpen" duration="0.1s" color="#0025bb" />
        </div>
      </header>
      <article class="content__bottom">
        <h5 ref="subTitle">{{ experience.subTitle }}</h5>
        <transition name="fade">
          <div
            v-show="isOpen"
            class="list__xp"
            :class="{ opened: isOpen }"
            v-html="$md.render(experience.description)"
          ></div>
        </transition>
      </article>
    </section>
  </article>
</template>

<script>
import OpenIcon from '~/components/about/OpenIcon.vue'
export default {
  components: { OpenIcon },
  filters: {
    formatDate(value) {
      if (!value) return "Aujourd'hui"
      return new Date(value).toLocaleDateString('fr-FR', {
        month: 'numeric',
        year: 'numeric',
      })
    },
    changeSeparator(value) {
      return value.replace(/\//g, '-')
    },
  },
  props: {
    experience: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  mounted() {
    this.setIntersectionObserver()
  },
  methods: {
    collapse() {
      return (this.isOpen = !this.isOpen)
    },
    startAnimation() {
      const tl = this.$gsap.timeline()
      tl.fromTo(
        this.$refs.topLine,
        { x: '-100%' },
        { duration: 0.4, x: '0%', ease: 'power3.out' }
      )
      tl.fromTo(
        this.$refs.period,
        { y: '100%' },
        { duration: 0.4, y: '0%', ease: 'power3.out' },
        '-=0.2'
      )
      tl.fromTo(
        this.$refs.title,
        { y: '100%' },
        { duration: 0.4, y: '0%', ease: 'power3.out' },
        '-=0.2'
      )
      tl.fromTo(
        this.$refs.subTitle,
        { opacity: 0 },
        { duration: 0.4, opacity: 1, ease: 'power3.out' },
        '-=0.1'
      )
      tl.fromTo(
        this.$refs.btn,
        { opacity: 0 },
        { duration: 0.7, opacity: 1, ease: 'power3.out' },
        '-=0.5'
      )
    },
    setIntersectionObserver() {
      if (this.supportIntersectionObserver) {
        this.$gsap.set(this.$refs.topLine, {
          x: '-100%',
        })
        this.$gsap.set([this.$refs.title, this.$refs.period], {
          y: '100%',
        })
        this.$gsap.set([this.$refs.subTitle, this.$refs.btn], {
          opacity: 0,
        })
        const observer = new IntersectionObserver(
          (intersections) => {
            if (intersections[0].isIntersecting) {
              this.startAnimation()
              observer.unobserve(this.$el)
            }
          },
          { threshold: 0.5 }
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
.experience {
  overflow: hidden;
  position: relative;
  display: flex;
  width: 100%;
  min-height: 105px;
  row-gap: 8px;
  font-family: var(--ff);
  color: var(--clr-klein-blue);

  .experience__top-line {
    position: absolute;
    top: 0;
    width: 100%;
    height: 2px;
    background: var(--clr-klein-blue);
  }

  @include tablet {
    flex-direction: column;
    min-height: 93px;
    .experience__period {
      width: 100%;
      padding: 0;
    }
    .experience__content {
      width: 100%;
    }
  }
}

.experience__period,
.experience__content {
  margin-top: 12px;
}

.experience__period {
  overflow: hidden;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  height: fit-content;
  width: calc(100% / 4);
  padding: 0 32px 0 0;
  font-size: clamp(14px, 1.1vw, 16px);
}

.experience__content {
  cursor: pointer;
  width: calc((100% / 4) * 3);
}

.content__top {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 16px;
  font-size: clamp(1.2rem, 1.5vw, 1.7rem);

  img {
    height: clamp(16px, 1.5vw, 24px);
    width: auto;
    will-change: transfrom;
    transition: transform 0.2s ease-in-out;
  }
}

.content__bottom {
  font-family: var(--secondary-ff);
  line-height: 1.5;
  margin-bottom: 32px;

  h5 {
    color: var(--clr-cheese);
  }

  .list__xp {
    margin: 16px 0 0 0;

    &.opened {
    }
  }
}

// TRANSITION
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
