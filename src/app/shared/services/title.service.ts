import { Injectable } from '@angular/core';
import { Title, RawTitle } from '../models/title';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class TitleService {

  constructor(private apiService: ApiService) { }

  getAll(): Observable<Title[]> {
    return this.apiService.get('title')
    .pipe(map(response => response.data))
    .pipe(map((titles: RawTitle[]) => titles.map(title => new Title().deserialize(title))))
  };

}
