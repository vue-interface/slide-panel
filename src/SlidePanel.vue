<template>
    <div
        class="slide-panel"
        :style="styles"
        :class="classes"
        @mouseenter.self="onMouseenter"
        @mouseleave.self="onMouseleave">
        <transition
            name="slide"
            @before-enter="onBeforeEnter"
            @enter-from="onEnterFrom"
            @after-enter="onAfterEnter"
            @before-leave="onBeforeLeave"
            @leave-from="onLeaveFrom"
            @after-leave="onAfterLeave">
            <div
                v-if="isShowing"
                ref="content"
                class="slide-panel-content"
                @click="onClick">
                <div ref="inner" class="slide-panel-content-inner">
                    <slot />
                </div>
                <div>
                    <a ref="close" href="#" class="slide-panel-close" @click.prevent="close">
                        <span>&times;</span>
                    </a>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import converter from 'css-unit-converter';

function run(fns, ...args) {
    return fns.reduce((p, fn) => p.then(() => fn(...args)), Promise.resolve());
};

export default {
    inject: ['align', 'registry'],

    props: {

        /**
         * Is the triggerable element showing.
         *
         * @property Boolean
         */
        show: Boolean,

        /**
         * The width of the slide panel.
         *
         * @property String
         */
        width: {
            type: String,
            default: '33%'
        }

    },

    data() {
        return {
            isDisplaying: false,
            isHover: false,
            isShowing: false,
            isTopSlide: false,
            translateX: 0,
            zIndex: -1,
        };
    },

    computed: {
        classes() {
            return {
                'show': this.isShowing,
                'slide-top': !!this.isTopSlide,
            };
        },

        duration() {
            return getComputedStyle(this.$refs.content)
                .transitionDuration
                .split(',')
                .map(value => {
                    const [ 
                        parsed, number, unit
                    ] = value.trim().match(/^([\d.]+)(\w+)$/);
    
                    return converter(parseFloat(number), unit, 'ms');
                })
                .sort((a, b) => {
                    return a - b;
                })
                .shift();
        },

        styles() {
            const modifier = this.align === 'left' ? 1 : -1;
            const order = (this.registry.panels.length - 1) - this.registry.panels.indexOf(this);

            return {
                zIndex: this.isDisplaying ? this.zIndex : -1,
                display: this.isDisplaying ? 'flex' : 'none',
                // transform: this.isShowing && !this.isTopSlide && `translateX(-100%)`
                transform: this.isShowing && `translateX(calc((${modifier} * ${order} * 3.5rem) - (${modifier * -1} * ${this.isHover && !this.isTopSlide ? '3.5rem' : '0rem'})))`
            };
        }
    },

    watch: {

        isShowing(value) {
            const index = this.registry.panels.indexOf(this);

            if(value) {
                this.isDisplaying = true;
                this.zIndex = ++this.registry.zIndex;
                this.registry.panels.push(this);
            }
            else {
                this.registry.panels.splice(index, 1);
            }
        },

        isDisplaying(value) {
            if(value) {
                this.$emit('open', this);
            }
            else if(!this.registry.panels.length) {
                this.registry.zIndex = 0;
            }
        },

        show(value) {
            if(value) {
                this.open();
            }
            else {
                this.close();
            }
        }       
    },

    mounted() {
        if(this.show) {
            setTimeout(() => this.open(), 1);
        }
        this.$watch(() => this.registry.panels, () => {
            const index = this.registry.panels.indexOf(this);

            this.isTopSlide = index > -1 && index + 1 === this.registry.panels.length;
        }, { deep: true });
    },

    methods: {

        close(fn) {
            const event = new Event('close', {
                cancelable: true
            });
            
            new Promise(resolve => {
                setTimeout(() => {
                    this.$emit('close', event, resolve);

                    if(!event.defaultPrevented) {
                        resolve(true);
                    }
                });
            }).then(value => {
                if(typeof fn === 'function') {
                    value = fn(value);
                }

                return this.isShowing = value === false;
            });

            return this;
        },

        divide(numerator, denominator) {
            const matches = numerator.toString().match(/^(\d+)(.+)$/);

            if(matches[0]) {
                return `${parseInt(matches[1]) / denominator}${matches[2]}`;
            }

            return numerator;
        },

        open() {
            this.isShowing = true;

            return this;
        },

        toggle() {
            if(!this.isShowing) {
                this.open();
            }
            else {
                this.close();
            }

            return this;
        },

        translatePosition() {

        },

        x() {
            return this.$el && this.$el.getBoundingClientRect().x;
        },

        y() {
            return this.$el && this.$el.getBoundingClientRect().y;
        },

        onBeforeEnter() {
            this.$emit('before-enter', this);
        },

        onEnterFrom() {
            this.$emit('enter-from', this);
        },

        onAfterEnter() {
            this.$emit('after-enter', this);
        },

        onBeforeLeave() {
            this.$emit('before-leave', this);
        },

        onLeaveFrom() {
            this.$emit('leave-from', this);
        },

        onAfterLeave() {
            this.isDisplaying = this.isShowing;
            this.$emit('after-leave', this);
        },
        
        onClick(e) {
            if(this.$refs.close) {
                const index = this.registry.panels.indexOf(this);
                const slides = this.registry.panels.slice(index + 1);
                const fns = slides
                    .reverse()
                    .map((slide, i) => () => new Promise(resolve => {
                        slide.close(value => {
                            if(value !== false) {
                                setTimeout(() => {
                                    resolve(value);
                                },  Math.max(100, this.duration / (slides.length - i)));
                            }

                            return value;
                        });
                    }));

                run(fns);
            }
        }, 

        onClickClose() {
            this.close();
        },

        onMouseenter(el) {
            if(!this.isTopSlide) {
                this.registry.panels.slice(0, this.registry.panels.indexOf(this) + 1).forEach(slide => {
                    slide.isHover = true;
                });
            }
        },

        onMouseleave(el) {
            this.registry.panels.slice(0, this.registry.panels.indexOf(this) + 1).forEach(slide => {
                slide.isHover = false;
            });
        }

    }

};
</script>

