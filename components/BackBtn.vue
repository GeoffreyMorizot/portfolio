<template>
  <div class="nav-back-btn">
    <a @click="pageBack($router)" class="back-btn__link">
      <img
        class="back-btn__icon"
        width="42"
        height="33"
        src=".././assets/images/back-arrow.svg"
        alt=""
      />
      <span class="back-btn__label">
        <span>BACK</span>
      </span>
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    pageBack(router) {
      router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-back-btn {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  overflow: hidden;
  padding: 8px 0;
}

.back-btn__link {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.back-btn__icon{
    margin-right: 8px;
    opacity: 0;
    animation: iconFade 0.4s ease-out 0.4s forwards;
}

@keyframes iconFade {
    from{
     opacity: 0;
    }
    to{
    opacity: 1;
    }
}

.back-btn__label {
  writing-mode: vertical-lr;
  transform: translate3D(100%, 0, 0) rotate(180deg);
  animation: btnUp 0.5s ease-in-out 0.7s forwards;
}

@keyframes btnUp {
  from {
    transform: translate3D(100%, 0, 0) rotate(180deg);
  }
  to {
    transform: translate3D(0, 0, 0) rotate(180deg);
  }
}
</style>