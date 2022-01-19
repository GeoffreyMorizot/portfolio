<template>
  <div class="project">
    <div v-if="isLoading"><Loading /></div>
    <div v-if="!isLoading" class="project__container">
      <!-- TOP NAV BACK BTN -->
      <header class="back">
        <BackBtn />
      </header>
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
            <div class="content__title-line"></div>
            <h1 class="content__title title-3">{{ project.title }}</h1>
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
      <p class="project__description paragraph-small">
        {{ project.description }}
      </p>
      <div class="project__images">
        <img
          v-for="image in project.imagesCollection"
          :key="image.id"
          class="project__img"
          loading="lazy"
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
    <div v-if="!isLoading" class="back back--bottom">
      <BackBtn />
    </div>
  </div>
</template>

<script>
import Loading from '~/components/common/Loading.vue'
import ProjectSpec from '~/components/ProjectSpec.vue'
import BackBtn from '~/components/project/BackBtn.vue'
import project from '~/apollo/queries/project.gql'

export default {
  components: {
    ProjectSpec,
    BackBtn,
    Loading,
  },
  layout: 'projectLayout',
  data() {
    return {
      project: null,
      baseURL: this.$config.http.imageURL,
    }
  },
  computed: {
    isLoading() {
      return this.$apollo.queries.project.loading
    },
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
.back {
  display: flex;
  align-items: center;
  min-height: space(20);
  font-family: var(--secondary-ff);
  color: var(--clr-cheese);
  z-index: 100;
}

.back--bottom {
  @include grid;
  & > div {
    grid-column: 5;
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
  align-items: baseline;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.content__title-line {
  grid-column: 6 / span 2;
  width: 87%;
  height: clamp(3.5px, 0.35vw, 6px);
  background: var(--clr-klein-blue);
}

.content__title {
  grid-column: 8 / span 3;
  position: relative;
  margin-bottom: space(11);
}
.content__link {
  grid-column: 8 / span 3;
}

.specs {
  grid-column: 8 / span 3;
  display: flex;
  flex-direction: column;
  row-gap: space(2);
}

.project__description {
  grid-column: 2 / span 3;
  margin: 80px 0;
}

.project__images {
  grid-column: 2 / span 4;
  display: flex;
  flex-direction: column;

  margin-bottom: space(20);
}

.project__images > img:not(:last-child) {
  margin-bottom: space(10);
}

// TABLET

@include tablet {
  .back {
    min-height: space(10);
    position: fixed;
    bottom: 0;
    right: 10px;
  }
  .back--bottom {
    display: none;
  }
  .content__header {
    display: flex;
    flex-direction: column-reverse;
    margin-top: space(4);
    min-height: 100vh;
  }
  .content__top-img {
    width: 100%;
  }

  .content__detail {
    position: relative;
    margin-bottom: space(8);
  }
  .content__detail .content__title-line {
    grid-column: 1 / span 2;
    width: 13vw;
    height: 6px;
  }
  .content__detail .content__title {
    grid-column: 3 / span 9;
    margin-bottom: 14vh;
    font-size: 4rem;
  }
  .content__detail .specs {
    grid-column: 3 / span 8;
  }
  .specs {
    row-gap: space(2);
  }
  .project__description {
    grid-column: 2 / span 4;
    text-align: justify;
  }
  .project__images {
    margin-bottom: space(20);
  }
}

// MOBILE

@include mobile {
  .project__description {
    grid-column: 1 / span 4;
    margin: space(8) space(2);
  }
  .project__images {
    grid-column: 1 / span 4;
  }
  .content__detail {
    @include gridX2;
  }
  .content__detail .content__title-line {
    width: 21.75vw;
    height: 3px;
  }
  .content__detail .content__title {
    grid-column: 3 / span 5;
    margin-bottom: space(6);
    font-size: 2rem;
  }

  .content__detail .specs {
    grid-column: 2 / span 6;
  }
}
</style>
