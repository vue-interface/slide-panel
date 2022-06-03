<template>
    <div class="slide-deck-panel" :class="classes" :style="styles">
        <slot />
    </div>
</template>

<script>
function unit(value, uom = 'px') {
    return value !== null
        && value !== undefined
        && value !== false
        && isFinite(value) ? `${value}${uom}` : value;
}

export default {
    props: {
        align: {
            type: String,
            default: 'right',
            validator: value => ['left', 'right'].indexOf(value) > -1
        },
        minWidth: [Number, String],
        maxWidth: [Number, String],
        width: [Number, String],
        registry: {
            type: Object,
            default() {
                return {
                    zIndex: 0,
                    panels: []
                };
            }
        }
    },
    computed: {
        classes() {
            return {
                [`slide-${this.align}`]: true
            };
        },
        styles() {
            return {
                width: this.width ? unit(this.width) : null,
                minWidth: this.minWidth ? unit(this.minWidth) : null,
                maxWidth: this.maxWidth ? unit(this.maxWidth) : null,
                zIndex: this.registry.zIndex === 0 ? -1 : 1,
                display: this.registry.zIndex === 0 ? 'none' : undefined,
            };
        }
    },
    created() {
        window.addEventListener('keyup', ({ code }) => {
            if(code === 'Escape' && this.registry.panels.length) {
                this.registry.panels[this.registry.panels.length - 1].close();
            }
        });
    }
};
</script>

<style>
.slide-deck-panel {
    position: fixed;
    top: 0;
    height: 100%;
    display: flex;
    width: auto;
    min-width: 33%;
    max-width: 75%;
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
    flex: 1;
}

.slide-deck-panel .slide-panel:not(:last-child) {
    position: absolute;
    left: 0;
    width: 100%;
}
</style>