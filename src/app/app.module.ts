import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrinkListComponent } from './components/drink-list/drink-list.component';
import { DrinkDetailComponent } from './components/drink-detail/drink-detail.component';
import { AddDrinkComponent } from './components/add-drink/add-drink.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AppTranslateService } from './services/translate.service';

// Função que retorna o token armazenado
export function tokenGetter() {
  return localStorage.getItem('access_token');
}

// Função de carregamento de traduções
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DrinkListComponent,
    DrinkDetailComponent,
    AddDrinkComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200'], // ajuste conforme sua API
        disallowedRoutes: [] // adicione rotas públicas se necessário
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    JwtHelperService,
    AppTranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
