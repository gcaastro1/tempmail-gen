import { Component, Input, OnInit } from '@angular/core'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { Clipboard } from '@angular/cdk/clipboard'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements OnInit {
  clipboardIcon = faClipboard

  showContent = false

  @Input()
  address: string | undefined = ''

  constructor(private api: ApiService, private clipboard: Clipboard) {}

  ngOnInit() {}

  ngOnChanges() {}

  copyEmail() {
    this.clipboard.copy(this.address!)
    this.showContent = true
    setTimeout(() => {
      this.showContent = false
    }, 1000)
  }
}
