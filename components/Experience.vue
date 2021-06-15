<template>
  <article v-if="experience !== null" class="experience">
    <section class="experience__period">
      <time :datetime="experience.period.startDate">{{ experience.period.startDate | formatDate() | changeSeparator() }}</time>
      <span>→</span>
      <time :datetime="experience.period.endDate === null ? new Date : experience.period.endDate">{{ experience.period.endDate | formatDate() | changeSeparator() }}</time>
    </section>
    <section @click.prevent="collapse()" @keyup.enter="collapse()" class="experience__content">
      <header tabindex="0" class="content__top">
        <h4 class="title-5">{{ experience.title }}</h4>
        <img ref="icon" src="../assets/images/btn-open.svg" alt="icône déplier" />
      </header>
      <article class="content__bottom">
        <h5>{{ experience.subTitle }}</h5>
        <transition name="fade">
          <div v-show="open" v-html="$md.render(experience.description)"></div>
        </transition>
      </article>
      
    </section>
  </article>
</template>

<script>
export default {
  props: {
    experience: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      open: false,
    }
  },
  methods: {
    collapse() {
      this.open = !this.open
      this.open ? this.$refs.icon.style.transform = 'rotate(45deg)' : this.$refs.icon.style.transform = 'rotate(0deg)'
    },
  },
  filters: {
    formatDate(value) {
      if (!value) return "Aujourd'hui"
      return new Date(value).toLocaleDateString('fr-FR', {
        month: 'numeric',
        year: 'numeric',
      })
    },
    changeSeparator(value){
       return value.replace(/\//g, "-")
    }
  },
}
</script>

<style lang="scss" scoped>
.experience{
  position: relative;
  display: flex;
  width: 100%;
  min-height: 105px;
  row-gap: 8px;
  font-family: var(--ff);
  color: var(--clr-klein-blue);

  &:not(:last-child) {
    padding-bottom: 16px;
  }
  
  &::before{
    content:'';
    position: absolute;
    top: -16px;
    left: 0;
    width: 100%;
    height: 1.5px;
    background: var(--clr-klein-blue);
  }

  @include tablet {
    flex-direction: column;
    min-height: 93px;
    .experience__period {
      width: 100%;
      padding: 0;
    }
    .experience__content{
      width: 100%;
    }
  }
}

.experience__period{
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
  width: calc((100% / 4)*3);
}

.content__top {
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

  h5{
  color: var(--clr-cheese);
  }

  pre{
  white-space: pre-wrap;
  color: var(--clr-klein-blue);
  margin: 16px 0;
  }
}

// TRANSITION
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>