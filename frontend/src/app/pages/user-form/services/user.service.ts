import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionsService } from '../../../shared/services/session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient)
  session = inject(SessionsService)
  router = inject(Router)

  getUser () {
    return this.http.get('/api/user')
  }

  updateUser (formData: any) {
    return this.http.put('/api/user', formData)
  }

  logOut () {
    this.session.signOut()
    this.router.navigateByUrl('')
  }
}
