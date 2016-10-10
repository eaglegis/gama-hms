import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Individual }        from './individual';
import { Organisation }        from './organisation';
import { GenericService } from './generic.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  individuals: Individual[] = [];
  organisations: Organisation[] = [];

  constructor(
    private router: Router,
    private individualService: GenericService<Individual>,
    private organisationService: GenericService<Organisation>) {
  }

  ngOnInit(): void {
    this.individualService.getAll(Individual.url)
      .then(individuals => this.individuals = individuals);
      this.organisationService.getAll(Organisation.url)
        .then(organisations => this.organisations = organisations);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
