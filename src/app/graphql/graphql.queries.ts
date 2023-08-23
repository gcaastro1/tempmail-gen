import { gql } from 'apollo-angular'

const POST_SESSION = gql`
  mutation {
    introduceSession {
      id
      expiresAt
      addresses {
        address
      }
    }
  }
`

const GET_USER_SESSION = gql`
  query ($id: ID!) {
    session(id: $id) {
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

const GET_ALL_SESSIONS = gql`
  query {
    sessions {
      id
      expiresAt
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

export { POST_SESSION, GET_USER_SESSION, GET_ALL_SESSIONS }
