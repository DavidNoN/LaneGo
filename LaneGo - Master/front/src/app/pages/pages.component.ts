import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import { NbLoginComponent, NbAuthService } from '@nebular/auth';


import { MENU_ITEMS } from './pages-menu';
import { MENU_ITEMS_LOGOUT } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent  {

  menu = MENU_ITEMS;

  }

