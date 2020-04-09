import { Component, OnInit, ViewChild  } from '@angular/core';

import { FlashMessagesService } from 'angular2-flash-messages';

import { Lenden } from '../models/Transaction';
import { ReceivingService } from '../services/receiving.service';

@Component({
  selector: 'app-receiving',
  templateUrl: './receiving.component.html',
  styleUrls: ['./receiving.component.css']
})
export class ReceivingComponent implements OnInit {
  receivings: Lenden[];
  totalReceiving: number;
  disableAmountOnAdd: boolean = false;


  receiving: Lenden ={ 
    person:'',
    amount :0,
    date:  new Date()
  }

  @ViewChild('receivingForm') receivingform: any;

  constructor(
    private receivingService : ReceivingService,
    private flashMessage : FlashMessagesService
  ) { }



  receivingAsMessage(){
    this.receivingService.sendSumOfReceivings(this.totalReceiving)
  }
  
  
    ngOnInit() {
  

      this.receivingService.getReceivings()
      .subscribe( receivings => {
        this.receivings = receivings
        this.getTotalReceiving()
        this.receivingAsMessage();
      }

      )
      
    }

    getTotalReceiving(){
      this.totalReceiving = this.receivings.reduce((total:number,receiving)=> {
        // this is equivalent to parseint
        receiving.amount = +receiving.amount;
        return total+receiving.amount;
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
      //add new receiving
      this.receivingService.newReceiving(value)

      // show message
      // this.flashMessage.show('New Client Added',{
      //   cssClass: 'alert-success', timeout:4000
      // })

      //empty form
      this.receivingform.reset();
      
    }
  }

}
