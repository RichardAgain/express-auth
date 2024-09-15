import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authService = inject(AuthService)
  router = inject(Router)

  userForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  submit() {
    const { username, password } = this.userForm.value

    this.authService.logIn(username, password)
  }
}
