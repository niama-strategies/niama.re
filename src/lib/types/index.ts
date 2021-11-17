export type Direction = 'LEFT' | 'RIGHT';

export type Domain = {
  content: string;
  email: string;
  image: Image;
  name: string;
  phone: string;
  title: string;
  type: DomainType;
};

export type DomainType = 'CONCEPTION' | 'DEVELOPMENT' | 'ENGINEERING' | 'STRATEGIES';

export type Image = Pick<HTMLImageElement, 'alt' | 'src'> & {placeholder: string; sources: ImageSource[]};
export type ImageSource = Pick<HTMLSourceElement, 'srcset' | 'type'> & {sizes?: HTMLSourceElement['sizes']};
