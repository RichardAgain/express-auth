import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
interface Session {
  access_token: string
  username: string
  theme: any
}

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  storage = inject(StorageService)

  getSession (): Session | null {
    const current: Session | null
      = this.storage.getValue('session') 

    if (!this.isValidSession(current)) {
      this.signOut()
    }

    return current
  }

  signOut () {
    this.storage.removeValue('session')
  }

  isValidSession (session: unknown): boolean {
    return (
      typeof session === 'object' &&
      session !== null &&
      'access_token' in session
    )
  }
}
