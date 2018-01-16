import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  @Input() message = { body: '', type: '', icon: false };

  setMessage(body, type, icon = false, time = 3000) {
    this.message.body = body;
    this.message.type = type;
    this.message.icon = icon;
    setTimeout(() => { this.message.body = ''; }, time);
  }
}
