<template>
  <footer class="footer">
    <div class="footer__wapper">
      <p class="footer__legals">{{ info.legals }}</p>
      <a class="footer__contact" :href="`mailto:${info.contactEmail}`">{{info.contactEmail}}</a>
    </div>
  </footer>
</template>

<script>
export default {
    props: {
        info: Object,
    },

}
</script>

<style lang="scss" scoped>
.footer {
  
  flex-grow: 0;
  height: 64px;;
  margin-top: 128px;
  background: white;
  border-top: 1px solid var(--clr-cheese-light);
  
  font-family: var(--secondary-ff);
  font-size: 0.85rem;
  color: var(--clr-cheese);

  @include mobile {
    .footer__legals {
      grid-column: 1 / span 1;
    }
    .footer__contact {
      grid-column: 4 / span 1;
    }
  }
}

.footer__wapper {
  @include gridX2;
  grid-template-rows: none;
  align-items: center;
  max-width: 1500px;
  height: 100%;
  margin: 0 auto;
}
.footer__legals {
  grid-column: 2 / span 2;
  text-align: center;
}

.footer__contact {
  grid-column: 10  / span 2;
  text-align: center;
}
</style>