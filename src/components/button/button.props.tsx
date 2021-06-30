import { defineComponent, PropType, vModelText } from "vue";
import { useStore } from "vuex";
import { key } from "../../store";
import { componentProp } from "../../props/button";
import colorPicker from "@caohenghu/vue-colorpicker";
export default defineComponent({
  components: {
    colorPicker,
  },
  props: {
    Props: {
      type: Object as PropType<componentProp>,
      required: true,
    },
  },
  setup() {
    const store = useStore(key);
    const setProps = (value: any, prop: string) => {
      const temp = {
        key: prop,
        value: value,
      };
      store.dispatch("setCurrProps", temp);
    };
    const changeStyle = (e: any, prop: string) => {
      const StyleObj: any = {};
      StyleObj[prop] = +e;
      store.dispatch("setCurrStyles", StyleObj);
    };
    return {
      store,
      setProps,
      changeStyle,
    };
  },
  render() {
    return (
      <a-form labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
        <a-form-item label="按钮文案">
          <a-input
            onInput={(e: any) => {
              this.setProps(e.target.value, "label");
            }}
            value={this.Props?.label}
          ></a-input>
        </a-form-item>
        <a-form-item label="按钮字体大小">
          <a-input
            onInput={(e: any) => {
              this.changeStyle(e.target.value, "fontSize");
            }}
            value={this.Props?.styles?.fontSize}
          ></a-input>
        </a-form-item>
        <a-form-item label="按钮字体粗细">
          <a-select
            onChange={(e: number) => this.changeStyle(e, "fontWeight")}
            value={this.Props?.styles?.fontWeight}
          >
            <a-select-option value="200">200</a-select-option>
            <a-select-option value="300">300</a-select-option>
            <a-select-option value="400">400</a-select-option>
            <a-select-option value="500">500</a-select-option>
            <a-select-option value="600">600</a-select-option>
            <a-select-option value="800">800</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="按钮类型">
          <a-select
            onChange={(e: string) => this.setProps(e, "type")}
            value={this.Props?.type}
          >
            <a-select-option value="primary">主要按钮</a-select-option>
            <a-select-option value="success">成功按钮</a-select-option>
            <a-select-option value="default">默认按钮</a-select-option>
            <a-select-option value="warning">警告按钮</a-select-option>
            <a-select-option value="danger">危险按钮</a-select-option>
          </a-select>
        </a-form-item>
        {/* <a-form-item label="字体颜色">
          <colorPicker
            style={{ width: "120px" }}
            theme="light"
            color={this.Props?.styles?.color}
          ></colorPicker>
        </a-form-item> */}
      </a-form>
    );
  },
});
