import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Individual } from './individual';

@Injectable()
export class IndividualService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private individualsUrl = 'api/individual';  // URL to web api

  constructor(private http: Http) { }

  getIndividuals(): Promise<Individual[]> {
    return this.http.get(this.individualsUrl)
               .toPromise()
               .then(response => response.json() as Individual[])
               .catch(this.handleError);
  }

  getIndividual(id: number): Promise<Individual> {
    return this.getIndividuals()
               .then(individuals => individuals.find(individual => individual.id === id));
  }

  delete(id: number): Promise<void> {
    let url = `${this.individualsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Individual> {
    return this.http
      .post(this.individualsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(individual: Individual): Promise<Individual> {
    const url = `${this.individualsUrl}/${individual.id}`;
    return this.http
      .put(url, JSON.stringify(individual), {headers: this.headers})
      .toPromise()
      .then(() => individual)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
