<template>
  <b-form @submit.prevent="onSave" @submit="$v.$touch()" novalidate>
    <b-form-group label="Name:" label-for="name">
      <b-form-input id="name" type="text" placeholder="Enter name" @blur.native="$v.editedAuthor.name.$touch()" v-model="editedAuthor.name"></b-form-input>
      <p class="error-message" v-if="$v.editedAuthor.name.$error">Please enter a name of at least 8 characters.</p>
    </b-form-group>
    <b-form-group label="Firm:" label-for="firm">
      <b-form-input id="firm" type="text" placeholder="Enter firm" @blur.native="$v.editedAuthor.lawfirm.$touch()" v-model="editedAuthor.lawfirm"></b-form-input>
      <p class="error-message" v-if="$v.editedAuthor.lawfirm.$error">Please enter author law firm/credentials of at least 5 characters.</p>
    </b-form-group>
    <b-form-group label="Bio:" label-for="bio">
      <div class="quill-editor" id="bio" @blur="$v.editedAuthor.bio.$touch()" v-quill:myQuillEditor="editorOption" :content="editedAuthor.bio" @change="onEditorChange($event)"> </div>
      <p class="error-message" v-if="$v.editedAuthor.bio.$error">Please enter bio text of at least 30 characters.</p>
    </b-form-group>
    <b-collapse id="collapse1" class="mt-2" v-model="showCollapse">
      <b-alert variant="success" show>Author saved.
        <b-button type="reset" variant="link" @click="$router.go(-1)">Go Back</b-button>
      </b-alert>
    </b-collapse>
    <template v-if="!authorSaved">
      <b-button type="submit" variant="success" :disabled="$v.$invalid">Save</b-button>
      <b-button type="reset" @click="$router.go(-1)">Cancel</b-button>
    </template>
  </b-form>
</template>

<script>
  import { required, minLength } from "vuelidate/lib/validators";
  import axios from "axios";
  export default {
    props: {
      author: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        authorSaved: false,
        showCollapse: false,
        editorOption: {
          // some quill options
          bounds: ".quill-editor",
          modules: {
            toolbar: [["bold", "italic"], ["link"], ["clean"]]
          }
        },
        editedAuthor: this.author
          ? { ...this.author }
          : {
              name: "",
              lawfirm: "",
              bio: ""
            }
      };
    },
    validations: {
      editedAuthor: {
        name: {
          required: required,
          min: minLength(8)
        },
        lawfirm: { required: required, min: minLength(5) },
        bio: { required: required, min: minLength(30) }
      }
    },
    methods: {
      onSave() {
        this.$emit("submit", this.editedAuthor);
        this.showCollapse = true;
        this.authorSaved = true;
      },
      onEditorChange({ editor, html, text }) {
        this.editedAuthor.bio = html;
        this.showCollapse = false;
      }
    }
  };
</script>

<style scoped>
  .btn {
    margin: 0 0.5em 1em 0;
  }
  .btn-link {
    margin: -0.25em 0 0 0;
    padding: 0 0 0 0.5em;
  }
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
  .error-message {
    color: red;
  }
  input.invalid label {
    color: red;
  }
  input.invalid input {
    border: 1px solid red;
    background: #ffc9aa;
  }
</style>