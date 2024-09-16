import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  storage = inject(StorageService)
  router = inject(Router)

  logIn(username: any, password: any) {
    return this.http.post('api/login', {
      username,
      password
    }).subscribe( res => {
      this.storage.saveValue('session', JSON.stringify(res))
      this.router.navigateByUrl('user')
    })
  }
}