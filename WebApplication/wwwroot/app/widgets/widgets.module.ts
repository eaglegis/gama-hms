import {NgModule} from "@angular/core";
import {DBLookupComponent} from "./db-lookup.component";
import {CommonModule} from "@angular/common";
@NgModule({
    imports:[CommonModule],
    declarations:[DBLookupComponent],
    exports:[DBLookupComponent, CommonModule]
})
export class WidgetModule{}
