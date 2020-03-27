import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbSearchService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SearchService } from '../../../@core/utils/search.service';
import { NbAuthService, NbAuthJWTToken, NbAuthSimpleToken, NbAuthOAuth2JWTToken, NbTokenService } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  providers: []
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    // {
    //   value: 'default',
    //   name: 'Light',
    // },
    {
      value: 'dark',
      name: 'Dark',
    },
    // {
    //   value: 'cosmic',
    //   name: 'Cosmic',
    // },
    // {
    //   value: 'corporate',
    //   name: 'Corporate',
    // },
  ];

  currentTheme = 'default';

  userMenu = [ 
    {title: 'Perfil'}, 
    {title: 'Cerrar sesión'},
  ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private searchService: NbSearchService,
              private authService: NbAuthService,
              private tokenService: NbTokenService,
              private router: Router) 
              {
                
                this.searchService.onSearchSubmit().subscribe((data: any) => {
                  const term = data.term;
                  this.router.navigate(['/pages/Home', {'searchString': term}])
                });
                this.authService.onTokenChange().subscribe((token: any) => {
                  if (token.isValid()) {
                    const tokenObj = JSON.parse(atob(token.token.split('.')[1]))
                    this.user = tokenObj["user"]
                  }
                })
  }

  ngOnInit() {
    this.themeService.changeTheme('default');

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
    
    this.menuService.onItemClick().subscribe((event: any) => {
      if (event.item.title == "Perfil") {
        this.router.navigate(['/pages/profile/editprofile'])
      }
      //if (event.item.title == "Portafolio") {
        //this.router.navigate(['/pages/briefcase/editbriefcase'])
      //}
      if (event.item.title == "Cerrar sesión") {
        this.authService.logout('email');
        this.tokenService.clear()
        this.user = {};
        this.router.navigate(['/pages/Home/'])
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
