import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drink } from '../models/drink';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private apiUrl = `${environment.apiUrl}/drinks`;

  constructor(private http: HttpClient) { }

  getDrinks(): Observable<Drink[]> {
    return this.http.get<Drink[]>(this.apiUrl);
  }

  getDrink(id: number): Observable<Drink> {
    return this.http.get<Drink>(`${this.apiUrl}/${id}`);
  }

  searchDrinks(query: string): Observable<Drink[]> {
    return this.http.get<Drink[]>(`${this.apiUrl}/search?query=${query}`);
  }

  addDrink(drink: Drink): Observable<Drink> {
    return this.http.post<Drink>(this.apiUrl, drink);
  }

  deleteDrink(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}