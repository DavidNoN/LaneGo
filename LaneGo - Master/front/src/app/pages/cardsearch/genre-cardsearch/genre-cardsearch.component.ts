import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { UserModel } from '../../../@core/models/User.model';
import { NbIconLibraries, NbToastrService } from '@nebular/theme';
import { PublicationModel } from '../../../@core/models/Publication.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BriefcaseService } from '../../../@core/utils/briefcase.service'
import { QueryService } from '../../../@core/utils/query.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-genre-cardsearch',
  templateUrl: './genre-cardsearch.component.html',
  styleUrls: ['./genre-cardsearch.component.scss'],
  providers: [QueryService]
})
export class GenreCardSearchComponent implements OnInit {
  user: UserModel;
  evaIcons: string[];
  newPub: PublicationModel = new PublicationModel();
  myPublications: Array<PublicationModel> = [];
  genres = [];

  constructor(
    private iconsLibrary: NbIconLibraries,
    private toastService: NbToastrService,
    private queryService: QueryService,
    private router: Router
    )  {
      this.evaIcons = Array.from(iconsLibrary.getPack('eva').icons.keys())
        .filter(icon => icon.indexOf('outline') === -1);
  
      iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    }

  ngOnInit() {
    this.getGenres();
  }
  getGenres() {
    let srv = this.queryService.getGenres().subscribe((res: any)=> {
      if (res.success) {
        this.genres = res.genres;
        this.genres.sort((a,b) => a.name.localeCompare(b.name));
        srv.unsubscribe();
      } else {
        console.error(res.message);
      }
    })
  }

  searchByGenre(id) {
    this.router.navigate(['/pages/Home', {'genre': id}])
  }
}
