import { Accurate, Cheap, Trust } from '@/assets';
import { Data } from '../types/typings.t';

const homeData: Data[] = [
  {
    icon: Accurate,
    content: 'We provide accurate distance info that you can trust and use.',
    title: 'Accurate',
    bg: 'bg-primary',
    contentBg: 'bg-callToAction/10',
  },
  {
    icon: Cheap,
    content: 'Provided paths are cost effective and thus cheaper for all.',
    title: 'Cheap',
    bg: 'bg-amber-500',
    contentBg: 'bg-primary/10',
  },
  {
    icon: Trust,
    content: 'We are trusted by thousands of users everyday',
    title: 'Trusted',
    bg: 'bg-blue-500',
    contentBg: 'bg-amber-500/10',
  },
];

const homeConstants = {
  homeData,
};

export default homeConstants;
