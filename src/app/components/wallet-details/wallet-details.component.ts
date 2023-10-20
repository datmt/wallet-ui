import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Wallet} from "../../interfaces/wallet";
import {WalletService} from "../../services/wallet.service";
import {TransactionService} from "../../services/transaction.service";
import {Transaction} from "../../interfaces/transaction";
import {PageEvent} from "@angular/material/paginator";
import {FileUpload} from "../../interfaces/file-upload";

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
    wallet: Wallet | undefined;
    transactions: Transaction[] = [];

    emptyTransaction: Transaction = {
        title: '',
        amount: 0,
        description: '',
        type: 'WITHDRAW',
        walletId: this.walletId,
    }

    constructor(private route: ActivatedRoute,
                private walletService: WalletService,
                private transactionService: TransactionService
    ) {
        this.walletId = this.route.snapshot.paramMap.get('id')!;
        this.walletService.get(this.walletId).subscribe(wallet => {
            this.wallet = wallet;
        });
        this.fetchTransactions(this.pageSize, this.pageIndex);
    }

    resetTransaction() {
        this.emptyTransaction = {
            title: '',
            amount: 0,
            type: 'WITHDRAW',
            description: '',
            walletId: this.walletId,
        }
    }

    fetchTransactions(pageSize: number, pageIndex: number) {
        this.emptyTransaction.walletId = this.walletId;
        this.transactionService.list(this.walletId, pageIndex, pageSize).subscribe(pageResponse => {
            this.transactions = pageResponse.data;
            this.totalItems = pageResponse.totalElements;
            this.totalPages = pageResponse.totalPages;
            this.pageIndex = pageResponse.page;
            this.pageSize = pageResponse.size;
        });
    }

    createTransaction() {
        this.transactionService.create(this.emptyTransaction).subscribe(transaction => {
            this.fetchTransactions(this.pageSize, this.pageIndex);
            this.resetTransaction();
        });
    }

    onPageChange($event: PageEvent) {
        this.fetchTransactions($event.pageSize, $event.pageIndex);
    }

    deleteTransaction(id: string) {
        this.transactionService.delete(id).subscribe({
            next: (response) => {
                this.fetchTransactions(this.pageSize, this.pageIndex);
            },
            error: (error) => {
                console.log(error);
            }
        });
    }

    addFileToTransaction(data: FileUpload) {
        if (!this.emptyTransaction.images)
            this.emptyTransaction.images = [];
        this.emptyTransaction.images?.push(data.id!);
    }
}
