import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


import { Organisation }                from './organisation';
import { OrganisationService }         from './organisation.service';

@Component({
  selector: 'my-organisations',
  templateUrl: 'app/organisations.component.html',
  styleUrls:  ['app/organisations.component.css']
})

export class OrganisationsComponent implements OnInit {
  organisations: Organisation[];

  selectedOrganisation: Organisation = null;

  constructor(
    private organisationService: OrganisationService,
    private router: Router) {
     }

  getOrganisations(): void {
    this.organisationService
        .getOrganisations()
        .then(organisations => this.organisations = organisations);
  }

  edit(organisation: Organisation): void {
    // Copy object
    this.selectedOrganisation = Object.assign({}, organisation);
    this.gotoDetail();
  }

  createNew(): void {
    this.router.navigate(['organisations/new']);
  }

  reset(): void {
    this.selectedOrganisation = null; //new Organisation();
  }

  delete(organisation: Organisation): void {
    this.organisationService
        .delete(organisation.id)
        .then(() => {
          this.organisations = this.organisations.filter(i => i !== organisation);
          if (this.selectedOrganisation === organisation) { this.selectedOrganisation = null; }
        });
  }

  ngOnInit(): void {
    this.getOrganisations();
  }

  onSelect(organisation: Organisation): void {
    this.selectedOrganisation = organisation;
  }

  gotoDetail(): void {
    this.router.navigate(['/organisations', this.selectedOrganisation.id]);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
