import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,
AngularFirestoreDocument } from 'angularfire2/firestore';

import { Transaction } from '../models/Transaction';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  
  //creatingObservabes
  private _expensesToInsights = new Subject<number>();
  expenseMessage$ = this._expensesToInsights.asObservable();


  sendSumOfExpenses(message: number){
    this._expensesToInsights.next(message);
  }








  expenseCollection: AngularFirestoreCollection<Transaction>
  expenseDoc: AngularFirestoreDocument<Transaction>;
  expenses: Observable<Transaction[]>;
  newexpenses: Observable<Transaction[]>;
  expense: Observable<Transaction>;

  totalExpense:number;
  expenseInsight:number;
  expenseArray:Array<number>;
  arrsum:number;


  constructor(private afs: AngularFirestore) {
    this.expenseCollection = this.afs.collection('expenses',
      ref => ref.orderBy('date','asc')
    )
   }

   getExpenses() : Observable<Transaction[]> {
    this.expenses = this.expenseCollection.snapshotChanges()
    .pipe(map(changes => {
     return changes.map(
       action=>{
         const data = action.payload.doc.data() as Transaction;
         data.id = action.payload.doc.id;
         return data;
       }
     )
    }))

    return this.expenses;
  }





  




  newExpense(expense: Transaction){
    this.expenseCollection.add(expense)
   }



}
