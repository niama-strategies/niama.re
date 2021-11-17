import adapter from '@sveltejs/adapter-static';
import {format, resize, setMetadata} from 'imagetools-core';
import preprocess from 'svelte-preprocess';
import {imagetools} from 'vite-imagetools';

const resolveConfigs = (parameters) => {
  const domainCfg = parameters.find(([key]) => key === 'domain');
  const bgCfg = parameters.find(([key]) => key === 'bg');
  if (bgCfg)
    return [
      {format: 'jpg', width: 1920},
      {lqip: true},
      ...[640, 1280, 1920].flatMap((width) => ['avif', 'webp'].map((format) => ({format, width}))),
    ];
  if (domainCfg)
    return [
      {format: 'jpg', width: 256},
      {lqip: true},
      ...[256, 512].flatMap((width) => ['avif', 'webp'].map((format) => ({format, width}))),
    ];
};

const lqipTransform = ({lqip}, ctx) => {
  if (!lqip) return;
  const cfg = {format: 'png', quality: 50, width: 10};
  return async (image) => {
    image = format(cfg, ctx)(resize(cfg, ctx)(image));
    const buffer = await image.toBuffer();
    setMetadata(image, 'placeholder', `data:image/png;base64,${buffer.toString('base64')}`);
    return image;
  };
};

const outputFormat = () => (datas) => {
  const getSource = (format) => {
    const srcset = datas
      .filter((data) => data?.format === format)
      .map(({src, width}) => `${src} ${width}w`)
      .join(', ');
    return {type: `image/${format}`, srcset};
  };

  const sources = [getSource('avif'), getSource('webp')];
  const src = datas[0].src;
  const placeholder = datas[1].placeholder;
  return {placeholder, sources, src};
};

const config = {
  kit: {
    adapter: adapter(),
    target: '#svelte',
    vite: {
      plugins: [
        imagetools({
          resolveConfigs,
          extendOutputFormats: (defaults) => ({...defaults, bg: outputFormat, domain: outputFormat}),
          extendTransforms: (builtins) => [...builtins, lqipTransform],
          force: true,
        }),
      ],
    },
  },
  preprocess: [preprocess({postcss: true})],
};

export default config;
