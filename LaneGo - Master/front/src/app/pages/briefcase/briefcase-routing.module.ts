import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BriefcaseComponent } from './briefcase.component';
import { EditBriefcaseComponent } from './edit-briefcase/edit-briefcase.component';

const routes: Routes = [{
  path: '',
  component: BriefcaseComponent,
  children: [
    {
      path: 'editbriefcase',
      component: EditBriefcaseComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BriefcaseRoutingModule {
}
