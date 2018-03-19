<template>
    <div>
        <section>
            <p>Redirecting...</p>
        </section>
    </div>
</template>

<script>
    export default {
      layout: "admin",
      mounted() {
        this.$router.push("/admin/articles/page/1");
      }
    };
</script>