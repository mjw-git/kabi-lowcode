import { defineComponent } from "vue";
import { useStore } from "vuex";
import { key } from "../store";
export const useMenu=()=>{
    const store=useStore(key);
    const deleteComponent=(index:string)=>{
        store.dispatch('deleteComponent',index);
    }
    return {
        deleteComponent
    }
}
