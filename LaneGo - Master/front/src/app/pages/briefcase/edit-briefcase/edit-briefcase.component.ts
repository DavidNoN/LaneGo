import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { UserModel } from '../../../@core/models/User.model';
import { NbIconLibraries, NbToastrService } from '@nebular/theme';
import { PublicationModel } from '../../../@core/models/Publication.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BriefcaseService } from '../../../@core/utils/briefcase.service'

@Component({
  selector: 'ngx-edit-briefcase',
  templateUrl: './edit-briefcase.component.html',
  styleUrls: ['./edit-briefcase.component.scss'],
  providers: [BriefcaseService]
})
export class EditBriefcaseComponent implements OnInit {
  user: UserModel;
  evaIcons: string[];
  newPub: PublicationModel = new PublicationModel();
  myPublications: Array<PublicationModel> = [];

  constructor(
    private authService: NbAuthService,
    private iconsLibrary: NbIconLibraries,
    private changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private toastService: NbToastrService,
    private briefcaseService: BriefcaseService
    )  {
      this.evaIcons = Array.from(iconsLibrary.getPack('eva').icons.keys())
        .filter(icon => icon.indexOf('outline') === -1);
  
      iconsLibrary.registerFontPack('fa', { packClass: 'fa', iconClassPrefix: 'fa' });
    }

  ngOnInit() {
    this.authService.onTokenChange().subscribe((token: any) => {
      if (token.isValid()) {
        const tokenObj = JSON.parse(atob(token.token.split('.')[1]))
        this.user = new UserModel(tokenObj["user"]);
        this.user.picture = tokenObj["user"].Picture;
        this.briefcaseService.addPublication
      }
    });

    this.getPortfolio();
  }


  getPortfolio() {
    this.myPublications = [];
    let srv = this.briefcaseService.getPortfolio(this.user.id)
    .subscribe((res: any) => {
      if (res.success) {
        this.myPublications = res.publications;
      }
    }, (err:any) => {
      debugger
    })
  }

  onFileChange(event) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        let format: 'image'|'video' = 'image';
        if(file.type.indexOf('image')> -1){
          format = 'image';
          console.log(reader.result)
        } else if(file.type.indexOf('video')> -1){
          format = 'video';
        } else {
          this.toastService.show('El formato del archivo no es válido', '', {
            status: 'danger'
          })
          return;
        }
        const fileObj = {
          src: reader.result,
          format: format
        }
        this.newPub.files.push(fileObj);
        if (this.newPub.files.length == 5) {
          this.toastService.show('Se alcanzó el límite de imágenes a subir', 'info', {
            status: "warning"
          })
        }
        // need to run CD since file load runs outside of zone
        this.changeDetectorRef.markForCheck();
      };
    }
  }

  getContent(src: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(src + '#t=0.9');
  }

  removeFile(src) {
    this.newPub.files = this.newPub.files.filter(x => x != src);
  }

  createPublication(){
    if (this.newPub.description== null || this.newPub.description == "") {
      this.toastService.show('Por favor añade una descripción', '', {
        status: 'danger'
      });
      return;
    }
    this.newPub.date = new Date().toLocaleString();
    let pub = {
      description: this.newPub.description, 
      date: this.newPub.date,
      userId: this.user.id,
      files: this.newPub.files
    };
    let newId = 0;
    let srv = this.briefcaseService.addPublication(pub).subscribe((res: any) => {
      if (res.success) {
        newId = res.pubId;
        this.toastService.show('Se creó la publicación', '', {
          status: 'success'
        });
        this.newPub.id = newId;
        this.myPublications.unshift({...this.newPub}); 
      } else {
        this.toastService.show('Ocurrió un error al crear la publicación', '', {
          status: 'danger'
        });
        console.log(res);
      }
      this.cleanNewPub();
      srv.unsubscribe();
    })
    // Enviar this.newpub al back
    // Enviar una a una los contenidos
  }

  cleanNewPub() {
    this.newPub.description = "";
    this.newPub.files = [];
    this.newPub.showedFileIndex = 0;
  }

  deletePub(id) {
    this.briefcaseService.deletePub(id).subscribe((res: any) => {
      if (res.success) {
        this.getPortfolio();
          this.toastService.show('Se eliminó la publicación', '', {
            status: 'success'
          });   
      } else {
        this.toastService.show('Ocurrió un error al eliminar la publicación', '', {
          status: 'danger'
        });
        console.log(res);
      }
    })
  }

}
