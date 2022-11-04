import SlidePanelFactory from './SlidePanelFactory';
import merge from 'deepmerge';

export default (app, options = {}) => {
    const factory = new SlidePanelFactory(app);

    factory.register('right', merge({
        align: 'right'
    }, {}));
    
    factory.register('left', merge({
        align: 'left'
    }, {}));

    app.provide('slidePanel', factory);
    app.config.globalProperties.$slidePanel = factory;
};