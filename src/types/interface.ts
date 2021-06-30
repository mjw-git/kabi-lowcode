export interface componentProp {
    v_id: Number;
    name: String;
    label: String;
    type?: String;
    value?: String | Number;
    icon?: String;
    disabled?: Boolean;
    style?:styleProperty
  }
export interface styleProperty{
    width:number,
    top:number,
    left:number,
    height:number,
    lineHeight?:number,
    textAlign?:string,
    color?:string,
    fontWeight?:number
    fontSize?:number
}