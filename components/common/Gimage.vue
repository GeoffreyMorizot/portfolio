<template>
  <div class="g-image">
    <img
      class="image"
      :width="width"
      :height="height"
      :loading="loading"
      :src="`${baseUrl}${source}`"
      :alt="alt"
      :srcset="formats"
      :sizes="sizes"
    />
  </div>
</template>

<script>
export default {
  props: {
    baseUrl: {
      type: String,
      required: true,
      default: '',
    },
    width: {
      type: String,
      required: true,
      default: '',
    },
    height: {
      type: String,
      required: true,
      default: '',
    },
    alt: {
      type: String,
      required: true,
      default: 'Image non disponible',
    },
    loading: {
      type: String,
      required: false,
      default: 'lazy',
      validator: (value) => ['lazy', 'eager'].includes(value),
    },
    source: {
      type: String,
      required: true,
    },
    sizes: {
      type: String,
      required: false,
      default: '100vw',
    },
    srcSet: {
      type: Object,
      required: false,
      default: null,
    },
  },
  computed: {
    formats() {
      if (!this.srcSet) return ''
      return Object.values(this.srcSet)
        .map((format) => `${this.baseUrl}${format.url} ${format.width}w`)
        .join(', ')
    },
  },
}
</script>
