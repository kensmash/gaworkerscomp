import Vuex from "vuex";
import Cookie from "js-cookie";

const createStore = () => {
  return new Vuex.Store({
    state: {
      token: null,
      fetching: false,
      username: "",
      searchterm: "",
      searchresults: [],
      loadedAuthors: [],
      totalAuthorPages: 0,
      loadedArticles: [],
      totalArticlePages: 0,
      totalAdminArticlePages: 0,
      totalArticles: 0
    },

    getters: {
      fetching(state) {
        return state.fetching;
      },
      loadedArticles(state) {
        return state.loadedArticles;
      },
      totalArticles(state) {
        return state.totalArticles;
      },
      totalArticlePages(state) {
        return state.totalArticlePages;
      },
      totalAdminArticlePages(state) {
        return state.totalAdminArticlePages;
      },
      loadedAuthors(state) {
        return state.loadedAuthors;
      },
      totalAuthorPages(state) {
        return state.totalAuthorPages;
      },
      searchterm(state) {
        return state.searchterm;
      },
      searchResults(state) {
        return state.searchresults;
      },
      isAuthenticated(state) {
        return state.token !== null;
      },
      userName(state) {
        return state.username;
      }
    },

    mutations: {
      setToken(state, token) {
        state.token = token;
      },
      clearToken(state) {
        state.token = null;
      },
      setUserName(state, username) {
        state.username = username;
      },
      clearUserName(state) {
        state.username = "";
      },
      setFetchingStatus(state, fetchingstatus) {
        state.fetching = fetchingstatus;
      },
      setSearch(state, searchterm) {
        state.searchterm = searchterm;
      },
      clearSearch(state) {
        state.searchterm = "";
      },
      setSearchResults(state, results) {
        state.searchresults = results;
      },
      setAuthors(state, authors) {
        state.loadedAuthors = authors;
      },
      addAuthor(state, author) {
        state.loadedAuthors.push(author);
      },
      editAuthor(state, editedAuthor) {
        const authorIndex = state.loadedAuthors.findIndex(
          author => author.id === editedAuthor.id
        );
        state.loadedAuthors[authorIndex] = editedAuthor;
      },
      removeAuthor(state, authorid) {
        state.loadedAuthors.filter(author => author._id !== authorid);
      },
      setTotalAuthorPages(state, pages) {
        state.totalAuthorPages = pages;
      },
      setArticles(state, articles) {
        state.loadedArticles = articles;
      },
      addArticle(state, article) {
        state.loadedArticles.push(article);
      },
      editArticle(state, editedArticle) {
        const articleIndex = state.loadedArticles.findIndex(
          article => article.id === editedArticle.id
        );
        state.loadedArticles[articleIndex] = editedArticle;
      },
      removeArticle(state, articleid) {
        state.loadedArticles.filter(article => article._id !== articleid);
      },
      setTotalArticlePages(state, pages) {
        state.totalArticlePages = pages;
      },
      setTotalAdminArticlePages(state, pages) {
        state.totalAdminArticlePages = pages;
      }
    },

    actions: {
      nuxtServerInit(vuexContext, context) {
        return (
          context.app.$axios
            .$get(process.env.baseUrl + "/api/articles/page/1")
            .then(res => {
              console.log("attempted article fetch");
              vuexContext.commit("setArticles", res.articles);
              vuexContext.commit("setTotalArticlePages", res.pages);
            })
            //apparently this will trigger Nuxt's error page
            .catch(e => context.error(e))
        );
      },
      authenticateUser(vuexContext, authData) {
        return this.$axios
          .$post(process.env.baseUrl + "/api/signin", {
            email: authData.email,
            password: authData.password
          })
          .then(result => {
            vuexContext.commit("setToken", result.token);
            vuexContext.commit("setUserName", result.username);
            localStorage.setItem("token", result.token);
            localStorage.setItem("username", result.username);
            Cookie.set("jwt", result.token);
            Cookie.set("username", result.username);
          })
          .catch(error => console.log(error));
      },
      initAuth(vuexContext, req) {
        let token;
        let username;
        if (req) {
          if (!req.headers.cookie) {
            console.log("no cookie in header");
            return;
          }
          //cookie
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          if (!jwtCookie) {
            return;
          }
          console.log("got a cookie");
          token = jwtCookie.split("=")[1];
          //username
          const userNameCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("username="));
          if (!userNameCookie) {
            return;
          }
          username = userNameCookie.split("=")[1];
        } else {
          token = localStorage.getItem("token");
          username = localStorage.getItem("username");
          if (!token) {
            return;
          }
        }
        vuexContext.commit("setToken", token);
        vuexContext.commit("setUserName", username);
      },
      logout(vuexContext) {
        vuexContext.commit("clearToken");
        vuexContext.commit("clearUserName");
        Cookie.remove("jwt");
        Cookie.remove("username");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
        }
      },
      fetchAuthors(vuexContext) {
        return this.$axios
          .$get(process.env.baseUrl + "/api/authors")
          .then(res => {
            vuexContext.commit("setAuthors", res.authors);
          })
          .catch(e => console.log(e));
      },
      addAuthor(vuexContext, author) {
        return this.$axios
          .$post(process.env.baseUrl + "/api/authors", author, {
            headers: { authorization: vuexContext.state.token }
          })
          .then(data => {
            vuexContext.commit("addAuthor", {
              ...author,
              id: data.name
            });
          })
          .catch(e => console.log(e));
      },
      editAuthor(vuexContext, editedAuthor) {
        return this.$axios
          .$put(
            process.env.baseUrl + "/api/authors/" + editedAuthor._id,
            editedAuthor,
            {
              headers: { authorization: vuexContext.state.token }
            }
          )
          .then(res => {
            vuexContext.commit("editAuthor", {
              ...editedAuthor
            });
          })
          .catch(e => console.log(e));
      },
      removeAuthor(vuexContext, authorId) {
        return this.$axios
          .$delete(process.env.baseUrl + "/api/authors/" + authorId, {
            headers: { authorization: vuexContext.state.token }
          })
          .then(res => vuexContext.commit("removeAuthor", res._id))
          .catch(e => console.log(e));
      },
      setAuthorPages(vuexContext, pages) {
        vuexContext.commit("setTotalAuthorPages", pages);
      },
      fetchArticlePage(vuexContext, page) {
        vuexContext.commit("setFetchingStatus", true);
        vuexContext.commit("setArticles", []);
        return (
          this.$axios
            .$get(process.env.baseUrl + "/api/articles/page/" + page)
            .then(res => {
              vuexContext.commit("setArticles", res.articles);
            })
            .then(vuexContext.commit("setFetchingStatus", false))
            //apparently this will trigger Nuxt's error page
            .catch(e => context.error(e))
        );
      },
      addArticle(vuexContext, article) {
        const createdArticle = {
          ...article,
          updatedDate: new Date()
        };
        return this.$axios
          .$post(process.env.baseUrl + "/api/articles/", createdArticle, {
            headers: { authorization: vuexContext.state.token }
          })
          .then(data => {
            vuexContext.commit("addArticle", {
              ...createdArticle,
              id: data.name
            });
          })
          .catch(e => console.log(e));
      },
      editArticle(vuexContext, editedArticle) {
        return this.$axios
          .$put(
            process.env.baseUrl + "/api/articles/" + editedArticle.id,
            editedArticle,
            {
              headers: { authorization: vuexContext.state.token }
            }
          )
          .then(res => {
            vuexContext.commit("editArticle", {
              ...editedArticle
            });
          })
          .catch(e => console.log(e));
      },
      removeArticle(vuexContext, articleId) {
        return this.$axios
          .$delete(process.env.baseUrl + "/api/articles/" + articleId, {
            headers: { authorization: vuexContext.state.token }
          })
          .then(res => vuexContext.commit("removeArticle", res._id))
          .catch(e => console.log(e));
      },
      setArticles(vuexContext, articles) {
        vuexContext.commit("setArticles", articles);
      },
      setSearch(vuexContext, searchterm) {
        vuexContext.commit("setSearch", searchterm);
      },
      clearSearch(vuexContext) {
        vuexContext.commit("clearSearch");
      },
      searchArticlesByTitle(vuexContext, searchterm) {
        return this.$axios
          .$post(process.env.baseUrl + "/api/articles/searchtitle", {
            searchterm
          })
          .then(result => {
            vuexContext.commit("setSearchResults", result);
          })
          .catch(error => console.log(error));
      },
      searchArticlesByAuthor(vuexContext, authorid) {
        return this.$axios
          .$post(process.env.baseUrl + "/api/articles/searchauthor", {
            authorid
          })
          .then(result => {
            vuexContext.commit("setSearchResults", result);
          })
          .catch(error => console.log(error));
      }
    }
  });
};

export default createStore;
