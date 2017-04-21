import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {TestComponent} from "./test/test.component";
import {Test1Component} from "./test1/test1.component";
import {Home1sComponent} from "./home1/home1.component";
import {Home2sComponent} from "./home2/home2.component";
import {CaseHomeService} from "./home.service";
import {TestcaseHomeRouting} from "./home.routing";
import {PortalSharedModule} from "../shared/portal-shared.module";

@NgModule({
    imports: [
        PortalSharedModule,
        TestcaseHomeRouting
    ],
    declarations: [
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
export class TestcaseHomeModule {
}
