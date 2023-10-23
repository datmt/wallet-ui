import {Component, Inject} from '@angular/core';
import {AuthService, User} from "@auth0/auth0-angular";
import {DOCUMENT} from "@angular/common";
import {environment} from "./environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wallet-ui';

  user: User | null = null;

  constructor(
    private authService: AuthService,
    @Inject(DOCUMENT) public document: Document,

  ) {
  }

  login() {
    this.authService.loginWithRedirect();
  }

  logout() {
    this.authService.logout({
      logoutParams: {
        returnTo: environment.APP_ROOT
      }
    });
  }

  isAuthenticated() {
    return this.authService.isAuthenticated$;
  }

  getUserInfo() {
    console.log('getUserInfo', this.authService.user$)
    this.authService.user$.subscribe({
      next: (user) => {
        if (typeof user === 'undefined') {
          console.log('user is undefined');
          return;
        }
        console.log(user)
        this.user = user
      },
      error: (err) => console.log(err)
    })
  }

  getToken() {
    const token = this.authService.getAccessTokenSilently().subscribe({
      next: (token) => {
        console.log('token', token)
      }
    });

  }

}
