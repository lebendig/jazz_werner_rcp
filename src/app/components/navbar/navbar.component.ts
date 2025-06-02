import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppTranslateService } from '../../services/translate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAdmin = false;

  constructor(
    public authService: AuthService,
    public translationService: AppTranslateService,
    private router: Router
  ) {
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  switchLanguage(language: string): void {
    this.translationService.switchLanguage(language);
  }
}