import { Component } from '@angular/core';
import { CoreService } from "../core/core.service";

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    constructor(private coreService: CoreService) {
        //Run any global initalisation
        this.coreService.doExec();
    }
}
