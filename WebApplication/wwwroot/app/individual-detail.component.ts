import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Individual }        from './individual';
import { IndividualService } from './individual.service';

@Component({
  selector: 'my-individual-detail',
  templateUrl: 'app/individual-detail.component.html',
  styleUrls: ['app/individual-detail.component.css']
})
export class IndividualDetailComponent implements OnInit {
  individual: Individual;

  constructor(
    private individualService: IndividualService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.individualService.getIndividual(id)
        .then(individual => this.individual = individual);
    });
  }

  save(): void {
    this.individualService.update(this.individual)
      .then(this.goBack);
  }

  goBack(): void {
    window.history.back();
  }
}