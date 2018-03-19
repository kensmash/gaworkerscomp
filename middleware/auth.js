export default function(context) {
  console.log("authentication status", context.store.getters.isAuthenticated);
  if (!context.store.getters.isAuthenticated) {
    context.redirect("/admin/auth");
  }
}
