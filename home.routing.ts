import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {TestComponent} from "./test/test.component";
import {Test1Component} from "./test1/test1.component";
import {Home1sComponent} from "./home1/home1.component";
import {Home2sComponent} from "./home2/home2.component";

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {path: 'test', component: TestComponent},
            {path: 'test1', component: Test1Component},
            {path: 'home1', component: Home1sComponent},
            {path: 'home2', component: Home2sComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TestcaseHomeRouting {
}
