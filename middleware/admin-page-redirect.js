export default function(context) {
  const pathArray = context.route.path.split("/");
  const currentPage = pathArray[2];
  if (!context.params.pageId) {
    if (currentPage == "authors") {
      context.redirect("/admin/authors/page/1");
    }
    if (currentPage == "articles") {
      context.redirect("/admin/articles/page/1");
    }
  }
}
