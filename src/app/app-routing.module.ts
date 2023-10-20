import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WalletManagementComponent} from "./components/wallet-management/wallet-management.component";
import {AuthGuard} from "@auth0/auth0-angular";
import {HomeComponent} from "./components/home/home.component";
import {WalletDetailsComponent} from "./components/wallet-details/wallet-details.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'wallets',
    title: 'Wallets',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: WalletManagementComponent,
        title: 'Wallets',
      },
      {
        path: ':id',
        component: WalletDetailsComponent,
        title: 'Wallet Details'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
