<template>
  <footer class="footer">
    <div class="footer__wapper">
      <small class="footer__legals">{{ info.legals }}</small>
      <small class="footer__contact">
        <a :href="`mailto:${info.contactEmail}`">{{ info.contactEmail }}</a>
      </small>
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
  height: space(8);
  background: white;
  border-top: 1px solid var(--clr-cheese-light);

  font-family: var(--secondary-ff);
  font-size: 0.85rem;
  color: var(--clr-cheese);

  z-index: 1000;
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
  grid-column: 2 / span 4;
  text-align: start;
}

.footer__contact {
  grid-column: 8 / span 4;
  text-align: right;
}
//TABLET
@include tablet {
  .footer__legals {
    grid-column: 2 / span 4;
  }
  .footer__contact {
    grid-column: 8 / span 4;
  }
}

//MOBILE

@include mobile {
  .footer {
    height: space(5);
    font-size: 0.6rem;
  }
  .footer__legals {
    grid-column: 1 / span 4;
    justify-self: start;
    margin: 0 space(2);
  }
  .footer__contact {
    grid-column: 5 / span 6;
    justify-self: end;
    margin: 0 space(2);
  }
}
</style>
