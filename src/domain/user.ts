import { prop } from "@typegoose/typegoose";

import Category from "./category";

export default class User {
  id?: string;
  @prop()
  name!: string;
  @prop()
  lastName!: string;
  @prop({ unique: true })
  email!: string;
  @prop()
  password!: string;
  @prop()
  customCategories:Array<Object> = []

  addNewCategory(newCategory: Category) {
    this.customCategories.push(newCategory);
  }

  /*removeCategory(cateogryName: string){
    this.customCategories = this.customCategories.filter((elem)=>{
      return elem.name.toLocaleLowerCase() === cateogryName.toLocaleLowerCase()
    })
  }*/

  static fromBody(userJson: Object): User {
    return Object.assign(new User(), userJson);
  }
}
