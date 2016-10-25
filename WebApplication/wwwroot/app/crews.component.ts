import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';


import { Crew }                from './crew';
import { GenericService }         from './generic.service';

@Component({
  selector: 'my-crews',
  templateUrl: 'app/crews.component.html',
  styleUrls:  ['app/edit-detail.component.css']
})

export class CrewsComponent implements OnInit {
  crews: Crew[];

  selectedCrew: Crew = null;

  constructor(
    private crewService: GenericService<Crew>,
    private router: Router) {
     }

  getCrews(): void {
    this.crewService
        .getAll(Crew.url)
        .then(crews => this.crews = crews);
  }

  edit(crew: Crew): void {
    // Copy object
    this.selectedCrew = Object.assign({}, crew);
    this.gotoDetail();
  }

  createNew(): void {
    this.router.navigate(['crews/new']);
  }

  reset(): void {
    this.selectedCrew = null; //new Crew();
  }

  delete(crew: Crew): void {
    this.crewService
        .delete(Crew.url, crew.id)
        .then(() => {
          this.crews = this.crews.filter(i => i !== crew);
          if (this.selectedCrew === crew) { this.selectedCrew = null; }
        });
  }

  ngOnInit(): void {
    this.getCrews();
  }

  onSelect(crew: Crew): void {
    this.selectedCrew = crew;
  }

  gotoDetail(): void {
    this.router.navigate(['/crews', this.selectedCrew.id]);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
