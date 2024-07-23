import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoading = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.value;
    this.isLoading = true;

    this.authService.login(credentials.email, credentials.password).subscribe({
      next: (data) => {
        this.tokenStorage.saveToken(data.data.token);
        this.router.navigate(['/dashboard']);
        this.isLoading = false;
        this.showAlert('Successfully logged in');
      },
      error: (err) => {
        console.log('ERR: ', err);
        this.isLoading = false;
        this.showAlert('Login failed. Please check your email and password.');
      },
    });
  }

  showAlert(message: string): void {
    alert(message);
  }
}