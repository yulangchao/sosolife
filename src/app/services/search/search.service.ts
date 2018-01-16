import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection  } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchService {

  private searchesCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.searchesCollection = afs.collection<any>('searches');
  }

  public addItem(item: any) {
    this.searchesCollection.add(item);
  }
}
