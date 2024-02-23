declare const _default: import("vue").DefineComponent<{
    /**
     * Is the triggerable element showing.
     *
     * @property Boolean
     */
    show: BooleanConstructor;
    /**
     * The width of the slide panel.
     *
     * @property String
     */
    width: {
        type: StringConstructor;
        default: string;
    };
}, any, {
    isDisplaying: boolean;
    isHover: boolean;
    isShowing: boolean;
    isTopSlide: boolean;
    translateX: number;
    zIndex: number;
}, {
    classes(): {
        show: boolean;
        'slide-top': boolean;
    };
    duration(): number;
    styles(): {
        zIndex: number;
        display: string;
        transform: string;
    };
}, {
    close(fn: any): import("vue").CreateComponentPublicInstance<{
        readonly show: boolean;
        readonly width: string;
    }, any, {
        isDisplaying: boolean;
        isHover: boolean;
        isShowing: boolean;
        isTopSlide: boolean;
        translateX: number;
        zIndex: number;
    }, {
        classes(): {
            show: boolean;
            'slide-top': boolean;
        };
        duration(): number;
        styles(): {
            zIndex: number;
            display: string;
            transform: string;
        };
    }, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, {
        readonly show: boolean;
        readonly width: string;
    }, {
        show: boolean;
        width: string;
    }, false, ("align" | "registry")[], {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, {
        readonly show: boolean;
        readonly width: string;
    }, any, {
        isDisplaying: boolean;
        isHover: boolean;
        isShowing: boolean;
        isTopSlide: boolean;
        translateX: number;
        zIndex: number;
    }, {
        classes(): {
            show: boolean;
            'slide-top': boolean;
        };
        duration(): number;
        styles(): {
            zIndex: number;
            display: string;
            transform: string;
        };
    }, any, {
        show: boolean;
        width: string;
    }>;
    divide(numerator: any, denominator: any): any;
    open(): import("vue").CreateComponentPublicInstance<{
        readonly show: boolean;
        readonly width: string;
    }, any, {
        isDisplaying: boolean;
        isHover: boolean;
        isShowing: boolean;
        isTopSlide: boolean;
        translateX: number;
        zIndex: number;
    }, {
        classes(): {
            show: boolean;
            'slide-top': boolean;
        };
        duration(): number;
        styles(): {
            zIndex: number;
            display: string;
            transform: string;
        };
    }, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, {
        readonly show: boolean;
        readonly width: string;
    }, {
        show: boolean;
        width: string;
    }, false, ("align" | "registry")[], {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, {
        readonly show: boolean;
        readonly width: string;
    }, any, {
        isDisplaying: boolean;
        isHover: boolean;
        isShowing: boolean;
        isTopSlide: boolean;
        translateX: number;
        zIndex: number;
    }, {
        classes(): {
            show: boolean;
            'slide-top': boolean;
        };
        duration(): number;
        styles(): {
            zIndex: number;
            display: string;
            transform: string;
        };
    }, any, {
        show: boolean;
        width: string;
    }>;
    toggle(): import("vue").CreateComponentPublicInstance<{
        readonly show: boolean;
        readonly width: string;
    }, any, {
        isDisplaying: boolean;
        isHover: boolean;
        isShowing: boolean;
        isTopSlide: boolean;
        translateX: number;
        zIndex: number;
    }, {
        classes(): {
            show: boolean;
            'slide-top': boolean;
        };
        duration(): number;
        styles(): {
            zIndex: number;
            display: string;
            transform: string;
        };
    }, any, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, {
        readonly show: boolean;
        readonly width: string;
    }, {
        show: boolean;
        width: string;
    }, false, ("align" | "registry")[], {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, {
        readonly show: boolean;
        readonly width: string;
    }, any, {
        isDisplaying: boolean;
        isHover: boolean;
        isShowing: boolean;
        isTopSlide: boolean;
        translateX: number;
        zIndex: number;
    }, {
        classes(): {
            show: boolean;
            'slide-top': boolean;
        };
        duration(): number;
        styles(): {
            zIndex: number;
            display: string;
            transform: string;
        };
    }, any, {
        show: boolean;
        width: string;
    }>;
    translatePosition(): void;
    x(): any;
    y(): any;
    onBeforeEnter(): void;
    onEnterFrom(): void;
    onAfterEnter(): void;
    onBeforeLeave(): void;
    onLeaveFrom(): void;
    onAfterLeave(): void;
    onClick(e: any): void;
    onClickClose(): void;
    onMouseenter(el: any): void;
    onMouseleave(el: any): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Is the triggerable element showing.
     *
     * @property Boolean
     */
    show: BooleanConstructor;
    /**
     * The width of the slide panel.
     *
     * @property String
     */
    width: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    show: boolean;
    width: string;
}, {}>;
export default _default;
