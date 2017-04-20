import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PortalComponent } from './portal.component';
import { TestComponent }    from './home/test/test.component';
import { Test1Component }   from './home/test1/test1.component';
import { Home1sComponent }   from './home/home1/home1.component';
import { Home2sComponent }   from './home/home2/home2.component';
export const routes: Routes = [
  { path: '',
    component: PortalComponent,
    children: [
      { path: 'caseHome', component: HomeComponent },
      
      { path: '', pathMatch: 'full', redirectTo: 'caseHome' },
      { path: 'test', component: TestComponent },
      { path: 'test1', component: Test1Component },
      { path: 'home1', component: Home1sComponent },
      { path: 'home2', component: Home2sComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortalRoutingModule { }
