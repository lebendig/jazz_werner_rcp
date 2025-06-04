import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppTranslateService } from '../../services/translate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isAdmin = false;
  currentLang: string = 'en';
 constructor(
  public authService: AuthService,
  public translationService: AppTranslateService,
  private cdr: ChangeDetectorRef // 👈 adicionar isso
) {}

ngOnInit(): void {
  this.translationService.language$.subscribe(lang => {
    this.currentLang = lang;
    this.cdr.detectChanges(); // 👈 força Angular a atualizar a view
  });

  this.authService.isAdmin().subscribe(isAdmin => {
    this.isAdmin = isAdmin;
  });
}

  switchLanguage(lang: string): void {
    this.translationService.switchLanguage(lang);
  }

  logout(): void {
    this.authService.logout();
  }
}
