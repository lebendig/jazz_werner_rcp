import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Drink } from '../../models/drink';
import { DrinkService } from '../../services/drink.service';
import { AppTranslateService } from '../../services/translate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.scss']
})
export class DrinkDetailComponent implements OnInit {
  drink: Drink | undefined;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private drinkService: DrinkService,
    public translationService: AppTranslateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getDrink();
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  getDrink(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.drinkService.getDrink(id).subscribe(drink => {
      this.drink = drink;
    });
  }

  getTranslatedField(field: string): string {
    if (!this.drink) return '';
    const lang = this.translationService.getCurrentLanguage();
    return this.drink[`${field}${lang === 'en' ? 'En' : 'De'}` as keyof Drink] as string;
  }
}