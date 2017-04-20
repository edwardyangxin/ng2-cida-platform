import { NgModule }                             from '@angular/core';
import { PortalRoutingModule }                  from './portal.routing';
import { PortalSharedModule }                   from './shared/portal-shared.module';
import { PortalComponent }                      from './portal.component';
import { HomeComponent }                        from './home/home.component';
import { TestComponent }                      from './home/test/test.component';
import { Test1Component }                      from './home/test1/test1.component';
import {CaseHomeService}                        from "./services/CaseHomeService";
import { Home1sComponent }                      from './home/home1/home1.component';
import { Home2sComponent }                      from './home/home2/home2.component';
@NgModule({
    imports: [
      PortalSharedModule,
      PortalRoutingModule
    ], 
    declarations: [
      PortalComponent,
      HomeComponent,
      TestComponent,
      Test1Component,
      Home1sComponent,
      Home2sComponent
    ],
    providers: [
      CaseHomeService

    ],
})
export class PortalModule { }
