import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Organisation } from './organisation';

@Injectable()
export class OrganisationService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private organisationsUrl = 'api/organisation';  // URL to web api

  constructor(private http: Http) { }

  getOrganisations(): Promise<Organisation[]> {
    return this.http.get(this.organisationsUrl)
               .toPromise()
               .then(response => response.json() as Organisation[])
               .catch(this.handleError);
  }

  getOrganisation(id: number): Promise<Organisation> {
    return this.getOrganisations()
               .then(organisations => organisations.find(organisation => organisation.id === id));
  }

  delete(id: number): Promise<void> {
    let url = `${this.organisationsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(organisation:Organisation): Promise<Organisation> {
    return this.http
      .post(this.organisationsUrl, JSON.stringify(organisation
      ), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(organisation: Organisation): Promise<Organisation> {
    const url = `${this.organisationsUrl}/${organisation.id}`;
    return this.http
      .put(url, JSON.stringify(organisation), {headers: this.headers})
      .toPromise()
      .then(() => organisation)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
