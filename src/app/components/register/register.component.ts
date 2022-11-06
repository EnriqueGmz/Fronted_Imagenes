import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  constructor(private formbuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.formbuilder.group({
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
    });
  }
}
