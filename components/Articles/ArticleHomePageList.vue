<template>
  <section class="article-list">
    <ArticlePreview v-for="article in articles.slice(0, 5)" :key="article._id" :id="article._id" :title="article.title" :author="article.author" :is-admin="isAdmin" />
    <p class="all-articles-link">
      <nuxt-link to="/articles/page/1">See All Articles</nuxt-link>
    </p>
  </section>
</template>

<script>
  import ArticlePreview from "@/components/Articles/ArticlePreview";
  export default {
    name: "ArticleHomePageList",
    components: {
      ArticlePreview
    },
    props: {
      isAdmin: {
        type: Boolean,
        default: false
      },
      articles: {
        type: Array,
        required: true
      }
    },
    computed: {
      deezArticles() {
        if (!this.$route.params.page) {
          return this.$store.getters.loadedArticles;
        } else {
          return this.$axios
            .$get("/api/articles/page/" + this.$route.params.page)
            .then(res => {
              const items = res.articles.map(article => ({
                title: article.title,
                author: article.author.map(author => author.name).join(", "),
                date: article.dateadded,
                id: article._id
              }));
              console.log("items", items);
              return items;
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      currentPage: {
        //getter
        get: function() {
          return parseInt(this.$route.params.page);
        },
        // setter
        set: function(newValue) {
          parseInt(newValue);
        }
      },
      totalpages() {
        return this.$store.getters.totalArticlePages;
      }
    },
    methods: {
      linkGen(pageNum) {
        return "/articles/page/" + pageNum;
      }
    }
  };
</script>

<style>
  .article-list {
    background: white;
    color: black;
    padding: 1em;
    border-top: 8px solid #835e4a;
  }

  .all-articles-link {
    margin-top: 2em;
  }
</style>
