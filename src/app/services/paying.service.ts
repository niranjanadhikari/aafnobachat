import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,
AngularFirestoreDocument } from 'angularfire2/firestore';

import { Transaction } from '../models/Transaction';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PayingService {

  //creatingObservabes
  // private _expensesToInsights = new Subject<number>();
  // expenseMessage$ = this._expensesToInsights.asObservable();
  private _payingToInsights = new Subject<number>();
  payingMessage$ = this._payingToInsights.asObservable();


  // sendSumOfExpenses(message: number){
  //   this._expensesToInsights.next(message);
  // }

  sendSumOfPayings(message: number){
    this._payingToInsights.next(message);
  }








  payingCollection: AngularFirestoreCollection<Transaction>
  payingDoc: AngularFirestoreDocument<Transaction>;
  payings: Observable<Transaction[]>;
  paying: Observable<Transaction>;

  totalPaying:number;
  payingInsight:number;
  // expeArray:Array<number>;
  // arrsum:number;


  constructor(private afs: AngularFirestore) {
    this.payingCollection = this.afs.collection('payings',
      ref => ref.orderBy('date','asc')
    )
   }

   getPayings() : Observable<Transaction[]> {
    this.payings = this.payingCollection.snapshotChanges()
    .pipe(map(changes => {
     return changes.map(
       action=>{
         const data = action.payload.doc.data() as Transaction;
         data.id = action.payload.doc.id;
         return data;
       }
     )
    }))

    return this.payings;
  }





  




  newPaying(paying: Transaction){
    this.payingCollection.add(paying)
   }
}
