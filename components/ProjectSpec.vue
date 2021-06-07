<template>
  <div class="specs">
          <!-- DOMAIN -->
    <div v-if="domain !== null" class="spec">
      <span class="spec__name">domain:</span>
      <span class="spec__value" v-if="domain !== null">
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
    <ul ref="cat" v-if="categories !== null && categories.length !== 0" class="spec">
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
        default:null,
        type: String,
    }
  },
  filters: {
    pluralize: function (word, amount) {
      return amount > 1 || amount === 0 ? `${word}s` : word
    },
    beautifyURL: function(word){
      if(!word) return
      return word.split('//').splice(1, 1)[0]; 
    }
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
}
.spec__name {
  display: block;
  width: calc(100% / 3);
  padding-right: 24px;
  font-family: var(--secondary-ff);
  font-size: 1rem;
  color: var(--clr-cheese);
  text-transform: lowercase;
}
.spec__value {
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  width: calc((100% / 3) * 2);
  font-family: var(--secondary-ff);
  color: var(--clr-klein-blue);
}
</style>
