import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  http = inject(HttpClient)
  formBuilder = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)

  userForm = this.formBuilder.group({
    username: [''],
    password: [''],
    passwordConfirm: [''],
    email: ['']
  })

  submit() {
    const {username, password, passwordConfirm, email} = this.userForm.value

    this.authService.register(username, password, passwordConfirm, email)
  }
}
