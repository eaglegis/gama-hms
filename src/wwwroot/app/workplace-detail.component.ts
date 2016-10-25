import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { WorkPlace }        from './workPlace';
//import { WorkPlaceService } from './workPlace.service';
import { GenericService } from './generic.service';


@Component({
  selector: 'my-workPlace-detail',
  templateUrl: 'app/workPlace-detail.component.html',
  styleUrls: ['app/edit-detail.component.css']
})
export class WorkPlaceDetailComponent implements OnInit {
  workPlace: WorkPlace;

  constructor(
    private workPlaceService: GenericService<WorkPlace>,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      if(id){
        this.workPlaceService.get(WorkPlace.url, id)
          .then(workPlace => this.workPlace = workPlace);
      } else
      {
        this.workPlace = new WorkPlace();
      }
    });
  }

  save(): void {
    this.workPlace = this.trimWorkPlace(this.workPlace);

    if (!this.workPlace.name) { return; }

    if(this.workPlace.id === undefined){
      this.workPlaceService.create(WorkPlace.url, this.workPlace)
        .then(this.goBack);
    } else {
      this.workPlaceService.update(WorkPlace.url, this.workPlace)
        .then(this.goBack);
    }
  }

  trimWorkPlace(workPlace: WorkPlace):WorkPlace{
    if(workPlace.name){
      workPlace.name = workPlace.name.trim();
    }

    return workPlace;
  }


  goBack(): void {
    window.history.back();
  }
}
