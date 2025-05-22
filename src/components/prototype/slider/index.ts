import { definePrototype, WebComponentAdapter } from '@/core';
import {
    asSlider,
    asSliderTrack,
    asSliderThumb,
    asSliderRange,
    SliderProps,
    SliderTrackProps,
    SliderThumbProps,
    SliderRangeProps,
    SliderExposes,
    SliderTrackExposes,
    SliderThumbExposes,
    SliderRangeExposes,
} from '@/core/behaviors/as-slider';


export const PrototypeSlider = WebComponentAdapter(
    definePrototype<SliderProps, SliderExposes>({
        name: 'prototype-slider',
        setup: (p) => {
            asSlider(p);
        },
    })
);
export const PrototypeSliderTrack = WebComponentAdapter(
    definePrototype<SliderTrackProps, SliderTrackExposes>({
        name: 'prototype-slider-track',
        setup: (p) => {
            asSliderTrack(p);
        },
    })
);
export const PrototypeSliderRange = WebComponentAdapter(
    definePrototype<SliderRangeProps, SliderRangeExposes>({
        name: 'prototype-slider-range',
        setup: (p) => {
            asSliderRange(p);
        },
    })
);
export const PrototypeSliderThumb = WebComponentAdapter(
    definePrototype<SliderThumbProps, SliderThumbExposes>({
        name: 'prototype-slider-thumb',
        setup: (p) => {
            asSliderThumb(p);
        },
    })
);

