import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { EarningService } from '../services/earning.service';
import { ReceivingService } from '../services/receiving.service';
import { PayingService } from '../services/paying.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {

  expenseInsight:number;
  earningInsight:number;
  receivingInsight:number;
  payingInsight:number;

  constructor( 
    private expenseService: ExpenseService, 
    private earningService: EarningService, 
    private receivingService: ReceivingService, 
    private payingService: PayingService ) { }




  ngOnInit() {
    
    // to get total---------------------------------------------------------------------- expenses
    this.expenseService.expenseMessage$
    .subscribe(
      message => {
        // console.log("message from insights "+ message)
        this.expenseInsight=message;
      
      }
    )

      // to get total---------------------------------------------------------------------- earnings
      this.earningService.earningMessage$
      .subscribe(
        message => {
        // console.log("message from insights "+ message)
        this.earningInsight=message;
       
        }
      )

         // to get total---------------------------------------------------------------------- receiving
         this.receivingService.receivingMessage$
         .subscribe(
           message => {
             this.receivingInsight = message;
            //  console.log(this.receivingInsight)
           }
         )
     
         // to get total---------------------------------------------------------------------- paying
         this.payingService.payingMessage$
         .subscribe(
           message => {
             this.payingInsight = message;
            //  console.log(this.payingInsight)
           }
         )
    
  }


  

}
