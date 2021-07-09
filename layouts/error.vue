<template>
  <main class="error">
    <div class="error__wrapper">
      <div class="error__content">
        <span class="error__code">{{ error.statusCode }}</span>
        <span class="error__message">{{ error.message }}</span>
        <nuxt-link class="error__back-link" to="/"
          >retour à la page d'accueil</nuxt-link
        >
      </div>
    </div>
  </main>
</template>

<script>
export default {
  layout: 'empty',
  props: ['error'],
}
</script>

<style lang="scss">
.error {
  position: relative;
  flex-grow: 1;
  width: 100%;
  height: 100%;
}
.error__wrapper {
  position: absolute;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;

  font-family: var(--ff);
}
.error__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.error__code {
  font-size: 10vw;
  letter-spacing: -4.5px;
}
.error__message {
  font-size: 5vw;
  letter-spacing: -4.5px;
}
.error__back-link {
  font-family: var(--secondary-ff);
}
</style>
