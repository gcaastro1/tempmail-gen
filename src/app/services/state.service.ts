import { Injectable, signal, computed, OnDestroy } from '@angular/core';
import { AddressProps, MailProps, SessionProps } from '../interfaces/api.interfaces';
import { ApiService } from './api.service';
import { addressData, mailData, sessionData } from '../common/apiHelper';
import { Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService implements OnDestroy {
  // Signals for application state
  session = signal<AddressProps | SessionProps | null>(null);
  mails = signal<MailProps[]>([]);
  selectedMail = signal<MailProps | null>(null);
  
  // Computed values
  expires = computed(() => {
    const s = this.session();
    if (s && s.expiresAt) return new Date(s.expiresAt);
    const stored = localStorage.getItem('@DropMail:Expires');
    return stored ? new Date(stored) : null;
  });
  
  id = computed(() => {
    const s = this.session();
    return s ? s.id : localStorage.getItem('@DropMail:ID');
  });

  private mailsCount = 0;
  private timerSubscription?: Subscription;

  constructor(private api: ApiService) {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }

  init() {
    const savedExpires = localStorage.getItem('@DropMail:Expires');
    const savedId = localStorage.getItem('@DropMail:ID');

    if (savedExpires && savedId) {
      const expiresDate = new Date(savedExpires);
      if (expiresDate > new Date()) {
        this.fetchSession();
      } else {
        this.newSession();
      }
    } else {
      this.newSession();
    }

    this.startPolling();
  }

  corsError = signal<boolean>(false);

  newSession() {
    this.api.createSession().subscribe({
      next: ({ data }) => {
        try {
          const session = sessionData(data);
          this.session.set(session);
          this.mails.set([]);
          this.selectedMail.set(null);
          this.mailsCount = 0;
          this.corsError.set(false);

          localStorage.setItem('@DropMail:ID', session.id);
          localStorage.setItem('@DropMail:Expires', session.expiresAt);
        } catch (e) {
          console.error('Data error (possibly CORS):', e);
          this.corsError.set(true);
        }
      },
      error: (error) => {
        console.error('Error creating session:', error);
        this.corsError.set(true);
      }
    });
  }

  private fetchSession() {
    this.api.getSession().valueChanges.subscribe({
      next: ({ data }) => {
        try {
          const session = addressData(data);
          if (!session) {
            this.newSession();
            return;
          }
          this.session.set(session);
          this.mails.set(mailData({ session: { mails: session.mails } }));
          this.mailsCount = this.mails().length;
          this.corsError.set(false);
        } catch (e) {
          console.error('Data error (possibly CORS):', e);
          this.corsError.set(true);
        }
      },
      error: (error) => {
        console.error('Error fetching session:', error);
        this.corsError.set(true);
      }
    });
  }

  private fetchMails() {
    this.api.getMails().valueChanges.subscribe({
      next: ({ data }) => {
        try {
          const newMails = mailData(data);
          this.mails.set(newMails);
          
          if (newMails.length > this.mailsCount) {
            if (newMails.length === this.mailsCount + 1 && Notification.permission === 'granted') {
              new Notification('You have new email.');
            }
            this.mailsCount = newMails.length;
          }
          this.corsError.set(false);
        } catch (e) {
          console.error('Data error (possibly CORS):', e);
          this.corsError.set(true);
        }
      },
      error: (error) => {
        console.error('Error fetching mails:', error);
        this.corsError.set(true);
      }
    });
  }

  private startPolling() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = timer(0, 15000).subscribe(() => {
      const currentSession = this.session();
      if (currentSession) {
        const date = new Date(currentSession.expiresAt);
        if (date <= new Date()) {
          this.newSession();
        } else {
          this.api.getMails().refetch();
          this.fetchMails();
        }
      }
    });
  }

  selectMail(mail: MailProps) {
    this.selectedMail.set(mail);
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
