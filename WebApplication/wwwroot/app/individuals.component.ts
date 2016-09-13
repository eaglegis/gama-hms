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

  editedIndividual: Individual = new Individual();

  constructor(
    private individualService: IndividualService,
    private router: Router) { }

  getIndividuals(): void {
    this.individualService
        .getIndividuals()
        .then(individuals => this.individuals = individuals);
  }

// individualFirstName.value, individualLastName.value, individualWeightKgs.value, individualTribe.value, individualClan.value, individualVillage.value
// firstName: string, lastName: string, weightKgs: number, tribe: string, clan: string, village: string
  add(): void {
    if(this.editedIndividual.firstName){
      this.editedIndividual.firstName = this.editedIndividual.firstName.trim();      
    }
    if(this.editedIndividual.lastName){
      this.editedIndividual.lastName = this.editedIndividual.lastName.trim();
    }
    if(this.editedIndividual.tribe){
      this.editedIndividual.tribe = this.editedIndividual.tribe.trim();
    }
    if(this.editedIndividual.clan){
      this.editedIndividual.clan = this.editedIndividual.clan.trim();
    }
    if(this.editedIndividual.village){
      this.editedIndividual.village = this.editedIndividual.village.trim();
    }
    if (!this.editedIndividual.firstName || !this.editedIndividual.lastName) { return; }
    this.individualService.create(this.editedIndividual)
      .then(individual => {
        this.individuals.push(individual);
        this.selectedIndividual = null;
        this.editedIndividual = new Individual();
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