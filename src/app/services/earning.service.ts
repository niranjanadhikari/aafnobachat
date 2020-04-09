import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection,
AngularFirestoreDocument } from 'angularfire2/firestore';

import { Transaction } from '../models/Transaction';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EarningService {

 

    //creatingObservabes
    private _earningsToInsights = new Subject<number>();
    earningMessage$ = this._earningsToInsights.asObservable();
  
    sendSumOfEarnings(message: number){
      this._earningsToInsights.next(message);
    }

    
  earningCollection: AngularFirestoreCollection<Transaction>
  earningDoc: AngularFirestoreDocument<Transaction>;
  earnings: Observable<Transaction[]>;
  earning: Observable<Transaction>;

  totalEarnings:number;
  earningInsight:number;
  earningArray:Array<number>;
  arrsum:number;


  constructor(private afs: AngularFirestore) {
    this.earningCollection = this.afs.collection('earnings',
      ref => ref.orderBy('date','asc')
    )
   }

   getEarnings() : Observable<Transaction[]> {
    this.earnings = this.earningCollection.snapshotChanges()
    .pipe(map(changes => {
     return changes.map(
       action=>{
         const data = action.payload.doc.data() as Transaction;
         data.id = action.payload.doc.id;
         return data;
       }
     )
    }))

    return this.earnings;
  }





  




  newEarning(earning: Transaction){
    this.earningCollection.add(earning)
   }
  
}
