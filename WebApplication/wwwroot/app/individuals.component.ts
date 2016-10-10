import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


import { Individual }                from './individual';
import { GenericService }         from './generic.service';

@Component({
  selector: 'my-individuals',
  templateUrl: 'app/individuals.component.html',
  styleUrls:  ['app/individuals.component.css']
})

export class IndividualsComponent implements OnInit {
  individuals: Individual[];

  selectedIndividual: Individual = null;

  constructor(
    private individualService: GenericService<Individual>,
    private router: Router) {
     }

  getIndividuals(): void {
    this.individualService
        .getAll(Individual.url)
        .then(individuals => this.individuals = individuals);
  }

  edit(individual: Individual): void {
    // Copy object
    this.selectedIndividual = Object.assign({}, individual);
    this.gotoDetail();
  }

  createNew(): void {
    this.router.navigate(['/individuals/new']);
  }

  reset(): void {
    this.selectedIndividual = null; //new Individual();
  }

  delete(individual: Individual): void {
    this.individualService
        .delete(Individual.url, individual.id)
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
    this.router.navigate(['/individuals', this.selectedIndividual.id]);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
