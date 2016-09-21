import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { FileUploader } from 'ng2-file-upload';

import { Individual }                from './individual';
import { IndividualService }         from './individual.service';

const imageUploadUrl = 'api/imageUpload';

@Component({
  selector: 'my-individuals',
  templateUrl: 'app/individuals.component.html',
  styleUrls:  ['app/individuals.component.css']
})

export class IndividualsComponent implements OnInit {
  individuals: Individual[];
  selectedIndividual: Individual;

  public uploader:FileUploader = new FileUploader({url: imageUploadUrl});
  public hasBaseDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  editedIndividual: Individual = null;

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
  save(): void {
    this.editedIndividual = this.trimIndividual(this.editedIndividual);

    if (!this.editedIndividual.firstName || !this.editedIndividual.lastName) { return; }

    if(this.editedIndividual.id === undefined){
      this.individualService.create(this.editedIndividual)
        .then(individual => {
          this.individuals.push(individual);
          this.selectedIndividual = null;
          this.editedIndividual = null;
        });

    } else {
      this.individualService.update(this.editedIndividual)
        .then(individual => {
          var index:number = this.individuals.findIndex(i => i.id == individual.id);
          if(index >= 0){
            this.individuals[index] = individual;
          }
          this.selectedIndividual = null;
          this.editedIndividual = null;
        });

    }
  }

  trimIndividual(individual: Individual):Individual{
    if(individual.firstName){
      individual.firstName = individual.firstName.trim();
    }
    if(individual.lastName){
      individual.lastName = individual.lastName.trim();
    }
    if(individual.tribe){
      individual.tribe = individual.tribe.trim();
    }
    if(individual.clan){
      individual.clan = individual.clan.trim();
    }
    if(individual.village){
      individual.village = individual.village.trim();
    }

    return individual;
  }

  edit(individual: Individual): void {
    // Copy object
    this.editedIndividual = Object.assign({}, individual);
  }

  createNew(): void {
    // Copy object
    this.editedIndividual = new Individual();
  }

  reset(): void {
    this.editedIndividual = null; //new Individual();
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
