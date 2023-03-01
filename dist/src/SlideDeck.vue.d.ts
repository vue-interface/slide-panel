declare const _sfc_main: import("vue").DefineComponent<{
    align: {
        type: StringConstructor;
        default: string;
        validator: (value: unknown) => boolean;
    };
    backdrop: BooleanConstructor;
}, {
    run: (fns: any, ...args: any[]) => any;
    unit: (value: any, uom?: string) => any;
    props: any;
    display: import("vue").Ref<boolean>;
    isBackdropShowing: import("vue").Ref<boolean>;
    registry: {
        zIndex: number;
        panels: any[];
        readonly topSlide: any;
    };
    classes: import("vue").ComputedRef<{
        [x: string]: any;
        'has-slide-top': any;
    }>;
    wrapperClasses: import("vue").ComputedRef<{
        left: boolean;
        right: boolean;
    }>;
    lastSlide: import("vue").ComputedRef<any>;
    styles: import("vue").ComputedRef<{
        display: string;
        zIndex: number;
    }>;
    x: () => any;
    y: () => any;
    onClickBackdrop: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    align: {
        type: StringConstructor;
        default: string;
        validator: (value: unknown) => boolean;
    };
    backdrop: BooleanConstructor;
}>>, {
    align: string;
    backdrop: boolean;
}>;
export default _sfc_main;
