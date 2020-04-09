import { Component, OnInit, ViewChild  } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Lenden, Transaction } from '../models/Transaction';
import { PayingService } from '../services/paying.service';

@Component({
  selector: 'app-paying',
  templateUrl: './paying.component.html',
  styleUrls: ['./paying.component.css']
})
export class PayingComponent implements OnInit {

  payings: Transaction[];
  totalPaying: number;
  disableAmountOnAdd: boolean = false;

  paying: Transaction ={ 
    person:'',
    amount :0,
    date:  new Date()
  }
  

  @ViewChild('payingForm') payingform: any;

  constructor(
    private payingService: PayingService,
    private flashMessage : FlashMessagesService
    ) { }

// sender class



payingAsMessage(){
  this.payingService.sendSumOfPayings(this.totalPaying)
}


  ngOnInit() {
 
    this.payingService.getPayings()
    .subscribe( payings => {
      this.payings = payings;
      this.getTotalPaying();
      this.payingAsMessage()
    
    })
    
  }


  getTotalPaying(){
    this.totalPaying = this.payings.reduce((total:number,paying)=> {
      // this is equivalent to parseint
      paying.amount = +paying.amount;
      return total+paying.amount;
    }, 0);


  }
  

  onSubmit({value, valid}: { value:Lenden, valid: boolean}){
    value.date=new Date()
    console.log(value)
    if(this.disableAmountOnAdd){
      value.amount = 0;
    }

    if(!valid){
      //show error
      
      this.flashMessage.show('please fill out the form correctly',{
        cssClass: 'alert-danger', timeout:4000
      })
    }else{
      //add new client
      this.payingService.newPaying(value);

      // show message
      // this.flashMessage.show('New Client Added',{
      //   cssClass: 'alert-success', timeout:4000
      // })

      //empty form
      this.payingform.reset();
      
    }
  }

}
