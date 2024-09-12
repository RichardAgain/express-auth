import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient)

  getUser () {
    this.http.get('/api/user').subscribe(res => {
      console.log('USER!!!!')
      console.log(res)
    })
  }
}
