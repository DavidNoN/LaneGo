import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardSearchComponent } from './cardsearch.component';
import { GenreCardSearchComponent } from './genre-cardsearch/genre-cardsearch.component';
import { InstrumentCardSearchComponent } from './instrument-cardsearch/instrument-cardsearch.component';

const routes: Routes = [{
  path: '',
  component: CardSearchComponent,
  children: [
    {
      path: 'genrecardsearch',
      component: GenreCardSearchComponent,
    },
    {
      path: 'instrumentcardsearch',
      component: InstrumentCardSearchComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardSearchRoutingModule {
}
