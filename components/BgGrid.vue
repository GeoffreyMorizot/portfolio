<template>
       <div class="grid">
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
    
}
</script>

<style lang="scss">
.grid {
  position: fixed;
  display: flex;
  flex-direction: row;
  height: 100vh;
  z-index: -100;

}  

 .grid__column {
    --nb-column: 6;
    @include mobile {
       --nb-column: 4;
    }
    position: relative;
    width: calc(100vw / var(--nb-column));
    height: 100%;
    border-right: 1px solid var(--clr-cheese);

    &:first-child::after{
        content:"";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: red;
        animation: falling 1s ease-in forwards;
    }

    @keyframes falling {
        to {
            transform: translate3d(0, 100%, 0);
        }
        from {
            transform: translate3d(0, 0, 0);
        }
    }
  
  
  
  
  }






</style>