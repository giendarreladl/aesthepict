import {
    defineConfig, presetAttributify, presetIcons,
    presetTypography, presetUno, presetWebFonts,
    transformerDirectives, transformerVariantGroup
  } from 'unocss'
  
  export default defineConfig({
    rules: [
    //     ['m-1', { margin: '70px' }],
    //  ['m-1', { margin: '1px' }],
   [/^m-(\d+)$/, ([_, num]) => ({ margin: `${num}%` })],
      ],
    shortcuts: [
        { logo: 'i-logos-solidjs-icon w-6em h-6em transform transition-800 hover:rotate-360' },
      // ...
    ],
    theme: {
      colors: {
        // ...
      }
    },
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons(),
      presetTypography(),
      presetWebFonts({
        fonts: {
          // ...
        },
      }),
    ],
    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
    ],
  })