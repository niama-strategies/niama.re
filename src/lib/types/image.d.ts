declare module '*.png?bg' {
  const image: Pick<HTMLImageElement, 'alt' | 'src'> & {
    placeholder: string;
    sources: (Pick<HTMLSourceElement, 'srcset' | 'type'> & {sizes?: HTMLSourceElement['sizes']})[];
  };
  export default image;
}

declare module '*.png?domain' {
  const image: Pick<HTMLImageElement, 'alt' | 'src'> & {
    placeholder: string;
    sources: (Pick<HTMLSourceElement, 'srcset' | 'type'> & {sizes?: HTMLSourceElement['sizes']})[];
  };
  export default image;
}
