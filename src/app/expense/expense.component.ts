import { Component, OnInit, ViewChild  } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Transaction } from '../models/Transaction';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})


export class ExpenseComponent implements OnInit {


  expenses: Transaction[];
  totalExpense: number;
  disableAmountOnAdd: boolean = false;

  expense: Transaction ={ 
    purpose:'',
    amount :0,
    date:  new Date()
  }
  

  @ViewChild('expenseForm') expenseform: any;

  constructor(
    private expenseService: ExpenseService,
    private flashMessage : FlashMessagesService
    ) { }

// sender class

expenseAsMessage(){
  this.expenseService.sendSumOfExpenses(this.totalExpense)
 
}


  ngOnInit() {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses; 
      console.log(this.expenses)
      this.getTotalExpense()
      this.expenseAsMessage()
    })
    
  }


  getTotalExpense(){
    this.totalExpense = this.expenses.reduce((total:number,expense)=> {
      // this is equivalent to parseint
      expense.amount = +expense.amount;
      return total+expense.amount;
    }, 0);

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
      this.expenseService.newExpense(value);

      // show message
      // this.flashMessage.show('New Client Added',{
      //   cssClass: 'alert-success', timeout:4000
      // })

      //empty form
      this.expenseform.reset();
      
    }
  }

}
