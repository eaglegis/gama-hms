import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Individual }                from './individual';
import { IndividualService }         from './individual.service';

@Component({
  selector: 'my-individuals',
  templateUrl: 'app/individuals.component.html',
  styleUrls:  ['app/individuals.component.css']
})
export class IndividualsComponent implements OnInit {
  individuals: Individual[];
  selectedIndividual: Individual;

  constructor(
    private individualService: IndividualService,
    private router: Router) { }

  getIndividuals(): void {
    this.individualService
        .getIndividuals()
        .then(individuals => this.individuals = individuals);
  }

  add(firstName: string, lastName: string, weightKgs: number, tribe: string, clan: string, village: string): void {
    firstName = firstName.trim();
    lastName = lastName.trim();
    tribe = tribe.trim();
    clan = clan.trim();
    village = village.trim();
    if (!firstName || !lastName) { return; }
    this.individualService.create(firstName, lastName, weightKgs, tribe, clan, village)
      .then(individual => {
        this.individuals.push(individual);
        this.selectedIndividual = null;
      });
  }

  delete(individual: Individual): void {
    this.individualService
        .delete(individual.id)
        .then(() => {
          this.individuals = this.individuals.filter(i => i !== individual);
          if (this.selectedIndividual === individual) { this.selectedIndividual = null; }
        });
  }

  ngOnInit(): void {
    this.getIndividuals();
  }

  onSelect(individual: Individual): void {
    this.selectedIndividual = individual;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedIndividual.id]);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/