import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbAuthService } from '@nebular/auth';

import { NbIconLibraries, NbToastrService } from '@nebular/theme';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { NbSidebarModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';


@Component({
    selector: 'ngx-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class InstrumentCardSearchComponent implements OnInit {
    evaIcons: string[];
    instruments = [];
  
    constructor(
      private iconsLibrary: NbIconLibraries,
      private toastService: NbToastrService,
      private router: Router
      )  {
        this.evaIcons = Array.from(iconsLibrary.getPack('eva').icons.keys())
          .filter(icon => icon.indexOf('outline') === -1);
    
        iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
      }
  
    ngOnInit() {
      
    }
    
  
    searchByInstrument(id) {
      this.router.navigate(['/pages/Home', {'instrument': id}])
    }
}