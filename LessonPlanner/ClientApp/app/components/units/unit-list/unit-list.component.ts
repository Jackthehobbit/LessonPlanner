
import { Component, OnInit, ViewChild } from '@angular/core';
import { Unit } from "../unit";
import { Message } from "../../core/message/message";
import { UnitService } from "../unit.service";
import { CoreService } from "../../core/core.service";
import { ModalDialogComponent } from "../../core/modal-dialog/modal-dialog.component"

@Component({
    selector: 'unit-list',
    templateUrl: 'unit-list.component.html'
})
export class UnitListComponent implements OnInit {
    units: Array<Unit>;
    message: string;
    @ViewChild('deleteDialog') deleteDialog: ModalDialogComponent;
    private toDeleteId?: number;

    constructor(private unitService: UnitService, private coreService: CoreService) {
    }

    //Function to initialise the component
    ngOnInit(): void {
        this.coreService.doExec();
        this.getUnits();
    }

    //Function to return the units
    getUnits(): void {

        //Send the request to the server to get the units
        this.unitService.getUnits().
            then(units => this.units = units) // response was sucessful so update the screen with the units
            .catch(error => {// something went wrong - handle the error
                this.coreService.setMessage(error);
            }
            );
    }

    //This is called from both the cancel and confirm buttons of the delete dialog - doDelete is true if the user confirmed the delete should happen
    confirmDelete(dodelete: boolean): void {
        this.deleteDialog.close(); // User has confirmed or canceled so do the delete

        let id = this.toDeleteId;
        this.toDeleteId = undefined; // Clear out the to delete Id so it is not accidentally used in the future.

        if (dodelete && typeof id != 'undefined') {
            this.deleteUnit(false, id);
        }
    }

    //Delete a unit.
    deleteUnit(confirm: boolean, id: number) {

        // Should we display a confirm dialog?
        if (confirm) {
            this.toDeleteId = id; // Keep the delete Id so we know which record we are deleting.
            this.deleteDialog.open();
            return; //Nothing else to do - this function will be called again if the user confirms to do the actual delete
        }

        //User has confirmed the delete so delete the record
        this.unitService.deleteUnit(id)
            .then(response => {
                let index = this.units.findIndex(x => x.id === id);
                if (index >= 0) {// find index returns -1 if it can't find the item so we only want to remove an item if we found it
                    this.units.splice(index, 1);
                }

                let message = new Message();
                message.title = "Record Removed";
                message.type = "Success";
                message.message = "Record removed successfully"

                this.coreService.setMessage(message);
            })
            .catch(error => {
                this.coreService.setMessage(error);

            });
    }


}
