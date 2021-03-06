<template>
  <div class="container-about">
    <div v-if="isLoading">
      <Loading />
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
              class="about__desc paragraph-big"
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
              base-url=""
              :source="about.imageProfil.url"
              :src-set="about.imageProfil.formats"
              sizes="41.66vw"
            />
          </div>
          <div class="about__actions">
            <a href="CV-G-MORIZOT.pdf" target="_blank" rel="noopener noreferrer"
              >cv</a
            >
            <a
              href="https://www.linkedin.com/in/geoffrey-morizot-developer"
              target="_blank"
              rel="noopener noreferrer"
              >Linkedin</a
            >
            <a
              href="https://github.com/GeoffreyMorizot"
              target="_blank"
              rel="noopener noreferrer"
              >github</a
            >
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
import Loading from '~/components/common/Loading.vue'
import Experience from '~/components/about/Experience.vue'
import Skill from '~/components/about/Skill.vue'
import Education from '~/components/about/Education.vue'

export default {
  components: {
    Loading,
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
.container-about {
  flex-grow: 1;
}
.about-header {
  @include gridX2;
  padding: space(20) 0 0 0;
  min-height: 57.2vw;
}
.about-header__text {
  overflow: hidden;
  grid-column: 3 / span 4;
}
.about-header__title {
  margin-bottom: space(10);
  position: relative;
}

.about__desc {
  p {
    br {
      content: '';
      display: block;
      margin: 16px 0;
    }
  }
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
  @include gridX2;
}

.about__actions {
  display: flex;
  grid-column: 3 / span 4;
  height: fit-content;
  margin-top: space(7);

  a {
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    text-align: center;
    height: fit-content;
    background: white;
    border: 1px solid var(--clr-cheese);
    color: var(--clr-cheese);
    font-family: var(--ff);
    font-weight: 700;
    padding: 0.75rem 0;
    transition: flex-grow 0.2s ease-out;
    text-transform: uppercase;
    &:not(:last-child) {
      border-right: none;
    }
    &:hover {
      flex-grow: 2;
      transition: flex-grow 0.3s ease-out;
      color: white;
      background: transparent;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      transform: scaleX(0);
      transition: all 0.3s ease-in;
      background: var(--clr-cheese);
      transform-origin: left;
      z-index: -1;
    }
    &:hover::after {
      transform: scaleX(1);
      transition: all 0.3s ease-in;
    }
  }
}

.experiences {
  grid-column: 3 / span 8;
  margin: space(19) 0 0 0;
}
.experiences__title {
  grid-column: 2 / span 2;
  margin: 0 0 space(11) 0;
}

.skills-educations {
  grid-column: 3 / span 8;
  display: flex;
  margin: space(15) 0 space(30) 0;
}

.skills {
  width: 50%;
  padding: 0 space(6) 0 0;
}

.skills___title,
.educations___title {
  margin: 0 0 space(11) 0;
}

.skills__wrapper {
  display: grid;
  row-gap: space(3);
}

.educations {
  width: 50%;
}

.educations__wrapper {
  display: grid;
  row-gap: space(3);
}

//TABLET

@include tablet {
  .about-header {
    padding: space(10) 0 0 0;
  }
  .about-header__title {
    margin-bottom: 40px;
  }
  .skills-educations {
    flex-direction: column;
    row-gap: space(8);
  }

  .skills,
  .educations {
    width: 100%;
  }
  .skills___title,
  .educations___title {
    margin: 0 0 space(7) 0;
  }
}

//MOBILE

@include mobile {
  .experiences,
  .skills-educations {
    grid-column: 2 / span 6;
  }
  .about-header__text {
    grid-column: 2 / span 6;
  }
  .about-header__img-wrapper {
    display: none;
  }
  .about__actions {
    display: flex;
    grid-column: 2 / span 6;
    height: fit-content;
    margin-top: space(7);
  }
}
</style>
