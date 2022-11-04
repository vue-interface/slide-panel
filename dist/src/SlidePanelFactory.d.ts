import { VNode } from 'vue';
export default class SlidePanelFactory {
    protected readonly app: any;
    constructor(app: any);
    mount(vnode: VNode): void;
    register(type: any, options?: {}): void;
}
