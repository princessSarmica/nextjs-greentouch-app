import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['el', 'en', 'lv', 'pt', 'si'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});