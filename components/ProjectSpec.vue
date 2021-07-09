<template>
  <div class="specs">
    <!-- DOMAIN -->
    <div v-if="domain !== null" class="spec">
      <span class="spec__name">domain:</span>
      <span v-if="domain !== null" class="spec__value">
        <a :href="domain.link" target="_blank" rel="noopener noreferrer">{{
          domain.name
        }}</a>
      </span>
    </div>
    <!-- CODE LINK -->
    <div v-if="codeLink !== null" class="spec">
      <span class="spec__name">github:</span>
      <span class="spec__value">
        <a :href="codeLink" target="_blank" rel="noopener noreferrer">{{
          codeLink | beautifyURL
        }}</a>
      </span>
    </div>
    <!-- CATEGORIES -->
    <ul
      v-if="categories !== null && categories.length !== 0"
      ref="cat"
      class="spec"
    >
      <span class="spec__name"
        >{{ 'technologie' | pluralize(categories.length) }}:</span
      >
      <span class="spec__value">
        <li v-for="category in categories" :key="category.id">
          {{ category.title }}
        </li>
      </span>
    </ul>
  </div>
</template>

<script>
export default {
  filters: {
    pluralize(word, amount) {
      return amount > 1 || amount === 0 ? `${word}s` : word
    },
    beautifyURL(word) {
      if (!word) return
      return word.split('//').splice(1, 1)[0]
    },
  },
  props: {
    categories: {
      default: null,
      type: Array,
    },
    domain: {
      default: null,
      type: Object,
    },
    codeLink: {
      default: null,
      type: String,
    },
  },
}
</script>

<style lang="scss" scoped>
:host {
  width: 100%;
  height: fit-content;
}
.spec {
  display: flex;
  width: 100%;
  row-gap: 8px;
  font-family: var(--secondary-ff);
  font-size: 0.75rem;
  text-transform: uppercase;
}
.spec__name {
  display: block;
  width: calc(100% / 3);
  padding-right: 24px;
  color: var(--clr-cheese);
}
.spec__value {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: calc((100% / 3) * 2);
  color: var(--clr-klein-blue);
}
</style>
