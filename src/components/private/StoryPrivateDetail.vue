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
              <h1 class="display-1 mb-3">Detail Story</h1>
              <v-divider></v-divider>
              <v-layout wrap>
                <v-flex xs3>
                  <p><b>Title</b></p>
                </v-flex>
                <v-flex xs9>
                  <p>{{ detailStory.title }}</p>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout wrap>
                <v-flex xs3>
                  <p><b>Summary</b></p>
                </v-flex>
                <v-flex xs9>
                  <p v-html="escapedSummary"></p>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout wrap>
                <v-flex xs3 sm3>
                  <p><b>Content</b></p>
                </v-flex>
                <v-flex xs9 sm9>
                  <p v-html="escapedContent"></p>
                </v-flex>
              </v-layout>

              <v-divider v-if="images.length > 0"></v-divider>

              <v-layout v-if="images.length > 0">
                <v-flex xs3 sm3>
                  <p><b>Images</b></p>
                </v-flex>
                <v-flex xs6 sm6>
                  <v-card>
                    <v-container grid-list-sm fluid>
                      <v-layout wrap>
                        <v-flex
                          v-for="image in images"
                          :key="image.id"
                          xs4
                          d-flex
                          child-flex
                        >
                          <v-card flat tile class="d-flex">
                            <v-img
                              :src="image.fileDownloadUri"
                              :lazy-src="image.fileDownloadUri"
                              aspect-ratio="1"
                              class="grey lighten-2"
                              style="cursor: pointer;"
                              @click.stop="imageModal = true; showDetailImage(image)"
                            >
                              <template v-slot:placeholder>
                                <v-layout
                                  fill-height
                                  align-center
                                  justify-center
                                  ma-0
                                >
                                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                </v-layout>
                              </template>
                            </v-img>
                          </v-card>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>

              <v-divider></v-divider>

              <v-layout wrap>
                <v-flex xs3>
                  <p><i>Created By</i></p>
                </v-flex>
                <v-flex xs9>
                  <p><i>{{ detailStory.createdBy }}</i></p>
                </v-flex>

                <v-flex xs3>
                  <p><i>Date Created</i></p>
                </v-flex>
                <v-flex xs9>
                  <p><i>{{ new Date(detailStory.dateCreated) }}</i></p>
                </v-flex>

                <v-flex xs3>
                  <p><i>Updated By</i></p>
                </v-flex>
                <v-flex xs9>
                  <p><i>{{ detailStory.updatedBy }}</i></p>
                </v-flex>

                <v-flex xs3>
                  <p><i>Last Updated</i></p>
                </v-flex>
                <v-flex xs9>
                  <p><i>{{ detailStory.lastUpdated != null ? new Date(detailStory.lastUpdated) : null }}</i></p>
                </v-flex>
              </v-layout>

              <v-divider></v-divider>
              <v-form>
                <v-container fluid grid-list-xl>
                  <v-layout wrap>
                    <v-flex xs2 md2>
                      <v-btn text icon color="red" @click.stop="deleteDialog = true">
                        <v-icon>mdi-delete-empty</v-icon> Delete
                      </v-btn>
                    </v-flex>
                    <v-flex xs2 md2>
                      <v-btn text icon color="green" @click="redirectTo('/storiesPrivate/update/' + id)">
                        <v-icon>mdi-file-document-edit</v-icon> Edit
                      </v-btn>
                    </v-flex>
                    <v-flex xs2 md2>
                      <v-btn text icon color="blue" @click="redirectTo('/storiesPrivate')">
                        <v-icon>mdi-backburger</v-icon> Back
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>

              <v-dialog v-model="deleteDialog" max-width="290" >
                <v-card>
                  <v-card-title class="headline">Are you sure to delete this story?</v-card-title>

                  <v-card-text>
                    Once you delete this story, you'll no longer see it on your list of stories.
                    If you wanna reactive it again, you can do query database for deleteFlag.
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      color="red darken-1"
                      text
                      @click="deleteDialog = false; deleteStory()"
                    >
                      Delete
                    </v-btn>

                    <v-btn
                      color="blue darken-1"
                      text
                      @click="deleteDialog = false"
                    >
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-layout justify-center>
                <v-dialog
                  v-model="imageModal"
                  max-width="500"
                  max-height="500"
                >
                  <v-card>
                    <v-card-title class="headline">Image Detail</v-card-title>

                    <v-card-text>
                      <v-layout align-center justify-center>
                        <v-img
                          :src="detailImage.fileDownloadUri"
                          :lazy-src="detailImage.fileDownloadUri"
                          aspect-ratio="1"
                          class="grey lighten-2"
                          max-width="500"
                          max-height="300"
                        ></v-img>
                      </v-layout>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer> 

                      <v-btn
                        color="green darken-1"
                        text
                        @click="imageModal = false"
                      >
                        Close
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>

              <v-layout justify-center wrap>
                <v-overlay
                  :z-index="zIndex"
                  :value="overlay"
                >
                  <v-btn
                    class="white--text"
                    color="blue"
                    @click="overlay = false; redirectTo('/storiesPrivate')"
                  >
                    Story Deleted
                  </v-btn>
                </v-overlay>
              </v-layout>

            </v-container>

          </v-card>
        </v-flex>
      </v-layout>
    </v-content>

  </div>

</template>

<script>
    import axios from 'axios'

    import BarPrivate from '../private/BarPrivate'
    import NavigationPrivate from '../private/NavigationPrivate'

    export default {
        name: 'StoryPrivateDetail',
        components: {
          BarPrivate,
          NavigationPrivate
        },
        methods: {
            loadDetailStory: function() {
              axios
                .get(this.$apiUrl + `/api/v1/story/` + this.$route.params.id)
                .then(response => {
                  this.detailStory = response.data,
                  this.id = this.detailStory.id
                  this.escapedSummary = this.detailStory.summary.replace(/(\r\n|\n|\r)/gm, "<br/>")
                  this.escapedContent = this.detailStory.content.replace(/(\r\n|\n|\r)/gm, "<br/>")
                  this.images = this.detailStory.uploadFileResponseDtoList
                })
                .catch(e => {
                  this.errors.push(e)
                })
            },
            deleteStory: function() {
              axios
                .delete(this.$apiUrl + `/api/v1/story/` + this.$route.params.id)
                .then(response => {
                  this.overlay = response.data.id !== null
                })
                .catch(e => {
                  this.errors.push(e)
                })
            },
            redirectTo: function(url) {
              this.$router.push(url)
            },
            showDetailImage: function(image) {
              this.detailImage = image;
            }
        },
        data() {
          return {
            id: null,
            detailStory: {},
            deleteDialog: false,
            imageModal: false,
            overlay: false,
            zIndex: 0,
            escapedSummary: '',
            escapedContent: '',
            images: [],
            detailImage: {}
          }
        },
        mounted() {
          this.loadDetailStory();
        }
    }
</script>

