<template>
    <div class="slide-panel"
        :class="classes"
        :style="styles()"
        @mouseenter.self="onMouseenter"
        @mouseleave.self="onMouseleave"
        @keydown.esc="onEsc">
        <animate-css name="slide" :duration="duration" right>
            <div v-if="isShowing" class="slide-panel-content" @click="onClick">
                <div class="slide-panel-content-inner">
                    <slot />
                </div>
                <div>
                    <a href="#" class="slide-panel-close" @click.prevent="onCancel">
                        <span>&times;</span>
                    </a>
                </div>
            </div>
        </animate-css>
    </div>
</template>

<script>
import AnimateCss from '@vue-interface/animate-css';
import Triggerable from '@vue-interface/triggerable';
import { unit } from '@vue-interface/utils';

const registry = {
    zIndex: 0,
    panels: []
};

function run(fns, ...args) {
    return fns.reduce((p, fn) => p.then(() => fn(...args)), Promise.resolve());
};

export default {

    components: {
        AnimateCss
    },

    mixins: [
        Triggerable
    ],

    props: {

        duration: {
            type: String,
            default: '500ms'
        },
        
        width: {
            type: [String, Number],
            default: 50
        },

        registry: {
            type: Object,
            default: () => registry
        }

    },

    data() {
        return {
            zIndex: null,
            isHover: false,
            isTopSlide: false
        };
    },

    computed: {
        classes() {
            return Object.assign({
                'slide-top': !!this.isTopSlide
            }, this.triggerableClasses);
        }
    },

    watch: {

        ['registry.panels'](value) {
            const index = this.registry.panels.indexOf(this);

            this.isTopSlide = index > -1 && index + 1 === this.registry.panels.length;
        },

        isShowing(value) {
            if(value) {
                this.zIndex = ++this.registry.zIndex;
                this.registry.panels.push(this);
            }
        },
        
        isDisplaying(value) {
            const index = this.registry.panels.indexOf(this);

            if(!value) {
                this.registry.panels.splice(index, 1);
            }
        }        
    },

    methods: {
        
        divide(numerator, denominator) {
            const matches = numerator.toString().match(/^(\d+)(.+)$/);

            if(matches[0]) {
                return `${parseInt(matches[1]) / denominator}${matches[2]}`;
            }

            return numerator;
        },

        styles() {
            if(this.registry.panels.indexOf(this) > -1) {
                return {
                    zIndex: this.zIndex,
                    transitionDuration: this.divide(this.duration, 2),
                    transform: `translateX(calc((-1 * ${(this.registry.panels.length - 1) - this.registry.panels.indexOf(this)} * 3.5rem}) - ${this.isHover && !this.isTopSlide ? '3.5rem' : '0rem'}))`
                };
            }
        },
        
        onClick() {
            const index = this.registry.panels.indexOf(this);

            const fns = this.registry.panels.slice(index + 1)
                .reverse()
                .map(slide => () => slide.cancel(slide));
            
            run(fns).then(() => {
                this.$emit('cancel');
            });
        }, 

        onCancel() {
            if(this.registry.panels.indexOf(this) === this.registry.panels.length - 1) {
                Promise.resolve(this.cancel(this)).then(() => {
                    this.$emit('cancel');
                });
            }
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
}

.slide-right .slide-panel-close {
    margin-left: 1rem;
}

.slide-panel:not(.slide-top) .slide-panel-content {
    z-index: -1;
}

.slide-panel:not(.slide-top):hover .slide-panel-content {
    cursor: pointer;
    background: rgb(252, 252, 252);
}
 
.slide-panel .slide-panel-content {
    padding: 1rem;
    z-index: 1;
    overflow: auto;
    box-shadow: 0 0 .25rem rgba(0, 0, 0, .25);
    position: relative;
    flex-grow: 1;
    background: white;
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
    right: .5em;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 1000%;
    font-size: 1.5rem;
    width: 1.5em;
    height: 1.5em;
    color: #a6a6a6;
}

.slide-panel .slide-panel-close span {
    line-height: 1.5;
    transform: translateY(-1px);
}

.slide-panel .slide-panel-close:hover {
    text-decoration: none;
    background-color: rgb(230, 230, 230);
}

.slide-panel .slide-panel-close:active {
    background-color: rgb(220, 220, 220);
}

@media(max-width: 1024px) {
    .slide-panel .slide-panel-content {
        width: 100% !important;
    }
}
</style>