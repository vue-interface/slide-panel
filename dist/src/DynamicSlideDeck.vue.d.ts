export default _sfc_main;
declare namespace _sfc_main {
    namespace components {
        export { SlideDeck };
        export { SlidePanel };
    }
    namespace props {
        const options: ObjectConstructor;
        const panels: ArrayConstructor;
        const removePanel: FunctionConstructor;
    }
    namespace methods {
        function getPanelChildren(panel: any): any;
        function onAfterLeave(panel: any): void;
    }
}
import SlideDeck from "./SlideDeck.vue";
import SlidePanel from "./SlidePanel.vue";
