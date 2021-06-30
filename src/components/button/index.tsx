import { defineComponent, PropType } from "vue";
import { styleProperty } from "../../types/interface";
import { formatFontStyle } from "../../utils/utils";
export default defineComponent({
  name: "v-button",
  props: {
    v_id: {
      type: String,
    },
    type: {
      type: String,
      default: "primary",
    },
    label: {
      type: String,
      default: "按钮",
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
    const fontStyles = formatFontStyle(styles);
    return (
      <div data-index="v-button" style={{ ...styles, position: "absolute" }}>
        <van-button
          style={{ width: "100%", height: "100%", ...fontStyles }}
          {...$props}
        >
          {$props.label}
        </van-button>
      </div>
    );
  },
});
