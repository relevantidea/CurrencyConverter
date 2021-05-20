import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ExchangeRatesService {

  api = 'http://api.exchangeratesapi.io/v1';
  access_key = '36151d981ef6f05c2ef1c38c94b680f2';

  constructor(private http: HttpClient) { }

  getRateByCurrency(currency: string, amount: number) {
    return this.http.get(this.api + '/convert?access_key=' + this.access_key + '&from=EUR&to=' + currency + '&amount=' + amount)
      .pipe(
        map((res:any) => res)
      );
  }
  
}
