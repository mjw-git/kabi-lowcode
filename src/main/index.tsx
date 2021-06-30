import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { key } from "../store";
import VisualPhone from "./visualPhone";
import RightBlock from "./rightProps";
import LeftComponent from "./leftComponent";
import icon from "../assets/icon.svg";
export default defineComponent({
  name: "index",
  components: { VisualPhone, RightBlock, LeftComponent },
  setup() {
    const value = ref("11");
    const store = useStore(key);
    const dragging = ref(false);
    const list = store.state.ComponentList;
    const handleDragStart = (e: any) => {
      dragging.value = true;
      e.dataTransfer?.setData("key", e.target?.dataset.index);
    };
    return {
      handleDragStart,
      list,
      value,
    };
  },
  render() {
    return (
      <a-layout>
        <a-layout-header>
          <a-row>
            <a-col span={8} style={{ display: "flex", alignItems: "center" }}>
              <img width="60" src={icon} alt="" />
              <span style={{ color: "#fff", fontSize: "24px" }}>
                卡比Low Code
              </span>
            </a-col>
            <a-col span={8}></a-col>
            <a-col span={8}></a-col>
          </a-row>
        </a-layout-header>
        <div>
          <a-row>
            <a-col span={5} onDragstart={this.handleDragStart}>
              <LeftComponent></LeftComponent>
              {/* <a-button draggable data-index="v-button" type="primary">
              按钮
            </a-button> */}
            </a-col>
            <a-col
              style={{
                backgroundColor: "#f5f5f5",
              }}
              span={14}
            >
              <div
                id="mid"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <VisualPhone />
              </div>
            </a-col>
            <a-col span={5}>
              <RightBlock />
            </a-col>
          </a-row>
        </div>
      </a-layout>
    );
  },
});
