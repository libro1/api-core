import jwt from "jwt-simple";
import moment from "moment";
import { token } from "morgan";
import { Type } from "typescript";

interface TokenPayload {
  userId: string,
  createdAt: Number,
  expiredAt: Number,
}

export default class Token {
  tokenValue: string;
  tokenPayload!: TokenPayload

  constructor(_value: string) {
    this.tokenValue = _value;
    this.decodeToken();
  }

  decodeToken():boolean{
    try {
      const payload = jwt.decode(this.tokenValue, process.env.SECRET || "ee");
      this.tokenPayload = payload;
      return true
    } catch {
      return false;
    }
  }

  isActive():boolean{
    return moment().unix() < this.tokenPayload.expiredAt
  }

  isValid():boolean{
    return this.decodeToken() && this.isActive()
  }

  getUserId():string{
    return this.tokenPayload.userId
  }
}
