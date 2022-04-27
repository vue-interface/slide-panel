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
            default: 'right'
        },
        minWidth: [Number, String],
        maxWidth: [Number, String],
        width: [Number, String]
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
            };
        }
    }
};
</script>

<style>
.slide-deck-panel {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    width: auto;
    min-width: 33%;
    max-width: 75%;
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

.slide-deck-panel.slide-right .slide-panel-content {
    flex-direction: row;
    border-top-left-radius: .25rem;
    border-bottom-left-radius: .25rem;
}
</style>