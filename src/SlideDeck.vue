<script lang="ts" setup>
import { computed, onMounted, provide, reactive, ref, watch } from 'vue';

function run(fns, ...args) {
    return fns.reduce((p, fn) => p.then(() => fn(...args)), Promise.resolve());
}

const props = withDefaults(defineProps<{
    align?: 'right' | 'left',
    backdrop?: boolean
}>(), {
    align: 'right'
});

const display = ref(false);

const registry = reactive({
    zIndex: 0,
    panels: [],
    get topSlide() {
        return this.panels.find(panel => panel.isTopSlide);
    }
});

const classes = computed(() => {
    return {
        [`slide-${props.align}`]: true,
        'has-slide-top': registry.panels.reduce((carry, panel) => carry || panel.isTopSlide, false)
    };
});

const wrapperClasses = computed(() => {
    return {
        left: props.align === 'left',
        right: props.align === 'right'
    };
});

const lastSlide = computed(() => {
    return registry.panels[registry.panels.length - 1];
});

const styles = computed(() => {
    return {
        display: !display.value ? 'none' : undefined,
        zIndex: registry.zIndex === 0 ? -1 : 1
    };
});

watch(() => registry.zIndex, value => {
    display.value = value > 0;
});

onMounted(() => {
    window.addEventListener('keyup', ({ code }) => {
        if (code === 'Escape' && registry.panels.length) {
            registry.panels[registry.panels.length - 1].close();
        }
    });
});

function x() {
    return this.$el.getBoundingClientRect().x;
}

function y() {
    return this.$el.getBoundingClientRect().y;
}

function onClickBackdrop() {
    const fns = [...registry.panels]
        .reverse()
        .map((slide, i) => () => new Promise(resolve => {
            slide.close(value => {
                if (value !== false) {
                    setTimeout(() => {
                        resolve(value);
                    }, Math.max(100, slide.duration / (registry.panels.length - i)));
                }

                return value;
            });
        }));

    run(fns);
}

provide('align', props.align);
provide('registry', registry);
</script>

<template>
    <div
        class="slide-deck-panel-wrapper fixed top-0 h-full max-w-full z-[100] [&.right]:right-0 [&.left]:left-0"
        :class="wrapperClasses"
        :style="{ display: !display ? 'none' : undefined }">
        <div
            v-if="backdrop"
            class="slide-deck-panel-backdrop fixed top-0 right-0 h-full w-full opacity-100 bg-white/.75 transition-opacity duration-[2500ms] ease-in"
            @click="onClickBackdrop" />

        <div ref="panel"
            class="
                slide-deck-panel relative top-0 h-full flex
        
                [&.slide-right]:right-0
                [&.slide-right_.slide-panel-content]:flex-row
                [&.slide-right_.slide-panel-content]:rouded-tl-lg
                [&.slide-right_.slide-panel-content]:rouded-bl-lg
                [&.slide-right_.slide-panel-content]:pr-11

                [&.slide-left]:left-0
                [&.slide-left_.slide-panel-content]:flex-row
                [&.slide-left_.slide-panel-content]:rouded-tr-lg
                [&.slide-left_.slide-panel-content]:rouded-br-lg
                [&.slide-left_.slide-panel-content]:pl-11

                [&.slide-deck-panel_.slide-panel]:relative
                [&.slide-deck-panel_.slide-panel]:h-full
                [&.slide-deck-panel_.slide-panel]:grow-0
                [&.slide-deck-panel_.slide-panel]:shrink-0
                
                [&.slide-deck-panel.has-slide-top_.slide-panel:not(.slide-top)]:absolute
            "
            :class="classes" :style="styles">
            <slot />
        </div>
    </div>
</template>