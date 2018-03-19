<template>
  <section>
    <p>Redirecting...</p>
  </section>
</template>

<script>
  export default {
    layout: "admin",
    mounted() {
      this.$router.push("/admin/authors/page/1");
    }
  };
</script>

