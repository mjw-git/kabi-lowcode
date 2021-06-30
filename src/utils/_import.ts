import { App } from "vue";
const modules = import.meta.globEager("../components/*/index.tsx"); //同步导入
const createMoudle = import.meta.globEager("../props/*");
const RightPropsMoudle=import.meta.globEager("../components/*/*.props.tsx")

const createProps:any={};
const rightPropsBlock:any={};
function importComponent(app: App) {
  for (const key in modules) {
    const register_name = key.replace(
      /\.\.\/components\/(.*)\/index.tsx/,
      "$1"
    );
    app.component(`v-${register_name}`, modules[key]?.default || modules[key]);
  }
}

const importCreateFuntion=()=>{
  for(const key in createMoudle){
    const name=key.replace(/\.\.\/props\/(.*)\.ts/,"$1");
    if(!Reflect.has(createMoudle[key],`create${name}Prop`)){
      throw new Error(`please define create function in ${name}.ts`)
    }
    createProps[`v-${name}`]=createMoudle[key][`create${name}Prop`];
  }
  return createProps;
}
const importRightProps=(app:App)=>{
  for(const key in RightPropsMoudle){
    const register_name=key.replace(/\.\.\/components\/(.*)\/(.*)\.props\.tsx/,"$1")
    app.component(`v-${register_name}-props`,RightPropsMoudle[key]?.default||modules[key])
    rightPropsBlock[`v-${register_name}`]=`v-${register_name}-props`
  }
}
const RightPropsInStore=()=>{
  for(const key in RightPropsMoudle){
    const register_name=key.replace(/\.\.\/components\/(.*)\/(.*)\.props\.tsx/,"$1")
    rightPropsBlock[`v-${register_name}`]=`v-${register_name}-props`
  }
  return rightPropsBlock;
}
export default importComponent;
export {importCreateFuntion,importRightProps,RightPropsInStore}
