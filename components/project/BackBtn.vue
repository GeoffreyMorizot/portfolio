<template>
  <div class="nav-back-btn">
    <a class="back-btn__link" @click="pageBack($router)">
      <img
        class="back-btn__icon"
        width="42"
        height="33"
        src="../../assets/images/back-arrow.svg"
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
      this.$nuxt.context.from !== undefined ? router.go(-1) : router.push('/')
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
  padding: space(1) 0;
}

.back-btn__link {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.back-btn__icon {
  margin-right: space(1);
  opacity: 0;
  animation: iconFade 0.4s ease-out 0.4s forwards;
}

@keyframes iconFade {
  from {
    opacity: 0;
  }
  to {
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

//TABLET

@include tablet {
  .back-btn__icon {
    height: space(2.5);
    margin-right: space(0.5);
  }
  .back-btn__label span {
    font-size: 0.7rem;
  }
}
@include mobile {
  .back-btn__icon {
    height: space(1.5);
    margin-right: space(0);
  }
}
</style>
