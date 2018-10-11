import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatMessage } from './../model/chat.message.model';
import { Observable } from 'rxjs';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: ChatMessage[];

  constructor(private chat: ChatService) {}

  ngOnInit() {
    this.chat.getMessages().valueChanges().subscribe(data => {
      this.feed = data;
      console.log(this.feed);
    });
  }
  ngOnChanges() {
    this.chat.getMessages().valueChanges().subscribe(data => {
      this.feed = data;
      console.log(this.feed);
    });
  }
}
