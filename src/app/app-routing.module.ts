import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DrinkListComponent } from './components/drink-list/drink-list.component';
import { DrinkDetailComponent } from './components/drink-detail/drink-detail.component';
import { AddDrinkComponent } from './components/add-drink/add-drink.component';
import { LoginComponent } from './components/login/login.component';

import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [authGuard],  // Protege todas as rotas abaixo
    children: [
      { path: '', component: DrinkListComponent },
      { path: 'drinks', component: DrinkListComponent },
      { path: 'drinks/:id', component: DrinkDetailComponent },
      { path: 'add-drink', component: AddDrinkComponent, canActivate: [adminGuard] } // só admin
    ]
  },
  { path: '**', redirectTo: '' }  // Rota coringa
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
