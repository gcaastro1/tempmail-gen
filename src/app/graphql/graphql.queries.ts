import { gql } from 'apollo-angular'

const POST_SESSION = gql`
  mutation {
    introduceSession {
      id
      expiresAt
      addresses {
        address
      }
      mails {
        rawSize
        fromAddr
        toAddr
        downloadUrl
        text
        headerSubject
      }
    }
  }
`

const GET_USER_SESSION = gql`
  query ($id: ID!) {
    session(id: $id) {
      id
      expiresAt
      addresses {
        address
      }
      mails {
        rawSize
        fromAddr
        toAddr
        downloadUrl
        text
        headerSubject
      }
    }
  }
`

const GET_USER_MAILS = gql`
  query ($id: ID!) {
    session(id: $id) {
      mails {
        id
        fromAddr
        toAddr
        html
        text
        headerSubject
        receivedAt
      }
    }
  }
`

export { POST_SESSION, GET_USER_SESSION, GET_USER_MAILS }
