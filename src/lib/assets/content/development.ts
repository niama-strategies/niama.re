import image from '$lib/assets/images/development.png?domain';
import type {Domain} from '$lib/types';

export const DEVELOPMENT: Domain = {
  content: `<span class="font-title"><b>níama</b> <span class="text-purple-300">développement</span></span> vous accompagne dans la réalisation de vos applis (desktop, mobile, web).`,
  email: 'gregory.bouteiller@niama.re',
  image: {...image, alt: 'logo de níama développement'},
  name: 'Grégory BOUTEILLER',
  phone: '+262 (0)692 33 20 64',
  title: 'Développement',
  type: 'DEVELOPMENT',
};
