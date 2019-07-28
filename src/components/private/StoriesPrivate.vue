<template>
  <div>
    <BarPrivate />
    
    <v-content>
      <v-layout wrap>
        <v-flex xs2>
          <NavigationPrivate />
        </v-flex>
        <v-flex xs10>
          <v-card style="margin-left: 10px; margin-right: 10px; padding-top: 10px">

            <v-container style="padding-left: 70px; padding-right: 70px">
              <h1 class="display-1 mb-3">Stories</h1>
              <v-divider></v-divider>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">Title</th>
                    <th class="text-left">Summary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="story in stories" :key="story.id"
                    @click="redirectTo('/storiesPrivate/detail/' + story.id)"
                    style="cursor: pointer;">
                    <td>{{ story.title | trimSummary }}</td>
                    <td>{{ story.summary | trimSummary}}</td>
                  </tr>
                </tbody>
              </v-simple-table>
              <div class="text-center">
                <v-container>
                  <v-layout justify-center>
                    <v-flex xs8>
                      <v-container max-width="300">
                        <v-pagination
                          v-model="page"
                          @next="loadStories()"
                          @input="loadStories()"
                          @previous="loadStories()"
                          class="my-4"
                          :length="data.totalPages"
                        ></v-pagination>
                      </v-container>
                    </v-flex>
                  </v-layout>
                </v-container>
              </div>

              <v-form>
                <v-container fluid grid-list-xl>
                  <v-layout wrap>
                    <v-flex xs4 md4>
                      <v-text-field
                        v-model="search.title"
                        label="Filter by Title"
                        @keypress.enter="page = 1; loadStories()"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs4 md4 >
                      <v-text-field
                        v-model="search.content"
                        label="Filter by Content"
                        @keypress.enter="page = 1; loadStories()"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-flex xs4 md4 style="margin-left: 25px">
                      <v-btn text icon color="blue" @click="redirectTo('/storiesPrivate/create')">
                        <v-icon>mdi-book-plus</v-icon> New Story
                      </v-btn>
                    </v-flex>
                </v-container>
              </v-form>
            </v-container>

          </v-card>
        </v-flex>
      </v-layout>
    </v-content>
  </div>
</template>

<script>
import axios from 'axios'

import NavigationPrivate from '../private/NavigationPrivate'
import BarPrivate from '../private/BarPrivate'

export default {
    name: 'StoriesPrivate',
    components: {
      BarPrivate,
      NavigationPrivate,
    },
    methods: {
        loadStories: function() {
            axios
                .get(this.$apiUrl + `/api/v1/story?size=` + this.size + `&page=` + this.page
                  + `&title=` + this.search.title + `&content=` + this.search.content
                )
                .then(response => {
                  this.data = response.data
                  this.stories = this.data.content
                })
                .catch(e => {
                  this.errors.push(e)
                })
        },
        redirectTo: function(url) {
          this.$router.push(url)
        }
    },
    data() {
      return {
        data: {},
        stories: [],
        errors: [],
        size: 5,
        page: 1,
        search: {
          title: '',
          content: ''
        }
      }
    },
    mounted() {
      this.loadStories();
    },
    filters: {
      trimSummary: function(value) {
        if (value.length > 100) {
          value = value.toString()
          return value.substring(0, 100) + '...'
        }
        return value
      }
    }
}

</script>
