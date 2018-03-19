<template>
  <div>
    <section>
      <b-container class="bv-example-row">
        <b-row>
          <b-col cols="9">
            <h2>Authors</h2>
          </b-col>
          <b-col>
            <b-button variant="success" block @click="$router.push('/admin/authors/new-author')">Add New Author </b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-table striped outlined ref="authorstable" :busy.sync="isBusy" :fields="fields" :items="myProvider" :per-page="10" :current-page="currentPage">
            <template slot="name" slot-scope="data">
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
      <b-modal ref="myModalRef" title="Delete Author" @ok="handleOk()">
        <div class="d-block">
          <p>Are you sure you want to delete the author? This action cannot be undone.</p>
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
        authorToDelete: "",
        fields: [
          {
            key: "name",
            label: "Name"
          },
          {
            key: "firm",
            label: "Firm"
          },
          {
            key: "actions",
            label: "Actions"
          }
        ]
      };
    },
    computed: {
      currentPage: {
        get: function() {
          return parseInt(this.$route.params.page);
        },
        // setter
        set: function(newValue) {
          parseInt(newValue);
        }
      },
      totalpages() {
        return this.$store.getters.totalAuthorPages;
      }
    },
    methods: {
      myProvider(ctx) {
        this.isBusy = true;
        return this.$axios
          .$get(process.env.baseUrl + "/api/authors/page/" + ctx.currentPage)
          .then(res => {
            const items = res.authors.map(author => ({
              name: author.name,
              firm: author.lawfirm,
              id: author._id
            }));
            this.isBusy = false;
            this.$store.dispatch("setAuthorPages", res.pages);
            return items;
          })
          .catch(error => {
            console.log(error);
          });
      },
      linkGen(pageNum) {
        return "/admin/authors/page/" + pageNum;
      },
      goToEditScreen(id) {
        this.$router.push("/admin/authors/" + id);
      },
      deleteWarnHandler(id) {
        this.showModal();
        this.authorToDelete = id;
      },
      showModal() {
        this.$refs.myModalRef.show();
      },
      hideModal() {
        this.$refs.myModalRef.hide();
      },
      handleOk() {
        this.$store.dispatch("removeAuthor", this.authorToDelete).then(() => {
          this.hideModal();
          this.$refs.authorstable.refresh();
        });
      }
    },
    mounted() {
      console.log(this.$route.params);
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