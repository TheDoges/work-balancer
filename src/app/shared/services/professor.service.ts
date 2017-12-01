import { Injectable } from '@angular/core';
import Professor from '../models/professor';

@Injectable()
export class ProfessorService {

  private professors = [
    new Professor().deserialize({name: 'A. Zatwarnicka'}),
    new Professor().deserialize({name: 'K. Zatwarnicki'})
  ];

  constructor() { }

  getAll(): Professor[] {
    return this.professors;
  }

}
