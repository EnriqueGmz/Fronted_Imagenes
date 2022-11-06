import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Validation from 'src/app/utils/validtion';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm: any = new FormGroup({
    username: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  emailpattern =
    /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;

  submitted = false;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private userservice: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group(
      {
        username: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(this.emailpattern),
          ]),
          ,
        ],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [Validation.passwordCheck('password', 'confirmPassword')],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  submit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.valid) {
      const body = {
        username: this.registerForm.get('username')?.value,
        surname: this.registerForm.get('surname')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
        confirmPassword: this.registerForm.get('confirmPassword')?.value,
      };
      this.userservice.register(JSON.stringify(body)).subscribe(() => {
        this.router.navigate(['/login']);
      });
    }
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
}
