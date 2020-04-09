import { Component, OnInit, ViewChild  } from '@angular/core';
import { EarningService } from '../services/earning.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Transaction } from '../models/Transaction';

@Component({
  selector: 'app-earning',
  templateUrl: './earning.component.html',
  styleUrls: ['./earning.component.css']
})
export class EarningComponent implements OnInit {
  earnings: Transaction[];
  totalEarning: number;
  disableAmountOnAdd: boolean = false;

  earning: Transaction ={ 
    source:'',
    amount :0,
    date:  new Date()
  }
  @ViewChild('earningForm') earningform: any;
  constructor(
    private earningService: EarningService,
    private flashMessage : FlashMessagesService
  ) { }



  // sender class
  
  earningAsMessage(){
    this.earningService.sendSumOfEarnings(this.totalEarning)
  }




  ngOnInit() {

    this.earningService.getEarnings().subscribe(earnings => {
      this.earnings = earnings;
      console.log(this.earnings)
      this.getTotalEarning()
      this.earningAsMessage();
    })
    
  }


  getTotalEarning(){
 
    this.totalEarning = this.earnings.reduce((total:number,earning)=> {
      earning.amount = +earning.amount;
      return total+earning.amount;
    },0)


  }
  

  onSubmit({value, valid}: { value:Transaction, valid: boolean}){
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
      this.earningService.newEarning(value);

      // show message
      // this.flashMessage.show('New Client Added',{
      //   cssClass: 'alert-success', timeout:4000
      // })

      //empty form
       this.earningform.reset();
      
    }
  }


}
