<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-container>
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="#">Georgia Workers&rsquo; Comp</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item exact to="/">Home</b-nav-item>
            <b-nav-item to="/articles">Articles</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
            <b-nav-item to="/search">Search</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<style scoped>
  .navbar-dark {
    border-bottom: 2px solid #835e4a;
    background: rgba(74, 74, 74, 0.5) !important;
  }

  .navbar-brand {
    margin-right: 0.25em;
  }

  @media only screen and (min-width: 640px) {
    .navbar-brand {
      display: none;
    }
  }
</style>


