import { prop } from "@typegoose/typegoose";

export default class Category {
  _id?: string;
  @prop()
  name!: string;
  @prop()
  color!: string;

  constructor(_name: string, _color:string){
    this.color = _color
    this.name = _name
  }
}
