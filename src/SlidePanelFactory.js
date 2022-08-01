import SlideDeck from './SlideDeck.vue';
import SlidePanel from './SlidePanel.vue';
import merge from 'deepmerge';

export default class SlidePanelFactory {

    constructor(vue) {
        this.$vue = vue;
    }

    register(type, options = {}) {
        const SlideDeckWrapper = this.$vue.extend({
            functional: true,
            render: h => h(SlideDeck, Object.assign({
                ref: 'deck'
            }, options))
        });

        const slideDeckWrapper = new SlideDeckWrapper({
            el: document.body.appendChild(document.createElement('div'))
        });

        this[type] = (callback, options = {}) => {
            return new Promise(resolve => {
                const SlidePanelWrapper = this.$vue.extend({
                    beforeDestroy() {
                        this.$root.$el.parentNode.removeChild(this.$root.$el);

                        resolve();
                    },
                    render(h) {
                        const context = merge({
                            ref: 'panel',
                            props: {
                                show: true,
                                align: slideDeckWrapper.$refs.deck.align,
                            },
                            on: {
                                ['after-leave']: () => {
                                    this.$nextTick(() => this.$destroy());
                                }
                            }
                        }, options);

                        context.props.registry = slideDeckWrapper.$refs.deck.registry;

                        return h(SlidePanel, context, [() => {
                            return callback.apply(this.$refs.panel, [
                                h, this.$refs.panel
                            ]);
                        }]);
                    }
                });

                new SlidePanelWrapper({
                    el: slideDeckWrapper.$refs.deck.$refs.panel.appendChild(document.createElement('div')),
                });
            }).finally(() => {
                
            });
        };
    }
}