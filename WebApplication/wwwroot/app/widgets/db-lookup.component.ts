import { Component, Input } from '@angular/core';

@Component({
  selector: 'db-lookup',
  templateUrl: 'app/widgets/db-lookup.component.html'
})

export class DBLookupComponent {
  @Input() datasource;
  @Input() value;
  @Input() display;
}
