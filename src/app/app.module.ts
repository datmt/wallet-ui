import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthHttpInterceptor, AuthModule} from "@auth0/auth0-angular";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { WalletManagementComponent } from './components/wallet-management/wallet-management.component';
import { HomeComponent } from './components/home/home.component';
import { WalletDetailsComponent } from './components/wallet-details/wallet-details.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { FileViewComponent } from './components/file-view/file-view.component';
import {environment} from "./environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    WalletManagementComponent,
    HomeComponent,
    WalletDetailsComponent,
    FileUploadComponent,
    FileViewComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AuthModule.forRoot({
            domain: 'dev-vmww305d7b1ue758.us.auth0.com',
            clientId: 'iSlZhb14yAU7hQEKgZaYXDA22v4YChOr',
            authorizationParams: {
                redirect_uri: window.location.origin,
                audience: environment.API_SERVER,
                scope: 'read:current_user',

            },
            httpInterceptor: {
                allowedList: [
                    {
                        // Match any request that starts 'https://{yourDomain}/api/v2/' (note the asterisk)
                        uri: environment.API_SERVER,
                        tokenOptions: {
                            authorizationParams: {
                                // The attached token should target this audience
                                audience: environment.API_SERVER + "*",
                                // The attached token should have these scopes
                                scope: 'read:current_user'
                            }
                        }
                    }
                ]
            }
        }),
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        MatPaginatorModule,
        MatCardModule,
        MatSelectModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
