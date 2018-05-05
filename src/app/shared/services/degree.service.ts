import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Degree, RawDegree } from '../models/degree';

@Injectable()
export class DegreeService {

  constructor(private apiService: ApiService) { }

  getAll(): Observable<Degree[]> {
    return this.apiService.get('degree')
    .pipe(map(response => response.data))
    .pipe(map((degrees: RawDegree[]) => degrees.map(degree => new Degree().deserialize(degree))))
  }

}
