<template>
  <div class="admin-post-page">
    <section class="new-author-form">
      <admin-author-form @submit="onSubmitted" />
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
    methods: {
      onSubmitted(authorData) {
        this.$store.dispatch("addAuthor", authorData).then(() => {
          //this.$router.push("/admin");
        });
      }
    }
  };
</script>