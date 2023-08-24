import {
  AddressProps,
  MailProps,
  SessionProps,
} from '../interfaces/api.interfaces'

export const sessionData = (data: any): SessionProps => {
  return {
    id: data.introduceSession.id,
    address: data.introduceSession.addresses[0].address,
    expiresAt: data.introduceSession.expiresAt,
    mails: data.introduceSession.mails,
  }
}

export const addressData = (data: any): AddressProps | null => {
  if (data.session) {
    return {
      expiresAt: data.session.expiresAt,
      address: data.session.addresses[0].address,
      mails: data.session.mails,
      id: data.session.id,
    }
  } else {
    return null
  }
}

export const mailData = (data: any): MailProps[] => {
  const mails: any[] = []
  if (!!data.session.mails) {
    data.session.mails.forEach((mail: any) => {
      mails.push({
        id: mail.id,
        to: mail.toAddr,
        from: mail.fromAddr,
        text: mail.text,
        html: mail.html,
        subject: mail.headerSubject,
        receivedAt: mail.receivedAt,
      })
    })
  }

  console.log(mails)

  return mails
}
