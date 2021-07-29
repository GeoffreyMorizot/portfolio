<template>
  <div id="grid" class="grid">
    <div class="grid__column"></div>
    <div class="grid__column"></div>
    <div class="grid__column"></div>
    <div class="grid__column"></div>
    <div class="grid__column"></div>
    <div class="grid__column"></div>
    <div class="grid__column"></div>
    <div class="grid__column"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.startAnimation()
  },
  methods: {
    startAnimation() {
      const tl = this.$gsap.timeline()
      tl.to('.grid__column', { duration: 0.6, y: 0, stagger: 0.2 })
    },
  },
}
</script>

<style lang="scss">
.grid {
  position: fixed;
  display: flex;
  flex-direction: row;
  height: 100vh;
  z-index: -100;
  opacity: 0.4;
}

.grid__column {
  --nb-column: 6;
  opacity: 1;
  transform: translate3d(0, -100%, 0);
  position: relative;
  width: calc(100vw / var(--nb-column));
  height: 100%;
  border-right: 1px solid var(--clr-cheese-light);
}

@include mobile {
  .grid__column {
    --nb-column: 8;
  }
  .grid__column:nth-child(even) {
    border-right: none;
  }
}
</style>
