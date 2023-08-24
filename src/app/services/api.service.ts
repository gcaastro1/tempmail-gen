import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import {
  POST_SESSION,
  GET_USER_SESSION,
  GET_USER_MAILS,
} from '../graphql/graphql.queries'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  session!: Observable<any>

  constructor(private apollo: Apollo) {}

  createSession() {
    return this.apollo.mutate({
      mutation: POST_SESSION,
      errorPolicy: 'all',
    })
  }

  getSession() {
    const id = localStorage.getItem('@DropMail:ID')
    return this.apollo.watchQuery({
      query: GET_USER_SESSION,
      variables: {
        id: id,
      },
      errorPolicy: 'all',
    })
  }

  getMails() {
    const id = localStorage.getItem('@DropMail:ID')
    return this.apollo.watchQuery({
      query: GET_USER_MAILS,
      variables: {
        id: id,
      },
      errorPolicy: 'all',
    })
  }
}
