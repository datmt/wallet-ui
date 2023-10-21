import {Component} from '@angular/core';
import {AuthService} from "@auth0/auth0-angular";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    constructor(private authService: AuthService) {
    }

    isAuthenticated() {
        return this.authService.isAuthenticated$;
    }

    signIn() {
        this.authService.loginWithRedirect();
    }
    signOut() {
        this.authService.logout();
    }
}
