import { ChatMessage } from './../model/chat.message.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  user: any;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  username: string;

  constructor(private db: AngularFireDatabase) {
    // this.afAuth.authState.subscribe(auth => {
    //   if ( auth !== undefined && auth !== null ) {
    //     this.user = auth;
    //   }
    // });
  }

  getMessages():  AngularFireList<ChatMessage> {
    return this.db.list('messages', ref => {
      return ref.limitToLast(25).orderByKey();
    });
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    // const email = this.user.email;
    const email = 'sid@nagarro.com';
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timesent: timestamp,
      // username: this.username,
      username: 'SIDDHARTH',
      email: email
    });

    // console.log(this.chatMessages.valueChanges().subscribe(data => console.log(data)));
  }

  getTimeStamp() {
    const now = new Date();

    return (now.toLocaleDateString() + ' ' + now.toLocaleTimeString());
  }
}
