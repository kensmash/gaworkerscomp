<template>
    <b-navbar toggleable type="dark" variant="info">
        <b-container>
            <b-navbar-toggle target="footer_nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="#">Georgia Workers&rsquo; Comp</b-navbar-brand>
            <b-collapse is-nav id="footer_nav_collapse">
                <b-navbar-nav>
                    <b-nav-item exact to="/">Home</b-nav-item>
                    <b-nav-item to="/articles">Articles</b-nav-item>
                    <b-nav-item to="/about">About</b-nav-item>
                    <b-nav-item to="/search">Search</b-nav-item>
                    <b-nav-item to="/copyright">Copyright</b-nav-item>
                    <b-nav-item to="/disclaimer">Disclaimer</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
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
</style>


