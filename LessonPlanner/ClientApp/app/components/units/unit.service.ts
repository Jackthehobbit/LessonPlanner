import { Injectable } from '@angular/core'
import 'rxjs/add/operator/toPromise';

import { Unit } from './unit';
import { CoreService } from "../core/core.service";


@Injectable()
export class UnitService {



    constructor(private coreService: CoreService) { }

    //Returns a list of all units
    getUnits(): Promise<Unit[]> {
        return this.coreService.sendAjaxRequest("Get", "api/units", {})
            .then(
            response => response.json() as Unit[]
            )
            .catch(
            this.handleError
            );
    }

    deleteUnit(id: number): Promise<any> {
        if (typeof id === 'undefined') {

        }

        return this.coreService.sendAjaxRequest("Delete", "api/units/" + id, {})
            .then(
            response => response.json()
            )
            .catch(
            this.handleError
            )
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error);
    }

}