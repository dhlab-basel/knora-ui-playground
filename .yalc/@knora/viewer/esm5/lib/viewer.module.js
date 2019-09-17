import * as tslib_1 from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { KuiActionModule } from '@knora/action';
import { KuiCoreModule } from '@knora/core';
import { BooleanValueComponent } from './property/boolean-value/boolean-value.component';
import { ColorValueComponent } from './property/color-value/color-value.component';
import { DateValueComponent } from './property/date-value/date-value.component';
import { DecimalValueComponent } from './property/decimal-value/decimal-value.component';
import { ExternalResValueComponent } from './property/external-res-value/external-res-value.component';
import { GeometryValueComponent } from './property/geometry-value/geometry-value.component';
import { GeonameValueComponent } from './property/geoname-value/geoname-value.component';
import { IntegerValueComponent } from './property/integer-value/integer-value.component';
import { IntervalValueComponent } from './property/interval-value/interval-value.component';
import { LinkValueComponent } from './property/link-value/link-value.component';
import { ListValueComponent } from './property/list-value/list-value.component';
import { TextValueAsHtmlComponent } from './property/text-value/text-value-as-html/text-value-as-html.component';
import { TextValueAsStringComponent } from './property/text-value/text-value-as-string/text-value-as-string.component';
import { TextValueAsXmlComponent } from './property/text-value/text-value-as-xml/text-value-as-xml.component';
import { TextfileValueComponent } from './property/textfile-value/textfile-value.component';
import { UriValueComponent } from './property/uri-value/uri-value.component';
import { AnnotationComponent } from './resource/annotation/annotation.component';
import { AudioComponent } from './resource/audio/audio.component';
import { CollectionComponent } from './resource/collection/collection.component';
import { DddComponent } from './resource/ddd/ddd.component';
import { DocumentComponent } from './resource/document/document.component';
import { LinkObjComponent } from './resource/link-obj/link-obj.component';
import { MovingImageComponent } from './resource/moving-image/moving-image.component';
import { ObjectComponent } from './resource/object/object.component';
import { RegionComponent } from './resource/region/region.component';
import { StillImageComponent } from './resource/still-image/still-image.component';
import { TextComponent } from './resource/text/text.component';
import { CompareViewComponent } from './view/compare-view/compare-view.component';
import { GraphViewComponent } from './view/graph-view/graph-view.component';
import { GridViewComponent } from './view/grid-view/grid-view.component';
import { ListViewComponent } from './view/list-view/list-view.component';
import { PropertiesViewComponent } from './view/properties-view/properties-view.component';
import { ResourceViewComponent } from './view/resource-view/resource-view.component';
import { TableViewComponent } from './view/table-view/table-view.component';
import { SearchResultsComponent } from './view/search-results/search-results.component';
var KuiViewerModule = /** @class */ (function () {
    function KuiViewerModule() {
    }
    KuiViewerModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                KuiCoreModule,
                KuiActionModule,
                MatAutocompleteModule,
                MatButtonModule,
                MatCardModule,
                MatCheckboxModule,
                MatDatepickerModule,
                MatExpansionModule,
                MatFormFieldModule,
                MatInputModule,
                MatIconModule,
                MatListModule,
                MatNativeDateModule,
                MatSlideToggleModule,
                MatTabsModule,
                MatToolbarModule,
                MatTooltipModule,
                ReactiveFormsModule,
                FlexLayoutModule
            ],
            declarations: [
                AnnotationComponent,
                AudioComponent,
                CollectionComponent,
                DddComponent,
                DocumentComponent,
                LinkObjComponent,
                MovingImageComponent,
                ObjectComponent,
                RegionComponent,
                StillImageComponent,
                TextComponent,
                TextValueAsHtmlComponent,
                TextValueAsStringComponent,
                TextValueAsXmlComponent,
                TextfileValueComponent,
                DateValueComponent,
                IntegerValueComponent,
                ColorValueComponent,
                DecimalValueComponent,
                UriValueComponent,
                BooleanValueComponent,
                GeometryValueComponent,
                GeonameValueComponent,
                IntervalValueComponent,
                ListValueComponent,
                LinkValueComponent,
                ExternalResValueComponent,
                ListViewComponent,
                GridViewComponent,
                TableViewComponent,
                ResourceViewComponent,
                CompareViewComponent,
                GraphViewComponent,
                PropertiesViewComponent,
                SearchResultsComponent
            ],
            exports: [
                AnnotationComponent,
                AudioComponent,
                CollectionComponent,
                DddComponent,
                DocumentComponent,
                LinkObjComponent,
                MovingImageComponent,
                ObjectComponent,
                RegionComponent,
                StillImageComponent,
                TextComponent,
                TextValueAsHtmlComponent,
                TextValueAsStringComponent,
                TextValueAsXmlComponent,
                TextfileValueComponent,
                DateValueComponent,
                IntegerValueComponent,
                ColorValueComponent,
                DecimalValueComponent,
                UriValueComponent,
                BooleanValueComponent,
                GeometryValueComponent,
                GeonameValueComponent,
                IntervalValueComponent,
                ListValueComponent,
                LinkValueComponent,
                ExternalResValueComponent,
                ListViewComponent,
                GridViewComponent,
                TableViewComponent,
                ResourceViewComponent,
                CompareViewComponent,
                GraphViewComponent,
                PropertiesViewComponent,
                SearchResultsComponent
            ]
        })
    ], KuiViewerModule);
    return KuiViewerModule;
}());
export { KuiViewerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Brbm9yYS92aWV3ZXIvIiwic291cmNlcyI6WyJsaWIvdmlld2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsa0RBQWtEO0FBQ2xELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXhELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzdELE9B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Z0JBQ2Isd0JBQXdCO2dCQUN4QiwwQkFBMEI7Z0JBQzFCLHVCQUF1QjtnQkFDdkIsc0JBQXNCO2dCQUN0QixrQkFBa0I7Z0JBQ2xCLHFCQUFxQjtnQkFDckIsbUJBQW1CO2dCQUNuQixxQkFBcUI7Z0JBQ3JCLGlCQUFpQjtnQkFDakIscUJBQXFCO2dCQUNyQixzQkFBc0I7Z0JBQ3RCLHFCQUFxQjtnQkFDckIsc0JBQXNCO2dCQUN0QixrQkFBa0I7Z0JBQ2xCLGtCQUFrQjtnQkFDbEIseUJBQXlCO2dCQUN6QixpQkFBaUI7Z0JBQ2pCLGlCQUFpQjtnQkFDakIsa0JBQWtCO2dCQUNsQixxQkFBcUI7Z0JBQ3JCLG9CQUFvQjtnQkFDcEIsa0JBQWtCO2dCQUNsQix1QkFBdUI7Z0JBQ3ZCLHNCQUFzQjthQUN6QjtTQUNKLENBQUM7T0FDVyxlQUFlLENBQzNCO0lBQUQsc0JBQUM7Q0FBQSxBQURELElBQ0M7U0FEWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG4vLyBpbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZsZXhMYXlvdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mbGV4LWxheW91dCc7XG5cbmltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZU1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2F1dG9jb21wbGV0ZSc7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0Q2FyZE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2NhcmQnO1xuaW1wb3J0IHsgTWF0Q2hlY2tib3hNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jaGVja2JveCc7XG5pbXBvcnQgeyBNYXROYXRpdmVEYXRlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBNYXRFeHBhbnNpb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9leHBhbnNpb24nO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2lucHV0JztcbmltcG9ydCB7IE1hdExpc3RNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9saXN0JztcbmltcG9ydCB7IE1hdFNsaWRlVG9nZ2xlTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2xpZGUtdG9nZ2xlJztcbmltcG9ydCB7IE1hdFRhYnNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJzJztcbmltcG9ydCB7IE1hdFRvb2xiYXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sYmFyJztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcblxuaW1wb3J0IHsgTWF0RGF0ZXBpY2tlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RhdGVwaWNrZXInO1xuaW1wb3J0IHsgS3VpQWN0aW9uTW9kdWxlIH0gZnJvbSAnQGtub3JhL2FjdGlvbic7XG5pbXBvcnQgeyBLdWlDb3JlTW9kdWxlIH0gZnJvbSAnQGtub3JhL2NvcmUnO1xuXG5pbXBvcnQgeyBCb29sZWFuVmFsdWVDb21wb25lbnQgfSBmcm9tICcuL3Byb3BlcnR5L2Jvb2xlYW4tdmFsdWUvYm9vbGVhbi12YWx1ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sb3JWYWx1ZUNvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHkvY29sb3ItdmFsdWUvY29sb3ItdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IERhdGVWYWx1ZUNvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHkvZGF0ZS12YWx1ZS9kYXRlLXZhbHVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZWNpbWFsVmFsdWVDb21wb25lbnQgfSBmcm9tICcuL3Byb3BlcnR5L2RlY2ltYWwtdmFsdWUvZGVjaW1hbC12YWx1ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXh0ZXJuYWxSZXNWYWx1ZUNvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHkvZXh0ZXJuYWwtcmVzLXZhbHVlL2V4dGVybmFsLXJlcy12YWx1ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgR2VvbWV0cnlWYWx1ZUNvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHkvZ2VvbWV0cnktdmFsdWUvZ2VvbWV0cnktdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IEdlb25hbWVWYWx1ZUNvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHkvZ2VvbmFtZS12YWx1ZS9nZW9uYW1lLXZhbHVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBJbnRlZ2VyVmFsdWVDb21wb25lbnQgfSBmcm9tICcuL3Byb3BlcnR5L2ludGVnZXItdmFsdWUvaW50ZWdlci12YWx1ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW50ZXJ2YWxWYWx1ZUNvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHkvaW50ZXJ2YWwtdmFsdWUvaW50ZXJ2YWwtdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IExpbmtWYWx1ZUNvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHkvbGluay12YWx1ZS9saW5rLXZhbHVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMaXN0VmFsdWVDb21wb25lbnQgfSBmcm9tICcuL3Byb3BlcnR5L2xpc3QtdmFsdWUvbGlzdC12YWx1ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dFZhbHVlQXNIdG1sQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9wZXJ0eS90ZXh0LXZhbHVlL3RleHQtdmFsdWUtYXMtaHRtbC90ZXh0LXZhbHVlLWFzLWh0bWwuY29tcG9uZW50JztcbmltcG9ydCB7IFRleHRWYWx1ZUFzU3RyaW5nQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9wZXJ0eS90ZXh0LXZhbHVlL3RleHQtdmFsdWUtYXMtc3RyaW5nL3RleHQtdmFsdWUtYXMtc3RyaW5nLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZXh0VmFsdWVBc1htbENvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHkvdGV4dC12YWx1ZS90ZXh0LXZhbHVlLWFzLXhtbC90ZXh0LXZhbHVlLWFzLXhtbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dGZpbGVWYWx1ZUNvbXBvbmVudCB9IGZyb20gJy4vcHJvcGVydHkvdGV4dGZpbGUtdmFsdWUvdGV4dGZpbGUtdmFsdWUuY29tcG9uZW50JztcbmltcG9ydCB7IFVyaVZhbHVlQ29tcG9uZW50IH0gZnJvbSAnLi9wcm9wZXJ0eS91cmktdmFsdWUvdXJpLXZhbHVlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBbm5vdGF0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9yZXNvdXJjZS9hbm5vdGF0aW9uL2Fubm90YXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IEF1ZGlvQ29tcG9uZW50IH0gZnJvbSAnLi9yZXNvdXJjZS9hdWRpby9hdWRpby5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vcmVzb3VyY2UvY29sbGVjdGlvbi9jb2xsZWN0aW9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEZGRDb21wb25lbnQgfSBmcm9tICcuL3Jlc291cmNlL2RkZC9kZGQuY29tcG9uZW50JztcbmltcG9ydCB7IERvY3VtZW50Q29tcG9uZW50IH0gZnJvbSAnLi9yZXNvdXJjZS9kb2N1bWVudC9kb2N1bWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlua09iakNvbXBvbmVudCB9IGZyb20gJy4vcmVzb3VyY2UvbGluay1vYmovbGluay1vYmouY29tcG9uZW50JztcbmltcG9ydCB7IE1vdmluZ0ltYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9yZXNvdXJjZS9tb3ZpbmctaW1hZ2UvbW92aW5nLWltYWdlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPYmplY3RDb21wb25lbnQgfSBmcm9tICcuL3Jlc291cmNlL29iamVjdC9vYmplY3QuY29tcG9uZW50JztcbmltcG9ydCB7IFJlZ2lvbkNvbXBvbmVudCB9IGZyb20gJy4vcmVzb3VyY2UvcmVnaW9uL3JlZ2lvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3RpbGxJbWFnZUNvbXBvbmVudCB9IGZyb20gJy4vcmVzb3VyY2Uvc3RpbGwtaW1hZ2Uvc3RpbGwtaW1hZ2UuY29tcG9uZW50JztcbmltcG9ydCB7IFRleHRDb21wb25lbnQgfSBmcm9tICcuL3Jlc291cmNlL3RleHQvdGV4dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tcGFyZVZpZXdDb21wb25lbnQgfSBmcm9tICcuL3ZpZXcvY29tcGFyZS12aWV3L2NvbXBhcmUtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgR3JhcGhWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi92aWV3L2dyYXBoLXZpZXcvZ3JhcGgtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgR3JpZFZpZXdDb21wb25lbnQgfSBmcm9tICcuL3ZpZXcvZ3JpZC12aWV3L2dyaWQtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTGlzdFZpZXdDb21wb25lbnQgfSBmcm9tICcuL3ZpZXcvbGlzdC12aWV3L2xpc3Qtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUHJvcGVydGllc1ZpZXdDb21wb25lbnQgfSBmcm9tICcuL3ZpZXcvcHJvcGVydGllcy12aWV3L3Byb3BlcnRpZXMtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVzb3VyY2VWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi92aWV3L3Jlc291cmNlLXZpZXcvcmVzb3VyY2Utdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFibGVWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi92aWV3L3RhYmxlLXZpZXcvdGFibGUtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VhcmNoUmVzdWx0c0NvbXBvbmVudCB9IGZyb20gJy4vdmlldy9zZWFyY2gtcmVzdWx0cy9zZWFyY2gtcmVzdWx0cy5jb21wb25lbnQnO1xuXG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgS3VpQ29yZU1vZHVsZSxcbiAgICAgICAgS3VpQWN0aW9uTW9kdWxlLFxuICAgICAgICBNYXRBdXRvY29tcGxldGVNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgTWF0Q2FyZE1vZHVsZSxcbiAgICAgICAgTWF0Q2hlY2tib3hNb2R1bGUsXG4gICAgICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsXG4gICAgICAgIE1hdEV4cGFuc2lvbk1vZHVsZSxcbiAgICAgICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSxcbiAgICAgICAgTWF0SWNvbk1vZHVsZSxcbiAgICAgICAgTWF0TGlzdE1vZHVsZSxcbiAgICAgICAgTWF0TmF0aXZlRGF0ZU1vZHVsZSxcbiAgICAgICAgTWF0U2xpZGVUb2dnbGVNb2R1bGUsXG4gICAgICAgIE1hdFRhYnNNb2R1bGUsXG4gICAgICAgIE1hdFRvb2xiYXJNb2R1bGUsXG4gICAgICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIEZsZXhMYXlvdXRNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBbm5vdGF0aW9uQ29tcG9uZW50LFxuICAgICAgICBBdWRpb0NvbXBvbmVudCxcbiAgICAgICAgQ29sbGVjdGlvbkNvbXBvbmVudCxcbiAgICAgICAgRGRkQ29tcG9uZW50LFxuICAgICAgICBEb2N1bWVudENvbXBvbmVudCxcbiAgICAgICAgTGlua09iakNvbXBvbmVudCxcbiAgICAgICAgTW92aW5nSW1hZ2VDb21wb25lbnQsXG4gICAgICAgIE9iamVjdENvbXBvbmVudCxcbiAgICAgICAgUmVnaW9uQ29tcG9uZW50LFxuICAgICAgICBTdGlsbEltYWdlQ29tcG9uZW50LFxuICAgICAgICBUZXh0Q29tcG9uZW50LFxuICAgICAgICBUZXh0VmFsdWVBc0h0bWxDb21wb25lbnQsXG4gICAgICAgIFRleHRWYWx1ZUFzU3RyaW5nQ29tcG9uZW50LFxuICAgICAgICBUZXh0VmFsdWVBc1htbENvbXBvbmVudCxcbiAgICAgICAgVGV4dGZpbGVWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgRGF0ZVZhbHVlQ29tcG9uZW50LFxuICAgICAgICBJbnRlZ2VyVmFsdWVDb21wb25lbnQsXG4gICAgICAgIENvbG9yVmFsdWVDb21wb25lbnQsXG4gICAgICAgIERlY2ltYWxWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgVXJpVmFsdWVDb21wb25lbnQsXG4gICAgICAgIEJvb2xlYW5WYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgR2VvbWV0cnlWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgR2VvbmFtZVZhbHVlQ29tcG9uZW50LFxuICAgICAgICBJbnRlcnZhbFZhbHVlQ29tcG9uZW50LFxuICAgICAgICBMaXN0VmFsdWVDb21wb25lbnQsXG4gICAgICAgIExpbmtWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgRXh0ZXJuYWxSZXNWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgTGlzdFZpZXdDb21wb25lbnQsXG4gICAgICAgIEdyaWRWaWV3Q29tcG9uZW50LFxuICAgICAgICBUYWJsZVZpZXdDb21wb25lbnQsXG4gICAgICAgIFJlc291cmNlVmlld0NvbXBvbmVudCxcbiAgICAgICAgQ29tcGFyZVZpZXdDb21wb25lbnQsXG4gICAgICAgIEdyYXBoVmlld0NvbXBvbmVudCxcbiAgICAgICAgUHJvcGVydGllc1ZpZXdDb21wb25lbnQsXG4gICAgICAgIFNlYXJjaFJlc3VsdHNDb21wb25lbnRcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcblxuICAgICAgICBBbm5vdGF0aW9uQ29tcG9uZW50LFxuICAgICAgICBBdWRpb0NvbXBvbmVudCxcbiAgICAgICAgQ29sbGVjdGlvbkNvbXBvbmVudCxcbiAgICAgICAgRGRkQ29tcG9uZW50LFxuICAgICAgICBEb2N1bWVudENvbXBvbmVudCxcbiAgICAgICAgTGlua09iakNvbXBvbmVudCxcbiAgICAgICAgTW92aW5nSW1hZ2VDb21wb25lbnQsXG4gICAgICAgIE9iamVjdENvbXBvbmVudCxcbiAgICAgICAgUmVnaW9uQ29tcG9uZW50LFxuICAgICAgICBTdGlsbEltYWdlQ29tcG9uZW50LFxuICAgICAgICBUZXh0Q29tcG9uZW50LFxuICAgICAgICBUZXh0VmFsdWVBc0h0bWxDb21wb25lbnQsXG4gICAgICAgIFRleHRWYWx1ZUFzU3RyaW5nQ29tcG9uZW50LFxuICAgICAgICBUZXh0VmFsdWVBc1htbENvbXBvbmVudCxcbiAgICAgICAgVGV4dGZpbGVWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgRGF0ZVZhbHVlQ29tcG9uZW50LFxuICAgICAgICBJbnRlZ2VyVmFsdWVDb21wb25lbnQsXG4gICAgICAgIENvbG9yVmFsdWVDb21wb25lbnQsXG4gICAgICAgIERlY2ltYWxWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgVXJpVmFsdWVDb21wb25lbnQsXG4gICAgICAgIEJvb2xlYW5WYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgR2VvbWV0cnlWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgR2VvbmFtZVZhbHVlQ29tcG9uZW50LFxuICAgICAgICBJbnRlcnZhbFZhbHVlQ29tcG9uZW50LFxuICAgICAgICBMaXN0VmFsdWVDb21wb25lbnQsXG4gICAgICAgIExpbmtWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgRXh0ZXJuYWxSZXNWYWx1ZUNvbXBvbmVudCxcbiAgICAgICAgTGlzdFZpZXdDb21wb25lbnQsXG4gICAgICAgIEdyaWRWaWV3Q29tcG9uZW50LFxuICAgICAgICBUYWJsZVZpZXdDb21wb25lbnQsXG4gICAgICAgIFJlc291cmNlVmlld0NvbXBvbmVudCxcbiAgICAgICAgQ29tcGFyZVZpZXdDb21wb25lbnQsXG4gICAgICAgIEdyYXBoVmlld0NvbXBvbmVudCxcbiAgICAgICAgUHJvcGVydGllc1ZpZXdDb21wb25lbnQsXG4gICAgICAgIFNlYXJjaFJlc3VsdHNDb21wb25lbnRcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEt1aVZpZXdlck1vZHVsZSB7XG59XG4iXX0=