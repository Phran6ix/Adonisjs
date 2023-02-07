import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import { schema } from "@ioc:Adonis/Core/Validator";
import CreateArticleValidator from "App/Validators/CreateArticleValidator";

export default class ArticlesController {
  public async view({ view }: HttpContextContract) {
    const articles = await Database.from("articles").select("*");
    return view.render("article.view", { articles });
  }

  public async create({ view }) {
    return view.render("article.create");
  }

  public async store({ request, response }) {
    const payload = await request.validate(CreateArticleValidator);

    await Database.table("articles").insert({
      ...payload,
      slug: payload.title,
    });
    return response.redirect().back();
    // } catch (error) {
    //   console.log(error);
    //   response.badRequest(error.messages);
    // }
  }

  public async edit({ view, params, response }) {
    const { slug } = params;
    const article = await Database.from("articles").where("slug", slug).first();
    response.status(200).send(article);
  }
}
