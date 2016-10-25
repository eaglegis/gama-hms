import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Individual }        from './individual';
import { Organisation }        from './organisation';
import { Crew }        from './crew';
import { Department }        from './department';
import { WorkPlace }        from './workplace';
import { GenericService } from './generic.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  individuals: Individual[] = [];
  organisations: Organisation[] = [];
  crews: Crew[] = [];
  departments: Department[] = [];
  workPlaces: WorkPlace[] = [];

  constructor(
    private router: Router,
    private individualService: GenericService<Individual>,
    private organisationService: GenericService<Organisation>,
    private crewService: GenericService<Crew>,
    private departmentService: GenericService<Department>,
    private workPlaceService: GenericService<WorkPlace>) {
  }

  ngOnInit(): void {
    this.individualService.getAll(Individual.url)
      .then(individuals => this.individuals = individuals);
    this.organisationService.getAll(Organisation.url)
      .then(organisations => this.organisations = organisations);
    this.crewService.getAll(Crew.url)
      .then(crews => this.crews = crews);
    this.departmentService.getAll(Department.url)
      .then(departments => this.departments = departments);
    this.workPlaceService.getAll(WorkPlace.url)
      .then(workPlaces => this.workPlaces = workPlaces);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
