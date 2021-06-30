import { defineComponent, PropType } from "vue";
import { styleProperty } from "../../types/interface";
import { formatFontStyle } from "../../utils/utils";
export default defineComponent({
  name: "v-image",
  props: {
    v_id: {
      type: String,
    },
    type: {
      type: String,
      default: "primary",
    },
    src: {
      type: String,
      required: true,
    },
    styles: {
      type: Object as PropType<styleProperty>,
      required: true,
    },
  },
  render() {
    const { $props } = this;
    const styles: any = { ...$props.styles };
    styles.width = styles.width + "px";
    styles.height = styles.height + "px";
    return (
      <div data-index="v-image" style={{ ...styles, position: "absolute" }}>
        <img
          style={{ ...styles }}
          draggable="false"
          {...this.$props}
          src={this.src}
        />
      </div>
    );
  },
});
