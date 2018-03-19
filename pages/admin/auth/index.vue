<template>
  <b-card title="Log in to GA Workers Comp">
    <form @submit.prevent="onSubmit">
      <b-form-group label="Email:" label-for="email">
        <b-form-input v-model="email" id="email" type="email" placeholder="Enter email"></b-form-input>
      </b-form-group>
      <b-form-group label="Password:" label-for="password">
        <b-form-input v-model="password" id="lastname" type="password" placeholder="Enter password"></b-form-input>
      </b-form-group>
      <b-collapse v-model="showCollapse" id=collapse1_inner class="mt-2">
        <b-alert show variant="danger">Sorry, you are not authorized to access the admin area. Check your email and password and try again.</b-alert>
      </b-collapse>
      <b-button type="submit" variant="primary">Login</b-button>

    </form>
  </b-card>
</template>

<script>
  export default {
    name: "AdminAuthPage",
    layout: "login",
    data() {
      return {
        email: "",
        password: "",
        showCollapse: false
      };
    },
    methods: {
      onSubmit() {
        this.$store
          .dispatch("authenticateUser", {
            email: this.email,
            password: this.password
          })
          .then(() => {
            if (this.$store.getters.isAuthenticated) {
              this.$router.push("/admin");
            } else {
              this.showCollapse = true;
            }
          });
      }
    }
  };
</script>