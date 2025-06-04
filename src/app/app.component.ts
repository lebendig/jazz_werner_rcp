import { Component } from '@angular/core';
import { AppTranslateService } from './services/translate.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translationService: AppTranslateService) {}
}
