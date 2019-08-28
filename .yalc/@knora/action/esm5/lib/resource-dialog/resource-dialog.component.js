import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
var ResourceDialogComponent = /** @class */ (function () {
    function ResourceDialogComponent(_dialogRef, data) {
        this._dialogRef = _dialogRef;
        this.data = data;
        this.fullSize = false;
    }
    /**
     * Creates a configuration object for `MatDialog`.
     *
     * @param resourceIri the Iri of the resource to be displayed in a dialog.
     * @param widthPct width of the dialog in percentage.
     * @param heightPct height of the dialog in percentage.
     * @returns
     */
    ResourceDialogComponent.createConfiguration = function (resourceIri, widthPct, heightPct) {
        if (widthPct === void 0) { widthPct = 60; }
        if (heightPct === void 0) { heightPct = 60; }
        var config = new MatDialogConfig();
        config.height = widthPct + "%";
        config.width = heightPct + "%";
        config.data = {
            iri: resourceIri
        };
        config.panelClass = 'resizable';
        return config;
    };
    ResourceDialogComponent.prototype.ngOnInit = function () {
        this.fullSize = (!this.data.fullSize);
        // start in full size
        if (this._dialogRef) {
            this.toggleFullSize();
        }
    };
    ResourceDialogComponent.prototype.toggleFullSize = function () {
        this.fullSize = (!this.fullSize);
        if (this.fullSize) {
            this._dialogRef.updateSize('100vw', '100vh');
            this._dialogRef.updatePosition();
        }
        else {
            this._dialogRef.updateSize('80vw', 'auto');
            this._dialogRef.updatePosition();
        }
    };
    ResourceDialogComponent = tslib_1.__decorate([
        Component({
            selector: 'kui-resource-dialog',
            template: "<div class=\"object-dialog\">\n  <!-- header with close (on the left hand side) and resize (on the right hand side) button\n      and with the title in the center -->\n  <div class=\"dialog-header\">\n    <span class=\"dialog-action-button\">\n      <button mat-icon-button class=\"resize-button\" (click)=\"toggleFullSize()\">\n        <mat-icon class=\"optimize-direction\" [innerHtml]=\"fullSize ? 'call_received' :'call_made'\"></mat-icon>\n      </button>\n    </span>\n    <span class=\"fill-remaining-space\"></span>\n    <span>\n      <h3 class=\"dialog-title\" mat-dialog-title>\n        Resource\n        <!--'salsahLabels.frameworkForListings.add.title' | translate -->\n      </h3>\n    </span>\n    <span class=\"fill-remaining-space\"></span>\n    <span class=\"dialog-action-button\">\n      <button mat-icon-button class=\"close-button\" (click)=\"_dialogRef.close()\">\n        <mat-icon>close</mat-icon>\n      </button>\n    </span>\n  </div>\n\n  <!-- <mat-dialog-content class=\"dialog-content\" [class.fullsize]=\"fullSize\">\n\n      <salsah-resource-object [iri]=\"data.iri\"></salsah-resource-object>\n\n  </mat-dialog-content> -->\n\n</div>",
            styles: [""]
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA)),
        tslib_1.__metadata("design:paramtypes", [MatDialogRef, Object])
    ], ResourceDialogComponent);
    return ResourceDialogComponent;
}());
export { ResourceDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hY3Rpb24vIiwic291cmNlcyI6WyJsaWIvcmVzb3VyY2UtZGlhbG9nL3Jlc291cmNlLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBTzFGO0lBNEJFLGlDQUFtQixVQUFpRCxFQUNsQyxJQUFTO1FBRHhCLGVBQVUsR0FBVixVQUFVLENBQXVDO1FBQ2xDLFNBQUksR0FBSixJQUFJLENBQUs7UUEzQjNDLGFBQVEsR0FBWSxLQUFLLENBQUM7SUE0QjFCLENBQUM7SUExQkQ7Ozs7Ozs7T0FPRztJQUNJLDJDQUFtQixHQUExQixVQUEyQixXQUFtQixFQUFFLFFBQXFCLEVBQUUsU0FBc0I7UUFBN0MseUJBQUEsRUFBQSxhQUFxQjtRQUFFLDBCQUFBLEVBQUEsY0FBc0I7UUFFM0YsSUFBTSxNQUFNLEdBQW9CLElBQUksZUFBZSxFQUFFLENBQUM7UUFFdEQsTUFBTSxDQUFDLE1BQU0sR0FBTSxRQUFRLE1BQUcsQ0FBQztRQUMvQixNQUFNLENBQUMsS0FBSyxHQUFNLFNBQVMsTUFBRyxDQUFDO1FBRS9CLE1BQU0sQ0FBQyxJQUFJLEdBQUc7WUFDWixHQUFHLEVBQUUsV0FBVztTQUNqQixDQUFDO1FBRUYsTUFBTSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUM7UUFFaEMsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQU1ELDBDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRDLHFCQUFxQjtRQUNyQixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVELGdEQUFjLEdBQWQ7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFakMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ2xDO2FBQU07WUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUNsQztJQUNILENBQUM7SUFuRFUsdUJBQXVCO1FBTG5DLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsMHBDQUErQzs7U0FFaEQsQ0FBQztRQThCRyxtQkFBQSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUE7aURBREssWUFBWTtPQTVCaEMsdUJBQXVCLENBcURuQztJQUFELDhCQUFDO0NBQUEsQUFyREQsSUFxREM7U0FyRFksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTUFUX0RJQUxPR19EQVRBLCBNYXREaWFsb2dDb25maWcsIE1hdERpYWxvZ1JlZiB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2t1aS1yZXNvdXJjZS1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJy4vcmVzb3VyY2UtZGlhbG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcmVzb3VyY2UtZGlhbG9nLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUmVzb3VyY2VEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGZ1bGxTaXplOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBjb25maWd1cmF0aW9uIG9iamVjdCBmb3IgYE1hdERpYWxvZ2AuXG4gICAqXG4gICAqIEBwYXJhbSByZXNvdXJjZUlyaSB0aGUgSXJpIG9mIHRoZSByZXNvdXJjZSB0byBiZSBkaXNwbGF5ZWQgaW4gYSBkaWFsb2cuXG4gICAqIEBwYXJhbSB3aWR0aFBjdCB3aWR0aCBvZiB0aGUgZGlhbG9nIGluIHBlcmNlbnRhZ2UuXG4gICAqIEBwYXJhbSBoZWlnaHRQY3QgaGVpZ2h0IG9mIHRoZSBkaWFsb2cgaW4gcGVyY2VudGFnZS5cbiAgICogQHJldHVybnNcbiAgICovXG4gIHN0YXRpYyBjcmVhdGVDb25maWd1cmF0aW9uKHJlc291cmNlSXJpOiBzdHJpbmcsIHdpZHRoUGN0OiBudW1iZXIgPSA2MCwgaGVpZ2h0UGN0OiBudW1iZXIgPSA2MCkge1xuXG4gICAgY29uc3QgY29uZmlnOiBNYXREaWFsb2dDb25maWcgPSBuZXcgTWF0RGlhbG9nQ29uZmlnKCk7XG5cbiAgICBjb25maWcuaGVpZ2h0ID0gYCR7d2lkdGhQY3R9JWA7XG4gICAgY29uZmlnLndpZHRoID0gYCR7aGVpZ2h0UGN0fSVgO1xuXG4gICAgY29uZmlnLmRhdGEgPSB7XG4gICAgICBpcmk6IHJlc291cmNlSXJpXG4gICAgfTtcblxuICAgIGNvbmZpZy5wYW5lbENsYXNzID0gJ3Jlc2l6YWJsZSc7XG5cbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIF9kaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxSZXNvdXJjZURpYWxvZ0NvbXBvbmVudD4sXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnkpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZnVsbFNpemUgPSAoIXRoaXMuZGF0YS5mdWxsU2l6ZSk7XG5cbiAgICAvLyBzdGFydCBpbiBmdWxsIHNpemVcbiAgICBpZiAodGhpcy5fZGlhbG9nUmVmKSB7XG4gICAgICB0aGlzLnRvZ2dsZUZ1bGxTaXplKCk7XG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlRnVsbFNpemUoKSB7XG4gICAgdGhpcy5mdWxsU2l6ZSA9ICghdGhpcy5mdWxsU2l6ZSk7XG5cbiAgICBpZiAodGhpcy5mdWxsU2l6ZSkge1xuICAgICAgdGhpcy5fZGlhbG9nUmVmLnVwZGF0ZVNpemUoJzEwMHZ3JywgJzEwMHZoJyk7XG4gICAgICB0aGlzLl9kaWFsb2dSZWYudXBkYXRlUG9zaXRpb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGlhbG9nUmVmLnVwZGF0ZVNpemUoJzgwdncnLCAnYXV0bycpO1xuICAgICAgdGhpcy5fZGlhbG9nUmVmLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==