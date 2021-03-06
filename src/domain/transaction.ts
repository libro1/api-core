import { prop, Ref } from "@typegoose/typegoose";
import Category from "./category";

export default class Transaction {
  id?: string;
  @prop()
  name?: string;
  @prop()
  date!: Date;
  @prop()
  amount!: number;
  @prop()
  userId!: string;
  @prop()
  expense!: boolean;
  @prop({ type: Category })
  category!: Category;

  static fromBody(movement: Object): Transaction {
    return Object.assign(new Transaction(), movement);
  }
}
