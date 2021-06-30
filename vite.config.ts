import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vitePluginImport from "vite-plugin-babel-import";
import vueJsx from "@vitejs/plugin-vue-jsx";
const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  //可安装
  // esbuild:{
  //   jsxFactory:'h',
  //   jsxFragment:'Fragment'
  // },
  base:"/kabi-lowcode/",
  plugins: [
    vue(),
    vitePluginImport([
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        ignoreStyles: [],
        style(name) {
          if(name=='row'||name=='col'){
            return  `ant-design-vue/lib/grid/style/index.css`;
          }
          return `ant-design-vue/lib/${name}/style/index.css`;
        },
      },
    ]),
    vueJsx(),
  ],
});
