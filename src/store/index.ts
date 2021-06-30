import { createStore, Store } from "vuex";
import { InjectionKey } from "vue";
import { importCreateFuntion, RightPropsInStore } from "../utils/_import";
import { componentProp } from "../props/button";
const RightPropsObj = RightPropsInStore();
const CreateFuntionObj = importCreateFuntion();
interface LooseObject {
  [key: string]: any;
}
interface CurrComponentType {
  key?: string;
  v_id?: string;
}
export interface State {
  BaseComponents: LooseObject;
  ComponentList: Array<componentProp>;
  CurrComponent: CurrComponentType;
  right: boolean;
  RightProps: LooseObject;
}
export interface setData {
  key: keyof componentProp;
  value: any;
}
export const key: InjectionKey<Store<State>> = Symbol();
export const store = createStore<State>({
  state: {
    BaseComponents: CreateFuntionObj,
    ComponentList: [],
    CurrComponent: {},
    right: false,
    RightProps: RightPropsObj,
  },
  mutations: {
    addComponent(state, data) {
      state.ComponentList.push(data);
    },
    setCurrProps(state, data: setData) {
      const o: componentProp = state.ComponentList.find(
        (item: componentProp) => item?.v_id === state.CurrComponent.v_id
      ) as componentProp;
      o[data.key] = data.value;
    },
    setCurrStyles(state, data) {
      const o: componentProp = state.ComponentList.find(
        (item: componentProp) => item?.v_id === state.CurrComponent.v_id
      ) as componentProp;
      o.styles = { ...o.styles, ...data };
    },
    setCurrComponent(state, data) {
      state.CurrComponent = { ...data };
    },
    setRight(state, data) {
      state.right = data;
    },
    deleteComponent(state, data) {
      state.ComponentList = state.ComponentList.filter(
        (item) => item.v_id !== data
      );
    },
  },
  actions: {
    addComponent(context, data) {
      context.commit("addComponent", data);
      context.commit("setCurrComponent", { key: data.name, v_id: data.v_id });
    },
    setCurrProps(context, data) {
      context.commit("setCurrProps", data);
    },
    setCurrStyles(context, data) {
      context.commit("setCurrStyles", data);
    },
    setCurrComponent(context, data) {
      context.commit("setCurrComponent", data);
    },
    setRight(context, data) {
      context.commit("setRight", data);
    },
    deleteComponent(context, data) {
      context.commit("setCurrComponent",{})
      context.commit("deleteComponent", data);
    },
  },
});
