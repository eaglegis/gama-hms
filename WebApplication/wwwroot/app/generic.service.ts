import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { ModelBase } from './model-base';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GenericService<T extends ModelBase> {

  private headers = new Headers({'Content-Type': 'application/json'});
//  private url = 'api/';// + T.url3;  // URL to web api

  constructor(private http: Http) {
  }

  getAll(url:string): Promise<T[]> {
    return this.http.get(url)
               .toPromise()
               .then(response => response.json() as T[])
               .catch(this.handleError);
  }

  get(url:string, id: number): Promise<T> {
    return this.getAll(url)
               .then(items => items.find(item => item.id === id));
  }

  delete(url:string, id: number): Promise<void> {
    return this.http.delete(`${url}/${id}`, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(url:string, item:T): Promise<T> {
    return this.http
      .post(url, JSON.stringify(item
      ), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(url:string, item: T): Promise<T> {
    return this.http
      .put(`${url}/${item.id}`, JSON.stringify(item), {headers: this.headers})
      .toPromise()
      .then(() => item)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
