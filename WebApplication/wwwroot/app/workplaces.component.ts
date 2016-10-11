import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


import { WorkPlace }                from './workPlace';
import { GenericService }         from './generic.service';

@Component({
  selector: 'my-workPlaces',
  templateUrl: 'app/workPlaces.component.html',
  styleUrls:  ['app/edit-detail.component.css']
})

export class WorkPlacesComponent implements OnInit {
  workPlaces: WorkPlace[];

  selectedWorkPlace: WorkPlace = null;

  constructor(
    private workPlaceService: GenericService<WorkPlace>,
    private router: Router) {
     }

  getWorkPlaces(): void {
    this.workPlaceService
        .getAll(WorkPlace.url)
        .then(workPlaces => this.workPlaces = workPlaces);
  }

  edit(workPlace: WorkPlace): void {
    // Copy object
    this.selectedWorkPlace = Object.assign({}, workPlace);
    this.gotoDetail();
  }

  createNew(): void {
    this.router.navigate(['workPlaces/new']);
  }

  reset(): void {
    this.selectedWorkPlace = null; //new WorkPlace();
  }

  delete(workPlace: WorkPlace): void {
    this.workPlaceService
        .delete(WorkPlace.url, workPlace.id)
        .then(() => {
          this.workPlaces = this.workPlaces.filter(i => i !== workPlace);
          if (this.selectedWorkPlace === workPlace) { this.selectedWorkPlace = null; }
        });
  }

  ngOnInit(): void {
    this.getWorkPlaces();
  }

  onSelect(workPlace: WorkPlace): void {
    this.selectedWorkPlace = workPlace;
  }

  gotoDetail(): void {
    this.router.navigate(['/workPlaces', this.selectedWorkPlace.id]);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
