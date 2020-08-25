import { Router } from "express";
import { getModelForClass } from "@typegoose/typegoose";

import userRepo from "../repository/userRepository";
import Category from "../domain/category";
import Utils from "../utils/responseParser";
import User from "../domain/user";
import { addListener } from "process";
class CategoriesController {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {

    this.router.post("/", async (req, res) => {
      const user = await userRepo.searchById(req.body.userId);
      if (user) {
        const category = new Category(req.body.name, req.body.color);
        user.addNewCategory(category);
        user.save();
        return res.json({ message: "Categoria agregada con exíto!" });
      } else
        return res
          .status(404)
          .json(Utils.getResposeError("Ususuario no encontrado"));
    });

    this.router.get("/", async (req, res) => {
      const user = await userRepo.searchById(req.body.userId);
      if (user) res.json(user.customCategories);
      else
        res.status(404).json(Utils.getResposeError("Ususuario no encontrado"));
    });

    this.router.delete("/:id", async (req, res) => {
      const user = await userRepo.searchById(req.body.userId);
      if (user) {
        user.deleteCategory(req.params.id);
        user.save();
        return res.json({ message: "Elimina2" });
      }
      else
        return res.status(404).json(Utils.getResposeError("Usuario no encontrado"))
    });

    this.router.put("/:id", async (req, res) => {
      const user = await userRepo.searchById(req.body.userId);
      if (user) {
        const category = new Category(req.body.name, req.body.color);
        user.editCategory(category,req.params.id);
        user.save();
        return res.json({ message: "Edita2" });
      }
      else
        return res.status(404).json(Utils.getResposeError("Usuario no encontrado"))
    });
  }
}

const categoriesController = new CategoriesController();

export default categoriesController.router;
