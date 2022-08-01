<template>
    <div class="slide-deck-panel-wrapper" :style="{display: !display ? 'none' : undefined}">
        <div v-if="backdrop" class="slide-deck-panel-backdrop" @click="onClickBackdrop" />
        <div ref="panel" class="slide-deck-panel" :class="classes" :style="styles">
            <slot />
        </div>
    </div>
</template>

<script>
function run(fns, ...args) {
    return fns.reduce((p, fn) => p.then(() => fn(...args)), Promise.resolve());
};

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
        backdrop: Boolean,
        // minWidth: [Number, String],
        // maxWidth: [Number, String],
        // width: [Number, String],
        registry: {
            type: Object,
            default() {
                const self = this;

                return {
                    zIndex: 0,
                    panels: [],
                    get slideDeck() {
                        return self;
                    },
                    get topSlide() {
                        return this.panels.find(panel => panel.isTopSlide);
                    }
                };
            }
        }
    },
    data: () => ({
        display: false,
        isBackdropShowing: false
    }),
    computed: {
        classes() {
            return {
                [`slide-${this.align}`]: true,
                'has-slide-top': this.registry.panels.reduce((carry, panel) => carry || panel.isTopSlide, false)
            };
        },
        lastSlide() {
            return this.registry.panels[this.registry.panels.length - 1];
        },
        styles() {
            return {
                display: !this.display ? 'none' : undefined,
                zIndex: this.registry.zIndex === 0 ? -1 : 1,
                // width: this.lastSlide && this.lastSlide.width,
                // width: this.width ? unit(this.width) : null,
                // minWidth: this.minWidth ? unit(this.minWidth) : null,
                // maxWidth: this.maxWidth ? unit(this.maxWidth) : null,
            };
        }
    },
    watch: {
        ['registry.zIndex'](value) {
            this.display = value > 0;
        },

        // ['registry.panels'](value) {
        //     console.log(value.length);
        // },
    },
    mounted() {
        window.addEventListener('keyup', ({ code }) => {
            if(code === 'Escape' && this.registry.panels.length) {
                this.registry.panels[this.registry.panels.length - 1].close();
            }
        });
    },
    methods: {
        x() {
            return this.$el.getBoundingClientRect().x;
        },
        y() {
            return this.$el.getBoundingClientRect().y;
        },
        onClickBackdrop() {
            const fns = [...this.registry.panels]
                .reverse()
                .map((slide, i) => () => new Promise(resolve => {
                    slide.close(value => {
                        if(value !== false) {
                            setTimeout(() => {
                                resolve(value);
                            },  Math.max(100, slide.duration / (this.registry.panels.length - i)));
                        }

                        return value;
                    });
                }));

            run(fns);
        }
    }
};
</script>

<style>
.slide-deck-panel-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    max-width: 100%;
    z-index: 100;
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