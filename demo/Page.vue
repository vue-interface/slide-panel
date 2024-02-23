<script setup lang="ts">
import SlidePanel from '../src/SlidePanel.vue';
import { useSlidePanels } from '../src/registry';

const { open, close } = useSlidePanels();
</script>

<template>
    <div class="container mx-auto">
        <h1 class="text-5xl mb-5">
            SlidePanel
        </h1>

        <div class="flex gap-2">
            <button
                class="rounded bg-sky-500 text-white px-2 py-1"
                @click="open('panel-1')">
                Open Panel 1
            </button>
            <button
                class="rounded bg-sky-500 text-white px-2 py-1"
                @click="open('panel-2')">
                Open Panel 2
            </button>
        </div>

        <SlidePanel
            name="panel-1"
            class="w-[25rem]">
            <template #default="{ close: test }">
                <h1 class="text-2xl">
                    Slide Panel 1
                </h1>

                <button
                    class="rounded bg-sky-500 text-white px-2 py-1"
                    @click="test()">
                    Close Panel 1
                </button>
            </template>
        </SlidePanel>

        <SlidePanel
            name="panel-2"
            class="w-[20rem]">
            <h1 class="text-2xl">
                Slide Panel 2
            </h1>

            <button
                class="rounded bg-sky-500 text-white px-2 py-1"
                @click="close('panel-2')">
                Close Panel 2
            </button>
        </SlidePanel>
    </div>
</template>