import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { key } from "../../store";
import ComponentProp from "../rightProps/peropertyBlock";
import "./index.less";
export default defineComponent({
  components: {
    ComponentProp,
  },
  setup() {
    const store = useStore(key);
    const active = ref(0);
    const chooseTag = (index: number) => {
      active.value = index;
    };
    return {
      store,
      active,
      chooseTag,
    };
  },
  render() {
    console.log(this.store.state.CurrComponent, "当前选中组建");
    return (
      <div
        class="box-height"
        style={{
          backgroundColor: "#fff",
          width: "100%",
          overflow: "auto",
          display: "relative",
        }}
      >
        <div class="tags-contain">
          <div
            class={this.active == 0 ? "active tag" : "tag"}
            onClick={() => this.chooseTag(0)}
          >
            属性
          </div>
          <div
            class={this.active == 1 ? "active tag" : "tag"}
            onClick={() => this.chooseTag(1)}
          >
            事件
          </div>
        </div>
        {this.store.state.CurrComponent.v_id ? (
          <ComponentProp />
        ) : (
          <div style={{ textAlign: "center" }}>请先选中组件!!</div>
        )}
      </div>
    );
  },
});
