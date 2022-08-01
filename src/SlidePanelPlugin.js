import SlidePanelFactory from './SlidePanelFactory';
import merge from 'deepmerge';

export default (Vue, options = {}) => {
    Vue.prototype.$store = options.store;
    Vue.prototype.$slidePanel = new SlidePanelFactory(Vue);

    Vue.prototype.$slidePanel.register('right', merge({
        props: {
            align: 'right'
        }
    }, options.right || {}));

    Vue.prototype.$slidePanel.register('left', merge({
        props: {
            align: 'left'
        }
    }, options.left || {}));

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