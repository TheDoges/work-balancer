import { Injectable } from '@angular/core';
import Class from '../models/class';

@Injectable()
export class ClassService {

  private classes: Class[] = [
    new Class().deserialize({name: 'Bazy danych 1', total: 80}),
    new Class().deserialize({name: 'Bazy danych 2', total: 80})
  ];

  constructor() { }

  getAll(): Class[] {
    return this.classes;
  }
}
