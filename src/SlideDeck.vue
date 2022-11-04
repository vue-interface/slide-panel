<script setup>
import { ref, reactive, defineProps, watch, computed, onMounted, provide } from 'vue';

function run(fns, ...args) {
    return fns.reduce((p, fn) => p.then(() => fn(...args)), Promise.resolve());
};

function unit(value, uom = 'px') {
    return value !== null
        && value !== undefined
        && value !== false
        && isFinite(value) ? `${value}${uom}` : value;
}

const props = defineProps({
    align: {
        type: String,
        default: 'right',
        validator: value => ['left', 'right'].indexOf(value) > -1
    },
    backdrop: Boolean
});

const display = ref(false);

const isBackdropShowing = ref(false);

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
        display: !display ? 'none' : undefined,
        zIndex: registry.zIndex === 0 ? -1 : 1
    };
});

watch(() => registry.zIndex, value => {
    display.value = value > 0;
});

onMounted(() => {
    window.addEventListener('keyup', ({ code }) => {
        if(code === 'Escape' && registry.panels.length) {
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
                if(value !== false) {
                    setTimeout(() => {
                        resolve(value);
                    },  Math.max(100, slide.duration / (registry.panels.length - i)));
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
    <div class="slide-deck-panel-wrapper" :style="{display: !display ? 'none' : undefined}" :class="wrapperClasses">
        <div v-if="backdrop" class="slide-deck-panel-backdrop" @click="onClickBackdrop" />
        <div ref="panel" class="slide-deck-panel" :class="classes" :style="styles">
            <slot />
        </div>
    </div>
</template>

<style>
.slide-deck-panel-wrapper {
    position: fixed;
    top: 0;
    height: 100%;
    max-width: 100%;
    z-index: 100;
}

.slide-deck-panel-wrapper.right {
    right: 0;
}

.slide-deck-panel-wrapper.left {
    left: 0;
}

.slide-deck-panel-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 1;
    background: rgba(255, 255, 255, .75);
    transition: opacity 2500ms ease-in;
}

.slide-deck-panel {
    position: relative;
    top: 0;
    height: 100%;
    display: flex;
    /* width: 300px; */
    /* min-width: 33%;
    max-width: 75%; */
}

.slide-deck-panel.slide-right {
    right: 0;
}

.slide-deck-panel.slide-left {
    left: 0;
}

.slide-deck-panel.slide-left .slide-panel-content {
    flex-direction: row;
    border-top-right-radius: .5rem;
    border-bottom-right-radius: .5rem;
    padding-left: 2.75rem;
}

.slide-deck-panel.slide-right {
    right: 0;
}

.slide-deck-panel.slide-right .slide-panel-content {
    flex-direction: row;
    border-top-left-radius: .5rem;
    border-bottom-left-radius: .5rem;
    padding-right: 2.75rem;
}

.slide-deck-panel .slide-panel {
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
}

.slide-deck-panel.has-slide-top .slide-panel:not(.slide-top) {
    position: absolute;
    /* right: 0; */
}
</style>