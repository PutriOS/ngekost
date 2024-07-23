import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }
  
    const { firstname, lastname, email, password } = this.registerForm.value;
    const key = 'coba'; // Sesuaikan dengan yang diperlukan
    console.log('Registering with:', { firstname, lastname, email, password, key });
    
    this.loading = true;
  
    this.authService.register(firstname, lastname, email, password, key).subscribe(
      response => {
        console.log('Response:', response);
        if (response.data && response.data.token) {
          this.tokenStorage.saveToken(response.data.token);
          this.showAlert('Registration Successful. You are now registered.');
          this.router.navigate(['/auth/login']);
        } else {
          this.messageService.add({ severity: 'info', summary: 'Registration Information', detail: 'Registration successful but no token returned.' });
        }
        this.loading = false;
      },
      error => {
        console.error('Error:', error);
        this.showAlert('Registration Failed. Something went wrong. Check server response.');
        this.loading = false;
      }
    );
  }
  
  showAlert(message: string): void {
    alert(message);
  }
}
