import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ExchangeRatesService } from '../services/exchange-rates.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.page.html',
  styleUrls: ['./rates.page.scss'],
})
export class RatesPage implements OnInit {

  constructor(private exchangeRates: ExchangeRatesService, private loadingCtrl: LoadingController) { }
  
  currencies = ['USD','CAD','GBP','MXN','JPY'];
  rates: any = [];
  amount: number = 200;
  
  ngOnInit() {
    this.getRates();
  }

  getRates() {
    //Clear rates array in event of amount change
    this.rates = [];
    
    //Loop and call API for each currency/symbol
    this.presentLoading().then( _ => {
      for(let currency of this.currencies){
        
          this.exchangeRates.getRateByCurrency(currency, this.amount).subscribe((result:any) => {
            this.loadingCtrl.dismiss();
            if(result.success){
              this.rates.push(result);
            }
          })
      }
    })
  }

  amountChanged(event) {
    if(event.detail.value.length && event.detail.value != 0){
      this.getRates();
    }
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading Rates...',
    });
    await loading.present();
  }


}