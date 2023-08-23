import { MailProps, SessionProps } from '../interfaces/api.interfaces'

export const sessionData = (data: any): SessionProps => {
  return {
    id: data.introduceSession.id,
    address: data.introduceSession.addresses[0].address,
    expiresAt: data.introduceSession.expiresAt,
  }
}

export const mailData = (data: any): MailProps | null => {
  console.log(data)

  if (data.session) {
    return {
      expiresAt: data.session.expiresAt,
      address: data.session.addresses[0].address,
      mails: data.session.mails,
    }
  } else {
    return null
  }
}
