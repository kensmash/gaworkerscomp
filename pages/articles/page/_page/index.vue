<template>
  <section>
    <p class="articles-intro">
      <i>GA WorkersComp</i> offers a mixture of original and previously published articles, papers, and outlines covering all aspects of the Georgia Workers&rsquo; Compensation system. If you would like to be considered for online publication, please query
      <a href="mailto:attorneys@gaworkerscomp.com"> attorneys@gaworkerscomp.com</a> prior to sending any material.</p>
    <h2 class="latest-articles">All Articles</h2>
    <ArticlePageList :articles="loadedArticles" :numberArticles="10" page="articles" />
  </section>
</template>

<script>
  import ArticlePageList from "@/components/Articles/ArticlePageList";
  export default {
    components: {
      ArticlePageList
    },
    computed: {
      loadedArticles() {
        return this.$store.getters.loadedArticles;
      }
    }
  };
</script>

<style>
  .articles-intro {
    margin-bottom: 2em;
  }
</style>

