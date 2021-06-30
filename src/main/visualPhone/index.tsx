import { defineComponent, h, nextTick, resolveComponent } from "vue";
import { useStore } from "vuex";
import { key } from "../../store";
import Shape from "../common/shape";
import { getContain } from "../../utils/phonePosition";
export default defineComponent({
  components: {
    Shape,
  },
  setup() {
    const store = useStore(key);
    const list = store.state.ComponentList;
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const key: string = e.dataTransfer?.getData("key") as string;
      const phoneContain = getContain();
      const _property = store.state.BaseComponents[key](
        e.clientX - phoneContain.left,
        e.clientY - phoneContain.top
      );
      _property.styles.top = e.clientY - phoneContain.top;
      _property.styles.left = e.clientX - phoneContain.left;
      _property.v_id = `v_${new Date().getTime()}`;
      store.dispatch("addComponent", _property);
    };
    const allowDrop = (e: Event) => {
      e.preventDefault();
    };
    const clickWhite = () => {
      document.getElementById("mid")?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (
          !(e.target as HTMLElement)?.getAttribute("v_id") &&
          !(e.target as HTMLElement)?.classList.contains("circle-shape")
        ) {
          store.dispatch("setRight", false);
          store.dispatch("setCurrComponent", "");
        }
      });
    };
    nextTick(() => {
      clickWhite();
    });

    return {
      store,
      handleDrop,
      allowDrop,
      list,
    };
  },
  render() {
    return (
      <div
        class="box-height"
        id="contain"
        onDragover={this.allowDrop}
        onDrop={this.handleDrop}
        style={{
          backgroundColor: "#fff",
          width: "414px",
          overflowX: "hidden",
          overflowY: "visible",
          position: "relative",
        }}
      >
        {this.store.state.ComponentList.map((item: any) => (
          <Shape property={item}>
            {h(resolveComponent(item.name), {
              ...item,
              draggable: false,
            })}
          </Shape>
        ))}
      </div>
    );
  },
});
