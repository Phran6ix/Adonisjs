import Route from "@ioc:Adonis/Core/Route";
import ArticlesController from "App/Controllers/Http/ArticlesController";

Route.get("/", async ({ view }) => {
  return view.render("welcome");
});

// A WAY OF CALLING A CONTROLLER

// Route.get("/news", async (ctx) => {
//   return new ArticlesController().view(ctx);
// }).as("news_view");

// SECOND WAY TO CALL A CONTROLLER
Route.get("/news", "ArticlesController.view").as("article_view");

// POST REQUEST
Route.get("/news/create", "ArticlesController.create").as("news_create");
Route.get("/news/:slug", "ArticlesController.edit").as("news_edit");
Route.post("/news", "ArticlesController.store").as("news_store");

Route.patch("/news/:id", ({ params }) => {
  return params;
}).where("id", {
  match: /^[0-9]+$/,
  cast: (id) => Number(id),
});
