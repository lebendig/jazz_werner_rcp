import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Drink } from '../../models/drink';
import { DrinkService } from '../../services/drink.service';
import { AppTranslateService } from '../../services/translate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-drink',
  templateUrl: './add-drink.component.html',
  styleUrls: ['./add-drink.component.scss']
})
export class AddDrinkComponent implements OnInit {
  drinkForm: FormGroup;
  isEdit = false;
  drinkId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private drinkService: DrinkService,
    private route: ActivatedRoute,
    private router: Router,
    public translationService: AppTranslateService,
    private authService: AuthService
  ) {
    this.drinkForm = this.fb.group({
      nameEn: ['', Validators.required],
      nameDe: ['', Validators.required],
      ingredientsEn: ['', Validators.required],
      ingredientsDe: ['', Validators.required],
      preparationEn: ['', Validators.required],
      preparationDe: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.drinkId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.drinkId) {
      this.isEdit = true;
      this.loadDrink(this.drinkId);
    }
  }

  loadDrink(id: number): void {
    this.drinkService.getDrink(id).subscribe(drink => {
      this.drinkForm.patchValue(drink);
    });
  }

  onSubmit(): void {
    if (this.drinkForm.valid) {
      const drinkData = this.drinkForm.value;

      if (this.isEdit && this.drinkId) {
        this.drinkService.addDrink({ ...drinkData, id: this.drinkId }).subscribe(() => {
          this.router.navigate(['/drinks', this.drinkId]);
        });
      } else {
        this.drinkService.addDrink(drinkData).subscribe(drink => {
          this.router.navigate(['/drinks', drink.id]);
        });
      }
    }
  }
}