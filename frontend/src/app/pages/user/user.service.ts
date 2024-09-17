import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient)

  getUser () {
    return this.http.get('/api/user')
  }

  updateUser (formData: any) {
    return this.http.put('/api/user', formData)
  }
}
