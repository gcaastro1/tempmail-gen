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

  selectedMail: MailProps | null = null

  id = localStorage.getItem('@DropMail:ID' || null)

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.mails = [
      {
        id: 'mail.id',
        to: 'mcleberson@mail.com',
        from: 'gcaastro1@gmail.com',
        text: 'Mussum Ipsum, cacilds vidis litro abertis.  Delegadis gente finis, bibendum egestas augue arcu ut est. Paisis, filhis, espiritis santis. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.',
        html: 'mail.html',
        subject: 'TITULO DO EMAIL',
        receivedAt: '2021-02-18T01:41:50+00:00',
      },
      {
        id: 'mail.id',
        to: 'mcleberson@mail.com',
        from: 'gcaastro1@gmail.com',
        text: 'Mussum Ipsum, cacilds vidis litro abertis.  Delegadis gente finis, bibendum egestas augue arcu ut est. Paisis, filhis, espiritis santis. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.',
        html: 'mail.html',
        subject: 'TITULO DO EMAIL 2',
        receivedAt: '2021-02-18T01:41:50+00:00',
      },
      {
        id: 'mail.id',
        to: 'mcleberson@mail.com',
        from: 'gcaastro1@gmail.com',
        text: 'Mussum Ipsum, cacilds vidis litro abertis.  Delegadis gente finis, bibendum egestas augue arcu ut est. Paisis, filhis, espiritis santis. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.',
        html: 'mail.html',
        subject: 'TITULO DO EMAIL 3',
        receivedAt: '2021-02-18T01:41:50+00:00',
      },
      {
        id: 'mail.id',
        to: 'mcleberson@mail.com',
        from: 'gcaastro1@gmail.com',
        text: 'Mussum Ipsum, cacilds vidis litro abertis.  Delegadis gente finis, bibendum egestas augue arcu ut est. Paisis, filhis, espiritis santis. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.',
        html: 'mail.html',
        subject: 'TITULO DO EMAIL 3',
        receivedAt: '2021-02-18T01:41:50+00:00',
      },
      {
        id: 'mail.id',
        to: 'mcleberson@mail.com',
        from: 'gcaastro1@gmail.com',
        text: 'Mussum Ipsum, cacilds vidis litro abertis.  Delegadis gente finis, bibendum egestas augue arcu ut est. Paisis, filhis, espiritis santis. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.',
        html: 'mail.html',
        subject: 'TITULO DO EMAIL 3',
        receivedAt: '2021-02-18T01:41:50+00:00',
      },
      {
        id: 'mail.id',
        to: 'mcleberson@mail.com',
        from: 'gcaastro1@gmail.com',
        text: 'Mussum Ipsum, cacilds vidis litro abertis.  Delegadis gente finis, bibendum egestas augue arcu ut est. Paisis, filhis, espiritis santis. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.',
        html: 'mail.html',
        subject: 'TITULO DO EMAIL 3',
        receivedAt: '2021-02-18T01:41:50+00:00',
      },
      {
        id: 'mail.id',
        to: 'mcleberson@mail.com',
        from: 'gcaastro1@gmail.com',
        text: 'Mussum Ipsum, cacilds vidis litro abertis.  Delegadis gente finis, bibendum egestas augue arcu ut est. Paisis, filhis, espiritis santis. Todo mundo vê os porris que eu tomo, mas ninguém vê os tombis que eu levo! Posuere libero varius. Nullam a nisl ut ante blandit hendrerit. Aenean sit amet nisi.',
        html: 'mail.html',
        subject: 'TITULO DO EMAIL 3',
        receivedAt: '2021-02-18T01:41:50+00:00',
      },
    ]
    /* if (!!this.expires) {
      if (!!this.id && this.expires > new Date()) {
        this.getSession()
      } else this.newSession()
    } else this.newSession()

    this.refreshSession() */
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
