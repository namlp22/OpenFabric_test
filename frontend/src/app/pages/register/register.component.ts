import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../api/api.service';
import { setTokenToLocalStorage } from '../../../utils/utils';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private apiService: APIService, private router: Router) {}

  credentials = {};
  message = '';

  onUsernameChange(event: Event) {
    const username = (event.target as HTMLInputElement).value;
    this.credentials = {
      ...this.credentials,
      username: username,
    };
  }

  onPasswordChange(event: Event) {
    const password = (event.target as HTMLInputElement).value;
    this.credentials = {
      ...this.credentials,
      password: password,
    };
  }

  onRegisterClick() {
    console.log(this.credentials);
    this.apiService.register(this.credentials).subscribe({
      next: (response: any) => {
        this.message = response.message;
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        this.message = error.error.message;
      },
    });
  }
}
