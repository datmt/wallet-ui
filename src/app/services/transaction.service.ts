import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Transaction} from "../interfaces/transaction";
import {Observable, shareReplay} from "rxjs";
import {PageResponse} from "../interfaces/page-response";

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private TRANSACTION_API = environment.API_SERVER + 'api/transactions';

    constructor(private http: HttpClient) {
    }

    create(transaction: Transaction): Observable<Transaction> {
        return this.http.post<Transaction>(this.TRANSACTION_API, transaction).pipe(shareReplay());
    }

    update(transaction: Transaction): Observable<Transaction> {
        return this.http.put<Transaction>(this.TRANSACTION_API, transaction).pipe(shareReplay());
    }

    list(walletId: string, page: number, size: number): Observable<PageResponse<Transaction>> {
        return this.http.get<PageResponse<Transaction>>(this.TRANSACTION_API + `/wallet/${walletId}?page=${page}&size=${size}`).pipe(shareReplay());
    }

    delete(id: string): Observable<any> {
        return this.http.delete(this.TRANSACTION_API + `/${id}`).pipe(shareReplay());
    }
}
