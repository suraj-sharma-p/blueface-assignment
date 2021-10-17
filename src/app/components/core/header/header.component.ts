import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'de', 'fr']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {}

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
