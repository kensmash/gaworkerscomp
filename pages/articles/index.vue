<template>
  <section>
    <p>Redirecting...</p>
  </section>
</template>

<script>
  export default {
    mounted() {
      this.$router.push("/articles/page/1");
    }
  };
</script>

