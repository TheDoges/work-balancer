import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class NodesService {

  constructor(private apiService: ApiService) { }

  getAll(): Observable<Node[]> {
    return this.apiService
    .get(`nodes`);
  }

  add(node: Node): Observable<Node> {
    return this.apiService
    .post(
      `nodes`,
      node
    );
  }

  update(node: Node): Observable<Node> {
    return this.apiService
    .put(
      `node/`,
      node
    );
  }

  delete(node: Node): Observable<Node> {
    return this.apiService
    .delete(`node/`);
  }

}
