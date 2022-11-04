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
    <slide-deck v-bind="options">
        <slide-panel
            v-for="panel in panels"
            :key="panel.id"
            ref="panel"
            :show="true"
            v-bind="panel.options"
            @after-leave="() => onAfterLeave(panel)">
            <component :is="getPanelChildren(panel)" />
        </slide-panel>
    </slide-deck>
</template>