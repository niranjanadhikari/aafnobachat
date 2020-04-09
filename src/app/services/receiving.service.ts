import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,
AngularFirestoreDocument } from 'angularfire2/firestore';

import { Transaction } from '../models/Transaction';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReceivingService {

    //creatingObservabes
    // private _expensesToInsights = new Subject<number>();
    //receivingMessage$ = this._receivingToInsights.asObservable();
    private _receivingToInsights = new Subject<number>();
    receivingMessage$ = this._receivingToInsights.asObservable();
  
  
    sendSumOfReceivings(message: number){
      this._receivingToInsights.next(message);
    }

  receivingCollection: AngularFirestoreCollection<Transaction>
  receivingDoc: AngularFirestoreDocument<Transaction>;
  receivings: Observable<Transaction[]>;
  receiving: Observable<Transaction>;

  totalReceiving:number;
  receivingInsight:number;
  // expenseArray:Array<number>;
  // arrsum:number;


  constructor(private afs: AngularFirestore) {
    this.receivingCollection = this.afs.collection('receivings',
      ref => ref.orderBy('date','asc')
    )
   }

   getReceivings() : Observable<Transaction[]> {
    this.receivings = this.receivingCollection.snapshotChanges()
    .pipe(map(changes => {
     return changes.map(
       action=>{
         const data = action.payload.doc.data() as Transaction;
         data.id = action.payload.doc.id;
         return data;
       }
     )
    }))

    return this.receivings;
  }





  




  newReceiving(receiving: Transaction){
    this.receivingCollection.add(receiving)
   }



}
