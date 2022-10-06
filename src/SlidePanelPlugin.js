import SlidePanelFactory from './SlidePanelFactory';
import merge from 'deepmerge';

export const factory = new SlidePanelFactory();

factory.register('right', merge({
    props: {
        align: 'right'
    }
}, {}));

factory.register('left', merge({
    props: {
        align: 'left'
    }
}, {}));

export default (app, options = {}) => {
    app.config.globalProperties.$store = options.store;
    app.config.globalProperties.$slidePanel = factory;


    // /**
    //  * Open a slide panel.
    //  * 
    //  * @property {Function} content
    //  * @property {Object} props
    //  */
    // Vue.prototype.$slidePanel = (content, props) => {
    //     console.log(component);
    // };
};