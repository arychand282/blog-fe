<template>
  <iframe
    v-bind:src="url"
    width="560" height="315"
    frameborder="0"
    allowfullscreen>
  </iframe>
</template>

<script>

  export default {
    name: 'oembed',
    components: {

    },
    data() {
      return {
        
      }
    },
    props: {
      url: {
        type: String
      }
    }
  }
</script>