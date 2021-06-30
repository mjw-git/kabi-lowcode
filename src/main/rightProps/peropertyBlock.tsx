import { defineComponent, PropType, KeepAlive, h, resolveComponent } from "vue";
import { useStore } from "vuex";
import { key } from "../../store";
import ButtonPropBlock from "../../components/button/button.props";
import { componentProp } from "../../props/button";
export default defineComponent({
  components: { KeepAlive, ButtonPropBlock },
  setup() {
    const store = useStore(key);
    const changeStyle = (e: Event, prop: string) => {
      const StyleObj: any = {};
      StyleObj[prop] = +(e.target as HTMLInputElement).value;
      store.dispatch("setCurrStyles", StyleObj);
    };
    return {
      store,
      changeStyle,
    };
  },
  render() {
    const currStyle = this.store.state.ComponentList.find(
      (item) => item.v_id == this.store.state.CurrComponent.v_id
    ) as componentProp;
    return (
      <div>
        <a-form labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
          <a-form-item label="距容器上方距离">
            <a-input
              onInput={(e: any) => {
                this.changeStyle(e, "top");
              }}
              value={currStyle?.styles?.top}
            ></a-input>
          </a-form-item>
          <a-form-item label="距容器左侧距离">
            <a-input
              onInput={(e: any) => {
                this.changeStyle(e, "left");
              }}
              value={currStyle?.styles?.left}
            ></a-input>
          </a-form-item>
          <a-form-item label="容器宽度">
            <a-input
              onInput={(e: any) => {
                this.changeStyle(e, "width");
              }}
              value={currStyle?.styles?.width}
            ></a-input>
          </a-form-item>
          <a-form-item label="容器高度">
            <a-input
              onInput={(e: any) => {
                this.changeStyle(e, "height");
              }}
              value={currStyle?.styles?.height}
            ></a-input>
          </a-form-item>
        </a-form>
        {h(
          resolveComponent(
            this.store.state.RightProps[
              this.store.state.CurrComponent.key as string
            ]
          ),
          {
            Props: currStyle,
          }
        )}
        {/* <v-button-props Props={currStyle} /> */}
      </div>
    );
  },
});
