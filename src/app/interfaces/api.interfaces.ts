interface SessionProps {
  address: string
  expiresAt: string
  id: string
  mails: []
}

interface AddressProps {
  mails: MailProps[]
  address: string
  expiresAt: string
  id: string
}

interface MailProps {
  id: string
  toAddr: string
  fromAddr: string
  text: string
  html: string
  headerSubject: string
  receivedAt: string
}

export { SessionProps, AddressProps, MailProps }
