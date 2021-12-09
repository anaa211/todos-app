import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { Todo } from 'src/app/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  localItem: any;
  todos: Todo[] = [];
  titles: Todo[] = [];
  searchTitle: string = '';
  page: any;

  config: any;

  constructor() {
    this.fetchTodos();
  }

  ngOnInit() {
    this.config = { itemsPerPage: 2, currentPage: 1 };
  }

  fetchTodos() {
    this.localItem = localStorage.getItem('todos');
    if (this.localItem == null) this.todos = [];
    else this.todos = JSON.parse(this.localItem);
  }

  deleteTodo(todo: Todo) {
    // console.log(todo);
    const index = this.todos.indexOf(todo);
    this.todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  toggleTodo(todo: Todo) {
    // console.log(todo);
    const index = this.todos.indexOf(todo);
    this.todos[index].active = !this.todos[index].active;
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.fetchTodos();
  }

  onSearch() {
    if (this.searchTitle.length === 0) {
      this.fetchTodos();
    } else {
      this.titles = this.todos.filter((t) =>
        t.title.includes(this.searchTitle)
      );
      this.todos = this.titles;
      this.page = 1;
      // console.log(this.titles);
    }
  }
}
