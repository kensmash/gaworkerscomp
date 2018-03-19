<template>
  <div class="admin-post-page">
    <section class="">
      <admin-author-form :author="loadedAuthor" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
  import AdminAuthorForm from "@/components/Admin/AdminAuthorForm";

  export default {
    layout: "admin",
    components: {
      AdminAuthorForm
    },
    asyncData(context) {
      return context.app.$axios
        .$get(process.env.baseUrl + "/api/authors/" + context.params.authorId)
        .then(response => {
          return {
            loadedAuthor: response
          };
        })
        .catch(e => context.error(e));
    },
    methods: {
      onSubmitted(editedAuthor) {
        console.log(editedAuthor);
        this.$store.dispatch("editAuthor", editedAuthor).then(() => {
          //
        });
      }
    }
  };
</script>