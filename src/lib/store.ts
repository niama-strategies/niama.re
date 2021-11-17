import {DOMAINS} from '$lib/assets/content';
import type {Direction, DomainType} from '$lib/types';
import {derived, writable} from 'svelte/store';

export const getColor = (type: DomainType): string => ({CONCEPTION: 'red', DEVELOPMENT: 'purple', ENGINEERING: 'yellow'}[type]);

export const domains = writable(DOMAINS);
export const direction = writable<Direction>('LEFT');

export const selectedDomain = derived(domains, ($domains) => $domains[1]);
export const selectedDomainType = derived(selectedDomain, ({type}) => type);
export const selectedColor = derived(selectedDomainType, getColor);

export const next = () => {
  direction.set('LEFT');
  domains.update(($domains) => [...$domains.slice(1), $domains[0]]);
};

export const previous = () => {
  direction.set('RIGHT');
  domains.update(($domains) => [$domains[$domains.length - 1], ...$domains.slice(0, -1)]);
};
