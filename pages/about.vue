<template>
  <div v-if="!this.$apollo.queries.about.loading" class="container-about">
    <main>
      <header class="about-header">
        <div class="about-header__text">
          <h1 class="about-header__title title-2">{{ about.pageTitle }}</h1>
          <p class="paragraph-big">{{ about.headerText }}</p>
        </div>
        <Gimage
          class="about-header__img"
          :alt="about.imageProfil.alternativeText"
          width="1440"
          height="1977"
          baseUrl=""
          loading="lazy"
          :source="about.imageProfil.url"
          :srcSet="about.imageProfil.formats"
          sizes="41.66vw"
        />
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
          <section class="skills">
            <h2 class="skills___title title-3">Compétences</h2>
            <div class="skills__wrapper">
              <Skill
                class="skill-comp"
                v-for="skill in skillsData"
                :key="skill.id"
                :skill="skill"
              />
            </div>
          </section>
          <section class="educations">
            <h2 class="educations___title title-3">Formations</h2>
            <div class="educations__wrapper">
              <Education
                class="education-comp"
                v-for="education in educationsData"
                :key="education.id"
                :education="education"
              />
            </div>
          </section>
        </div>
      </main>
    </main>
  </div>
</template>

<script>
import about from '~/apollo/queries/about'
import Gimage from '~/components/Gimage'
import Experience from '~/components/Experience'
import Skill from '~/components/Skill'
import Education from '~/components/Education'

export default {
  components: {
    Gimage,
    Experience,
    Skill,
    Education,
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
  },
  apollo: {
    about: {
      prefetch: true,
      query: about,
    },
  },
}
</script>

<style lang="scss">
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
  grid-column: 3 / span 4;
}
.about-header__title {
  margin-bottom: 96px;
}
.about-header__img {
  grid-column: 8 / span 5;
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
  display: flex;
  flex-direction: column;
  row-gap: 24px;
}

.educations {
  width: 50%;
}

.educations__wrapper{
display: flex;
  flex-direction: column;
  row-gap: 24px;
}
</style>
