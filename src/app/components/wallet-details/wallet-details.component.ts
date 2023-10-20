import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.scss']
})
export class WalletDetailsComponent {

  pageSize: number = 10;
  pageIndex: number = 0;
  totalItems: number = 0;
  totalPages: number = 0;

  walletId: string = '';

  constructor(private route: ActivatedRoute) {
    this.walletId = this.route.snapshot.paramMap.get('id')!;
  }


}
