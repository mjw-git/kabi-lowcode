import { defineComponent } from "vue";
import { allComponent } from "../../components";
export default defineComponent({
  render() {
    return (
      <div style={{ backgroundColor: "#fff" }} class="box-height">
        <div style={{ textAlign: "center", fontSize: "20px", padding: "10px" }}>
          组件库{" "}
          <span style={{ fontSize: "12px" }}>❓拖拽组件至中间即可使用</span>
        </div>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {allComponent.map((item) => (
            <div
              class="flex hover"
              style={{
                marginTop: "3px",
                width: "30%",
                height: "100px",
              }}
            >
              <div
                draggable
                data-index={item.key}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "5px",
                }}
                class="color-grey flex"
              >
                <img width="30" height="30" src={item.icon} alt="" />
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
});
