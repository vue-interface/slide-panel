<template>
    <slide-deck v-bind="options">
        <slide-panel
            v-for="panel in panels"
            :key="panel.id"
            :ref="refNameFor(panel)"
            :show="true"
            v-bind="panel.options"
            @afterLeave="() => onAfterLeaveSlide(panel)">
            <component :is="getPanelChildren(panel)" />
        </slide-panel>
    </slide-deck>
</template>

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
        refNameFor(panel) {
            return `panel-${panel.id}`;
        },

        getPanelChildren(panel) {
            const instance = this.$refs[this.refNameFor(panel)][0];
            return panel.callback.apply(instance, [instance]);
        },

        onAfterLeaveSlide(panel) {
            panel.resolve();
            this.removePanel(panel);
        }
    }
};
</script>