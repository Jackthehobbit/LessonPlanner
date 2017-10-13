import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.module.routing';

import { CoreService } from './components/core/core.service'
import { UnitService } from './components/units/unit.service'

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/shared/header/header.component'
import { MessageComponent } from './components/core/message/message.component'
import { ModalDialogComponent } from './components/core/modal-dialog/modal-dialog.component'
import { UnitListComponent } from './components/units/unit-list/unit-list.component'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent,
        MessageComponent,
        ModalDialogComponent,
        UnitListComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        AppRoutingModule
    ],
    providers:[
        CoreService,
        UnitService
    ]
})
export class AppModuleShared {
}
