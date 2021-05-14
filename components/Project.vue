<template>
  <div class="project-container">
    <div class="project__img">
      <img
        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80"
        alt
        srcset
      />
    </div>
      <h3 class="project__title">Ceci est un très tres trest tres tres long titre</h3>
  </div>
</template>

<style lang="scss">
:host {
  display: inline;
}

.project-container {
  width: 100%;
  display: flex;
  position: relative;

  .project__title {
  transform: translate3d(-50%, -50%, 0);
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 30%;

  font-size: 40px;
}

  &:nth-child(odd) {
    flex-direction: row;
    .project__title {
      text-align: left;
    }
  }

  &:nth-child(even) {
    flex-direction: row-reverse;
    .project__title {
      text-align: right;
    }
  }
}

.project__img {
  width: 50%;
  height: 100%;
}
</style>
