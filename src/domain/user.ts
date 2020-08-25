import { prop } from "@typegoose/typegoose";

import Category from "./category";

export default class User {
  _id?: string;
  @prop()
  name!: string;
  @prop()
  lastName!: string;
  @prop({ unique: true })
  email!: string;
  @prop()
  password!: string;
  @prop({ type: Category })
  customCategories!: Category[];

  addNewCategory(newCategory: Category) {
    this.customCategories.push(newCategory);
  }

  deleteCategory(categoryId: string) {
    this.customCategories = this.customCategories.filter(
      (elem) => elem._id != categoryId
    );
  }

  editCategory(editedCategory: Category, categoryId: string) {
    this.deleteCategory(categoryId);
    this.customCategories.push(editedCategory);
  }

  static fromBody(userJson: Object): User {
    return Object.assign(new User(), userJson);
  }
}
