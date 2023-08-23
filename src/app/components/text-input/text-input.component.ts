import { Component, OnInit, inject, untracked } from '@angular/core'
import { FormControl } from '@angular/forms'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { Clipboard } from '@angular/cdk/clipboard'
import { Apollo } from 'apollo-angular'
import { POST_SESSION } from 'src/app/graphql/graphql.queries'
import { sessionData } from 'src/app/common/apiHelper'
import { SessionProps } from 'src/app/interfaces/api.interfaces'

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
})
export class TextInputComponent implements OnInit {
  clipboardIcon = faClipboard

  showContent = false

  session: SessionProps | undefined
  error: any

  email = new FormControl({ value: '', disabled: true })

  private clipboard = inject(Clipboard)

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    const id = localStorage.getItem('@DropMail:ID')

    /* if (!id) this.createSession()
    else return */
  }

  copyEmail() {
    this.clipboard.copy(this.email.value!)
    this.showContent = true
    setTimeout(() => {
      this.showContent = false
    }, 1000)
  }

  createSession() {
    this.apollo
      .mutate({
        mutation: POST_SESSION,
      })
      .subscribe(({ data }) => {
        this.session = sessionData(data)
        this.email.setValue(this.session.address)
        localStorage.setItem('@DropMail:ID', this.session.id),
          (error: unknown) => {
            console.error(error)
          }
      })
  }

  getSession() {}
}
