import { Component } from '@angular/core';

class LocaleViewObject {

  code: String;
  displayName: String;

  constructor (code: String, displayName: String) {
    this.code = code.toLowerCase();
    this.displayName = displayName;
  }

}

const locales = [
  new LocaleViewObject ('en', 'English'),
  new LocaleViewObject ('ru', 'Russian'),
  new LocaleViewObject ('de', 'German')
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {

  title = 'Some String to Translate';
  activeLocale = locales[0];

  getLanguages(): Array<LocaleViewObject> {
    return locales;
  };

  onLocaleSelected(code: String): void {
    const activeLocale = locales.find(findLocaleByCode);
    this.activeLocale = activeLocale;

    function findLocaleByCode (locale) {
      return locale.code === code;
    }
  }
}
