import { Component, OnInit } from '@angular/core';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isBusy: boolean;

  constructor(private loadingService: LoadingService) {}
  
  ngOnInit() {
    this.loadingService.getState()
    .subscribe(state => this.isBusy = state)
  }
  
}
