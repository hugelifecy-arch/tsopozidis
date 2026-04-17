export const navItems = [
  'home',
  'about',
  'music',
  'videos',
  'gallery',
  'events',
  'press',
  'contact',
] as const;

export type NavItem = (typeof navItems)[number];

export const navPaths: Record<NavItem, string> = {
  home: '/',
  about: '/about',
  music: '/music',
  videos: '/videos',
  gallery: '/gallery',
  events: '/events',
  press: '/press',
  contact: '/contact',
};
