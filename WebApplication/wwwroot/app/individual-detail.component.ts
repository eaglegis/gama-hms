import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Individual }        from './individual';

import { Organisation }                from './organisation';
import { GenericService }         from './generic.service';

import { FileUploader, FileSelectDirective, FileDropDirective } from 'ng2-file-upload';

const imageUploadUrl = 'api/FileAttachment';

@Component({
  selector: 'my-individual-detail',
  templateUrl: 'app/individual-detail.component.html',
  styleUrls: ['app/edit-detail.component.css']
})
export class IndividualDetailComponent implements OnInit {
  individual: Individual;
  organisations: Organisation[];

  public uploader:FileUploader = new FileUploader({url: imageUploadUrl});
  public hasBaseDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }


  constructor(
    private individualService: GenericService<Individual>,
    private organisationService: GenericService<Organisation>,
    private route: ActivatedRoute) {
      this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
          console.log("ImageUpload:uploaded:", item, response, status);
          console.log("id: " + response);

          this.individual.profileImageId = response;
      };
      this.uploader.onCompleteAll =  () => {
          console.log("ImageUpload:All uploaded");
      };
  }

  ngOnInit(): void {
    this.organisationService
      .getAll(Organisation.url)
      .then(organisations => this.organisations = organisations);
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      if(id){
        this.individualService.get(Individual.url, id)
          .then(individual => this.individual = individual);
      } else
      {
        this.individual = new Individual();
      }
    });
  }

  save(): void {
    this.individual = this.trimIndividual(this.individual);

    if (!this.individual.firstName || !this.individual.lastName) { return; }

    if(this.individual.id === undefined){
      this.individualService.create(Individual.url, this.individual)
        .then(this.goBack);
    } else {
      this.individualService.update(Individual.url, this.individual)
        .then(this.goBack);
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


  goBack(): void {
    window.history.back();
  }
}
