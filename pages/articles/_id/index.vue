<template>
  <section class="article">
    <h1 class="article-title">{{ loadedArticle.title }}</h1>
    <h2 v-if="loadedArticle.subhead" class="article-subhead">{{ loadedArticle.subhead }}</h2>
    <div class="article-meta">
      <p> by {{ loadedArticle.author[0].name }}
        <span v-if="loadedArticle.author.length > 1"> and {{ loadedArticle.author[1].name }}</span>
      </p>
      <p> {{ loadedArticle.author[0].lawfirm }}</p>
      <p v-if="loadedArticle.author.length > 1 && loadedArticle.author[0].lawfirm !== loadedArticle.author[1].lawfirm">{{ loadedArticle.author[1].lawfirm }}</p>
    </div>
    <div class="article-content" v-html="loadedArticle.content"></div>
    <hr>
    <div v-for="(author, index) in loadedArticle.author" :key="index" class="article-author" v-html="loadedArticle.author[index].bio"></div>
    <a href="#" v-scroll-to="'.article-title'">Back to top</a>
    <template v-if="loadedArticle.footnotes.length">
      <hr>
      <h3>Footnotes</h3>
      <ol class="article-footnotes">
        <li v-for="footnote in loadedArticle.footnotes" :key="footnote"> {{footnote}} </li>
      </ol>
      <a href="#" v-scroll-to="'.article-title'">Back to top</a>
    </template>
  </section>
</template>

<script>
  export default {
    asyncData(context) {
      return context.app.$axios
        .$get("/api/articles/" + context.params.id)
        .then(res => {
          return {
            loadedArticle: res
          };
        })
        .catch(e => context.error(e));
    }
  };
</script>

<style>
  .article-footnotes {
    margin-left: inherit;
    padding-left: 1em;
  }
</style>