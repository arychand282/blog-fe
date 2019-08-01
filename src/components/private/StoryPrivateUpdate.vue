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
              <h1 class="display-1 mb-3">Update Story</h1>
              <v-divider></v-divider>
              <v-layout column align-left>
                  <v-form ref="form" >
                    <v-text-field
                        v-model="detailStory.title"
                        label="Title"
                        required
                    ></v-text-field>

                    <v-textarea
                      name="input-7-1"
                      label="Summary"
                      v-model="detailStory.summary"
                      hint="Hint text"
                    ></v-textarea>

                    <p>Content</p>
                    <div style="margin-top: -13px; padding-bottom: 10px">
                      <ckeditor :editor="editor" v-model="detailStory.content" :config="editorConfig"></ckeditor>
                    </div>

                    <p style="padding-top: 10px" v-if="images.length > 0">Images</p>
                    <v-flex sm6 xs6 v-if="images.length > 0">
                      <div style="margin-top: -13px; padding-bottom: 10px">
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
                      </div>
                    </v-flex>

                    <v-file-input type="file" label="New Images" v-model="newImages" multiple></v-file-input>

                  </v-form>
              </v-layout>

              <v-form>
                <v-container fluid grid-list-xl>
                  <v-layout wrap>
                    <v-flex xs2 md2>
                      <v-btn text icon color="green" @click="updateDialog = true">
                        <v-icon>mdi-tooltip-edit</v-icon> Update
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
                        color="red darken-1"
                        text
                        @click="imageModal = false; collectTempDeletedImages(detailImage)"
                      >
                        Delete
                      </v-btn>

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

              <v-dialog v-model="updateDialog" max-width="290" >
                <v-card>
                  <v-card-title class="headline">Are you sure to update this story?</v-card-title>

                  <v-card-text>
                    Please, check it one more time what have you edited!
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      color="green darken-1"
                      text
                      @click="updateDialog = false; updateStory()"
                    >
                      Update
                    </v-btn>

                    <v-btn
                      color="blue darken-1"
                      text
                      @click="updateDialog = false"
                    >
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-layout justify-center wrap>
                <v-overlay
                  :z-index="zIndex"
                  :value="overlay"
                >
                  <v-btn
                    class="white--text"
                    color="blue"
                    @click="overlay = false; redirectTo('/storiesPrivate/detail/' + id)"
                  >
                    Story Updated
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

    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import BarPrivate from '../private/BarPrivate'
    import NavigationPrivate from '../private/NavigationPrivate'

    export default {
        name: 'StoryPrivateUpdate',
        components: {
          BarPrivate,
          NavigationPrivate
        },
        methods: {
          loadDetailStory: function() {
              axios
                .get(this.$apiUrl + `/api/v1/story/` + this.$route.params.id)
                .then(response => {
                  this.detailStory = response.data
                  this.id = this.detailStory.id
                  var responseContent = response.data.content
                  responseContent = responseContent.toString()
                  responseContent = responseContent.replace(new RegExp("<iframe src=\"", 'g'), "<figure class=\"media\"><oembed url=\"")
                  responseContent = responseContent.replace(new RegExp("\" width=\"560\" height=\"315\" frameborder=\"0\" allowfullscreen></iframe>", 'g'), "\"></oembed></figure>")
                  this.escapedSummary = this.detailStory.summary.replace(/(\r\n|\n|\r)/gm, "<br/>")
                  this.detailStory.content = responseContent.replace(/(\r\n|\n|\r)/gm, "<br/>")
                  this.images = this.detailStory.uploadFileResponseDtoList
                })
                .catch(e => {
                  this.errors.push(e)
                })
          },
          updateStory: function() {
            if (this.detailStory.title == null  || this.detailStory.summary == null || this.detailStory.content == null) {
              alert("You must fill all of input form!")
              return
            }
            axios
              .patch(this.$apiUrl + `/api/v1/story/`, {
                id: this.id, 
                title: this.detailStory.title,
                summary: this.detailStory.summary,
                content: this.detailStory.content,
                updatedBy: 'chandra'
              })
              .then(response => {
                this.overlay = response.data.id !== null
                this.deleteOldImages(response.data)
                this.uploadImages(this.id)
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
          },
          deleteOldImages: function(fromStory) {
            axios
              .post(this.$apiUrl + `/api/v1/file/delete_files`, {
                id: fromStory.id,
                title: this.detailStory.title,
                summary: this.detailStory.summary,
                content: this.detailStory.content,
                updatedBy: 'chandra',
                uploadFileResponseDtoList: this.temporaryDeletedImages
              })
              .then()
              .catch(e => {
                alert(e.message)
                this.errors.push(e)
              })
          },
          uploadImages: function(storyId) {
            var formData = new FormData()
            formData.append("storyId", storyId)
            this.newImages.forEach((newImage) => {
              formData.append("files", newImage)
            })

            axios
              .post(this.$apiUrl + `/api/v1/file/upload_multiple_files`, formData)
              .then(response => {
                response.data
              })
              .catch(e => {
                this.errors.push(e)
              })
          },
          collectTempDeletedImages: function(detailImage) {
            this.images.splice(this.images.indexOf(detailImage), 1)
            this.temporaryDeletedImages.push(detailImage)
          }
        },
        data() {
          return {
            id: null,
            detailStory: {
              title: null,
              summary: null,
              content: null,
              createdBy: null,
              dateCreated: null,
              updatedBy: null,
              lastUpdated: null,
              uploadFileResponseDtoList: []
            },
            updateDialog: false,
            overlay: false,
            zIndex: 0,
            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            },
            images: [],
            newImages: [],
            temporaryDeletedImages: [],
            imageModal: false,
            detailImage: {}
          }
        },
        mounted() {
          this.loadDetailStory();
        }
    }
</script>

