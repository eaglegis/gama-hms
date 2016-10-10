import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { ModelBase } from './model-base';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GenericService<T extends ModelBase> {

  private headers = new Headers({'Content-Type': 'application/json'});
  private url = 'api/';// + T.url3;  // URL to web api
  //private t:T;
  //t.url2();

  constructor(private http: Http) {
//    this.url += typeof(this.dummy);
    console.log(this.url);
  }

  getAll(): Promise<T[]> {
    return this.http.get(this.url)
               .toPromise()
               .then(response => response.json() as T[])
               .catch(this.handleError);
  }

  get(id: number): Promise<T> {
    return this.getAll()
               .then(items => items.find(item => item.id === id));
  }

  delete(id: number): Promise<void> {
    let url = `${this.url}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(item:T): Promise<T> {
    return this.http
      .post(this.url, JSON.stringify(item
      ), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  update(item: T): Promise<T> {
    const url = `${this.url}/${item.id}`;
    return this.http
      .put(url, JSON.stringify(item), {headers: this.headers})
      .toPromise()
      .then(() => item)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
