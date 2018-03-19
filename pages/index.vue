<template>
  <div>
    <section>
      <p>Whether you are an attorney, claims adjuster, employer, employee, medical provider, or anyone else with an interest in Georgia Workers&rsquo; Compensation, we hope you will find something useful here.</p>
      <p>If you would like to be notified when new material is added to our site, simply send an email with the words &ldquo;GAComp Subscribe&rdquo; in the subject to
        <a href="mailto:attorney@gaworkerscomp.com?subject=GAComp Subscribe">attorney@gaworkerscomp.com.</a>
      </p>
    </section>
    <h2 class="latest-articles">Latest Articles</h2>
    <ArticleHomePageList :articles="loadedArticles" />
  </div>
</template>

<script>
  import ArticleHomePageList from "@/components/Articles/ArticleHomePageList";
  export default {
    components: {
      ArticleHomePageList
    },
    computed: {
      loadedArticles() {
        return this.$store.getters.loadedArticles;
      }
    }
  };
</script>

<style>
  .latest-articles {
    margin-top: 1.5em;
    font-size: 1.5em;
    font-weight: 700;
  }
</style>

