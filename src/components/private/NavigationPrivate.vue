<template>
  
    <v-card height="400" style="margin-left: 10px; padding-left: 10px" >
      <v-navigation-drawer permanent>
        <v-list-item>
            <v-list-item-content>
            <v-list-item-title class="title">
                Back Office
            </v-list-item-title>
            <v-list-item-subtitle>
                control everything here!
            </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
            <v-list-item v-for="route in getRoutes" :key="route.id" link
            @click="redirectTo(route.path)">
            <v-icon>{{ route.icon }}</v-icon>
            <v-list-item-content>
                <v-list-item-title style="padding-left: 12px">{{ route.title }}</v-list-item-title>
            </v-list-item-content>
            </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    
</template>

<script>
import listRoute from '../../routes'

export default {
  name: 'NavigationPrivate',
  components: {

  }, 
  data: () => ({
    listRoute
  }),
  methods: {
    redirectTo: function(pathUrl) {
      this.$router.push(pathUrl)
    }
  },
  computed: {
    getRoutes: function() {
      var routes = [];
      this.listRoute.forEach(route => {
        if (route.title !== null) {
          routes.push(route)
        }
      });
      return routes;
    }
  },
}
</script>
