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

  public searchById(id:string){
    return this.dataModel.findById(id)
  }

  public updateById(id:string, data:mongoose.CreateQuery<DocumentType<InstanceType<U>>>){
    this.dataModel.findByIdAndUpdate({id}, data, (err, res)=>{if(err) console.log(err)});
  }
}

export default GenericCRUDService