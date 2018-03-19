<template>
  <div>
    <section>
      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="9">
            <h2>Articles</h2>
          </b-col>
          <b-col>
            <b-button variant="success" block @click="$router.push('/admin/articles/new-article')">Create New Article</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-table striped outlined ref="articlestable" :busy.sync="isBusy" :fields="fields" :items="myProvider" :per-page="10" :current-page="currentPage">
            <template slot="title" slot-scope="data">
              {{data.value}}
            </template>

            <template slot="author" slot-scope="data">
              {{data.value}}
            </template>
            <template slot="actions" slot-scope="data">
              <b-button-group>
                <b-button variant="link" @click="goToEditScreen(`${data.item.id}`)">
                  <span class="oi oi-pencil" title="Edit" aria-hidden="true"></span>Edit</b-button>
                <b-button variant="link" @click="deleteWarnHandler(`${data.item.id}`)">
                  <span class="oi oi-x" title="Delete" aria-hidden="true"></span>Delete</b-button>
              </b-button-group>
            </template>
          </b-table>
          <template v-if="totalpages >= 2">
            <b-pagination-nav :link-gen="linkGen" :number-of-pages="totalpages" v-model="currentPage" :use-router="true" />
          </template>
        </b-row>
      </b-container>
      <!-- Modal Component -->
      <b-modal ref="myModalRef" title="Delete Article" @ok="handleOk()">
        <div class="d-block">
          <p>Are you sure you want to delete this article? This action cannot be undone.</p>
        </div>
      </b-modal>
    </section>
  </div>
</template>

<script>
  export default {
    layout: "admin",
    data() {
      return {
        isBusy: false,
        articleToDelete: "",
        fields: [
          {
            key: "title",
            label: "Title"
          },
          {
            // A column that needs custom formatting,
            key: "published",
            label: "Status",
            formatter: "publishedStatus"
          },
          {
            key: "author",
            label: "Author(s)"
          },
          {
            // A regular column
            key: "actions",
            label: "Actions"
          }
        ]
      };
    },
    computed: {
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
        return this.$store.getters.totalAdminArticlePages;
      }
    },
    methods: {
      myProvider(ctx) {
        this.isBusy = true;
        return this.$axios
          .$get(
            process.env.baseUrl + "/api/admin/articles/page/" + ctx.currentPage
          )
          .then(res => {
            this.$store.commit("setTotalAdminArticlePages", res.pages);
            const items = res.articles.map(article => ({
              title: article.title,
              published: article.published,
              author: article.author.length
                ? article.author.map(author => author.name).join(", ")
                : "",
              date: article.dateadded,
              id: article._id
            }));
            this.isBusy = false;
            return items;
          })
          .catch(error => {
            console.log(error);
          });
      },
      publishedStatus(value) {
        if (value == false) {
          return "Draft";
        } else {
          return "Published";
        }
      },
      linkGen(pageNum) {
        return "/admin/articles/page/" + pageNum;
      },
      goToEditScreen(id) {
        this.$router.push("/admin/articles/" + id);
      },
      deleteWarnHandler(id) {
        this.showModal();
        this.articleToDelete = id;
      },
      showModal() {
        this.$refs.myModalRef.show();
      },
      hideModal() {
        this.$refs.myModalRef.hide();
      },
      handleOk() {
        this.$store.dispatch("removeArticle", this.articleToDelete).then(() => {
          this.hideModal();
          this.$refs.articlestable.refresh();
        });
      }
    }
  };
</script>

<style scoped>
  .btn-link {
    padding: 0 0.75em 0 0;
  }
  .table {
    margin-top: 0.5em;
  }
</style>