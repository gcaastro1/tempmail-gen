import { Component, OnDestroy, OnInit } from '@angular/core'
import { AddressProps, MailProps } from './interfaces/api.interfaces'

import { Subscription, timer } from 'rxjs'
import { ApiService } from './services/api.service'
import { addressData, mailData, sessionData } from './common/apiHelper'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'dropmail-challenge'

  session: AddressProps | null = null
  subscription!: Subscription

  expires: Date | null = new Date(
    localStorage.getItem('@DropMail:Expires' || null)!
  )

  mails: MailProps[] = []

  mailsCount: number = 0

  selectedMail: MailProps | null = null

  showButton: boolean = true

  id = localStorage.getItem('@DropMail:ID' || null)

  constructor(private api: ApiService) {}

  ngOnInit() {
    if (
      Notification.permission === 'granted' ||
      Notification.permission === 'denied'
    ) {
      this.showButton = false
    }
    if (!!this.expires) {
      if (!!this.id && this.expires > new Date()) {
        console.log('oi')
        this.getSession()
      } else this.newSession()
    } else this.newSession()

    this.refreshSession()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  newSession() {
    this.api.createSession().subscribe(({ data }) => {
      this.session = sessionData(data)
      this.mails = []
      this.selectedMail = null
      this.expires = new Date(this.session.expiresAt)

      localStorage.setItem('@DropMail:ID', this.session.id)
      localStorage.setItem('@DropMail:Expires', this.session.expiresAt),
        (error: unknown) => {
          console.error(error)
        }
    })
  }

  getSession() {
    this.api.getSession().valueChanges.subscribe(({ data }) => {
      this.session = addressData(data)
      this.mails = mailData({ session: { mails: this.session?.mails } })
      this.expires = new Date(localStorage.getItem('@DropMail:Expires')!)
      if (!this.session)
        this.newSession(),
          (error: unknown) => {
            console.error(error)
          }
    })
  }

  getMails() {
    this.api.getMails().valueChanges.subscribe(({ data }) => {
      this.mails = mailData(data)
      if (this.mails.length > this.mailsCount) {
        if (this.mails.length > this.mailsCount + 1) {
          this.mailsCount = this.mails.length
        } else {
          this.mailsCount++
          new Notification('You have new email.')
        }
      }
    })
  }

  refreshSession() {
    this.subscription = timer(0, 15000).subscribe(() => {
      if (!!this.session) {
        const date = new Date(this.session.expiresAt)
        if (date <= new Date()) this.newSession()
        else {
          this.api.getMails().refetch()
          this.getMails()
        }
      }
    })
  }

  getSelectedMail(eventData: { mail: MailProps }) {
    this.selectedMail = eventData.mail
  }
}
