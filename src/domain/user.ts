import { Category } from "./category"
import { prop, } from '@typegoose/typegoose';

export default class User{
    
    id?:string
    @prop()
    name!:string
    @prop()
    lastName!:string 
    @prop({ unique: true })
    email!:string
    @prop()
    password!:string  
    @prop()
    customCategories:Category[] = []

    addNewCategory(newCategory:Category){
        this.customCategories.push(newCategory)
    }

    static fromBody(userJson:Object): User{
        return Object.assign(new User(), userJson)
    }

    static toJson():string{
        return JSON.stringify(this)
    }
}