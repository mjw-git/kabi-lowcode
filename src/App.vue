<template>
  <Main></Main>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { key } from "./store";
import { defineComponent, ref } from "vue";
import Main from "./main/index";
export default defineComponent({
  name: "App",
  components: {
    Main,
  },
  setup() {
    const store = useStore(key);
    const clickWhite = () => {
      document.getElementById("app")?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (
          !(e.target as HTMLElement)?.getAttribute("v_id") &&
          !(e.target as HTMLElement)?.classList.contains("circle-shape")
        ) {
          store.dispatch("setRight",false)
          // store.dispatch("setCurrComponent", "");
        }
      });
    };
    clickWhite();
    const drag = ref(false);

    return {
      drag,
      
    };
  },
});
</script>

<style lang="less">
.app {
  color: red;
}
</style>
