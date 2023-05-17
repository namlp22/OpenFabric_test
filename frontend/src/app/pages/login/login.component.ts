import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from '../../api/api.service';
import { setTokenToLocalStorage, setUsernameToLocalStorage } from '../../../utils/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
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

  onLoginClick() {
    console.log(this.credentials);
    this.apiService.login(this.credentials).subscribe({
      next: (response: any) => {
        setTokenToLocalStorage(response.token);
        setUsernameToLocalStorage(response.username)
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.log(error.error.message);
        this.message = error.error.message;
      },
    });
  }
}
