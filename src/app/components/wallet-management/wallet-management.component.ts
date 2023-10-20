import {Component, OnInit} from '@angular/core';
import {Wallet} from "../../interfaces/wallet";
import {PageEvent} from "@angular/material/paginator";
import {WalletService} from "../../services/wallet.service";

@Component({
  selector: 'app-wallet-management',
  templateUrl: './wallet-management.component.html',
  styleUrls: ['./wallet-management.component.scss']
})
export class WalletManagementComponent implements OnInit {

  pageSize: number = 10;
  pageIndex: number = 0;
  totalItems: number = 0;
  totalPages: number = 0;

  newWallet: Wallet = {
    title: '',
    description: '',
    currency: 'USD',
    balance: 0,
    id: ''

  }

  wallets: Wallet[] = [];

  constructor(private walletService: WalletService) {
  }

  ngOnInit() {
    this.fetchWallets(this.pageSize, this.pageIndex);
  }


  createWallet() {
    this.walletService.create(this.newWallet).subscribe({
      next: (response) => {
        this.resetWallet();
        this.fetchWallets(this.pageSize, this.pageIndex);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  resetWallet() {
    this.newWallet = {
      title: '',
      description: '',
      currency: 'USD',
      balance: 0,
    }
  }

  onPageChange($event: PageEvent) {
    this.fetchWallets($event.pageSize, $event.pageIndex)
  }

  fetchWallets(pageSize: number, pageIndex: number) {
    this.walletService.list(pageIndex, pageSize).subscribe({
      next: (response) => {
        this.wallets = response.data;
        this.totalItems = response.totalElements;
        this.totalPages = response.totalPages;
      }
    });
  }

  deleteWallet(id: string) {
    this.walletService.delete(id).subscribe({
      next: (response) => {
        this.fetchWallets(this.pageSize, this.pageIndex);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
