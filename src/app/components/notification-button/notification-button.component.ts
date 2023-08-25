import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { faBell, faRing } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-notification-button',
  templateUrl: './notification-button.component.html',
  styleUrls: ['./notification-button.component.css'],
})
export class NotificationButtonComponent implements OnInit {
  bell = faBell

  permission: string = 'none'

  notify: boolean = false

  ngOnInit() {}

  closeNotify() {
    this.notify = false
  }

  showNotify() {
    this.notify = true
  }

  confirmNotifcation() {
    this.notify = false
    if (!('Notification' in window)) {
      alert('This browser does not support notifications.')
    } else Notification.requestPermission()
  }
}
