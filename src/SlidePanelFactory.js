import SlideDeck from './SlideDeck.vue';
import SlidePanel from './SlidePanel.vue';
import merge from 'deepmerge';
import { h, createApp } from 'vue';

export default class SlidePanelFactory {

    register(type, options = {}) {
        const SlideDeckWrapper = (props, context) => h(
            SlideDeck,
            Object.assign({
                ref: 'deck'
            }, options)
        );

        const slideDeckWrapper = createApp(SlideDeckWrapper)
            .mount(document.body.appendChild(document.createElement('div')));

        this[type] = (callback, options = {}) => {
            return new Promise(resolve => {
                const SlidePanelWrapper = {
                    beforeDestroy() {
                        this.$root.$el.parentNode.removeChild(this.$root.$el);

                        resolve();
                    },
                    render() {
                        const context = merge({
                            ref: 'panel',
                            show: true,
                            align: slideDeckWrapper.$refs.deck.align,
                            onAfterLeave: () => {
                                this.$nextTick(() => this.$destroy());
                            }
                        }, options);

                        context.registry = slideDeckWrapper.$refs.deck.registry;

                        return h(SlidePanel, context, [() => {
                            return callback.apply(this.$refs.panel, [
                                h, this.$refs.panel
                            ]);
                        }]);
                    }
                };

                createApp(SlidePanelWrapper)
                    .mount(slideDeckWrapper.$refs.deck.$refs.panel.appendChild(document.createElement('div')));
            }).finally(() => {
                
            });
        };
    }
}