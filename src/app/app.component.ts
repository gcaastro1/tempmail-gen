import { Component, OnInit } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { SessionProps } from './interfaces/api.interfaces'

import {
  GET_ALL_SESSIONS,
  GET_USER_SESSION,
  POST_SESSION,
} from './graphql/graphql.queries'

import { mailData, sessionData } from './common/apiHelper'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'dropmail-challenge'

  session: any

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    const id = localStorage.getItem('@DropMail:ID')

    if (!!id) this.getSession()
    else this.createSession()

    console.log(new Date('2023-08-23T15:49:44+00:00'))
  }

  createSession() {
    this.apollo
      .mutate({
        mutation: POST_SESSION,
        errorPolicy: 'all',
      })
      .subscribe(({ data }) => {
        localStorage.setItem('@DropMail:ID', sessionData(data).id),
          (error: unknown) => {
            console.error(error)
          }
      })
  }

  getSession() {
    const id = localStorage.getItem('@DropMail:ID')

    this.apollo
      .watchQuery({
        query: GET_USER_SESSION,
        variables: {
          id: id,
        },
        errorPolicy: 'all',
      })
      .valueChanges.subscribe(({ data }) => {
        this.session = mailData(data)
        console.log(this.session)
        if (!this.session)
          this.createSession(),
            (error: unknown) => {
              console.error(error)
            }
      })
  }

  getAllSessions() {
    const id = localStorage.getItem('@DropMail:ID')

    console.log(id)

    this.apollo
      .watchQuery({
        query: GET_ALL_SESSIONS,
        errorPolicy: 'all',
      })
      .valueChanges.subscribe(({ data }) => {
        console.log(data),
          (error: unknown) => {
            console.error(error)
          }
      })
  }
}
