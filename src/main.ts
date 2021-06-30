import { createApp } from "vue";
import App from "./App.vue";
import { store, key } from "./store";
import Vant from 'vant'
import 'vant/lib/index.css';
import importComponent,{importRightProps} from "./utils/_import";
import "./style/common.less"
import { Button, Input,Row ,Col,Tabs,Form,Select,Layout} from "ant-design-vue";
const app = createApp(App);
importRightProps(app)
importComponent(app);

app.use(Button).use(Input).use(Row).use(Col).use(Tabs).use(Form).use(Select).use(Layout)
app.use(Vant);
// app.component("v-button", vButton);
app.use(store, key);




app.mount("#app");
