import {NgModule} from "@angular/core";
import {PortalRoutingModule} from "./portal.routing";
import {PortalSharedModule} from "./shared/portal-shared.module";
import {PortalComponent} from "./portal.component";
@NgModule({
    imports: [
        PortalSharedModule,
        PortalRoutingModule
    ],
    declarations: [
        PortalComponent
    ],
    providers: [
    ],
})
export class PortalModule {
}
