import DynamicSlideDeck from './DynamicSlideDeck.vue';
import { h, reactive, render, VNode } from 'vue';

export default class SlidePanelFactory {
    constructor(
        protected readonly app
    ) {
        //
    }

    mount(vnode: VNode) {
        vnode.appContext = this.app._context;

        const el = document.createElement('div');

        render(h(vnode), el);

        document.body.append(el);
    }

    register(type, options = {}) {
        let currentId = -1;
        const panels = reactive([]);
        function removePanel(panel) {
            panels.splice(panels.findIndex(p => p.id === panel.id), 1);
        }

        this[type] = (callback, options = {}) => {
            return new Promise(resolve => {
                panels.push({ callback, options, resolve, id: ++currentId, showing: true });
            }).finally(() => { });
        };

        this.mount(h(DynamicSlideDeck, { options, panels, removePanel }));
    }

}