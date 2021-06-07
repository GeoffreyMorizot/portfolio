<template>
       <div id="grid" class="grid">
      <div class="grid__column"></div>
      <div class="grid__column"></div>
      <div class="grid__column"></div>
      <div class="grid__column"></div>
      <div class="grid__column"></div>
      <div class="grid__column"></div>
    </div>
</template>

<script>
import { gsap } from 'gsap'
export default {
  methods: {
    startAnimation(){
      const tl = gsap.timeline()
      tl.to( ".grid__column", { duration:0.6, y:0, stagger:0.2})
    }
  },
   mounted(){
    this.startAnimation() 
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
  opacity: 1;

}  

 .grid__column {
    --nb-column: 6;
    opacity: 1;
    transform: translate3d(0, -100%, 0);
    @include mobile {
       --nb-column: 4;
    }
    position: relative;
    width: calc(100vw / var(--nb-column));
    height: 100%;
    border-right: 1px solid var(--clr-cheese-light);
  }






</style>