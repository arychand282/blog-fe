<template>
   <v-app-bar app >
      <v-toolbar-title class="headline text-uppercase" @click="redirectTo('/')" style="cursor: pointer;"  >
          <span>SMILEY</span>
          <span class="font-weight-light">DAILY</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://instagram.com/arychand"
        target="_blank"
        >
        <span class="mdi mdi-instagram"></span>
      </v-btn>
      <v-btn
        text
        href="https://www.facebook.com/ary.b.chandra"
        target="_blank"
        >
        <span class="mdi mdi-facebook"></span>
      </v-btn>
    </v-app-bar> 
</template>

<script>

export default {
  name: 'BarPrivate',
  components: {

  }, 
  data: () => ({

  }),
  methods: {
    redirectTo: function(pathUrl) {
      this.$router.push(pathUrl)
    }
  }
}
</script>
