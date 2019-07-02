import * as tslib_1 from "tslib";
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
let ResourceDialogComponent = class ResourceDialogComponent {
    constructor(_dialogRef, data) {
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
    static createConfiguration(resourceIri, widthPct = 60, heightPct = 60) {
        const config = new MatDialogConfig();
        config.height = `${widthPct}%`;
        config.width = `${heightPct}%`;
        config.data = {
            iri: resourceIri
        };
        config.panelClass = 'resizable';
        return config;
    }
    ngOnInit() {
        this.fullSize = (!this.data.fullSize);
        // start in full size
        if (this._dialogRef) {
            this.toggleFullSize();
        }
    }
    toggleFullSize() {
        this.fullSize = (!this.fullSize);
        if (this.fullSize) {
            this._dialogRef.updateSize('100vw', '100vh');
            this._dialogRef.updatePosition();
        }
        else {
            this._dialogRef.updateSize('80vw', 'auto');
            this._dialogRef.updatePosition();
        }
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
export { ResourceDialogComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UtZGlhbG9nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS9hY3Rpb24vIiwic291cmNlcyI6WyJsaWIvcmVzb3VyY2UtZGlhbG9nL3Jlc291cmNlLWRpYWxvZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBTzFGLElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBNEJsQyxZQUFtQixVQUFpRCxFQUNsQyxJQUFTO1FBRHhCLGVBQVUsR0FBVixVQUFVLENBQXVDO1FBQ2xDLFNBQUksR0FBSixJQUFJLENBQUs7UUEzQjNDLGFBQVEsR0FBWSxLQUFLLENBQUM7SUE0QjFCLENBQUM7SUExQkQ7Ozs7Ozs7T0FPRztJQUNILE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxXQUFtQixFQUFFLFdBQW1CLEVBQUUsRUFBRSxZQUFvQixFQUFFO1FBRTNGLE1BQU0sTUFBTSxHQUFvQixJQUFJLGVBQWUsRUFBRSxDQUFDO1FBRXRELE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxRQUFRLEdBQUcsQ0FBQztRQUMvQixNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsU0FBUyxHQUFHLENBQUM7UUFFL0IsTUFBTSxDQUFDLElBQUksR0FBRztZQUNaLEdBQUcsRUFBRSxXQUFXO1NBQ2pCLENBQUM7UUFFRixNQUFNLENBQUMsVUFBVSxHQUFHLFdBQVcsQ0FBQztRQUVoQyxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBTUQsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdEMscUJBQXFCO1FBQ3JCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVqQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDbEM7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztDQUVGLENBQUE7QUFyRFksdUJBQXVCO0lBTG5DLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsMHBDQUErQzs7S0FFaEQsQ0FBQztJQThCRyxtQkFBQSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUE7NkNBREssWUFBWTtHQTVCaEMsdUJBQXVCLENBcURuQztTQXJEWSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNQVRfRElBTE9HX0RBVEEsIE1hdERpYWxvZ0NvbmZpZywgTWF0RGlhbG9nUmVmIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAna3VpLXJlc291cmNlLWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9yZXNvdXJjZS1kaWFsb2cuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9yZXNvdXJjZS1kaWFsb2cuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZURpYWxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZnVsbFNpemU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNvbmZpZ3VyYXRpb24gb2JqZWN0IGZvciBgTWF0RGlhbG9nYC5cbiAgICpcbiAgICogQHBhcmFtIHJlc291cmNlSXJpIHRoZSBJcmkgb2YgdGhlIHJlc291cmNlIHRvIGJlIGRpc3BsYXllZCBpbiBhIGRpYWxvZy5cbiAgICogQHBhcmFtIHdpZHRoUGN0IHdpZHRoIG9mIHRoZSBkaWFsb2cgaW4gcGVyY2VudGFnZS5cbiAgICogQHBhcmFtIGhlaWdodFBjdCBoZWlnaHQgb2YgdGhlIGRpYWxvZyBpbiBwZXJjZW50YWdlLlxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgc3RhdGljIGNyZWF0ZUNvbmZpZ3VyYXRpb24ocmVzb3VyY2VJcmk6IHN0cmluZywgd2lkdGhQY3Q6IG51bWJlciA9IDYwLCBoZWlnaHRQY3Q6IG51bWJlciA9IDYwKSB7XG5cbiAgICBjb25zdCBjb25maWc6IE1hdERpYWxvZ0NvbmZpZyA9IG5ldyBNYXREaWFsb2dDb25maWcoKTtcblxuICAgIGNvbmZpZy5oZWlnaHQgPSBgJHt3aWR0aFBjdH0lYDtcbiAgICBjb25maWcud2lkdGggPSBgJHtoZWlnaHRQY3R9JWA7XG5cbiAgICBjb25maWcuZGF0YSA9IHtcbiAgICAgIGlyaTogcmVzb3VyY2VJcmlcbiAgICB9O1xuXG4gICAgY29uZmlnLnBhbmVsQ2xhc3MgPSAncmVzaXphYmxlJztcblxuICAgIHJldHVybiBjb25maWc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgX2RpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFJlc291cmNlRGlhbG9nQ29tcG9uZW50PixcbiAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IGFueSkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5mdWxsU2l6ZSA9ICghdGhpcy5kYXRhLmZ1bGxTaXplKTtcblxuICAgIC8vIHN0YXJ0IGluIGZ1bGwgc2l6ZVxuICAgIGlmICh0aGlzLl9kaWFsb2dSZWYpIHtcbiAgICAgIHRoaXMudG9nZ2xlRnVsbFNpemUoKTtcbiAgICB9XG4gIH1cblxuICB0b2dnbGVGdWxsU2l6ZSgpIHtcbiAgICB0aGlzLmZ1bGxTaXplID0gKCF0aGlzLmZ1bGxTaXplKTtcblxuICAgIGlmICh0aGlzLmZ1bGxTaXplKSB7XG4gICAgICB0aGlzLl9kaWFsb2dSZWYudXBkYXRlU2l6ZSgnMTAwdncnLCAnMTAwdmgnKTtcbiAgICAgIHRoaXMuX2RpYWxvZ1JlZi51cGRhdGVQb3NpdGlvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kaWFsb2dSZWYudXBkYXRlU2l6ZSgnODB2dycsICdhdXRvJyk7XG4gICAgICB0aGlzLl9kaWFsb2dSZWYudXBkYXRlUG9zaXRpb24oKTtcbiAgICB9XG4gIH1cblxufVxuIl19