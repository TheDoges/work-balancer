import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Field, RawField } from '../models/field';


@Injectable()
export class FieldService {

  constructor(private apiService: ApiService) { }
  
  getAll(): Observable<Field[]> {
    return this.apiService.get('field')
    .pipe(map(response => response.data))
    .pipe(map((fields: RawField[]) => fields.map(field => new Field().deserialize(field))))
  };

}
