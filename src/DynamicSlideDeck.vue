<script>
import SlideDeck from './SlideDeck.vue';
import SlidePanel from './SlidePanel.vue';
import { h } from 'vue';
import merge from 'deepmerge';

export default {
    props: {
        options: Object,
        panels: Array
    },

    methods: {
        createPanelVnode(panel) {
            const refName = `panel-${panel.id}`;
            const props = {
                ref: refName,
                show: true,
                onAfterLeave: () => {
                    panel.resolve();
                    panel.showing = false;
                }
            };
            const mergedProps = merge(props, panel.options);
            return h(SlidePanel, mergedProps, () => {
                const instance = this.$refs[refName];
                return [panel.callback.apply(instance, [instance])];
            });
        }
    },

    render() {
        return h(
            SlideDeck,
            this.options,
            this.panels.filter(panel => panel.showing).map(panel => this.createPanelVnode(panel))
        );
    },
};
</script>