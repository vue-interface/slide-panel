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

<template>
    <div
        class="
            slide-panel outline-none inline-flex transition-all ease-int duration-[250ms]
            
            [&_.slide-panel-backdrop]:absolute
            [&_.slide-panel-backdrop]:w-full
            [&_.slide-panel-backdrop]:h-full
            [&_.slide-panel-backdrop]:top-0
            [&_.slide-panel-backdrop]:left-0
            [&_.slide-panel-backdrop]:opacity-50
            [&_.slide-panel-backdrop]:bg-[rgb(255,255,255,.75)]

            [&:not(.slide-top)_.slide-panel-content]:z-[-1]
            [&:not(.slide-top)_.slide-panel-content]:hover:ease-out
            [&:not(.slide-top):hover_.slide-panel-content:not(.slide-leave-active)]:cursor-pointer
            [&:not(.slide-top):hover_.slide-panel-content:not(.slide-leave-active)]:bg-[rgb(252,252,252)]

            [&.slide-panel_.slide-enter-active]:transition-transform
            [&.slide-panel_.slide-leave-active]:transition-transform
            [&.slide-panel_.slide-enter-active]:ease-out
            [&.slide-panel_.slide-leave-active]:ease-in

            [.slide-left_&_.slide-enter-active.slide-enter-from]:-translate-x-full
            [.slide-left_&_.slide-leave-active.slide-leave-to]:-translate-x-full

            [.slide-right_&_.slide-enter-active.slide-enter-from]:translate-x-full
            [.slide-right_&_.slide-leave-active.slide-leave-to]:translate-x-full
        "
        :style="styles"
        :class="classes"
        @mouseenter.self="onMouseenter"
        @mouseleave.self="onMouseleave">
        <Transition
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
                class="relative flex-grow bg-white duration-[333ms] p-4 z-[1] overflow-auto shadow-[0_0_.5rem_rgba(0,0,0,.35)]"
                @click="onClick">
                <div
                    ref="inner"
                    class="slide-panel-content-inner flex-grow">
                    <slot />
                </div>
                <div>
                    <a
                        ref="close"
                        href="#"
                        class="
                            slide-panel-close absolute top-2 inline-flex justify-center items-center text-center rounded-full text-2xl w-10 h-10 text-[#a6a6a6] outline-none no-underline
                            
                            [.slide-left_&]:left-1
                            [.slide-right_&]:right-1

                            [&_span]:leading-[1.5]
                            [&_span]:translate-y-[-1px]

                            [&:not(&>.slide-leave-active)]:hover:no-underline
                            [&:not(&>.slide-leave-active)]:focus:no-underline
                            [&:not(&>.slide-leave-active)]:hover:bg-[rgb(230,230,230)]
                            [&:not(&>.slide-leave-active)]:focus:bg-[rgb(230,230,230)]

                            [&:active]:bg-[rgb(220,220,220)]
                            [&:active]:scale-95"
                        @click.prevent="close">
                        <span>&times;</span>
                    </a>
                </div>
            </div>
        </Transition>
    </div>
</template>