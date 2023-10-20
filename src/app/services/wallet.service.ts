import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable, shareReplay} from "rxjs";
import {PageResponse} from "../interfaces/page-response";
import {Wallet} from "../interfaces/wallet";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  private WALLET_API = environment.API_SERVER + 'api/wallets';

  constructor(private http: HttpClient) {
  }

  get(id: string): Observable<Wallet> {
    return this.http.get<Wallet>(this.WALLET_API + `/${id}`)
      .pipe(
        shareReplay()
      );
  }
  create(wallet: Wallet): Observable<Wallet> {
    return this.http.post<Wallet>(this.WALLET_API, wallet)
      .pipe(
        shareReplay()
      );
  }

  update(wallet: Wallet): Observable<Wallet> {
    return this.http.put<Wallet>(this.WALLET_API, wallet)
      .pipe(
        shareReplay()
      );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.WALLET_API + `/${id}`)
      .pipe(
        shareReplay()
      );
  }

  list(page: number, size: number): Observable<PageResponse<Wallet>> {
    return this.http.get<PageResponse<Wallet>>(this.WALLET_API + `?page=${page}&size=${size}`)
      .pipe(
        shareReplay()
      );
  }
}
