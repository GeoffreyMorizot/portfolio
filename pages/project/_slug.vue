<template>
  <div class="project">
    <div v-if="this.$apollo.queries.project.loading">loading</div>
    <div
      v-if="!this.$apollo.queries.project.loading"
      class="project__container"
    >
      <!-- TOP NAV BACK BTN -->
      <div class="project__nav-back">
        <a @click="pageBack($router)" class="project__back-btn">
          <img
            class="btn__icon"
            width="42"
            height="33"
            src="../../assets/images/back-arrow.svg"
            alt=""
          />
          <span class="btn__label">
            <span>BACK</span>
          </span>
        </a>
      </div>
      <!-- END /////// TOP NAV BACK BTN -->
      <!-- SECTION TOP -->
      <section class="project__content">
        <div class="content__header">
          <img
            class="content__top-img"
            :src="`${baseURL}${project.cover.url}`"
            :srcset="`${baseURL}${project.cover.formats.thumbnail.url} ${project.cover.formats.thumbnail.width}w,
                  ${baseURL}${project.cover.formats.small.url} ${project.cover.formats.small.width}w,
                  ${baseURL}${project.cover.formats.medium.url} ${project.cover.formats.medium.width}w,
                  ${baseURL}${project.cover.formats.large.url} ${project.cover.formats.large.width}w`"
             sizes="50vw"
            alt=""
          />
          <div class="content__detail">
            <span class="content__title-line"></span>
            <h1 class="content__title">{{ project.title }}</h1>
            <div class="specs">
              <ProjectSpec
                v-if="project.domain !== null"
                :domain="project.domain"
                :codeLink="project.codeLink"
                :categories="project.categories"
              />
            </div>
          </div>
        </div>
      </section>
      <!--END ///// SECTION TOP -->
      <p class="project__description">{{ project.description }}</p>
      <div class="project__images">
        <img
          class="project__img"
          loading="lazy"
          v-for="image in project.imagesCollection"
          :key="image.id"
          :src="`${baseURL}${image.url}`"
          :alt="image.alternativeText"
          :srcset="`${baseURL}${image.formats.thumbnail.url} ${image.formats.thumbnail.width}w,
                  ${baseURL}${image.formats.small.url} ${image.formats.small.width}w,
                  ${baseURL}${image.formats.medium.url} ${image.formats.medium.width}w,
                  ${baseURL}${image.formats.large.url} ${image.formats.large.width}w`"
          sizes="66.66vw"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ProjectSpec from '~/components/ProjectSpec.vue'
import project from '~/apollo/queries/project.gql'

export default {
  layout: 'projectLayout',
  components: {
    ProjectSpec,
  },
  data() {
    return {
      project: null,
      baseURL: this.$config.http.imageURL,
      
    }
  },
  apollo: {
    project: {
      prefetch: true,
      query: project,
      update: (project) => project.projectBySlug,
      variables() {
        return {
          slug: this.$route.params.slug,
        }
      },
    },
  },
  methods: {
    pageBack(router) {
      router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
.project {
  flex-grow: 1;
}

.project__container {
  @include grid;
}
// BTN BACK
.project__nav-back {
  @include grid;
  position: relative;
  width: 100%;
  height: 160px;
  grid-column: 1 / span 6;
}
.project__back-btn {
  grid-column: 1 / span 1;
  position: absolute;
  display: flex;
  align-items: center;
  top: 50%;
  right: 0;
  transform: translate3d(0, -50%, 0);

  cursor: pointer;
  color: var(--clr-cheese);

  .btn__label {
    transform: translateX(0.6vw) rotate(270deg);
  }
}
// TOP CONTENT
.project__content {
  grid-column: 1 / span 6;
}
.content__header {
  position: relative;
}

.content__top-img {
  width: 50%;
}
.content__detail {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.content__title-line {
  grid-column: 6 / span 2;
  width: 87%;
  height: 7px;
  margin-top: 45px;
  background: var(--clr-klein-blue);
}

.content__title {
  grid-column: 8 / span 3;
  position: relative;
  margin-bottom: 88px;

  font-size: 3.5rem;
}
.content__link {
  grid-column: 8 / span 3;
}

.specs {
  grid-column: 8 / span 3;
  display: flex;
  flex-direction: column;
  row-gap: 16px;  
}

.project__description {
  grid-column: 2 / span 3;
  margin: 80px 0;
}

.project__images {
  grid-column: 2 / span 4;
  display: flex;
  flex-direction: column;
  row-gap: 80px;
}
</style>