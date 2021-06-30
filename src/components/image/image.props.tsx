import { defineComponent, PropType } from "vue";
import { useStore } from "vuex";
import { ImageProp } from "../../props/image";
import { key } from "../../store";
export default defineComponent({
  props: {
    Props: {
      type: Object as PropType<ImageProp>,
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
        <a-form-item label="图片链接">
          <a-input
            value={this.Props.src}
            onInput={(e: any) => {
              this.setProps(e.target.value, "src");
            }}
          ></a-input>
        </a-form-item>
      </a-form>
    );
  },
});
