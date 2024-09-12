import { inject, Injectable } from '@angular/core';
import { Logger } from '../../services/logger.service';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logger = inject(Logger)
  http = inject(HttpClient)
  storage = inject(StorageService)
  router = inject(Router)

  ping () {
    this.logger.log('ping!')
  }

  logIn(username: any) {
    return this.http.post('api/login', {
      username
    }).subscribe( res => {
      this.storage.saveValue('session', JSON.stringify(res))
      this.router.navigateByUrl('user')
    })
  }
}
