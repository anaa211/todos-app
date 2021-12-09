import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo = new Todo();
  @Input() i: number = -1;
  @Output() todoDelete: EventEmitter<Todo> = new EventEmitter();
  @Output() todoCheckBox: EventEmitter<Todo> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClickDel(todo: Todo) {
    this.todoDelete.emit(todo);
    console.log('onClickDel has been triggered');
  }

  onMarkDone(todo: Todo) {
    console.log('On marking as done');
    this.todoCheckBox.emit(todo);
  }
}
