import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import { NbThemeService, NbDialogService, NbIconLibraries } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { NbLoginComponent, NbAuthService } from '@nebular/auth';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from '../../@core/utils/query.service';
import { SearchCardModel } from '../../@core/models/SearchCard.model';
import { BriefcaseService } from '../../@core/utils/briefcase.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  providers: [QueryService, BriefcaseService]
})
export class DashboardComponent implements OnDestroy, OnInit {

  private alive = true;

  routesub: any;
  searchString: string;
  genre: string;
  results: SearchCardModel[] = [];
  evaIcons: string[];
  userLocation: any;
  instrument: any;

  constructor(
    private route: ActivatedRoute,
    private queryService: QueryService,
    private dialogService: NbDialogService,
    private briefcaseService: BriefcaseService,
    private sanitizer: DomSanitizer,
    private iconsLibrary: NbIconLibraries,
    private authService: NbAuthService
  ) {
    this.evaIcons = Array.from(iconsLibrary.getPack('eva').icons.keys())
        .filter(icon => icon.indexOf('outline') === -1);
  
      iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
  }

  ngOnInit() {
    this.authService.getToken().subscribe((token: any) => {
      if (token.isValid()) {
        const tokenObj = JSON.parse(atob(token.token.split('.')[1]));
        this.userLocation = tokenObj['user'].Location;
      }
    })

    this.routesub = this.route.paramMap.subscribe(params => {
      this.searchString = params.get('searchString');
      this.genre = params.get('genre');
      this.instrument = params.get('instrument');

      const sub = this.queryService.search(JSON.stringify({
        SearchString: this.searchString && this.searchString !== '' ? this.searchString : '',
        Genre: this.genre && this.genre !== '' ? this.genre : '',
        Instrument: this.instrument && this.instrument !== '' ? this.instrument : '',
        Location: this.userLocation
      })).subscribe((res:any) => {
        if (res.success) {
          console.log(this.results);
          this.results = res.data;
        }
        sub.unsubscribe();
      })
    }); 
  }

  ngOnDestroy() {
    this.alive = false;
  }

  open(dialog: TemplateRef<any>, user: SearchCardModel, src = 'contact') {
    if (src == 'portfolio') {
      this.briefcaseService.getPortfolio(user.id).subscribe((res:any) => {
        let context = {};
        context = {
          pubs: res.publications,
          i: 0
        }
        this.dialogService.open(dialog, {
          context
        });
      })
    } else {
      let context = {};
      context = {
        title: user.artistname ? user.artistname : user.name,
        contactnumber: user.contactphone, 
        contactemail: user.contactemail,
        whatsapp: user.whatsapp,
      }
      this.dialogService.open(dialog, {
        context
      });
    }
  }

  getContent(src: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(src + '#t=0.9');
  }
}
