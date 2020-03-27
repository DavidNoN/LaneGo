import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbIconModule,
  NbTabsetModule, NbUserModule, NbCheckboxModule, NbInputModule, NbToggleModule, NbSelectModule, NbBadgeModule, NbLayoutModule, NbDatepicker, NbDatepickerModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileRoutingModule } from './profile-routing.module';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    ProfileRoutingModule,
    NbCheckboxModule,
    NbInputModule,
    NbIconModule,
    NbSelectModule,
    NbLayoutModule,
    NbDatepickerModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDpzI6MxG8FDfbZhn417bzVWzsHvivbhfc',
    // }),
    NbToggleModule,
    NbStepperModule,
  ],
  declarations: [
    ProfileComponent,
    ProfileComponent,
    EditProfileComponent,
  ],
  providers: [
  ],
})
export class ProfileModule { }