<style>
.slide-panel {
    outline: none;
    display: inline-flex;
    transition-property: all;
    transition-timing-function: ease-in;
    transition-duration: 250ms;
}

.slide-panel:not(.slide-top) .slide-panel-content {
    z-index: -1;
}

.slide-panel:not(.slide-top):hover {
    transition-timing-function: ease-out;
}

.slide-panel:not(.slide-top):hover .slide-panel-content:not(.slide-leave-active) {
    cursor: pointer;
    background: rgb(252, 252, 252);
}

.slide-panel .slide-panel-content {
    padding: 1rem;
    z-index: 1;
    overflow: auto;
    box-shadow: 0 0 .5rem rgba(0, 0, 0, .35);
    position: relative;
    flex-grow: 1;
    background: white;
    transition-duration: 333ms;
}

.slide-panel .slide-enter-active,
.slide-panel .slide-leave-active {
    transition-property: transform;
}

.slide-panel .slide-enter-active {
    transition-timing-function: ease-out;
}

.slide-panel .slide-leave-active {
    transition-timing-function: ease-in;
}

.slide-left .slide-panel .slide-enter-active.slide-enter-from,
.slide-left .slide-panel .slide-leave-active.slide-leave-to{
    transform: translateX(-100%);
}

.slide-right .slide-panel .slide-enter-active.slide-enter-from,
.slide-right .slide-panel .slide-leave-active.slide-leave-to {
    transform: translateX(100%);
}

.slide-panel .slide-panel-content-inner {
    flex-grow: 1;
}

.slide-panel .slide-panel-backdrop {
    opacity: 50;
    background: rgba(255, 255, 255, .75);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.slide-panel .slide-panel-close {
    position: absolute;
    top: .5em;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 1000%;
    font-size: 1.5rem;
    width: 1.5em;
    height: 1.5em;
    color: #a6a6a6;
    outline: none;
}

.slide-left .slide-panel .slide-panel-close {
    left: .25rem;
}

.slide-right .slide-panel .slide-panel-close {
    right: .25rem;
}

.slide-panel .slide-panel-close span {
    line-height: 1.5;
    transform: translateY(-1px);
}

.slide-panel .slide-panel-close:not(.slide-leave-active):hover,
.slide-panel .slide-panel-close:not(.slide-leave-active):focus {
    text-decoration: none;
    background-color: rgb(230, 230, 230);
}

.slide-panel .slide-panel-close:active {
    background-color: rgb(220, 220, 220);
    transform: scale(.95);
}

@media(max-width: 1024px) {
    .slide-panel .slide-panel-content {
        width: 100% !important;
    }
}
</style>