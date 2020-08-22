export default class Category {
  name!: string;
  color!: string;

  constructor(_name: string, _color:string){
    this.color = _color
    this.name = _name
  }
}
