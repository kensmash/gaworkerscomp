<template>
  <b-form @submit.prevent="onSave">
    <b-form-group label="Title" label-for="title">
      <b-form-input v-model="editedArticle.title" @change="$v.editedArticle.title.$touch()" id="title" type="text" placeholder="Enter Title" vue></b-form-input>
      <p class="error-message" v-if="$v.editedArticle.title.$error">Please enter a title of at least 8 characters.</p>
    </b-form-group>
    <b-form-group label="Subhead (Optional)" label-for="subhead">
      <b-form-input v-model="editedArticle.subhead" id="subhead" type="text" placeholder="Enter Subhead"></b-form-input>
    </b-form-group>
    <b-form-group label="Author(s)" label-for="author">
      <multiselect v-model="editedArticle.author" :options="this.authors" :multiple="true" :close-on-select="true" placeholder="Select Authors..." :custom-label="customLabel" track-by="value"> </multiselect>
      <p class="error-message" v-if="$v.editedArticle.author.$error">You must select an author before the article can be published.</p>
    </b-form-group>
    <b-form-group label="Content" label-for="content">
      <div class="quill-editor" :content="editedArticle.content" @blur="$v.editedArticle.content.$touch()" @ready="onEditorReady($event)" @change="onEditorChange($event)" v-quill:myQuillEditor="editorOption">
      </div>
      <p class="error-message" v-if="$v.editedArticle.content.$error">Please enter content of at least 30 characters.</p>
    </b-form-group>
    <b-form-group>
      <AdminArticleFootnote v-for="(footnote, index) in editedArticle.footnotes" :key="`footnote-${index}`" :index="`${index}`" :text="`${footnote}`" @update="onFootnoteUpdate" />
      <b-button size="sm" variant="link" @click="addFootnote">
        <span class="oi oi-plus" title="Add" aria-hidden="true"></span>Add Footnote</b-button>
    </b-form-group>
    <b-form-group label="Status" label-for="status">
      <b-form-select v-model="editedArticle.published" :options="options" class="mb-3" />
    </b-form-group>
    <b-collapse id="collapse1" class="mt-2 " v-model="showCollapse ">
      <b-alert variant="success" show>Article saved.
        <b-button type="reset" variant="link" @click="$router.go(-1)">Go Back</b-button>
      </b-alert>
    </b-collapse>
    <template v-if="!showCollapse">
      <b-button type="submit" variant="success" :disabled="$v.$invalid">Save</b-button>
      <b-button type="reset" @click="$router.go(-1)">Cancel</b-button>
    </template>
  </b-form>
</template>

<script>
  import { required, minLength } from "vuelidate/lib/validators";
  import AdminArticleFootnote from "./AdminArticleFootnote";
  export default {
    components: {
      AdminArticleFootnote
    },
    props: {
      article: {
        type: Object,
        required: false
      },
      authors: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        showCollapse: false,
        collapseMessage: "",
        footnotes: [],
        options: [
          { value: "false", text: "Draft" },
          { value: "true", text: "Published" }
        ],
        editorOption: {
          bounds: ".quill-editor",
          scrollingContainer: ".quill-editor",
          modules: {
            toolbar: [
              ["bold", "italic", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["clean"]
            ]
          }
        },
        authorslist: this.authors,
        editedArticle: this.article
          ? { ...this.article }
          : {
              title: "",
              subhead: "",
              content: "",
              footnotes: [],
              author: [],
              published: false
            }
      };
    },
    validations() {
      if (!this.editedArticle.published) {
        return {
          editedArticle: {
            title: { required: required, min: minLength(8) },
            author: {},
            content: { required: required, min: minLength(30) }
          }
        };
      } else {
        return {
          editedArticle: {
            title: { required: required, min: minLength(8) },
            author: {
              required: required,
              selected: val => {
                if (val === []) {
                  return false;
                } else {
                  return true;
                }
              }
            },
            content: { required: required, min: minLength(30) }
          }
        };
      }
    },
    methods: {
      onSave() {
        //submit an array of ids for author value
        const authorIds = this.editedArticle.author.map(author => author.value);
        const articleToSubmit = { ...this.editedArticle };
        articleToSubmit.author = authorIds;
        this.$emit("submit", articleToSubmit);
        this.showCollapse = true;
      },
      onFootnoteUpdate(value, index) {
        this.editedArticle.footnotes[index] = value;
      },
      onEditorReady(editor) {
        console.log("editor ready!", editor);
      },
      onEditorChange({ editor, html, text }) {
        console.log("editor change!", editor, html, text);
        this.editedArticle.content = html;
      },
      addFootnote() {
        this.editedArticle.footnotes.push("");
      },
      onCancel() {
        this.$router.go(-1);
      },
      customLabel(option) {
        return `${option.text}`;
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
    font-size: 0.85em;
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