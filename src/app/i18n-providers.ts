import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
export function getTranslationProviders(): Promise<Object[]> {
  // Get the locale id from the global
  const locale = localStorage.getItem('locale') as string;
  // return no providers if fail to get translation file for locale
  const noProviders: Object[] = [];
  // No locale or U.S. English: no translation providers
  if (!locale || locale === 'en-US') {
    return Promise.resolve(noProviders);
  }
  // Ex: 'locale/messages.fr.xlf`
  const translationFile = `messages.${locale}.xlf`;
  return getTranslationsWithoutSystemJs(translationFile)
    .then( (translations: string ) => [
      { provide: TRANSLATIONS, useValue: translations },
      { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
      { provide: LOCALE_ID, useValue: locale }
    ])
    .catch(() => noProviders); // ignore if file not found
}
declare var System: any;
function getTranslationsWithoutSystemJs(path: string) {
  console.log('Test');
  return new Promise(function (resolve: Function, reject: Function) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', evt => resolve(request.responseText));
    request.addEventListener('error', err => reject(err));
    console.log('Sending request for locale file');
    request.open('GET', '/locale/' + path);
    request.send();
  });
}
