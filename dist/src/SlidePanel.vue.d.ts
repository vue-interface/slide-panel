export default _sfc_main;
declare namespace _sfc_main {
    const inject: string[];
    namespace props {
        const show: BooleanConstructor;
        namespace width {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
        }
    }
    function data(): {
        isDisplaying: boolean;
        isHover: boolean;
        isShowing: boolean;
        isTopSlide: boolean;
        translateX: number;
        zIndex: number;
    };
    namespace computed {
        function classes(): any;
        function duration(): any;
        function styles(): any;
    }
    namespace watch {
        function isShowing(value: any): void;
        function show(value: any): void;
    }
    function mounted(): void;
    namespace methods {
        function close(fn: any): {
            close(fn: any): any;
            divide(numerator: any, denominator: any): any;
            open(): any;
            toggle(): any;
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
        };
        function divide(numerator: any, denominator: any): any;
        function open(): {
            close(fn: any): any;
            divide(numerator: any, denominator: any): any;
            open(): any;
            toggle(): any;
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
        };
        function toggle(): {
            close(fn: any): any;
            divide(numerator: any, denominator: any): any;
            open(): any;
            toggle(): any;
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
        };
        function translatePosition(): void;
        function x(): any;
        function y(): any;
        function onBeforeEnter(): void;
        function onEnterFrom(): void;
        function onAfterEnter(): void;
        function onBeforeLeave(): void;
        function onLeaveFrom(): void;
        function onAfterLeave(): void;
        function onClick(e: any): void;
        function onClickClose(): void;
        function onMouseenter(el: any): void;
        function onMouseleave(el: any): void;
    }
}
