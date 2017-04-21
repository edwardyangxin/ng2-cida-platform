import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {PortalComponent} from "./portal.component";

export const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    children: [
      { path: '', redirectTo: 'testcase', pathMatch: 'full' },
      { path: 'testcase', loadChildren: './home/home.module#TestcaseHomeModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule { }
