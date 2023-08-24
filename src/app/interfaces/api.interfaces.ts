interface SessionProps {
  address: string
  expiresAt: string
  id: string
  mails: []
}

interface AddressProps {
  mails: []
  address: string
  expiresAt: string
  id: string
}

interface MailProps {
  id: string
  to: string
  from: string
  text: string
  html: string
  subject: string
  receivedAt: string
}

export { SessionProps, AddressProps, MailProps }
