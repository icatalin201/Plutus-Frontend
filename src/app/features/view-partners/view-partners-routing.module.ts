import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPartnersComponent } from './view-partners.component';

const routes: Routes = [{ path: '', component: ViewPartnersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewPartnersRoutingModule { }
