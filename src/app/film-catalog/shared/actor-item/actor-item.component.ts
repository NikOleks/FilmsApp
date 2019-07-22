import { Component, OnInit, Input } from '@angular/core';
import { Actor } from '../actor.model';

@Component({
  selector: 'app-actor-item',
  templateUrl: './actor-item.component.html',
  styleUrls: ['./actor-item.component.css']
})
export class ActorItemComponent implements OnInit {
  @Input() actorItem: Actor;
  constructor() { }

  ngOnInit() {
  }

}
