<script>
import SlideDeck from './SlideDeck.vue';
import SlidePanel from './SlidePanel.vue';
import { h } from 'vue';
import merge from 'deepmerge';

export default {
    props: {
        options: Object,
        panels: Array,
        removePanel: Function
    },

    methods: {
        createPanelVnode(panel) {
            const refName = `panel-${panel.id}`;
            const props = {
                ref: refName,
                show: true,
                onAfterLeave: () => {
                    panel.resolve();
                    this.removePanel(panel);
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
            this.panels.map((panel) => this.createPanelVnode(panel))
        );
    },
};
</script>