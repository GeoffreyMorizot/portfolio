<template>
  <div>
    <p class="loading">Chargement</p>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 1000;
  text-transform: uppercase;
  color: var(--clr-klein-blue);
  font-family: var(--ff);
  font-size: 1rem;
}
</style>
