<template>
  <div>
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
.spec {
  display: flex;
  width: 100%;
  row-gap: space(1);
  font-family: var(--secondary-ff);
  font-size: 0.75rem;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.spec__name {
  display: block;
  min-width: calc(100% / 3);
  padding-right: space(4);
  color: var(--clr-cheese);
}
.spec__value {
  display: flex;
  flex-direction: column;
  row-gap: space(0.5);
  width: calc((100% / 3) * 2);
  color: var(--clr-klein-blue);
}

//MOBILE
@include tablet {
  .spec {
    row-gap: space(0.75);
  }

  .spec__value {
    flex-direction: row;

    width: calc((100% / 4) * 3);

    & li:not(:first-child)::before {
      content: '-';
      margin-left: space(0.5);
    }
  }
}

@include mobile {
  .spec {
    flex-direction: column;
  }
  .spec__value {
    flex-direction: column;
    li::before {
      display: none;
    }
  }
}
</style>
