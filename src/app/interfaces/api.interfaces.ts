interface SessionProps {
  address: string
  expiresAt: string
  id: string
}

interface MailProps {
  mails: []
  address: string
  expiresAt: string
}

export { SessionProps, MailProps }
