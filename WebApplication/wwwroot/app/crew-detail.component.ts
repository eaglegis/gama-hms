import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Crew }        from './crew';
//import { CrewService } from './crew.service';
import { GenericService } from './generic.service';


@Component({
  selector: 'my-crew-detail',
  templateUrl: 'app/crew-detail.component.html',
  styleUrls: ['app/edit-detail.component.css']
})
export class CrewDetailComponent implements OnInit {
  crew: Crew;

  constructor(
    private crewService: GenericService<Crew>,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      if(id){
        this.crewService.get(Crew.url, id)
          .then(crew => this.crew = crew);
      } else
      {
        this.crew = new Crew();
      }
    });
  }

  save(): void {
    this.crew = this.trimCrew(this.crew);

    if (!this.crew.name) { return; }

    if(this.crew.id === undefined){
      this.crewService.create(Crew.url, this.crew)
        .then(this.goBack);
    } else {
      this.crewService.update(Crew.url, this.crew)
        .then(this.goBack);
    }
  }

  trimCrew(crew: Crew):Crew{
    if(crew.name){
      crew.name = crew.name.trim();
    }

    return crew;
  }


  goBack(): void {
    window.history.back();
  }
}
