import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = 'A ocurrido un problema, revisa los datos o intentalo nuevamente.';
  loginForm: FormGroup;
  hasError = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.goToHome();
    }
  }

  login(): void {
    this.hasError = false;
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.controls.username.value;
    const password = this.loginForm.controls.password.value;

    this.authService.login(username, password).subscribe((resp: any) => {
      const token = resp.data.tokenAuth.token;
      if (token) {
        this.authService.saveToken(token);
        this.goToHome();
      } else {
        this.hasError = true;
      }
    }, () => this.hasError = true);
  }

  private goToHome(): void {
    this.router.navigate(['home/']);
  }

}
