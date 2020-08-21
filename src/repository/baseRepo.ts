import { getModelForClass, types, ReturnModelType, DocumentType } from '@typegoose/typegoose';
import * as mongoose from "mongoose"

abstract class GenericCRUDService<U extends types.AnyParamConstructor<any>> {
  public dataModel: ReturnModelType<U>;

  constructor(dataType: U) {
    this.dataModel = getModelForClass(dataType)
  }

  public create(data: mongoose.CreateQuery<DocumentType<InstanceType<U>>>) {
    return this.dataModel.create(data)
  }
}

export default GenericCRUDService