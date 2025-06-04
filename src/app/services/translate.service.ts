import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, BehaviorSubject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppTranslateService {
  private languageSubject = new BehaviorSubject<string>('en');
  public language$ = this.languageSubject.asObservable();

  constructor(private translationService: TranslateService) {
    this.initializeTranslation();
  }

  private async initializeTranslation(): Promise<void> {
    this.translationService.setDefaultLang('en');

    const browserLang = this.translationService.getBrowserLang() || 'en';
    const supportedLangs = ['en', 'de'];
    const langToUse = supportedLangs.includes(browserLang) ? browserLang : 'en';

    try {
      await lastValueFrom(this.translationService.use(langToUse));
      this.languageSubject.next(langToUse);
      console.log('Translation initialized with language:', langToUse);
    } catch (error) {
      console.error('Error loading translation:', error);
      await lastValueFrom(this.translationService.use('en'));
      this.languageSubject.next('en');
    }
  }

  switchLanguage(language: string): void {
    this.translationService.use(language).subscribe(() => {
      this.languageSubject.next(language);
      console.log('Language switched to:', language);
    });
  }

  getCurrentLanguage(): string {
    return this.translationService.currentLang || 'en';
  }

  getTranslation(key: string): Observable<string> {
    return this.translationService.get(key);
  }

  getInstantTranslation(key: string): string {
    return this.translationService.instant(key);
  }
}
