<script>
import SlideDeck from './SlideDeck.vue';
import SlidePanel from './SlidePanel.vue';

export default {
    components: { SlideDeck, SlidePanel },

    props: {
        options: Object,
        panels: Array,
        removePanel: Function
    },
    
    methods: {
        getPanelChildren(panel) {
            const instance = this.$refs.panel[this.panels.indexOf(panel)];
            return panel.callback.apply(instance, [instance]);
        },

        onAfterLeave(panel) {
            panel.resolve();
            this.removePanel(panel);
        }
    }
};
</script>

<template>
    <SlideDeck v-bind="options">
        <SlidePanel
            v-for="panel in panels"
            :key="panel.id"
            ref="panel"
            :show="true"
            v-bind="panel.options"
            @after-leave="() => onAfterLeave(panel)">
            <Component :is="getPanelChildren(panel)" />
        </SlidePanel>
    </SlideDeck>
</template>