import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { faInbox } from '@fortawesome/free-solid-svg-icons'
import { MailProps } from 'src/app/interfaces/api.interfaces'

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css'],
})
export class MailListComponent implements OnInit {
  @Input()
  mails: MailProps[] = []

  @Output()
  selected = new EventEmitter<{ mail: MailProps }>()

  inbox = faInbox

  constructor() {}

  ngOnInit() {}

  onMailSelected(eventData: { mail: MailProps }) {
    this.selected.emit(eventData)
  }
}
