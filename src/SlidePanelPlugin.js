import SlidePanelFactory from './SlidePanelFactory';

export default Vue => {
    Vue.prototype.$slidePanel = new SlidePanelFactory(Vue);

    Vue.prototype.$slidePanel.register('right', {
        props: {
            align: 'right'
        }
    });

    Vue.prototype.$slidePanel.register('left', {
        props: {
            align: 'left'
        }
    });

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