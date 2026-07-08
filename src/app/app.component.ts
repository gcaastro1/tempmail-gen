import { Component, OnInit } from '@angular/core';
import { StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'dropmail-challenge';
  
  showNotificationButton = true;

  constructor(public state: StateService) {}

  ngOnInit() {
    if (
      Notification.permission === 'granted' ||
      Notification.permission === 'denied'
    ) {
      this.showNotificationButton = false;
    }
    
    this.state.init();
  }
}
