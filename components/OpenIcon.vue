<template>
  <div ref="icon" class="icon">
    <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
      <path
        id="shape"
        d="M30 12C29.5 12 19 12 18 12C18 11.4 18 1.7 18 0C17 0 12.8 0 12 0C12 1 12 11.2 12 12C11.4 12 1 12 0 12C0 12.6 0 17.3 0 18C0.8 18 11.3 18 12 18C12 18.8 12 29.3 12 30C13 30 17.2 30 18 30C18 29.4 18 18.6 18 18C18.5 18 29.5 18 30 18C30 17.4 30 12.9 30 12Z"
        fill-rule="nonzero"
        :fill="color"
      >
        <animate
          ref="animationToArrow"
          begin="indefinite"
          :dur="duration"
          attributeName="d"
          to="M24.5 13.5C24 14 18.9 19.2 18 20.1C18 19.5 18 1.7 18 0C17 0 12.8 0 12 0C12 1 12 19.3 12 20.1C11.4 19.5 6.3 14.4 5.5 13.6C4.9 14.1 2.5 16.5 2 17C2.7 17.7 7.2 22.2 7.8 22.8C8.4 23.4 14.4 29.4 15 30C15.1 29.9 15.4 29.6 15 30C15.5 29.5 21.7 23.3 22.2 22.8C22.7 22.3 27.4 17.6 28 17C27.3 16.3 25.2 14.2 24.5 13.5Z"
          fill="freeze"
        />
        <animate
          ref="animationToPlus"
          begin="indefinite"
          :dur="duration"
          attributeName="d"
          to="M30 12C29.5 12 19 12 18 12C18 11.4 18 1.7 18 0C17 0 12.8 0 12 0C12 1 12 11.2 12 12C11.4 12 1 12 0 12C0 12.6 0 17.3 0 18C0.8 18 11.3 18 12 18C12 18.8 12 29.3 12 30C13 30 17.2 30 18 30C18 29.4 18 18.6 18 18C18.5 18 29.5 18 30 18C30 17.4 30 12.9 30 12Z"
          fill="freeze"
        />
      </path>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#070707',
    },
    duration: {
      type: String,
      default: '0.3s',
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods: {
    opener(boolean) {
      /* this.opened = !this.opened */
      if (boolean) {
        this.$refs.animationToArrow.beginElement()
      } else {
        this.$refs.animationToPlus.beginElement()
      }
    },
  },
  mounted() {
    console.log(this.$refs)
  },
  watch: {
    opened: function (newVal) {
      console.log('Prop changed: ', newVal)
      this.opener(newVal)
    },
  },
}
</script>

<style lang="scss">
.icon {
  width: 20px;
  cursor: pointer;
  transform: rotate(180deg);
}
</style>