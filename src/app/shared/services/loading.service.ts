import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class LoadingService {

  constructor() { }

  private isBusy: boolean = false;
  private stateChange: Subject<boolean> = new Subject
  private queue: string[] = [];

  show(key?: string) {
    this.isBusy = true;
    if (key) {
      this.queue.push(key);
    }
    this.stateChange.next(true);
  }

  hide(keyToRemove?: string) {
    this.isBusy = false;
    if (keyToRemove) {
      this.queue = this.queue.filter(key => key !== keyToRemove)
    }
    if (!this.queue.length) {
      this.stateChange.next(false)
    }
  }

  getState(): Observable<boolean> {
    return this.stateChange.asObservable();
  }

}
