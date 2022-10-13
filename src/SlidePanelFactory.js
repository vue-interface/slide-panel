import DynamicSlideDeck from './DynamicSlideDeck.vue';
import { reactive, createApp } from 'vue';

export default class SlidePanelFactory {

    register(type, options = {}) {
        let currentId = -1;
        const panels = reactive([]);

        const el = document.body.appendChild(document.createElement('div'));
        createApp(DynamicSlideDeck, { options, panels }).mount(el);

        this[type] = (callback, options = {}) => {
            return new Promise(resolve => {
                panels.push({ callback, options, resolve, id: ++currentId, showing: true });
            }).finally(() => { });
        };
    }

}