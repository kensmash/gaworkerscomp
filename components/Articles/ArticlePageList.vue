<template>
  <section class="article-list">
    <template v-if="!fetching && !pageswitching">
      <ArticlePreview v-for="article in articles.slice(0, numberArticles)" :key="article._id" :id="article._id" :title="article.title" :author="article.author" :is-admin="isAdmin" />
    </template>
    <template v-else>
      <p>Fetching articles...</p>
    </template>
    <template v-if="page=='articles' && totalpages >= 2">
      <b-pagination-nav :link-gen="linkGen " :number-of-pages="totalpages" v-model="currentPage" :use-router="true" />
    </template>
  </section>
</template>

<script>
  import ArticlePreview from "@/components/Articles/ArticlePreview";
  export default {
    name: "ArticlePageList",
    props: {
      numberArticles: {
        type: String
      },
      page: {
        type: String
      }
    },
    components: {
      ArticlePreview
    },
    props: {
      isAdmin: {
        type: Boolean,
        default: false
      },
      numberArticles: {
        type: Number,
        required: true
      },
      page: {
        type: String,
        required: true
      },
      articles: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        pageswitching: false
      };
    },
    computed: {
      currentPage: {
        //getter
        get() {
          return parseInt(this.$route.params.page);
        },
        // setter
        set(newValue) {
          this.pageswitching = true;
          parseInt(newValue);
        }
      },
      totalpages() {
        return this.$store.getters.totalArticlePages;
      },
      fetching() {
        return this.$store.getters.fetching;
      }
    },
    methods: {
      linkGen(pageNum) {
        return "/articles/page/" + pageNum;
      },
      fetchArticles(page) {
        this.pageswitching = true;
        this.$store
          .dispatch("fetchArticlePage", page)
          .then(() => (this.pageswitching = false));
      }
    },
    created() {
      console.log("created");
      this.fetchArticles(parseInt(this.$route.params.page));
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
