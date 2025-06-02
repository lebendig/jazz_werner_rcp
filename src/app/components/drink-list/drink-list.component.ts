import { Component, OnInit } from '@angular/core';
import { Drink } from '../../models/drink';
import { DrinkService } from '../../services/drink.service';
import { AuthService } from '../../services/auth.service';
import { AppTranslateService } from '../../services/translate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.scss']
})
export class DrinkListComponent implements OnInit {
  drinks: Drink[] = [];
  filteredDrinks: Drink[] = [];
  searchQuery = '';
  isAdmin = false;

  constructor(
    private drinkService: DrinkService,
    private authService: AuthService,
    public translationService: AppTranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDrinks();
    this.authService.isAdmin().subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  loadDrinks(): void {
    this.drinkService.getDrinks().subscribe(drinks => {
      this.drinks = drinks;
      this.filteredDrinks = drinks;
    });
  }

  search(): void {
    if (this.searchQuery) {
      this.drinkService.searchDrinks(this.searchQuery).subscribe(drinks => {
        this.filteredDrinks = drinks;
      });
    } else {
      this.filteredDrinks = this.drinks;
    }
  }

  deleteDrink(id: number): void {
    this.translationService.getTranslation('COMMON.DELETE_CONFIRM').subscribe(confirmMessage => {
      if (confirm(confirmMessage)) {
        this.drinkService.deleteDrink(id).subscribe(() => {
          this.loadDrinks();
        });
      }
    });
  }

  viewDrink(id: number): void {
    this.router.navigate(['/drinks', id]);
  }
}