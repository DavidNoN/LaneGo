import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule, NbUserModule, NbCheckboxModule, NbInputModule, NbToggleModule, NbIconModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { BriefcaseComponent } from './briefcase.component';
import { EditBriefcaseComponent } from './edit-briefcase/edit-briefcase.component';
import { BriefcaseRoutingModule } from './briefcase-routing.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbCardModule,
    NbButtonModule,
    NbUserModule,
    BriefcaseRoutingModule,
    NbCheckboxModule,
    NbInputModule,
    NbIconModule,
    NbToggleModule,
    NbStepperModule,
  ],
  declarations: [
    BriefcaseComponent,
    EditBriefcaseComponent
  ],
  providers: [
  ],
})
export class BriefcaseModule { }
