import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private as: AuthService,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.getRawValue();
      this.as.register(email, password)
        .then(user => {
          console.info(user.user);
          this.router.navigate(['/home']);
        })
        .catch(console.error);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}
