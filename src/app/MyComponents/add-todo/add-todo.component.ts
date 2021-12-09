import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/Todo';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  title: string = '';
  desc: string = '';
  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();

  modalText: string = '';
  localItem: any;
  todos: Todo[] = [];
  tit: string = '';
  closeModal: string = '';

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  fetchTodos() {
    this.localItem = localStorage.getItem('todos');
    if (this.localItem == null) this.todos = [];
    else this.todos = JSON.parse(this.localItem);
  }

  onSubmit() {
    const todo = {
      sno: 8,
      title: this.title,
      desc: this.desc,
      active: true,
    };
    this.title = '';
    this.desc = '';

    //for adding todo only when same title todo doesn't already exist in the list
    this.fetchTodos();
    this.tit = todo.title;
    // console.log(this.todos.filter((t) => t.title.includes(this.tit)).length);
    if (this.todos.filter((t) => t.title.includes(this.tit)).length === 0) {
      this.modalText = 'Todo added!';
      this.todoAdd.emit(todo);
    } else {
      this.modalText = 'Todo already exists!';
    }
  }

  // handleAdd() {
  //   this.title = '';
  //   this.desc = '';
  // }

  triggerModal(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (res) => {
          this.closeModal = `Closed with: ${res}`;
        },
        (res) => {
          this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
