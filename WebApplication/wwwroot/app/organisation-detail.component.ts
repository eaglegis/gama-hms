import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Organisation }        from './organisation';
//import { OrganisationService } from './organisation.service';
import { GenericService } from './generic.service';


@Component({
  selector: 'my-organisation-detail',
  templateUrl: 'app/organisation-detail.component.html',
  styleUrls: ['app/organisation-detail.component.css']
})
export class OrganisationDetailComponent implements OnInit {
  organisation: Organisation;

  constructor(
    private organisationService: GenericService<Organisation>,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      if(id){
        this.organisationService.get(Organisation.url, id)
          .then(organisation => this.organisation = organisation);
      } else
      {
        this.organisation = new Organisation();
      }
    });
  }

  save(): void {
    this.organisation = this.trimOrganisation(this.organisation);

    if (!this.organisation.name) { return; }

    if(this.organisation.id === undefined){
      this.organisationService.create(Organisation.url, this.organisation)
        .then(this.goBack);
    } else {
      this.organisationService.update(Organisation.url, this.organisation)
        .then(this.goBack);
    }
  }

  trimOrganisation(organisation: Organisation):Organisation{
    if(organisation.name){
      organisation.name = organisation.name.trim();
    }

    return organisation;
  }


  goBack(): void {
    window.history.back();
  }
}
