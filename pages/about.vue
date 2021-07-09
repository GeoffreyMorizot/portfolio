<template>
  <div class="container-about">
    <div v-if="isLoading" class="about-loader">
      <span>LOADING</span>
    </div>
    <div v-if="!isLoading">
      <div>
        <header class="about-header">
          <div class="about-header__text">
            <h1 class="about-header__title overlay title-2">
              {{ about.pageTitle }}
            </h1>
            <div
              ref="paragraph"
              class="paragraph-big"
              v-html="$md.render(about.headerText)"
            ></div>
          </div>
          <div class="about-header__img-wrapper">
            <Gimage
              class="about-header__img overlay"
              :alt="about.imageProfil.alternativeText"
              width="1440"
              height="1977"
              loading="lazy"
              baseUrl=""
              :source="about.imageProfil.url"
              :srcSet="about.imageProfil.formats"
              sizes="41.66vw"
            />
          </div>
        </header>
        <main class="about-content">
          <section class="experiences">
            <h2 class="experiences__title title-3">Expériences</h2>
            <Experience
              v-for="experience in experienceData"
              :key="experience.id"
              :experience="experience"
            />
          </section>
          <div class="skills-educations">
            <section ref="skills" class="skills">
              <h2 class="skills___title title-3">Compétences</h2>
              <div class="skills__wrapper">
                <div
                  v-for="skill in skillsData"
                  :key="skill.id"
                  ref="skill"
                  class="anim-js"
                >
                  <Skill class="skill-comp" :skill="skill" />
                </div>
              </div>
            </section>
            <section ref="educations" class="educations">
              <h2 class="educations___title title-3">Formations</h2>
              <div class="educations__wrapper">
                <div
                  v-for="education in educationsData"
                  :key="education.id"
                  ref="education"
                  class="anim-js"
                >
                  <Education class="education-comp" :education="education" />
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import about from '~/apollo/queries/about'

import Gimage from '~/components/common/Gimage'
import Experience from '~/components/about/Experience.vue'
import Skill from '~/components/about/Skill.vue'
import Education from '~/components/about/Education.vue'

export default {
  components: {
    Gimage,
    Experience,
    Skill,
    Education,
  },
  data() {
    return {
      elements: [],
    }
  },
  computed: {
    experienceData() {
      return this.about.experiencesList
    },
    skillsData() {
      return this.about.skills
    },
    educationsData() {
      return this.about.educations
    },
    isLoading() {
      return this.$apollo.queries.about.loading
    },
  },
  updated() {
    this.$nextTick(function () {
      this.elements = [this.$refs.educations, this.$refs.skills]
      this.animationReavel()
      this.setIntersectionObserver()
    })
  },
  mounted() {
    this.$nextTick(function () {
      if (
        Object.entries(this.$refs).length === 0 &&
        this.$refs.constructor === Object
      )
        return
      this.animationReavel()
      this.setIntersectionObserver()
    })
  },
  apollo: {
    about: {
      prefetch: true,
      query: about,
    },
  },
  methods: {
    setProperties() {
      this.$gsap.set([this.$refs.skill, this.$refs.education], {
        y: '100%',
        opacity: 0,
      })
    },
    animationReavel() {
      const overlayEL = this.$el.querySelectorAll('.overlay')
      const rule = this.$CSSRulePlugin.getRule('.overlay::before')
      this.$gsap.set(overlayEL, { x: '-100%' })
      this.$gsap.set(rule, { cssRule: { x: '0%' } })

      const tl = this.$gsap.timeline()
      const duration = 0.7

      tl.to(overlayEL, duration, { delay: 0.3, x: '0%', stagger: 0.5 })
      tl.to(rule, duration, { cssRule: { x: '100%' } })

      tl.fromTo(
        this.$refs.paragraph,
        { y: '20%', opacity: 0 },
        { duration: 1, y: '0%', opacity: 1, ease: 'power4.out' },
        '-=0.5'
      )
    },
    animationList(arrayEL, d) {
      const tl = this.$gsap.timeline()
      tl.fromTo(
        arrayEL,
        0.4,
        { y: '100%', opacity: 0 },
        { y: '0', opacity: 1, delay: d, stagger: 0.2 }
      )
    },
    setIntersectionObserver() {
      this.setProperties()

      if (this.supportIntersectionObserver) {
        const observerCallback = (intersections) => {
          if (intersections[0].isIntersecting) {
            intersections.reverse().forEach((i, index) => {
              this.animationList(
                i.target.querySelectorAll('.anim-js'),
                index * 0.2
              )
              observer.unobserve(i.target)
            })
          }
        }
        const observer = new IntersectionObserver(observerCallback, {
          threshold: 0.7,
        })

        const elements = [this.$refs.educations, this.$refs.skills]

        elements.forEach((el) => {
          observer.observe(el)
        })
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

<style lang="scss">
.about-loader {
  display: grid;
  place-items: center;
  height: 100vh;
}

.container-about {
  flex-grow: 1;

  @include tablet {
    .about-header {
      padding: 80px 0 0 0;
    }
    .about-header__title {
      margin-bottom: 40px;
    }
    .skills-educations {
      flex-direction: column;
      row-gap: 64px;
    }

    .skills,
    .educations {
      width: 100%;
    }
    .skills___title,
    .educations___title {
      margin: 0 0 56px 0;
    }
  }
  @include mobile {
    .experiences {
      grid-column: 2 / span 2;
    }
    .skills-educations {
      grid-column: 2 / span 2;
    }
  }
}
.about-header {
  @include gridX2;
  padding: 160px 0 0 0;
  min-height: 57.2vw;
}
.about-header__text {
  overflow: hidden;
  grid-column: 3 / span 4;
}
.about-header__title {
  margin-bottom: 96px;
  position: relative;
}

.about-header__img-wrapper {
  color: var(--clr-cheese);
  overflow: hidden;
  position: absolute;
  width: calc((100% / 12) * 5);
  top: 0;
  right: 0;
  z-index: -1000;
}

.about-content {
  @include grid;
}

.experiences {
  grid-column: 2 / span 4;
  margin: 120px 0 0 0;
}
.experiences__title {
  grid-column: 2 / span 2;
  margin: 0 0 88px 0;
}

.skills-educations {
  grid-column: 2 / span 4;
  display: flex;
  margin: 120px 0 0 0;
}

.skills {
  width: 50%;
  padding: 0 48px 0 0;
}

.skills___title,
.educations___title {
  margin: 0 0 88px 0;
}

.skills__wrapper {
  display: grid;
  row-gap: 24px;
}

.educations {
  width: 50%;
}

.educations__wrapper {
  display: grid;
  row-gap: 24px;
}
</style>
