import { Router } from "express";
import { getModelForClass } from '@typegoose/typegoose';

import userRepo from "../repository/userRepository";
import Category from "../domain/category";
import Utils from "../utils/responseParser";
import User from "../domain/user";
class CategoriesController {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post("/", async (req, res) => {

      const user = await getModelForClass(User).findById(req.body.userId);
      if (user) {
        const category = new Category(req.body.name, req.body.color);
        user.customCategories=[]
        user.customCategories.push({ name: "", color: "" });
        user.save()
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
  }
}

const categoriesController = new CategoriesController();

export default categoriesController.router;
