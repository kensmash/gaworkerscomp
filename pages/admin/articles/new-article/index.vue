<template>
  <div class="admin-post-page">
    <section class="new-article-form">
      <admin-article-form :authors="authors" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
  import AdminArticleForm from "@/components/Admin/AdminArticleForm";

  export default {
    layout: "admin",
    components: {
      AdminArticleForm
    },
    asyncData(context) {
      return context.app.$axios
        .$get("/api/authors")
        .then(response => {
          return {
            authors: response.authors.map(author => ({
              text: author.name,
              value: author._id
            }))
          };
        })
        .catch(e => context.error(e));
    },
    methods: {
      onSubmitted(articleData) {
        this.$store.dispatch("addArticle", articleData).then(() => {
          //this.$router.push("/admin");
        });
      }
    }
  };
</script>