  <template>
  <div>
    <div class="search-elements-container">
      <!-- text search -->
      <h4>Search Articles by Title:</h4>
      <div class="article-search">
        <b-form-input size="sm" type="text" v-model="titlesearchterm" @input="authorid = null" placeholder="Enter search term..." />
        <b-button size="sm" variant="primary" :disabled="titlesearchterm == null" @click="onTitleSearchGo">Title Search</b-button>
      </div>
      <!-- author search -->
      <h4>Search Articles by Author:</h4>
      <div class="author-search">
        <b-form-select v-model="authorid" :options="authors" size="sm" @change="titlesearchterm = null" />
        <b-button size="sm" variant="primary" :disabled="authorid == null" @click="onAuthorSearchGo">Author Search</b-button>
      </div>
    </div>
    <b-collapse v-model="searching" id="collapse4">
      <section>
        <div class="search-results-header">
          <h2>Search Results</h2>
          <b-button size="sm" variant="link" @click="this.clearSearch">Clear Search</b-button>
        </div>
        <template v-if="loadedArticles.length">
          <ArticlePageList :articles="loadedArticles" :numberArticles="25" page="search" />
        </template>
        <template v-else>
          <p>Sorry, your search did not return any results.</p>
        </template>
      </section>
    </b-collapse>
  </div>
</template>

<script>
  import ArticlePageList from "@/components/Articles/ArticlePageList";
  export default {
    components: {
      ArticlePageList
    },
    data() {
      return {
        authorid: null,
        titlesearchterm: null,
        searching: false
      };
    },
    computed: {
      searchterm() {
        return this.$store.getters.searchterm;
      },
      loadedArticles() {
        return this.$store.getters.searchResults;
      },
      authors() {
        const authors = this.$store.getters.loadedAuthors.map(author => ({
          text: author.name,
          value: author._id
        }));
        const authorslist = [
          { value: null, text: "Select an author..." },
          ...authors
        ];
        return authorslist;
      }
    },
    methods: {
      updateSearchTerm(e) {
        console.log(e);
        this.$store.commit("setSearch", e);
      },
      onTitleSearchGo() {
        this.searching = true;
        this.$store.dispatch("setSearch", this.titlesearchterm);
        this.$store.dispatch("searchArticlesByTitle", this.titlesearchterm);
      },
      onAuthorSearchGo() {
        this.searching = true;
        this.titlesearchterm = null;
        this.$store.dispatch("searchArticlesByAuthor", this.authorid);
      },
      clearSearch() {
        this.searching = false;
        this.titlesearchterm = null;
        this.authorid = null;
        this.$store.dispatch("clearSearch");
      }
    },
    mounted() {
      this.$store.dispatch("fetchAuthors");
      this.showCollapse = true;
    }
  };
</script>

<style scoped>
  .search-results-header {
    margin: 0.75em 0 0.5em;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .search-results-header .btn-link {
    margin: 0;
    padding: 0;
    width: auto;
  }

  .search-results-header h2 {
    margin: 0;
    padding: 0;
    font-size: 1.5em;
    font-weight: 700;
  }

  .search-elements-container {
    padding: 0.15em 0 0.75em;
  }

  .search-elements-container h4 {
    font-size: 1em;
    font-weight: 700;
  }

  .search-elements-container h4:nth-of-type(2) {
    margin: 0.9em 0 0.3em 0;
  }

  .article-search,
  .author-search {
    display: block;
  }

  .btn {
    margin-top: 0.75em;
  }

  @media screen and (min-width: 480px) {
    .article-search,
    .author-search {
      display: flex;
      flex-wrap: nowrap;
    }

    .btn {
      width: 25%;
      margin-top: 0;
      margin-left: 0.5em;
    }
  }
</style>

