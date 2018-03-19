<template>
  <div>
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <nuxt-link to="/" exact class="navbar-brand col-sm-3 col-md-2 mr-0">GA Workers Comp</nuxt-link>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" @click="onLogout">Log out</a>
        </li>
      </ul>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <the-admin-nav />
        <div class="col-md-10 ml-sm-auto pt-3 px-4">
          <nuxt/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TheAdminNav from "@/components/Admin/TheAdminNav";

  export default {
    middleware: ["check-auth", "auth"],
    components: {
      TheAdminNav
    },
    methods: {
      onLogout() {
        this.$store.dispatch("logout");
        this.$router.push("/admin/auth");
      }
    }
  };
</script>

<style scoped>
  .navbar-brand {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, 0.25);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
  }

  .navbar .form-control {
    padding: 0.75rem 1rem;
    border-width: 0;
    border-radius: 0;
  }

  .form-control-dark {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .form-control-dark:focus {
    border-color: transparent;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
  }

  .border-top {
    border-top: 1px solid #e5e5e5;
  }
  .border-bottom {
    border-bottom: 1px solid #e5e5e5;
  }
</style>
