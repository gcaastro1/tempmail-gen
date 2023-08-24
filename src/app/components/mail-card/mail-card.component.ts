import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { MailProps } from 'src/app/interfaces/api.interfaces'

@Component({
  selector: 'app-mail-card',
  templateUrl: './mail-card.component.html',
  styleUrls: ['./mail-card.component.css'],
})
export class MailCardComponent implements OnInit {
  @Input()
  mail?: MailProps

  @Output()
  selectedMail = new EventEmitter<{ mail: MailProps }>()

  ngOnInit() {}

  selectMail() {
    this.selectedMail.emit({ mail: this.mail! })
  }
}
