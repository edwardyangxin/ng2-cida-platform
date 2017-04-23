import {Component, OnInit} from '@angular/core';
import {ApiService, commonConfig} from '../../frameworks';
import {appCommon} from '../config/app-common';

@Component({
    moduleId: module.id,
    template: '<router-outlet></router-outlet>'
})
export class PortalComponent implements OnInit {
    constructor(api: ApiService) {
        api.baseUrl = `${commonConfig.baseUrl}${appCommon.appName}`;
    }

    ngOnInit() {
        console.log("starting init portal comp....======================")
    }

}
