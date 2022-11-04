export default _sfc_main;
declare namespace _sfc_main {
    namespace props {
        namespace align {
            export const type: StringConstructor;
            const _default: string;
            export { _default as default };
            export function validator(value: any): boolean;
        }
        const backdrop: BooleanConstructor;
    }
    function setup(__props: any, { expose }: {
        expose: any;
    }): {
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
        ref: typeof ref;
        reactive: typeof reactive;
        watch: typeof watch;
        computed: typeof import("@vue/reactivity").computed;
        onMounted: (hook: () => any, target?: import("vue").ComponentInternalInstance) => false | Function;
        provide: typeof provide;
    };
    function setup(__props: any, { expose }: {
        expose: any;
    }): {
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
        ref: typeof ref;
        reactive: typeof reactive;
        watch: typeof watch;
        computed: typeof import("@vue/reactivity").computed;
        onMounted: (hook: () => any, target?: import("vue").ComponentInternalInstance) => false | Function;
        provide: typeof provide;
    };
}
import { ref } from "@vue/runtime-core";
import { reactive } from "@vue/runtime-core";
import { watch } from "@vue/runtime-core";
import { provide } from "@vue/runtime-core";
