import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NbAuthService } from '@nebular/auth';
import { UserModel } from '../../../@core/models/User.model';
import { UsersService } from '../../../@core/utils/users.service';
import { NbToastrService } from '@nebular/theme';
import { CitiesService } from '../../../@core/utils/cities.service';
import { GeoDbService } from '../../../../../projects/wft-geodb-angular-client/src/public_api';
import { FindPlacesRequest } from '../../../../../projects/wft-geodb-angular-client/src/lib/request/find-places-request.model';
import { PlaceSummary } from '../../../../../projects/wft-geodb-angular-client/src/lib/model/place-summary.model';
import { GeoResponse } from '../../../../../projects/wft-geodb-angular-client/src/lib/model/geo-response.model';
import { FindPlacesNearLocationRequest } from '../../../../../projects/wft-geodb-angular-client/src/lib/request/find-places-near-location-request.model';
import { NearLocationRequest } from '../../../../../projects/wft-geodb-angular-client/src/lib/request/near-location-request.model';
import { QueryService } from '../../../@core/utils/query.service';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'ngx-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  providers: [UsersService, CitiesService],
})
export class EditProfileComponent implements OnInit {
  file = '';
  name;
  picture;
  lastName;
  phone;
  address;
  password;
  repeatpassword;
  passwordmatch = true;
  locationToggle = true;
  lat = 4.881101;
  lng = -75.621303;
  isnumber = /^(?:(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/;
  user: UserModel;
  artistInfo: FormGroup;
  contactInfo: FormGroup;
  expertise: FormGroup;
  servicesInfo: FormGroup;
  userLocation = '';
  locationAccessGranted= false;
  genres = [];
  currentgenres = [];
  currentinstruments = []
  instruments = [];
  creationDate;
  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: NbAuthService,
    private userService: UsersService,
    private toastService: NbToastrService,
    private citiesService: CitiesService,
    private query: QueryService,
  ) {
    this.artistInfo = new FormGroup({
      artistname: new FormControl('', [Validators.maxLength(30)]),
      creationdate: new FormControl(''),
      originCity: new FormControl(''),
      instruments: new FormControl(''),
    });

    this.contactInfo = new FormGroup({
      contactphone: new FormControl('', [Validators.pattern(this.isnumber)]),
      whatsapp: new FormControl(''),
      contactemail: new FormControl('', [Validators.email]),
    });

    this.expertise = new FormGroup({
      experience: new FormControl(''),
      achievements: new FormControl(''),
    });

    this.servicesInfo = new FormGroup({
      services: new FormControl(''),
      paymentmethod: new FormControl(''),
    });

   }

  ngOnInit() {
    // tslint:disable-next-line: no-console
    this.askForLocation();
    this.getSelectOptions();
    console.log(this.instruments);
    this.authService.getToken().subscribe((token: any) => {
      if (token.isValid()) {
        const tokenObj = JSON.parse(atob(token.token.split('.')[1]));
        this.user = tokenObj['user'];
        this.user.id = tokenObj['user'].Id;
        this.name = tokenObj['user']
        .Name ? tokenObj['user'].Name.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
        this.lastName = tokenObj['user'].Lastname ?
        tokenObj['user'].Lastname.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
        this.address = tokenObj['user'].Address ?
        tokenObj['user'].Address.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
        this.picture = tokenObj['user'].Picture;
        this.phone = tokenObj['user'].Phone;
        this.locationToggle = tokenObj['user'].Sharelocation;
        this.userLocation = tokenObj['user'].Location;
        this.password = '';
        this.repeatpassword = '';
        this.artistInfo.controls['artistname'].setValue(tokenObj['user'].Artistname);
        this.artistInfo.controls['creationdate'].setValue(tokenObj['user'].Creationdate);
        this.artistInfo.controls['originCity'].setValue(tokenObj['user'].City);
        this.artistInfo.controls['creationdate'].setValue(tokenObj['user'].Creationdate);
        this.creationDate = new Date(tokenObj['user'].Creationdate);
        this.contactInfo.controls['contactphone'].setValue(tokenObj['user'].Contactphone);
        this.contactInfo.controls['whatsapp'].setValue(tokenObj['user'].Whatsapp);
        this.contactInfo.controls['contactemail'].setValue(tokenObj['user'].Contactemail);
        this.expertise.controls['experience'].setValue(tokenObj['user'].Experience);
        this.expertise.controls['achievements'].setValue(tokenObj['user'].Achievements);
        this.servicesInfo.controls['paymentmethod'].setValue(tokenObj['user'].Paymentmethod);
        this.servicesInfo.controls['services'].setValue(tokenObj['user'].Services);
        let srv = this.query.getGenresById(this.user.id).subscribe((res: any) => {
          if (res.success) {
            this.currentgenres = res.genres ? res.genres : [];
          }
          srv.unsubscribe();
        });
        let srvins = this.query.getInstrumentsById(this.user.id).subscribe((res: any) => {
          if (res.success) {
            this.currentinstruments = res.instruments ? res.instruments : [];
          }
          srvins.unsubscribe();
        });
      }
    });
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.user.picture = reader.result;
        this.picture = reader.result;
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  addGenre(genre) {
    const index: number = this.currentgenres.indexOf(genre);
    if (index == -1) {
        this.currentgenres.push(genre);
    }
  }

  addInstrument(inst) {
    const index: number = this.currentinstruments.indexOf(inst);
    if (index == -1) {
        this.currentinstruments.push(inst);
    }
  }

  removeGenre(genre) {
    const index: number = this.currentgenres.indexOf(genre);
    if (index !== -1) {
        this.currentgenres.splice(index, 1);
    }
  }
  removeInstrument(inst) {
    const index: number = this.currentinstruments.indexOf(inst);
    if (index !== -1) {
        this.currentinstruments.splice(index, 1);
    }
  }

  getSelectOptions() {
    try {
      const service = this.query.getGenres().subscribe((res: any) => {
        if (res.success) {
          this.genres = res.genres;
          this.genres.sort((a,b) => b.name.localeCompare(a.name));

          service.unsubscribe();
        } else {
          console.error(res.message);
        }
      });
      const service2 = this.query.getInstruments().subscribe((res: any) => {
        if (res.success) {
          this.instruments = res.instruments;
          this.instruments.sort((a,b) => b.name.localeCompare(a.name));

          service2.unsubscribe();
        } else {
          console.error(res.message);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  passwordChange() {
    // console.log(this.password);
    this.passwordmatch = (this.password === this.repeatpassword);
  }

  onSubmit() {
    console.log(this.artistInfo.controls.creationdate.value);
    if (this.passwordmatch) {
      // console.log(this.phone);
      let genresIds = [];
      let instrumentsIds = [];
      this.currentgenres.forEach(g => {
        genresIds.push(g.id);
      });
      this.currentinstruments.forEach(g => {
        instrumentsIds.push(g.id);
      });
      this.artistInfo.value.creationDate = this.creationDate;
      let form: UserModel = {
        'id': this.user.id,
        'name': this.name != null ? this.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '',
        'address': this.address ? this.address.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '',
        'phone': this.phone,
        'password': this.password == '' ? 'notchanged' : this.password,
        'lastName': this.lastName ? this.lastName.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '',
        'picture': this.picture != null && this.picture != '' ? this.picture : this.user.picture,
        artistname: this.artistInfo.value.artistname ? this.artistInfo.value.artistname.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '',
        creationdate: this.artistInfo.value.creationdate ? this.artistInfo.value.creationdate.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '',
        originCity: this.artistInfo.value.originCity ? this.artistInfo.value.originCity.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '',
        ...this.contactInfo.value,
        contactemail: this.contactInfo.value.contactemail ? this.contactInfo.value.contactemail.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '',
        experience: this.expertise.value.experience ? this.expertise.value.experience.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '',
        achievements: this.expertise.value.achievements ? this.expertise.value.achievements.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '',
        services: this.servicesInfo.value.services ? this.servicesInfo.value.services.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '',
        paymentmethod: this.servicesInfo.value.paymentmethod ? this.servicesInfo.value.paymentmethod.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '',
        'genres': genresIds,
        'instruments': instrumentsIds,
      };

      form.whatsapp = (form.whatsapp == null) ? 0 : form.whatsapp;

      if (this.locationToggle) {
        this.askForLocation();
      } else {
        // TODO
      }
      setTimeout(() => {
        if (this.userLocation == null || this.userLocation == '') {
          // TODO mostrar modal para aceptar ubicación o sinó para pedir una dirección
        }
        form.location = this.userLocation;
        form.shareLocation = this.locationToggle;
        console.log(form);
        this.userService.updateInfo(form).subscribe((res: any) => {
          if (res.success) {
            this.toastService.show('Se actualizó el perfil correctamente');
            this.authService.refreshToken('email', {token: res.token, userId: this.user.id}).subscribe((data: any) => {
              const tokenObj = JSON.parse(atob(res.token.split('.')[1]));
              this.user = tokenObj['user'];
              this.user.id = tokenObj['user'].Id;
              this.name = tokenObj['user'].Name ? tokenObj['user']
              .Name.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
              this.lastName = tokenObj['user'].Lastname ? tokenObj['user']
              .Lastname.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
              this.address = tokenObj['user'].Address ? tokenObj['user']
              .Address.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
              this.picture = tokenObj['user'].Picture;
              this.phone = tokenObj['user'].Phone;
            });
          } else {
            this.toastService.show('Ocurrió un error al actualizar el perfil', '', {status: 'danger'});
          }
        }, (err: any) => {
          console.error(err);

        });
      }, 0.3);
    }
  }
  askForLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.locationAccessGranted = true;
        this.userLocation = [position.coords.latitude, position.coords.longitude].toString();
      }, (error) => {
        this.showError(error);
      });
    } else {
      this.toastService.show('Geolocation is not supported by this browser.');
    }
  }


  showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.toastService.show('La ubicación está desactivada.', 'info', {status: 'danger'});
        this.locationToggle = false;
        this.locationAccessGranted = false;
        break;
      case error.POSITION_UNAVAILABLE:
        this.toastService.show('Location information is unavailable.', 'info', {status: 'danger'});
        break;
      case error.TIMEOUT:
        this.toastService.show('The request to get user location timed out.', 'info', {status: 'danger'});
        break;
      case error.UNKNOWN_ERROR:
        this.toastService.show('An unknown error occurred.', 'info', {status: 'danger'});
        break;
    }
  }

  locationCheckedChanged () {
    if (!this.locationAccessGranted && !this.locationToggle) {
      this.toastService.show('Por favor habilita la ubicación para acceder a esta funcionalidad', 'info',
      {status: 'warning', duration: 2000})
      setTimeout(() => {
        this.locationToggle = false;
        this.askForLocation();
      }, 0.2);
    }
  }
}
