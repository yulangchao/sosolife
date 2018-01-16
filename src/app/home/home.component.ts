import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  p = 1;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(db: AngularFireDatabase, public authService: AuthService) {
    this.itemsRef = db.list('items', ref => ref.limitToLast(30));
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
  ngOnInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  addItem(message) {
    if(message == ""){
      return;
    }
    this.itemsRef.push({ content: message, date: new Date().getTime(), uid: this.authService.userInfo.uid, user: this.authService.userInfo.displayName, img:this.authService.userInfo.photoURL }).then(()=>{
      this.scrollToBottom();
    });

  }
  updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { name: newText });
  }
  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }
  deleteEverything() {
    this.itemsRef.remove();
  }

  openchat(e){
    setTimeout(()=>{
       this.scrollToBottom();
    })
  }

}
