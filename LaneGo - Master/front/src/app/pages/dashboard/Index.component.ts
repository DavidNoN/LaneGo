import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import { NbThemeService, NbDialogService, NbIconLibraries } from '@nebular/theme';
import { NbLoginComponent, NbAuthService } from '@nebular/auth';
import { ActivatedRoute } from '@angular/router';
import { QueryService } from '../../@core/utils/query.service';
import { SearchCardModel } from '../../@core/models/SearchCard.model';
import { BriefcaseService } from '../../@core/utils/briefcase.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'Index',
    styleUrls: ['./Index.component.scss'],
    templateUrl: './Index.component.html',
  })

  export class IndexComponent implements OnInit {

    private alive = true;
    routesub: any;
    searchString: string;
    genre: string;
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

  }
}