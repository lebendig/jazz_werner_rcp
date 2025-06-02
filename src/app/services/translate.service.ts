import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppTranslateService {
  constructor(private translationService: TranslateService) {
    this.translationService.setDefaultLang('en');
    this.setLanguageBasedOnBrowser();
  }

  private setLanguageBasedOnBrowser(): void {
    const browserLang = this.translationService.getBrowserLang() || 'en';
    const supportedLangs = ['en', 'de'];
    const langToUse = supportedLangs.includes(browserLang) ? browserLang : 'en';
    this.translationService.use(langToUse);
  }

  switchLanguage(language: string): void {
    this.translationService.use(language);
  }

  getCurrentLanguage(): string {
    return this.translationService.currentLang;
  }

  getTranslation(key: string): Observable<string> {
    return this.translationService.get(key);
  }

  getInstantTranslation(key: string): string {
    return this.translationService.instant(key);
  }
}
