import image from '$lib/assets/images/engineering.png?domain';
import type {Domain} from '$lib/types';

export const ENGINEERING: Domain = {
  content: `<span class="font-title"><b>níama</b> <span class="text-yellow-400">ingénierie</span></span> vous assiste dans vos projets d'architecture et d'ingénierie en bâtiment.`,
  email: 'frederic.aleman@niama.re',
  image: {...image, alt: 'logo de níama ingénierie'},
  name: 'Frédéric ALEMAN',
  phone: '+262 (0)692 31 86 80',
  title: 'Ingénierie',
  type: 'ENGINEERING',
};
