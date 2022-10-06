import SlidePanelFactory from './SlidePanelFactory';
import merge from 'deepmerge';

export const factory = new SlidePanelFactory(Vue);

factory.register('right', merge({
    props: {
        align: 'right'
    }
}, options.right || {}));

factory.register('left', merge({
    props: {
        align: 'left'
    }
}, options.left || {}));

export default (Vue, options = {}) => {
    Vue.prototype.$store = options.store;
    Vue.prototype.$slidePanel = factory;
};