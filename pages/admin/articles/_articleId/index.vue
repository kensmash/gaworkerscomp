<template>
  <div class="admin-post-page">
    <section class="">
      <admin-article-form :article="loadedArticle" :authors="loadedAuthors" @submit="onSubmitted" />
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
    async asyncData(context) {
      let [article, authors] = await Promise.all([
        context.app.$axios.$get(
          process.env.baseUrl + "/api/articles/" + context.params.articleId
        ),
        context.app.$axios.$get(process.env.baseUrl + "/api/authors")
      ]);
      let articleAuthors;
      if (article.author.length) {
        articleAuthors = article.author.map(author => ({
          text: author.name,
          value: author._id
        }));
      } else {
        articleAuthors = [];
      }
      return {
        loadedArticle: {
          author: articleAuthors,
          title: article.title,
          subhead: article.subhead,
          content: article.content,
          footnotes: article.footnotes,
          published: article.published,
          id: article._id
        },
        loadedAuthors: authors.authors.map(author => ({
          text: author.name,
          value: author._id
        }))
      };
    },
    methods: {
      onSubmitted(editedArticle) {
        this.$store.dispatch("editArticle", editedArticle).then(() => {
          //
        });
      }
    }
  };
</script>