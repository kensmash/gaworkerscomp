<template>
  <section>
    <p>Redirecting...</p>
  </section>
</template>

<script>
  export default {
    layout: "admin",
    mounted() {
      this.$router.push("/admin/articles/page/1");
    }
  };
</script>