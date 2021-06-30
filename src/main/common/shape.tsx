import { defineComponent, render, PropType, ref, reactive } from "vue";
import { useStore } from "vuex";
import { key } from "../../store";
import { formatStyle } from "../../utils/utils";
import { styleProperty } from "../../types/interface";
import { useMenu } from "../../hooks/menu";
import { isOverContain } from "../../utils/phonePosition";
export default defineComponent({
  name: "shape",
  props: {
    property: {
      type: Object as any,
      required: true,
    },
  },
  setup(props) {
    const store = useStore(key);
    const active = store.state.CurrComponent;
    const right = ref(false);
    const rightStyle = reactive({ top: 0, left: 0 });
    const { deleteComponent } = useMenu();
    const setCurrComponent = () => {};
    const mouseDown = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      store.dispatch("setRight", false);
      store.dispatch("setCurrComponent", {
        key: props.property.name,
        v_id: props.property.v_id,
      });
      console.log("fhiahfiah");
      const defaultValue = {
        top: props.property.styles.top,
        left: props.property.styles.left,
      };
      const startX = e.clientX;
      const startY = e.clientY;
      const move = (e: MouseEvent) => {
        const currX = e.clientX;
        const currY = e.clientY;
        const currStyles = {
          left: currX - startX + defaultValue.left,
          top: currY - startY + defaultValue.top,
        };
        if (!isOverContain(e)) {
          return;
        }
        store.dispatch("setCurrStyles", currStyles);
      };
      const up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };
    const DotmouseDown = (position: string) => {
      const e: MouseEvent = window.event as MouseEvent;
      e.stopPropagation();
      const defaultValue = {
        top: props.property.styles.top,
        left: props.property.styles.left,
        height: props.property.styles.height,
        width: props.property.styles.width,
      };
      const startX = e.clientX;
      const startY = e.clientY;
      const move = (e: MouseEvent) => {
        const currX = e.clientX;
        const currY = e.clientY;
        let currStyles: any = {};
        switch (position) {
          case "lt":
            currStyles = {
              top: currY - startY + defaultValue.top,
              left: currX - startX + defaultValue.left,
              width: startX - currX + defaultValue.width,
              height: startY - currY + defaultValue.height,
            };
            break;
          case "tm":
            currStyles = {
              top: currY - startY + defaultValue.top,
              height: startY - currY + defaultValue.height,
            };
            break;
          case "rt":
            currStyles = {
              top: currY - startY + defaultValue.top,
              width: currX - startX + defaultValue.width,
              height: startY - currY + defaultValue.height,
            };
            break;
          case "lm":
            currStyles = {
              width: startX - currX + defaultValue.width,
              left: currX - startX + defaultValue.left,
            };
            break;
          case "lb":
            currStyles = {
              left: currX - startX + defaultValue.left,
              width: startX - currX + defaultValue.width,
              height: currY - startY + defaultValue.height,
            };
            break;
          case "bm":
            currStyles = {
              height: currY - startY + defaultValue.height,
            };
            break;
          case "rb":
            currStyles = {
              height: currY - startY + defaultValue.height,
              width: currX - startX + defaultValue.width,
            };
            break;
          case "rm":
            currStyles = {
              width: currX - startX + defaultValue.width,
            };
            break;
        }
        if (currStyles.width) {
          currStyles.width =
            currStyles.width < 0 ? -currStyles.width : currStyles.width;
        }
        if (currStyles.height) {
          currStyles.height =
            currStyles.height < 0 ? -currStyles.height : currStyles.height;
        }
        store.dispatch("setCurrStyles", currStyles);
      };
      const up = (e: any) => {
        e.stopPropagation();
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
      };
      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
    };
    const handleCircleShape = (styles: styleProperty) => {
      const circleShapeList = [];
      const c1 = { name: "lt", left: 0, top: 0 };
      const c2 = {
        name: "tm",
        left: Math.round(styles.width / 2),
        top: 0,
      };
      const c3 = { name: "rt", left: styles.width, top: 0 };
      const c4 = {
        name: "lm",
        left: 0,
        top: Math.round(styles.height / 2),
      };
      const c5 = {
        name: "lb",
        left: 0,
        top: styles.height,
      };
      const c6 = {
        name: "bm",
        left: Math.round(styles.width / 2),
        top: styles.height,
      };
      const c7 = {
        name: "rb",
        left: styles.width,
        top: styles.height,
      };
      const c8 = {
        name: "rm",
        left: styles.width,
        top: Math.round(styles.height / 2),
      };
      circleShapeList.push(c1, c2, c3, c4, c5, c6, c7, c8);
      return circleShapeList;
    };
    const rightClick = (e: MouseEvent) => {
      e.preventDefault();
      rightStyle.left = e.offsetX;
      rightStyle.top = e.offsetY;
      store.dispatch("setRight", true);
      right.value = true;
    };
    const left = (e: MouseEvent) => {
      console.log("删除了");
    };
    return {
      left,
      handleCircleShape,
      DotmouseDown,
      setCurrComponent,
      mouseDown,
      rightClick,
      deleteComponent,
      active,
      store,
      right,
      rightStyle,
    };
  },
  render() {
    const circleShapes = this.handleCircleShape(this.property.styles);
    const styles = formatStyle(this.property.styles);
    return (
      <div
        onContextmenu={this.rightClick}
        onMousedown={this.mouseDown}
        class="border-line hover"
        style={{ ...styles, position: "absolute" }}
      >
        {(this.$slots as any).default()}
        {this.store.state.right &&
        this.store.state.CurrComponent.v_id == this.property.v_id ? (
          <ul
            style={{
              top: this.rightStyle.top + 5 + "px",
              left: this.rightStyle.left + 5 + "px",
              position: "absolute",
              zIndex: 9999,
            }}
          >
            <li
              onMousedown={(e: MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                this.deleteComponent(this.property.v_id);
              }}
              class="menu-item"
            >
              删除
            </li>
          </ul>
        ) : null}
        {circleShapes.map((item) => (
          <div
            onMousedown={() => this.DotmouseDown(item.name)}
            style={{
              top: item.top - 2 + "px",
              left: item.left - 2 + "px",
              position: "absolute",
            }}
            class={
              this.store.state.CurrComponent.v_id == this.property.v_id
                ? "circle-shape"
                : ""
            }
          ></div>
        ))}
      </div>
    );
  },
});
