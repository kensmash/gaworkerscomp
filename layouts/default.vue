<template>
  <div class="mainlayout">
    <TheHeader />
    <b-container>
      <b-row>
        <b-col md="10" lg="8">
          <h1 class="site-name">Georgia Workers&rsquo; Compensation</h1>
          <nuxt/>
        </b-col>
      </b-row>
    </b-container>
    <TheFooter />
  </div>
</template>

<script>
  import TheHeader from "@/components/Navigation/TheHeader";
  import TheFooter from "@/components/Navigation/TheFooter";
  export default {
    middleware: ["check-auth"],
    components: {
      TheHeader,
      TheFooter
    }
  };
</script>

<style scoped>
  .mainlayout {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    background: black;
    color: white;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
  }

  @media only screen and (min-width: 540px) {
    .mainlayout {
      background: black url("~/assets/images/bg-statue.jpg") top right no-repeat;
      background-size: 60%;
    }
  }

  @media only screen and (min-width: 768px) {
    .mainlayout {
      background: black url("~/assets/images/bg-statue.jpg") top right no-repeat
        fixed;
      background-size: 50%;
    }
  }

  .site-name {
    text-indent: -9999px;
    margin: -0.25em;
  }

  @media only screen and (min-width: 640px) {
    .site-name {
      text-indent: 0;
      font-size: 1.75em;
      font-weight: 700;
      margin: 1em 0;
      padding: 0;
    }
  }

  .page-enter-active,
  .page-leave-active {
    /*transition: opacity 0.2s;*/
  }

  .page-enter,
  .page-leave-to {
    /*opacity: 0;*/
  }
</style>
