<template>
  <article class="education__wrapper">
    <div class="education__top title-6">
      <h4>{{ education.name }}</h4>
    </div>
    <div class="education__bottom">
      <p>{{ education.location }}</p>
      <span class="education-bottom__line"></span>
      <p>
        <time :datetime="education.startDate">{{
          education.startDate | formatDate() | changeSeparator()
        }}</time>
        <span>-</span>
        <time :datetime="education.endDate">{{
          education.endDate | formatDate() | changeSeparator()
        }}</time>
      </p>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    education: {
      type: Object,
      default: null,
    },
  },
  filters: {
    formatDate(value) {
      if (!value) return "Aujourd'hui"
      return new Date(value).toLocaleDateString('fr-FR', {
        year: 'numeric',
      })
    },
    changeSeparator(value) {
      return value.replace(/\//g, '-')
    },
  },
}
</script>

<style lang="scss" scoped>
.education__bottom {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  margin: 8px 0 0 0;

  font-family: var(--secondary-ff);
  font-size: 1rem;
  color: var(--clr-klein-blue);
}

.education-bottom__line {
  background: var(--clr-klein-blue);
  height: 1px;
  flex-grow: 1;
  margin: 0 24px;
}

.education__top {
  color: var(--clr-cheese);
  text-transform: uppercase;
}
</style>