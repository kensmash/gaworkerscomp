<template>
  <article class="article-preview">
    <nuxt-link :to="articleLink">
      <h3>{{ title }}</h3>
    </nuxt-link>
    <p> by {{ author[0].name }}
      <span v-if="author.length > 1"> and {{ author[1].name }}</span>
    </p>
    <p> {{ author[0].lawfirm }}</p>
    <p v-if="author.length > 1 && author[0].lawfirm !== author[1].lawfirm">{{ author[1].lawfirm }}</p>
  </article>
</template>

<script>
  export default {
    name: "ArticlePreview",
    props: {
      id: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      author: {
        type: Array,
        required: true
      },
      authorcredentials: {
        type: String,
        required: false
      },
      isAdmin: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      articleLink() {
        return this.isAdmin ? "/admin/" + this.id : "/articles/" + this.id;
      }
    }
  };
</script>

<style>
  .article-preview {
    margin: 0 0 1.5em;
  }
  .article-preview h3 {
    margin-bottom: 0.25em;
    font-size: 1.35em;
  }

  .article-preview p {
    margin: 0;
    padding: 0;
    font-size: 0.75em;
    line-height: 1.25em;
  }
</style>