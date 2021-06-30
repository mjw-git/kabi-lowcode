import {styleProperty} from '../types/interface'
export interface ImageProp {
  v_id: String;
  name: String;
  src:String,
  type?: String;
  value?: String | Number;
  icon?: String;
  disabled?: Boolean;
  styles?: styleProperty
}
export const  createimageProp=(v_id:string,left:number,top:number):ImageProp=>({
    v_id: v_id,
    name: "v-image",
    src:"https://gitee.com/meng_jiawei/pic-sea/raw/master/img/下载.jpg",
    styles:{
      width:100,
      height:100,
      top:top,
      left:left,
    }
  })
