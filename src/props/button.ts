// import ComponentProp from '../types/interface'
import {styleProperty} from '../types/interface'
export interface componentProp {
  v_id: String;
  name: String;
  label: String;
  type?: String;
  value?: String | Number;
  icon?: String;
  disabled?: Boolean;
  styles?: styleProperty
}
export const buttonProperty :componentProp={
  v_id: "",
  name: "v-button",
  label: "按钮",
  type:"primary",
  styles:{
    width:58,
    height:42,
    top:0,
    left:0,
  }
};
export const  createbuttonProp=(v_id:string,left:number,top:number):componentProp=>({
  v_id: v_id,
  name: "v-button",
  label: "按钮",
  type:"primary",
  styles:{
    width:60,
    height:42,
    top:top,
    left:left,
    fontSize:14,
    color:"#fff",
    fontWeight:400
  }
})