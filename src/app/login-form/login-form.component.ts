import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  email: string;
  password: string;
  errorMsg: string;
  constructor(private authService: AuthService, private router: Router) { }

  signIn() {
    console.log(this.email);
    console.log(this.password);

    this.authService.login(this.email, this.password);
  }

  ngOnInit() {
  }

}
