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
import { CardSearchComponent } from './cardsearch.component';
import { CardSearchRoutingModule } from './cardsearch-routing.module';
import { GenreCardSearchComponent } from './genre-cardsearch/genre-cardsearch.component';
import { InstrumentCardSearchComponent } from './instrument-cardsearch/instrument-cardsearch.component';

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
    CardSearchRoutingModule,
    NbCheckboxModule,
    NbInputModule,
    NbIconModule,
    NbToggleModule,
    NbStepperModule,
  ],
  declarations: [
    CardSearchComponent,
    GenreCardSearchComponent,
    InstrumentCardSearchComponent,
  ],
  providers: [
  ],
})
export class CardSearchModule { }
