<template>
  <b-navbar toggleable type="dark" variant="info">
    <b-container>

      <b-navbar-nav>
        <b-nav-item exact to="/">Home</b-nav-item>
        <b-nav-item to="/articles">Articles</b-nav-item>
        <b-nav-item to="/about">About</b-nav-item>
        <b-nav-item to="/search">Search</b-nav-item>
        <b-nav-item to="/copyright">Copyright</b-nav-item>
        <b-nav-item to="/disclaimer">Disclaimer</b-nav-item>
      </b-navbar-nav>

    </b-container>
  </b-navbar>
</template>

<script>
  export default {
    name: "TheFooter"
  };
</script>

<style scoped>
  .navbar-dark {
    border-top: 2px solid #835e4a;
    background-color: rgba(74, 74, 74, 0.5) !important;
    margin-top: 3em;
  }

  .navbar-brand {
    margin-right: 0.25em;
  }

  .navbar-nav {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-item {
    padding: 0 1em;
  }

  @media only screen and (min-width: 640px) {
    .navbar .container {
      justify-content: center;
    }

    .navbar-dark {
      position: inherit;
    }

    .navbar-brand {
      display: none;
    }

    .navbar-collapse {
      justify-content: center;
    }

    .navbar-nav {
      width: 90%;
      justify-content: space-between;
    }
  }
</style>


