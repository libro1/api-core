import { prop } from "@typegoose/typegoose";

export default class Movement {
  id?: string;
  @prop()
  name?: string;
  @prop()
  date!: string;
  @prop()
  amount!: string;
  @prop()
  userId!: string;
  @prop()
  expense!: boolean;

  static fromBody(movement: Object): Movement {
    return Object.assign(new Movement(), movement);
  }
}
