import { Component, Input, OnInit } from '@angular/core'
import { MailProps } from 'src/app/interfaces/api.interfaces'

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.css'],
})
export class MailBoxComponent implements OnInit {
  constructor() {}

  @Input()
  mail!: MailProps

  ngOnInit() {}
}
