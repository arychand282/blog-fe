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
              <h1 class="display-1 mb-3">Add New Story</h1>
              <v-divider></v-divider>
              <v-layout column align-left>
                  <v-form ref="form" >
                    <v-text-field
                        v-model="story.title"
                        label="Title"
                        required
                    ></v-text-field>

                    <v-textarea
                      name="input-7-1"
                      label="Summary"
                      v-model="story.summary"
                      hint="Hint text"
                    ></v-textarea>
<!-- 
                    <v-textarea
                      name="input-7-1"
                      label="Content"
                      v-model="story.content"
                      hint="Hint text"
                    ></v-textarea> -->

                    <ckeditor :editor="editor" v-model="story.content" tag-name="textarea" :config="editorConfig"></ckeditor>
                  </v-form>
              </v-layout>

              <v-form>
                <v-container fluid grid-list-xl>
                  <v-layout wrap>
                    <v-flex xs2 md2>
                      <v-btn text icon color="green" @click="saveDialog = true">
                        <v-icon>mdi-file-document-box-plus</v-icon> Save
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


              <v-dialog v-model="saveDialog" max-width="290" >
                <v-card>
                  <v-card-title class="headline">Are you sure to create this story?</v-card-title>

                  <v-card-text>
                    Please, check it one more time what have you written!
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      color="green darken-1"
                      text
                      @click="saveDialog = false; saveStory()"
                    >
                      Create
                    </v-btn>

                    <v-btn
                      color="blue darken-1"
                      text
                      @click="saveDialog = false"
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
                    Story Created
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
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

    export default {
        name: 'StoryPrivateAdd',
        components: {
          BarPrivate,
          NavigationPrivate,
        },
        methods: {
          saveStory: function() {
            if (this.story.title == null  || this.story.summary == null || this.story.content == null) {
              alert("You must fill all of input form!")
              return
            }
            axios
              .post(this.$apiUrl + `/api/v1/story/`, {
                title: this.story.title,
                summary: this.story.summary,
                content: this.story.content,
                createdBy: "chanchan",
              })
              .then(response => {
                this.id = response.data.id;
                this.overlay = response.data.id !== null
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
            id: null,
            story: {
              title: null,
              summary: null,
              content: null
            },
            saveDialog: false,
            overlay: false,
            zIndex: 0,
            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            }     
          }
        },
        mounted() {
          
        }
    }
</script>

