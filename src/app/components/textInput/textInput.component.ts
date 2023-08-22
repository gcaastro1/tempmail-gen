import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { Clipboard } from '@angular/cdk/clipboard'

@Component({
  selector: 'app-textInput',
  templateUrl: './textInput.component.html',
  styleUrls: ['./textInput.component.css'],
})
export class TextInputComponent implements OnInit {
  clipboardIcon = faClipboard

  showContent = false

  constructor(private clipboard: Clipboard) {}

  ngOnInit() {}

  email = new FormControl('teste@email.com')

  copyEmail() {
    this.clipboard.copy(this.email.value!)
    this.showContent = true
    setTimeout(() => {
      this.showContent = false
    }, 1000)
  }
}
