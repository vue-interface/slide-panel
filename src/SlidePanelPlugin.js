import SlidePanelFactory from './SlidePanelFactory';
import merge from 'deepmerge';

export const factory = new SlidePanelFactory();

factory.register('right', merge({
    align: 'right'
}, {}));

factory.register('left', merge({
    align: 'left'
}, {}));

export default (app, options = {}) => {
    app.config.globalProperties.$store = options.store;
    app.config.globalProperties.$slidePanel = factory;
};