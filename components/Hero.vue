<template>
  <div class="hero">
    <div class="hero__wrapper">
      <h1 ref="title" class="hero__title title-1">
        {{ home.title }}
      </h1>
      <span class="hero__job-wrapper">
        <div>
          <h2 ref="subTitle" class="hero__job overlay title-4">
            {{ home.job }}
          </h2>
        </div>
      </span>
      <div
        ref="paragraph"
        v-html="$md.render(home.bio)"
        class="hero__bio-wrapper paragraph-big"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    home: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {}
  },

  mounted() {
    this.spanify(this.$refs.title)
    this.animation()
  },
  methods: {
    spanify(el) {
      const words = el.innerHTML.split(' ')
      el.innerHTML = ''
      return words
        .filter((word) => word.match(/[A-za-z0–9_]/g))
        .map((word, index) => {
          const wrapper = document.createElement('span')
          const spanEL = document.createElement('span')
          wrapper.setAttribute(
            'class',
            `word-wrapper ${index % 2 === 0 ? 'odd' : 'even'}`
          )
          spanEL.setAttribute('class', 'title-line')
          spanEL.innerHTML = word
          wrapper.appendChild(spanEL)
          el.appendChild(wrapper)
          return el
        })
    },
    animation() {
      const title = this.$refs.title.querySelectorAll('.title-line')
      const subTitle = this.$refs.subTitle
      const paragraph = this.$refs.paragraph
      const subTitleRule = this.$CSSRulePlugin.getRule('.overlay::before')

      const tl = this.$gsap.timeline()

      this.$gsap.set(subTitle, { x: '-100%' })
      this.$gsap.set(subTitleRule, { cssRule: { x: '0%' } })
      this.$gsap.set(paragraph, { y: '20%', opacity: 0 })

      tl.fromTo(
        title,
        0.7,
        { y: '100%' },
        { y: '0%', delay: 1, stagger: 0.2, ease: 'power4.out' }
      )
      tl.to(subTitle, { duration: 0.7, x: '0%', ease: 'power4.out' }, '-=0.7')
      tl.to(subTitleRule, { duration: 0.7, cssRule: { x: '101%' } })
      tl.to(
        paragraph,
        { duration: 1, y: '0%', opacity: 1, ease: 'power4.out' },
        '-=0.2'
      )
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

  .load {
    display: none;
  }

  .hero__title {
    display: flex;
    flex-direction: column;
    grid-column: 2 / span 3;
    margin: 88px 0 64px 0;
    opacity: 1;
    .odd,
    .even {
      overflow: hidden;
    }
    .even {
      align-self: flex-end;
    }
    .title-line {
      display: block;
    }
    @include mobile {
      grid-column: 2 / span 2;
    }
  }
  .hero__job-wrapper {
    grid-column: 3 / span 3;

    div {
      overflow: hidden;
      width: fit-content;
    }
    @include mobile {
      grid-column: 2 / span 2;
    }
  }
  .hero__job {
    position: relative;
    width: fit-content;
    color: var(--clr-klein-blue);
    margin: 0 0 24px 0;
    text-transform: uppercase;
  }

  .hero__job::after {
    content: '';
    position: absolute;
    width: 75px;
    height: 2px;
    bottom: -8px;
    left: 0;
    background: var(--clr-klein-blue);
  }

  .hero__bio-wrapper {
    overflow: hidden;
    grid-column: 3 / span 3;
  }

  .hero__bio {
    margin: 16px 0 80px 0;
    display: block;

    text-align: justify;
    @include mobile {
      grid-column: 2 / span 2;
      text-align: left;
    }
  }
}
</style>
