import { AuthService } from './../services/auth.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: Observable<firebase.User>;
  userEmail: string;
  authState: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.authUser();

    this.user.subscribe(user => {
      if (user) {
        this.authState = this.authService.authstateOfUser;
        console.log(this.authState);
        this.userEmail = user.email;
      }
    });
  }

}
